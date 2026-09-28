/**
 * Adds an Ecuador region (currency usd, country ec) alongside the default
 * Europe/eur region seeded by Medusa, so the storefront can serve /ec in
 * dollars. Mirrors src/migration-scripts/initial-data-seed.ts's region/
 * tax-region/shipping setup for the European Warehouse.
 *
 *   npx medusa exec ./src/scripts/add-ec-region.ts
 *
 * Idempotent: re-running skips any piece that already exists (region,
 * tax region, service zone, shipping option).
 */
import { MedusaContainer } from "@medusajs/framework";
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils";
import {
  createRegionsWorkflow,
  createServiceZonesWorkflow,
  createShippingOptionsWorkflow,
  createTaxRegionsWorkflow,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows";

export default async function addEcRegion({
  container,
}: {
  container: MedusaContainer;
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);

  const { data: existingRegions } = await query.graph({
    entity: "region",
    fields: ["id", "name", "currency_code"],
  });

  let region = existingRegions.find((r) => r.currency_code === "usd");

  if (region) {
    logger.info(`Region with currency usd already exists (${region.id}). Skipping region creation.`);
  } else {
    logger.info("Seeding Ecuador region...");
    const { result: regionResult } = await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: "Ecuador",
            currency_code: "usd",
            countries: ["ec"],
            payment_providers: ["pp_system_default"],
          },
        ],
      },
    });
    region = regionResult[0];
    logger.info(`Created region ${region.id}.`);
  }

  const { data: existingTaxRegions } = await query.graph({
    entity: "tax_region",
    fields: ["id", "country_code"],
  });

  if (existingTaxRegions.some((tr) => tr.country_code === "ec")) {
    logger.info("Tax region for ec already exists. Skipping.");
  } else {
    logger.info("Seeding tax region for ec...");
    await createTaxRegionsWorkflow(container).run({
      input: [
        {
          country_code: "ec",
          provider_id: "tp_system",
        },
      ],
    });
    logger.info("Finished seeding tax region.");
  }

  logger.info("Setting usd as the store's default currency...");
  const { data: stores } = await query.graph({
    entity: "store",
    fields: ["id", "supported_currencies.currency_code", "supported_currencies.is_default"],
  });
  const store = stores[0];

  const supportedCurrencies = store.supported_currencies ?? [];
  const alreadyDefault = supportedCurrencies.some(
    (c) => c.currency_code === "usd" && c.is_default
  );

  if (alreadyDefault) {
    logger.info("usd is already the default currency. Skipping.");
  } else {
    await updateStoresWorkflow(container).run({
      input: {
        selector: { id: store.id },
        update: {
          supported_currencies: [
            { currency_code: "usd", is_default: true },
            ...supportedCurrencies
              .filter((c) => c.currency_code !== "usd")
              .map((c) => ({
                currency_code: c.currency_code,
                is_default: false,
              })),
          ],
        },
      },
    });
    logger.info("Finished updating store default currency.");
  }

  logger.info("Seeding fulfillment data for Ecuador...");
  const { data: stockLocations } = await query.graph({
    entity: "stock_location",
    fields: ["id", "name", "fulfillment_sets.id", "fulfillment_sets.service_zones.id", "fulfillment_sets.service_zones.name"],
  });
  const stockLocation = stockLocations[0];
  const fulfillmentSet = stockLocation.fulfillment_sets?.[0];

  if (!fulfillmentSet) {
    throw new Error(
      "No fulfillment set found on the existing stock location. Run the initial data seed first."
    );
  }

  let ecuadorZone = fulfillmentSet.service_zones?.find(
    (z) => z.name === "Ecuador"
  );

  if (ecuadorZone) {
    logger.info(`Service zone "Ecuador" already exists (${ecuadorZone.id}). Skipping.`);
  } else {
    const { result: serviceZoneResult } = await createServiceZonesWorkflow(container).run({
      input: {
        data: [
          {
            name: "Ecuador",
            fulfillment_set_id: fulfillmentSet.id,
            geo_zones: [
              {
                country_code: "ec",
                type: "country",
              },
            ],
          },
        ],
      },
    });
    ecuadorZone = serviceZoneResult[0];
    logger.info(`Created service zone ${ecuadorZone.id}.`);
  }

  const { data: shippingProfileResult } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  });
  const shippingProfile = shippingProfileResult[0];

  const { data: existingShippingOptions } = await query.graph({
    entity: "shipping_option",
    fields: ["id", "name", "service_zone_id"],
  });

  const hasStandardShipping = existingShippingOptions.some(
    (so) => so.service_zone_id === ecuadorZone!.id && so.name === "Standard Shipping"
  );

  if (hasStandardShipping) {
    logger.info("Standard Shipping option for Ecuador already exists. Skipping.");
  } else {
    await createShippingOptionsWorkflow(container).run({
      input: [
        {
          name: "Standard Shipping",
          price_type: "flat",
          provider_id: "manual_manual",
          service_zone_id: ecuadorZone.id,
          shipping_profile_id: shippingProfile.id,
          type: {
            label: "Standard",
            description: "Ship in 2-3 days.",
            code: "standard",
          },
          prices: [
            {
              currency_code: "usd",
              amount: 10,
            },
            {
              region_id: region.id,
              amount: 10,
            },
          ],
          rules: [
            {
              attribute: "enabled_in_store",
              value: "true",
              operator: "eq",
            },
            {
              attribute: "is_return",
              value: "false",
              operator: "eq",
            },
          ],
        },
      ],
    });
    logger.info("Created Standard Shipping option for Ecuador.");
  }

  logger.info("Finished seeding Ecuador region.");
}
