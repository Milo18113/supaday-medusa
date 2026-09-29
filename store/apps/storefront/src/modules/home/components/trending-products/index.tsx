import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import InteractiveLink from "@modules/common/components/interactive-link"
import { Heading } from "@modules/common/components/ui"
import ProductPreview from "@modules/products/components/product-preview"

const TRENDING_LIMIT = 8

export default async function TrendingProducts({
  region,
}: {
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: { limit: TRENDING_LIMIT, order: "-created_at" },
  })

  if (!products.length) {
    return null
  }

  return (
    <section className="content-container py-16 small:py-24">
      <div className="flex flex-col small:flex-row small:items-end justify-between gap-4 mb-10">
        <div>
          <p className="uppercase tracking-[0.25em] text-xs text-andes-terracota font-medium mb-2">
            Recién llegados del taller
          </p>
          <Heading level="h2" className="text-3xl small:text-4xl">
            Productos en tendencia
          </Heading>
        </div>
        <InteractiveLink href="/store">Ver todo</InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-6 gap-y-12 small:gap-y-16">
        {products.map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}
      </ul>
    </section>
  )
}
