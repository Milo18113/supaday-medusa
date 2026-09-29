import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { STORE_NAME } from "@lib/store-info"
import { StoreRegion } from "@medusajs/types"
import AndeanBand from "@modules/common/components/andean-band"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import Search from "@modules/layout/components/search"
import SideMenu from "@modules/layout/components/side-menu"
import PanamaHatUser from "@modules/common/icons/panama-hat-user"
import ShoppingBag from "@modules/common/icons/shopping-bag"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto duration-200 bg-andes-tierra">
        {/* Los triggers hijos traen hover:text-ui-fg-base (oscuro); esta variante lo sobreescribe para el fondo tierra */}
        <nav className="content-container txt-xsmall-plus text-andes-lana/85 flex items-center justify-between w-full h-full text-small-regular [&_a:hover]:text-andes-ocre [&_button:hover]:text-andes-ocre">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="font-display font-bold text-xl small:text-2xl text-andes-lana tracking-wide"
              data-testid="nav-store-link"
            >
              {STORE_NAME}
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <Search />
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-ui-fg-base flex items-center gap-x-1.5"
                href="/account"
                data-testid="nav-account-link"
              >
                <PanamaHatUser size={18} />
                Mi cuenta
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex items-center gap-x-1.5"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <ShoppingBag size={18} />
                  Carrito (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
      <AndeanBand size="sm" />

    </div>
  )
}
