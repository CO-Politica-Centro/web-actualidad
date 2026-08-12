export type NavItem = {
  href: string;
  label: string;
  external?: boolean;
};

export const site = {
  name: "CO Politica Centro",
  shortName: "Actualidad · Centro",
  tagline: "Noticias y análisis para el centro que actúa",
  description:
    "Noticias del movimiento y blog ciudadano: lo que pasa, por qué importa y qué puedes hacer.",
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
    { href: "/organizacion", label: "Organización" },
  ] as NavItem[],
} as const;
