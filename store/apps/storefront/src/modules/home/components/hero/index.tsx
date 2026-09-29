import { listProducts } from "@lib/data/products"
import { STORE_NAME, STORE_TAGLINE } from "@lib/store-info"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import HeroCarousel, { HeroSlide } from "./hero-carousel"

const Hero = async ({ region }: { region: HttpTypes.StoreRegion }) => {
  // Las imágenes salen de los productos reales: el catálogo en el Admin controla el hero
  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: 6,
      order: "-created_at",
      fields: "id,title,handle,thumbnail",
    },
  })

  const slides: HeroSlide[] = products
    .filter((p) => !!p.thumbnail)
    .map((p) => ({ src: p.thumbnail!, alt: p.title }))

  return (
    <HeroCarousel slides={slides}>
      <div className="content-container h-full flex flex-col justify-end items-center text-center pb-24 small:pb-32 gap-6">
        <p className="uppercase tracking-[0.3em] text-sm text-andes-ocre font-medium">
          {STORE_NAME}
        </p>
        <h1 className="font-display font-bold text-4xl small:text-6xl text-andes-lana max-w-3xl leading-tight">
          Tejido, barro y plata de nuestra sierra
        </h1>
        <p className="text-lg small:text-xl text-andes-lana/90 max-w-2xl">
          {STORE_TAGLINE}
        </p>
        <LocalizedClientLink
          href="/store"
          className="mt-2 inline-flex items-center justify-center h-12 px-8 rounded-base bg-andes-terracota text-andes-lana text-lg font-medium hover:bg-andes-terracota-oscuro transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-andes-ocre focus-visible:ring-offset-2 focus-visible:ring-offset-andes-tierra"
        >
          Apoya a nuestra comunidad
        </LocalizedClientLink>
      </div>
    </HeroCarousel>
  )
}

export default Hero
