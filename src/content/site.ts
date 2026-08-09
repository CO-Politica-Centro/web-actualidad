export type NavItem = {
  href: string;
  label: string;
  external?: boolean;
};

export const site = {
  name: "CO Politica Centro",
  shortName: "Actualidad · Centro",
  tagline: "Noticias y blog del centro liberal social",
  description:
    "Actualidad editorial de CO Politica Centro: noticias del movimiento y blog de análisis ciudadano.",
  disclaimer:
    "Somos un movimiento en consolidación. Este sitio publica contenidos editoriales; no implica personería jurídica ni candidaturas inscritas.",
  urls: {
    portal: "https://web-portal-co-politica.vercel.app",
    capacitacion: "https://web-capacitacion-co-politica.vercel.app",
    email: "rafaelsolanov@web.de",
    discord: "https://discord.gg/VKjgAbDDvC",
    beacons: "https://beacons.ai/centropd",
  },
  nav: [
    { href: "/", label: "Inicio" },
    { href: "/noticias", label: "Noticias" },
    { href: "/blog", label: "Blog" },
  ] as NavItem[],
} as const;
