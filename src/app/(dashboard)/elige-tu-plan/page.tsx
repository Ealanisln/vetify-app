import { Check } from "lucide-react";
import { checkoutAction } from "@/src/lib/payments/actions";
import { SubmitButton } from "./submit-button";
import { getStripePrices, getStripeProducts } from "@/src/lib/payments/stripe";

export default async function PricingPage() {
  const [prices, products] = await Promise.all([
    getStripePrices(),
    getStripeProducts(),
  ]);

  const monthlyPlan = prices.find(
    (price) => price.interval === "month" && price.productId === products[0]?.id
  );
  const yearlyPlan = prices.find(
    (price) => price.interval === "year" && price.productId === products[0]?.id
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFB5B5]/10 to-[#E8D5C4]/10 py-8 sm:py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
            <PricingCard
              name="Guardian Mensual"
              price={29900}
              priceId={monthlyPlan?.id}
              interval="month"
              trialDays={7}
              savings="Nuestro plan mas popular"
            />
            <PricingCard
              name="Guardian Anual"
              price={299000}
              priceId={yearlyPlan?.id}
              interval="year"
              trialDays={7}
              savings="Ahorra 588 MXN al año"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function PricingCard({
  name,
  price,
  interval,
  trialDays,
  priceId,
  savings,
}: {
  name: string;
  price: number;
  interval: "month" | "year";
  trialDays: number;
  priceId?: string;
  savings?: string;
}) {
  return (
    <div className="w-full backdrop-blur-sm bg-white/90 rounded-3xl shadow-xl border border-[#8B6E5C]/20 overflow-hidden transition-all hover:shadow-xl hover:border-[#8B6E5C]/30">
      <div className="px-6 py-6 sm:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#8B6E5C]">{name}</h2>
        <div className="mt-4 flex items-baseline">
          <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#8B6E5C]">
            ${(price / 100).toLocaleString("es-MX")} MXN
          </span>
          <span className="ml-2 text-base sm:text-lg text-[#506D84]">
            /{interval === "month" ? "mes" : "año"}
          </span>
        </div>
        {savings && (
          <p className="mt-2 text-sm text-[#7FA99B] font-medium">{savings}</p>
        )}
        <p className="mt-2 text-sm text-[#506D84]">
          {trialDays} días de prueba gratuita
        </p>
      </div>

      <div className="px-6 py-6 sm:px-8 space-y-4">
        <div className="border-t border-[#E8D5C4] pt-6">
          <h3 className="text-base sm:text-lg font-medium text-[#8B6E5C] mb-4">
            Características incluidas:
          </h3>
          <ul className="space-y-4">
            <Feature text="Hasta 500 clientes" />
            <Feature text="Recordatorios automáticos por WhatsApp o SMS (50 mensajes/mes)" />
            <Feature text="Generación de reportes básicos (ingresos, clientes activos)" />
            <Feature text="Historial clínico con adjuntos de imágenes/archivos (5 GB)" />
            <Feature text="Integración con Google Calendar" />
            <Feature text="Soporte prioritario por chat (respuesta en 24h)" />
            <Feature text="Hasta 3 usuarios incluidos" />
          </ul>
        </div>

        <div className="pt-6 flex flex-col items-center">
          <form action={checkoutAction} className="w-full">
            <input type="hidden" name="priceId" value={priceId} />
            <SubmitButton />
          </form>
          <p className="text-center mt-4 text-sm text-[#506D84]">
            Sin compromiso - Cancela en cualquier momento
          </p>
        </div>
      </div>
    </div>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <Check className="h-5 w-5 text-[#7FA99B] mt-0.5 flex-shrink-0" />
      <span className="text-[#506D84] text-sm sm:text-base">{text}</span>
    </li>
  );
}