import { Facebook, Instagram, Linkedin, Mail, MapPin, PawPrintIcon as Paw, Phone, Twitter } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-[#8B6E5C] text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-4 space-y-4">
            <h2 className="text-2xl font-bold flex items-center">
              <Paw className="mr-2 text-[#FFB5B5]" />
              Vetify
            </h2>
            <p className="text-sm text-[#E8D5C4]">
              Simplificando la gestión veterinaria con tecnología innovadora.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Enlaces rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="text-[#E8D5C4] hover:text-[#FFB5B5] transition-colors duration-200"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-[#E8D5C4] hover:text-[#FFB5B5] transition-colors duration-200"
                >
                  Características
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-[#E8D5C4] hover:text-[#FFB5B5] transition-colors duration-200"
                >
                  Precios
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-[#E8D5C4] hover:text-[#FFB5B5] transition-colors duration-200"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="md:col-span-5">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center group">
                <Phone className="mr-2 h-4 w-4 text-[#FFB5B5]" />
                <span className="text-[#E8D5C4]">+34 123 456 789</span>
              </li>
              <li className="flex items-center group">
                <Mail className="mr-2 h-4 w-4 text-[#FFB5B5]" />
                <span className="text-[#E8D5C4]">info@vetify.com</span>
              </li>
              <li className="flex items-start group">
                <MapPin className="mr-2 h-4 w-4 text-[#FFB5B5] mt-1" />
                <span className="text-[#E8D5C4]">Calle Veterinaria, 123, Madrid</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-12 pt-8 border-t border-[#E8D5C4]/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-[#E8D5C4]">
            &copy; 2025 Vetify. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a 
              href="#" 
              className="text-[#E8D5C4] hover:text-[#FFB5B5] transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="#" 
              className="text-[#E8D5C4] hover:text-[#FFB5B5] transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a 
              href="#" 
              className="text-[#E8D5C4] hover:text-[#FFB5B5] transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="#" 
              className="text-[#E8D5C4] hover:text-[#FFB5B5] transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}