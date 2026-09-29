import { listCategories } from "@lib/data/categories";
import { listCollections } from "@lib/data/collections";
import { CONTACT, STORE_NAME, STORE_TAGLINE } from "@lib/store-info";
import AndeanBand from "@modules/common/components/andean-band";
import { Text, clx } from "@modules/common/components/ui";

import LocalizedClientLink from "@modules/common/components/localized-client-link";

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  });
  const productCategories = await listCategories();

  return (
    <footer className="w-full bg-andes-tierra text-andes-lana/80">
      <AndeanBand />
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-10 small:flex-row items-start justify-between py-16 small:py-24">
          <div className="max-w-xs">
            <LocalizedClientLink
              href="/"
              className="font-display font-bold text-2xl text-andes-lana hover:text-andes-ocre transition-colors"
            >
              {STORE_NAME}
            </LocalizedClientLink>
            <p className="mt-3 txt-small">{STORE_TAGLINE}</p>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus text-andes-ocre">
                  Categorías
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return;
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null;

                    return (
                      <li
                        className="flex flex-col gap-2 txt-small"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-andes-ocre",
                            children && "txt-small-plus"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-andes-ocre"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus text-andes-ocre">
                  Colecciones
                </span>
                <ul
                  className={clx("grid grid-cols-1 gap-2 txt-small", {
                    "grid-cols-2": (collections?.length || 0) > 3,
                  })}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-andes-ocre"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus text-andes-ocre">Contacto</span>
              <ul className="grid grid-cols-1 gap-y-2 txt-small">
                <li>{CONTACT.name}</li>
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="hover:text-andes-ocre break-all"
                  >
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="hover:text-andes-ocre"
                  >
                    {CONTACT.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${CONTACT.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-andes-ocre"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full py-8 border-t border-andes-lana/15 justify-between text-andes-lana/60">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} {STORE_NAME}. Todos los derechos
            reservados.
          </Text>
        </div>
      </div>
    </footer>
  );
}
