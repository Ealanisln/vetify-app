"use client";

import { Button } from "@/src/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-[#7FA99B] hover:bg-[#6B9088] text-white font-medium py-3 px-6 rounded-xl transition-colors"
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Cargando...
        </>
      ) : (
        <>
          Comenzar ahora
          <ArrowRight className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}
