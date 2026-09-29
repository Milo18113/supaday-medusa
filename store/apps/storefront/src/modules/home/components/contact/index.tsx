import { CONTACT } from "@lib/store-info"
import { Heading } from "@modules/common/components/ui"

const contactLinkClass =
  "flex flex-col gap-1 p-6 rounded-rounded bg-andes-lana border border-andes-tierra/10 hover:border-andes-terracota hover:shadow-[0_6px_18px_rgba(57,52,36,0.12)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-andes-ocre"

const Contact = () => {
  return (
    <section id="contacto" className="bg-textura-lino">
      <div className="content-container py-16 small:py-24 grid grid-cols-1 small:grid-cols-2 gap-10 items-center">
        <div>
          <p className="uppercase tracking-[0.25em] text-xs text-andes-terracota font-medium mb-2">
            Hablemos
          </p>
          <Heading level="h2" className="text-3xl small:text-4xl mb-4">
            Contáctanos
          </Heading>
          <p className="text-lg text-andes-tierra-claro max-w-md">
            ¿Buscas una pieza especial, un pedido al por mayor o quieres
            conocer a los artesanos detrás de cada producto? Escríbenos.
          </p>
          <p className="mt-6 font-display text-xl">{CONTACT.name}</p>
        </div>

        <div className="grid grid-cols-1 xsmall:grid-cols-2 gap-4">
          <a href={`mailto:${CONTACT.email}`} className={contactLinkClass}>
            <span className="text-xs uppercase tracking-widest text-andes-terracota">
              Correo
            </span>
            <span className="font-medium break-all">{CONTACT.email}</span>
          </a>
          <a href={`tel:${CONTACT.phone}`} className={contactLinkClass}>
            <span className="text-xs uppercase tracking-widest text-andes-terracota">
              Teléfono
            </span>
            <span className="font-medium">{CONTACT.phone}</span>
          </a>
          <a
            href={`https://wa.me/${CONTACT.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${contactLinkClass} xsmall:col-span-2`}
          >
            <span className="text-xs uppercase tracking-widest text-andes-paramo">
              WhatsApp
            </span>
            <span className="font-medium">Escríbenos directamente →</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
