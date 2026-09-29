import { Metadata } from "next"

import { getRegion } from "@lib/data/regions"
import { STORE_NAME, STORE_TAGLINE } from "@lib/store-info"
import AndeanBand from "@modules/common/components/andean-band"
import Contact from "@modules/home/components/contact"
import Hero from "@modules/home/components/hero"
import TrendingProducts from "@modules/home/components/trending-products"

export const metadata: Metadata = {
  title: STORE_NAME,
  description: STORE_TAGLINE,
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  return (
    <>
      <Hero region={region} />
      <AndeanBand />
      <TrendingProducts region={region} />
      <AndeanBand size="sm" />
      <Contact />
    </>
  )
}
