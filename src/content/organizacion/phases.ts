import type { Phase } from "./types";

export const phases: Phase[] = [
  {
    id: 0,
    slug: "fase-0",
    title: "Fase 0 · Diagnóstico",
    shortTitle: "Diagnóstico",
    objective:
      "Saber qué tenemos de verdad: audiencia, activos, territorio y si los roles regionales son simbólicos o ejecutables.",
    summary:
      "Congelar el caos de chats, contar gente útil, mapear ciudades, medir dependencia del liderazgo mediático y probar una convocatoria presencial por región. No se crea partido aquí: se cierra un informe honesto.",
    actions: [
      "Nombrar un coordinador de Fase 0 y un espacio único de trabajo (sin abrir más grupos).",
      "Inventariar canales (Discord, WhatsApp, Telegram, redes) y quién tiene acceso de admin.",
      "Lanzar una encuesta corta: ciudad, horas disponibles, habilidades, contacto.",
      "Clasificar personas en audiencia, comunidad activa y núcleo operativo.",
      "Armar un mapa territorial por ciudad/departamento con nivel de madurez 1–5.",
      "Redactar identidad mínima en una página: qué somos, qué no somos, 5 principios, 3 prioridades.",
      "Conformar un núcleo de 5–9 personas con roles claros y reunión semanal con acta.",
      "Aplicar el test presencial: cada representante regional convoca un encuentro pequeño y documenta asistencia.",
    ],
    checklist: [
      "Coordinador de Fase 0 nombrado",
      "Lista de canales y admins",
      "Encuesta de voluntarios lanzada",
      "Conteo: audiencia / activos / núcleo",
      "Mapa por ciudad o departamento",
      "Nota sobre dependencia del líder mediático",
      "Identidad de una página acordada",
      "Núcleo de 5–9 personas con roles",
      "Reunión semanal con acta",
      "Inventario de activos y accesos",
      "Al menos una prueba de convocatoria presencial documentada",
      "Informe final de Fase 0 y decisión de pasar (o no) a Fase 1",
    ],
    exitCriteria: [
      "Hay números claros de comunidad activa (no solo seguidores).",
      "El núcleo cumple tareas, no solo opina.",
      "Existen indicios de territorio real: al menos algunos nodos con asistencia presencial verificada.",
      "Los cargos regionales en prueba se reclasifican: vocero digital, organizador en prueba o líder territorial.",
    ],
    antiPatterns: [
      "Anunciar que “ya somos partido”.",
      "Abrir veinte comisiones temáticas sin gente.",
      "Prometer candidaturas o firmas masivas.",
      "Crear más grupos WhatsApp sin dueño ni meta.",
      "Escribir un programa de cien páginas antes de validar territorio.",
    ],
    status: "current",
  },
  {
    id: 1,
    slug: "fase-1",
    title: "Fase 1 · Movimiento real",
    shortTitle: "Movimiento real",
    objective:
      "Convertir la comunidad en un movimiento que funcione aunque el liderazgo mediático no publique durante una semana.",
    summary:
      "Formalizar nombre, principios y código de conducta; instalar dirección colectiva; activar nodos locales con ritmo presencial; ordenar canales por función; y formar cuadros básicos.",
    actions: [
      "Publicar nombre del movimiento, principios y código de conducta.",
      "Definir quién decide y quién habla en público (vocerías).",
      "Instalar mesa nacional pequeña con actas y calendario.",
      "Confirmar solo nodos cuyos líderes ya pasaron prueba presencial.",
      "Fijar al menos una acción local al mes por nodo activo.",
      "Reordenar Discord/Telegram/WhatsApp por anuncios, trabajo, territorio y formación.",
      "Abrir ciclo de formación política básica (mensaje, debate, convocatoria).",
      "Si hay aportes, registrarlos con transparencia mínima.",
    ],
    checklist: [
      "Documento de identidad y reglas internas publicado",
      "Mesa de dirección operativa",
      "Al menos 3 nodos con reunión presencial sostenida",
      "Calendario local visible",
      "Canales ordenados por función",
      "Vocerías acordadas",
      "Protocolo simple de conflictos",
      "Voluntarios con tareas semanales (no solo opiniones)",
    ],
    exitCriteria: [
      "Varias ciudades se reúnen sin empujón constante del líder nacional.",
      "Hay disciplina interna básica y reportes de nodo.",
      "El movimiento tiene agenda propia, no solo reacción a lives.",
    ],
    antiPatterns: [
      "Seguir premiando cargos simbólicos sin ejecución.",
      "Depender de un solo canal del influencer para toda la organización.",
      "Abrir frentes temáticos de todo el Estado sin capacidad.",
    ],
    status: "upcoming",
  },
  {
    id: 2,
    slug: "fase-2",
    title: "Fase 2 · Vía electoral",
    shortTitle: "Vía electoral",
    objective:
      "Decidir cómo entrará el movimiento a la competencia electoral, con calendario y límites claros.",
    summary:
      "Tres caminos posibles: aval de un partido existente, grupo significativo de ciudadanos por firmas, o permanecer solo como movimiento un tiempo más. Sin esta decisión, el activismo no tiene rumbo.",
    actions: [
      "Evaluar madurez territorial y capacidad jurídica/financiera.",
      "Comparar pros y contras de aval, firmas o solo movimiento.",
      "Elegir la elección objetivo (locales, Congreso u otra) según calendario oficial.",
      "Documentar la decisión por escrito con responsables.",
      "Comunicar internamente qué se hará y qué no se promete aún.",
    ],
    checklist: [
      "Decisión A (aval), B (firmas) o C (solo movimiento) escrita",
      "Elección objetivo definida",
      "Cronograma tentativo alineado al calendario electoral",
      "Responsables de seguimiento nombrados",
    ],
    exitCriteria: [
      "Hay una vía elegida y un horizonte temporal concreto.",
      "La comunidad entiende la diferencia entre movimiento y partido formal.",
    ],
    antiPatterns: [
      "Anunciar “partido propio” sin haber elegido vía ni capacidad.",
      "Comprometer candidaturas antes de tener estructura y legalidad.",
    ],
    status: "upcoming",
  },
  {
    id: 3,
    slug: "fase-3",
    title: "Fase 3 · Blindaje jurídico y financiero",
    shortTitle: "Blindaje legal",
    objective:
      "No improvisar con la ley ni con la plata cuando llegue la Registraduría o el CNE.",
    summary:
      "Contratar o aliar abogado electoral, ordenar contabilidad, reglas de donaciones, revisión de inhabilidades y matriz de riesgos. Puede correr en paralelo con la Fase 2 y la 4.",
    actions: [
      "Conseguir acompañamiento jurídico electoral con experiencia CNE/Registraduría.",
      "Nombrar responsable de finanzas y reportes.",
      "Definir política de aportes, gastos y transparencia.",
      "Crear lista de chequeo de inhabilidades para posibles candidatos.",
      "Documentar riesgos: pelea interna, desinformación, captura de accesos, burnout.",
    ],
    checklist: [
      "Contacto jurídico electoral activo",
      "Manual financiero simple",
      "Registro de aportes y gastos (si aplica)",
      "Matriz de riesgos v1",
      "Protocolo de datos personales para bases de contactos/firmas",
    ],
    exitCriteria: [
      "Existe carpeta legal/financiera básica y alguien responsable de cumplirla.",
      "El movimiento sabe qué no puede prometer ni gastar a ciegas.",
    ],
    antiPatterns: [
      "Manejar plata en chats sin registro.",
      "Ignorar plazos y topes electorales hasta el último mes.",
    ],
    status: "upcoming",
  },
  {
    id: 4,
    slug: "fase-4",
    title: "Fase 4 · Firmas / grupo significativo",
    shortTitle: "Firmas",
    objective:
      "Si se eligió vía propia, conseguir el derecho a inscribir candidatos sin ser aún partido con personería.",
    summary:
      "Armar comité o grupo significativo de ciudadanos, recolectar firmas con colchón de invalidación, verificar calidad e inscribir en plazos oficiales. Si la vía fue aval de otro partido, esta fase se reduce o se omite.",
    actions: [
      "Conformar comité promotor según reglas de la elección.",
      "Definir meta de firmas con colchón del 30–50%.",
      "Desplegar coordinación departamental y validadores de formularios.",
      "Seguir metas diarias y depurar firmas defectuosas.",
      "Preseleccionar candidatos con filtro de inhabilidades.",
      "Inscribir ante la autoridad electoral en los plazos vigentes.",
    ],
    checklist: [
      "Comité/grupo constituido",
      "Meta de firmas y tablero de avance",
      "Equipo de validación operativo",
      "Candidatos prefiltrados",
      "Inscripción presentada en plazo (si corresponde)",
    ],
    exitCriteria: [
      "Firmas u otra credencial aceptada según la vía elegida.",
      "Candidaturas listas para competir o decisión documentada de no continuar.",
    ],
    antiPatterns: [
      "Recoger firmas sin validación ni respaldo jurídico.",
      "Prometer cupos a cambio de firmas sin reglas.",
    ],
    status: "upcoming",
    legalNote:
      "Los cupos de firmas y formularios los fija la autoridad electoral para cada certamen. Esta página no reemplaza la consulta oficial ni el acompañamiento de un abogado electoral.",
  },
  {
    id: 5,
    slug: "fase-5",
    title: "Fase 5 · Territorio fuerte",
    shortTitle: "Territorio",
    objective:
      "Pasar de “hay nodos en Discord” a una máquina local que produce gente, no solo mensajes.",
    summary:
      "Fortalecer ciudades clave, listas de voluntarios útiles, acciones mensuales, formación de reemplazos y vínculos con actores sociales del territorio —sin capturar la sociedad civil.",
    actions: [
      "Priorizar ciudades/departamentos con mejor base real.",
      "Mantener listas de contactos locales serios y actualizadas.",
      "Sostener acción mensual (foro, puerta a puerta, formación, servicio).",
      "Formar al menos un relevo por nodo para evitar caudillos locales.",
      "Abrir puentes puntuales con gremios, academia u organizaciones sociales.",
    ],
    checklist: [
      "Mapa de ciudades prioritarias actualizado",
      "Voluntarios con tareas concretas por nodo",
      "Calendario de acciones cumplido en el último trimestre",
      "Relevo o apoyo formado en nodos clave",
    ],
    exitCriteria: [
      "El mapa territorial predice mejor la capacidad de firmas y votos.",
      "Hay actividad local repetible sin depender solo del contenido nacional.",
    ],
    antiPatterns: [
      "Expandir a todo el país en el mapa sin sostener lo existente.",
      "Confundir chats activos con presencia territorial.",
    ],
    status: "upcoming",
  },
  {
    id: 6,
    slug: "fase-6",
    title: "Fase 6 · Primera prueba electoral",
    shortTitle: "Prueba electoral",
    objective: "Medir fuerza real en urnas y aprender con datos, no con likes.",
    summary:
      "Correr una campaña con mensaje único, movilización local y operación básica de mesa. Después, un post-mortem por territorio: dónde hubo estructura y dónde solo ruido digital.",
    actions: [
      "Definir mensaje principal y tres apoyos (no más).",
      "Capacitar voceros y evitar contradicciones públicas.",
      "Organizar movilización por nodos locales.",
      "Desplegar testigos u operación de mesa si aplica.",
      "Registrar costos y resultados por ciudad/departamento.",
      "Publicar informe interno postelectoral con aprendizajes.",
    ],
    checklist: [
      "Mensaje de campaña acordado",
      "Presupuesto y responsables claros",
      "Operación territorial el día de elecciones",
      "Informe postelectoral con votos, costos y nodos útiles",
    ],
    exitCriteria: [
      "El movimiento sabe, con evidencia, dónde es fuerte y dónde no.",
      "Hay decisión informada: escalar, corregir o cambiar vía.",
    ],
    antiPatterns: [
      "Gastar solo en pauta digital y abandonar territorio.",
      "Negar resultados o no documentar fallas.",
    ],
    status: "upcoming",
  },
  {
    id: 7,
    slug: "fase-7",
    title: "Fase 7 · Requisitos de personería",
    shortTitle: "Personería",
    objective:
      "Cumplir las condiciones legales para solicitar reconocimiento como partido o movimiento ante el CNE —si y solo si hay respaldo real.",
    summary:
      "En el marco constitucional colombiano, la regla general apunta a un respaldo electoral significativo (del orden del 3% de votos válidos nacionales en Senado o Cámara) y, luego, un expediente formal ante el Consejo Nacional Electoral.",
    actions: [
      "Evaluar con asesoría jurídica si los resultados permiten solicitar personería.",
      "Preparar acta de fundación, estatutos, plataforma ideológica y programática.",
      "Reunir lista de afiliados y prueba de designación de directivos.",
      "Designar representante legal para la solicitud.",
      "Radicar el expediente ante el CNE y hacer seguimiento.",
    ],
    checklist: [
      "Dictamen jurídico sobre viabilidad de la solicitud",
      "Estatutos y plataforma listos",
      "Afiliados y directivos documentados",
      "Solicitud radicada (si procede)",
    ],
    exitCriteria: [
      "La solicitud está presentada con respaldo verificable, o se documenta por qué aún no corresponde.",
    ],
    antiPatterns: [
      "Presentar papeles sin votos ni estructura.",
      "Tratar esta página web como trámite ante el CNE.",
    ],
    status: "upcoming",
    legalNote:
      "Información de marco general (Constitución art. 108, Ley 1475 y práctica del CNE). No es asesoría legal. Los requisitos, plazos e interpretaciones deben confirmarse con abogados electorales y fuentes oficiales.",
  },
  {
    id: 8,
    slug: "fase-8",
    title: "Fase 8 · Nacer como partido",
    shortTitle: "Partido formal",
    objective:
      "Pasar de movimiento de campaña a institución con reglas, avales y afiliación formal.",
    summary:
      "Si el CNE reconoce personería, activar democracia interna, régimen disciplinario, proceso de avales, separación entre vocería mediática, dirección política y administración, y territorios oficiales.",
    actions: [
      "Inscribirse en el registro correspondiente y comunicar el alcance real del reconocimiento.",
      "Activar estatutos: convenciones, elección de directivos, disciplina interna.",
      "Definir proceso transparente de avales y filtros de candidatos.",
      "Abrir afiliación formal (distinta de un rol en Discord).",
      "Separar roles: líder mediático, dirección política, operación administrativa.",
    ],
    checklist: [
      "Personería reconocida y comunicada con precisión",
      "Estatutos en operación",
      "Proceso de avales publicado",
      "Afiliación formal abierta",
      "Direcciones territoriales alineadas a estatutos",
    ],
    exitCriteria: [
      "El partido puede avalar candidatos y operar con obligaciones legales de organización política.",
    ],
    antiPatterns: [
      "Seguir gobernando solo por el chat del influencer.",
      "Prometer avales sin filtros ni democracia interna.",
    ],
    status: "upcoming",
    legalNote:
      "El reconocimiento de personería impone deberes (transparencia, democracia interna, convenciones, entre otros). Consulte siempre la normativa vigente y asesoría especializada.",
  },
  {
    id: 9,
    slug: "fase-9",
    title: "Fase 9 · Conservar el partido",
    shortTitle: "Sostenimiento",
    objective:
      "No perder lo ganado: mantener umbral, convenciones y una organización que sobreviva a una sola figura.",
    summary:
      "La personería no es el final. Hay que sostener respaldo electoral, democracia interna (convenciones al menos cada dos años en el marco constitucional), formación de cuadros y transparencia para no volver a ser solo una marca personal.",
    actions: [
      "Planificar el ciclo hacia las siguientes elecciones de Congreso.",
      "Celebrar convenciones y espacios de influencia real de la militancia.",
      "Formar cuadros territoriales de forma continua.",
      "Publicar rendición de cuentas periódica.",
      "Evitar caudillismo puro: recambio y liderazgo colectivo.",
    ],
    checklist: [
      "Calendario de democracia interna activo",
      "Plan de sostenimiento territorial",
      "Formación continua en marcha",
      "Transparencia financiera y política en práctica",
    ],
    exitCriteria: [
      "Esta fase no “termina”: se sostiene la personería o se pierde. El éxito es permanencia con reglas.",
    ],
    antiPatterns: [
      "Abandonar el territorio entre elecciones.",
      "Concentrar todo el poder en una sola persona sin relevos.",
      "Ignorar umbrales y obligaciones hasta que sea tarde.",
    ],
    status: "upcoming",
  },
];

export function getPhaseBySlug(slug: string): Phase | undefined {
  return phases.find((phase) => phase.slug === slug);
}

export function getAdjacentPhases(slug: string): {
  previous: Phase | null;
  current: Phase | null;
  next: Phase | null;
} {
  const index = phases.findIndex((phase) => phase.slug === slug);
  if (index === -1) {
    return { previous: null, current: null, next: null };
  }
  return {
    previous: index > 0 ? phases[index - 1]! : null,
    current: phases[index]!,
    next: index < phases.length - 1 ? phases[index + 1]! : null,
  };
}

export function getCurrentPhase(): Phase | undefined {
  return phases.find((phase) => phase.status === "current");
}
