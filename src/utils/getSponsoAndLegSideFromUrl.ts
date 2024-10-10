
export function getSponsoAndLegSideFromUrl(): {
  sponsor: number;
  legSide: "l" | "r" | "a";
  legSideNumber: 1 | 2 | 3;
} {

  if (!window) {
    throw new Error("sponsor and legside can be only called from client")
  }

  const urlParams = new URLSearchParams(window.location.search);
  const sponsorParam = urlParams.get("sponsor");
  const legSideParam = urlParams.get("legside");

  const sponsor: number = sponsorParam === null
    ? 0
    : Number.isNaN(Number(sponsorParam))
    ? 0
    : Number(sponsorParam);

  const legSideLetter: "l" | "r" | "a" =
    legSideParam === "l" ? "l" :
    legSideParam === "r" ? "r" :
    legSideParam === "a" ? "a" :
    "l";

  // pendiente: el por defecto debe venir de la configuración del usuario
  const legSideSelected = legSideParam === null ? 3
    : legSideParam === "l" ? 1
    : legSideParam === "r" ? 2
    : legSideParam === "a" ? 3
    : 3;

  return {
    sponsor,
    legSide: legSideLetter,
    legSideNumber: legSideSelected,
  }

}
