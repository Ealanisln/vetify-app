import { stripe } from "../payments/stripe";
import { db } from "./drizzle";
import { users, teams, teamMembers } from "./schema";
import { hashPassword } from "@/src/lib/auth/session";

async function createStripeProducts() {
  console.log("Creating Stripe products and prices...");

  const baseProduct = await stripe.products.create({
    name: "Base",
    description: "Base subscription plan",
  });

  await stripe.prices.create({
    product: baseProduct.id,
    unit_amount: 800,
    currency: "mxn",
    recurring: {
      interval: "month",
      trial_period_days: 7,
    },
  });

  const plusProduct = await stripe.products.create({
    name: "Plus",
    description: "Plus subscription plan",
  });

  await stripe.prices.create({
    product: plusProduct.id,
    unit_amount: 1200,
    currency: "mxn",
    recurring: {
      interval: "month",
      trial_period_days: 7,
    },
  });

  console.log("Stripe products and prices created successfully.");
}

async function seed() {
  // Limpiar datos existentes
  await db.delete(teamMembers);
  await db.delete(teams);
  await db.delete(users);

  // Limpieza de precios existentes en Stripe
  console.log("Cleaning up existing Stripe prices...");

  let hasMoreProducts = true;
  let startingAfter: string | undefined;

  while (hasMoreProducts) {
    const productsResponse = await stripe.products.list({
      limit: 100,
      starting_after: startingAfter,
    });

    for (const product of productsResponse.data) {
      let hasMorePrices = true;
      let priceStartingAfter: string | undefined;

      while (hasMorePrices) {
        const pricesResponse = await stripe.prices.list({
          product: product.id,
          limit: 100,
          starting_after: priceStartingAfter,
        });

        for (const price of pricesResponse.data) {
          try {
            await stripe.prices.update(price.id, { active: false });
            console.log(`Deactivated price ${price.id}`);
          } catch (priceError) {
            console.warn(`Failed to deactivate price ${price.id}:`, priceError);
          }
        }

        hasMorePrices = pricesResponse.has_more;
        priceStartingAfter = pricesResponse.data.slice(-1)[0]?.id;
      }
    }

    hasMoreProducts = productsResponse.has_more;
    startingAfter = productsResponse.data.slice(-1)[0]?.id;
  }

  // Crear usuario de prueba
  const email = "test@test.com";
  const password = "admin123";
  const passwordHash = await hashPassword(password);

  const [user] = await db
    .insert(users)
    .values([
      {
        email: email,
        passwordHash: passwordHash,
        role: "owner",
      },
    ])
    .returning();

  console.log("Initial user created.");

  // Crear equipo de prueba
  const [team] = await db
    .insert(teams)
    .values({
      name: "Test Team",
    })
    .returning();

  await db.insert(teamMembers).values({
    teamId: team.id,
    userId: user.id,
    role: "owner",
  });

  // Crear nuevos productos y precios
  await createStripeProducts();
}

seed()
  .catch((error) => {
    console.error("Seed process failed:", error);
    process.exit(1);
  })
  .finally(() => {
    console.log("Seed process finished. Exiting...");
    process.exit(0);
  });