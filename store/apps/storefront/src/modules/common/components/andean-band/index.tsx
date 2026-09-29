import { clx } from "@modules/common/components/ui"

// Rombo escalonado inspirado en los tejidos andinos (ocre de fondo, terracota y tierra encima)
const DIAMOND_TILE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="12" viewBox="0 0 24 12">
<rect width="24" height="12" fill="#D4A017"/>
<polygon points="12,0 24,6 12,12 0,6" fill="#B5502F"/>
<polygon points="12,3 18,6 12,9 6,6" fill="#393424"/>
<polygon points="12,5 14,6 12,7 10,6" fill="#F5EFE6"/>
</svg>`

// Data URI en vez de <pattern> con id: la franja se repite en la página y los ids chocarían
const DIAMOND_TILE = `url("data:image/svg+xml,${encodeURIComponent(DIAMOND_TILE_SVG)}")`

type AndeanBandProps = {
  size?: "sm" | "md"
  className?: string
}

const AndeanBand = ({ size = "md", className }: AndeanBandProps) => {
  const tileHeight = size === "sm" ? 8 : 14

  return (
    <div aria-hidden="true" className={clx("w-full", className)}>
      {size === "md" && <div className="h-1 bg-andes-paramo" />}
      <div
        style={{
          height: tileHeight,
          backgroundImage: DIAMOND_TILE,
          backgroundSize: `${tileHeight * 2}px ${tileHeight}px`,
          backgroundRepeat: "repeat-x",
        }}
      />
      {size === "md" && <div className="h-1 bg-andes-terracota" />}
    </div>
  )
}

export default AndeanBand
