import { useState, useEffect, useRef } from "react";

// TODO: Reemplazar con datos reales de recetas desde API o archivo JSON
const RECETAS_DATA = [
  {
    id: 1,
    nombre: "Bowl de quinoa con vegetales asados",
    categoria: "Almuerzos",
    tiempo: "25 min",
    porciones: 2,
    ingredientes: ["quinoa", "zapallo", "cebolla", "pimiento", "aceite de oliva", "cúrcuma"],
    descripcion: "Un bowl nutritivo y antiinflamatorio con quinoa esponjosa y vegetales asados al horno con cúrcuma.",
    pasos: [
      "Cocinar la quinoa según las instrucciones del paquete.",
      "Cortar el zapallo, cebolla y pimiento en cubos medianos.",
      "Condimentar con aceite de oliva, sal y cúrcuma.",
      "Asar en horno a 200°C por 20 minutos.",
      "Servir la quinoa con los vegetales encima.",
    ],
    emoji: "🥗",
    destacada: true,
    featured: true,
    source: "main",
    tags: ["sin gluten", "vegano"],
  },
  {
    id: 2,
    nombre: "Salmón al limón con espinaca",
    categoria: "Cenas",
    tiempo: "20 min",
    porciones: 2,
    ingredientes: ["salmón", "limón", "espinaca", "ajo", "aceite de oliva"],
    descripcion: "Salmón jugoso con salteado de espinaca y ajo, ideal para una cena antiinflamatoria rápida.",
    pasos: [
      "Marinar el salmón con jugo de limón, sal y pimienta 10 minutos.",
      "Cocinar en sartén con aceite de oliva 4 min de cada lado.",
      "En la misma sartén saltear el ajo y la espinaca 2 minutos.",
      "Servir el salmón sobre la espinaca.",
    ],
    emoji: "🐟",
    destacada: true,
    featured: true,
    source: "main",
    tags: ["sin gluten", "alto en omega-3"],
  },
  {
    id: 3,
    nombre: "Smoothie verde antiinflamatorio",
    categoria: "Desayunos",
    tiempo: "5 min",
    porciones: 1,
    ingredientes: ["espinaca", "banana", "jengibre", "limón", "agua de coco"],
    descripcion: "Smoothie potente con espinaca, banana y jengibre fresco para empezar el día con energía.",
    pasos: [
      "Poner todos los ingredientes en la licuadora.",
      "Procesar hasta obtener una mezcla homogénea.",
      "Servir inmediatamente con hielo.",
    ],
    emoji: "🥤",
    destacada: true,
    featured: false,
    source: "main",
    tags: ["vegano", "sin gluten", "rápido"],
  },
  {
    id: 4,
    nombre: "Ensalada de garbanzos y tomate",
    categoria: "Almuerzos",
    tiempo: "10 min",
    porciones: 2,
    ingredientes: ["garbanzos", "tomate", "pepino", "cebolla", "perejil", "aceite de oliva", "limón"],
    descripcion: "Ensalada fresca y proteica con garbanzos, vegetales y aderezo de limón.",
    pasos: [
      "Escurrir y enjuagar los garbanzos.",
      "Cortar tomate, pepino y cebolla en dados pequeños.",
      "Mezclar todo con perejil picado.",
      "Aderezar con aceite de oliva y jugo de limón.",
    ],
    emoji: "🥙",
    destacada: false,
    featured: true,
    source: "main",
    tags: ["vegano", "sin gluten", "proteico"],
  },
  {
    id: 5,
    nombre: "Avena con frutas y semillas",
    categoria: "Desayunos",
    tiempo: "10 min",
    porciones: 1,
    ingredientes: ["avena", "banana", "arándanos", "semillas de chía", "leche vegetal", "miel"],
    descripcion: "Desayuno reconfortante con avena, frutas frescas y semillas llenas de antioxidantes.",
    pasos: [
      "Cocinar la avena con la leche vegetal 5 minutos.",
      "Agregar la banana en rodajas y los arándanos.",
      "Espolvorear con semillas de chía.",
      "Endulzar con un chorrito de miel.",
    ],
    emoji: "🥣",
    destacada: true,
    featured: false,
    source: "main",
    tags: ["vegetariano", "energizante"],
  },
  {
    id: 6,
    nombre: "Pollo al cúrcuma con arroz integral",
    categoria: "Almuerzos",
    tiempo: "35 min",
    porciones: 3,
    ingredientes: ["pollo", "cúrcuma", "arroz integral", "cebolla", "ajo", "aceite de oliva"],
    descripcion: "Clásico antiinflamatorio: pollo jugoso al cúrcuma con arroz integral nutritivo.",
    pasos: [
      "Marinar el pollo con cúrcuma, ajo, sal y aceite.",
      "Cocinar en sartén sellando 3 min de cada lado.",
      "Terminar en horno 15 min a 180°C.",
      "Servir con arroz integral cocido.",
    ],
    emoji: "🍗",
    destacada: true,
    featured: true,
    source: "main",
    tags: ["sin gluten", "proteico"],
  },
  {
    id: 7,
    nombre: "Hummus casero con crudités",
    categoria: "Snacks",
    tiempo: "15 min",
    porciones: 4,
    ingredientes: ["garbanzos", "tahini", "limón", "ajo", "aceite de oliva", "pimiento", "zanahoria", "apio"],
    descripcion: "Hummus cremoso casero con vegetales frescos para dipear. Ideal para snack saludable.",
    pasos: [
      "Procesar garbanzos con tahini, jugo de limón y ajo.",
      "Agregar aceite de oliva y agua hasta lograr cremosidad.",
      "Cortar los vegetales en bastones.",
      "Servir el hummus con los crudités.",
    ],
    emoji: "🫘",
    destacada: false,
    featured: false,
    source: "snacks",
    tags: ["vegano", "sin gluten", "snack"],
  },
  {
    id: 8,
    nombre: "Bolitas de avena y cacao",
    categoria: "Snacks",
    tiempo: "20 min",
    porciones: 12,
    ingredientes: ["avena", "cacao", "mantequilla de maní", "miel", "semillas de chía"],
    descripcion: "Bolitas energéticas de avena y cacao sin cocción. Perfectas para el hambre entre comidas.",
    pasos: [
      "Mezclar avena, cacao y semillas de chía.",
      "Agregar mantequilla de maní y miel.",
      "Integrar bien hasta formar una masa.",
      "Formar bolitas y refrigerar 30 min.",
    ],
    emoji: "🍪",
    destacada: false,
    featured: false,
    source: "snacks",
    tags: ["vegetariano", "sin cocción", "snack"],
  },
  {
    id: 9,
    nombre: "Budín de banana y almendras",
    categoria: "Postres",
    tiempo: "45 min",
    porciones: 8,
    ingredientes: ["banana", "harina de almendras", "huevo", "aceite de coco", "canela", "esencia de vainilla"],
    descripcion: "Budín húmedo y esponjoso de banana con harina de almendras, sin azúcar añadida.",
    pasos: [
      "Pisar bien las bananas maduras.",
      "Mezclar con huevos batidos y aceite de coco.",
      "Agregar harina de almendras, canela y vainilla.",
      "Hornear en molde enmantecado 35 min a 175°C.",
    ],
    emoji: "🍫",
    destacada: false,
    featured: false,
    source: "dulce",
    tags: ["sin gluten", "sin azúcar", "dulce"],
  },
  {
    id: 10,
    nombre: "Cookies de avena y chocolate",
    categoria: "Postres",
    tiempo: "25 min",
    porciones: 16,
    ingredientes: ["avena", "banana", "chocolate negro", "aceite de coco", "nueces"],
    descripcion: "Cookies crujientes sin azúcar añadida. Con chocolate negro y nueces para snack o postre.",
    pasos: [
      "Pisar bananas e integrar con avena.",
      "Agregar chocolate negro picado y nueces.",
      "Formar cookies sobre papel manteca.",
      "Hornear 12 min a 180°C hasta dorar.",
    ],
    emoji: "🍪",
    destacada: false,
    featured: false,
    source: "dulce",
    tags: ["sin azúcar", "dulce", "snack"],
  },
  {
    id: 11,
    nombre: "Pan sin gluten de semillas",
    categoria: "Sin Gluten",
    tiempo: "50 min",
    porciones: 10,
    ingredientes: ["harina de arroz", "semillas de lino", "semillas de girasol", "huevo", "aceite de oliva", "sal"],
    descripcion: "Pan denso y nutritivo sin harina de trigo, cargado de semillas y fibra.",
    pasos: [
      "Mezclar harina de arroz con las semillas.",
      "Agregar huevos, aceite y sal.",
      "Verter en molde y dejar reposar 10 min.",
      "Hornear 40 min a 180°C.",
    ],
    emoji: "🌾",
    destacada: false,
    featured: false,
    source: "singluten",
    tags: ["sin gluten", "sin azúcar"],
  },
  {
    id: 12,
    nombre: "Caldo reconfortante de jengibre",
    categoria: "Sopas",
    tiempo: "30 min",
    porciones: 4,
    ingredientes: ["jengibre", "cúrcuma", "cebolla", "ajo", "zanahoria", "caldo de verduras"],
    descripcion: "Caldo caliente y antiinflamatorio con jengibre fresco y cúrcuma, ideal para los días fríos.",
    pasos: [
      "Rehogar cebolla y ajo en aceite.",
      "Agregar jengibre rallado y cúrcuma.",
      "Sumar la zanahoria y el caldo.",
      "Cocinar 20 minutos a fuego medio.",
    ],
    emoji: "🍲",
    destacada: false,
    featured: false,
    source: "main",
    tags: ["vegano", "sin gluten", "reconfortante"],
  },
];

const TODOS_INGREDIENTES = [
  "quinoa", "zapallo", "cebolla", "pimiento", "aceite de oliva", "cúrcuma",
  "salmón", "limón", "espinaca", "ajo", "espinaca", "banana", "jengibre",
  "agua de coco", "garbanzos", "tomate", "pepino", "perejil", "avena",
  "arándanos", "semillas de chía", "leche vegetal", "miel", "pollo",
  "arroz integral", "tahini", "apio", "zanahoria", "cacao",
  "mantequilla de maní", "harina de almendras", "huevo", "aceite de coco",
  "canela", "chocolate negro", "nueces", "harina de arroz", "semillas de lino",
  "semillas de girasol", "caldo de verduras", "pimiento", "zanahoria",
];

const INGREDIENTES_UNICOS = [...new Set(TODOS_INGREDIENTES)].sort();

const CATEGORIAS = ["Todas", "Desayunos", "Almuerzos", "Cenas", "Snacks", "Postres", "Sopas", "Sin Gluten"];

const BONOS = [
  {
    id: "snacks",
    emoji: "🍪",
    tag: "BONO 1",
    titulo: "Snacks Saludables y Antiinflamatorios",
    descripcion: "33 recetas para el hambre entre comidas — dips, crackers, bolitas energéticas y más.",
    tipo: "recetas",
  },
  {
    id: "dulce",
    emoji: "🍫",
    tag: "BONO 2",
    titulo: "Recetario Dulce Antiinflamatorio",
    descripcion: "36 recetas dulces sin azúcar añadida — budines, cookies, helados y postres rápidos.",
    tipo: "recetas",
  },
  {
    id: "singluten",
    emoji: "🌾",
    tag: "BONO 3",
    titulo: "Sin Gluten, Sin Harinas y Sin Azúcar",
    descripcion: "40 recetas prácticas para el día a día sin depender de harinas ni azúcar agregada.",
    tipo: "recetas",
  },
  {
    id: "planificador",
    emoji: "📅",
    tag: "BONO 4",
    titulo: "Planificador Semanal",
    descripcion: "7 días organizados. Menos decisiones, cero improvisación. Descargá tu planificador imprimible.",
    tipo: "pdf",
    // TODO: Reemplazar con URL real del PDF planificador
    pdfUrl: "#",
  },
  {
    id: "rotacion",
    emoji: "🔄",
    tag: "PRÓXIMAMENTE",
    titulo: "Sistema de Rotación de Comidas",
    descripcion: "Este bono se suma pronto a tu app. Te avisamos por Instagram apenas esté disponible.",
    tipo: "pronto",
  },
];

// Colores del sitio original
const C = {
  orange: "#FD6F2F",
  orangeLight: "#FF8C5A",
  orangeDark: "#E55A1F",
  olive: "#6B7C4A",
  oliveSoft: "#8A9B6A",
  oliveLight: "#C8D4A8",
  cream: "#FDF8F0",
  creamDark: "#F5EDD8",
  white: "#FFFFFF",
  text: "#2C2C2C",
  textLight: "#6B6B6B",
  border: "#E8E0D0",
  green: "#4CAF50",
  red: "#E53935",
};

const styles = {
  app: {
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
    backgroundColor: C.cream,
    minHeight: "100vh",
    maxWidth: "480px",
    margin: "0 auto",
    position: "relative",
    paddingBottom: "80px",
  },
  topbar: {
    background: C.white,
    borderBottom: `1px solid ${C.border}`,
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "700",
    color: C.text,
    letterSpacing: "-0.3px",
  },
  logoSpan: {
    color: C.orange,
  },
  igBadge: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "12px",
    color: C.textLight,
    textDecoration: "none",
    background: C.creamDark,
    padding: "5px 10px",
    borderRadius: "20px",
    fontWeight: "500",
    transition: "background 0.2s",
  },
  view: {
    padding: "16px 16px 24px",
    animation: "fadeIn 0.25s ease",
  },
  hero: {
    background: `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeDark} 100%)`,
    borderRadius: "16px",
    padding: "24px 20px",
    color: C.white,
    marginBottom: "16px",
  },
  heroH1: {
    fontSize: "22px",
    fontWeight: "800",
    margin: "0 0 10px",
    lineHeight: 1.3,
  },
  heroP: {
    fontSize: "14px",
    margin: "0 0 14px",
    opacity: 0.92,
    lineHeight: 1.5,
  },
  verifiedBanner: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "8px",
    padding: "8px 12px",
    fontSize: "12px",
    fontWeight: "600",
  },
  checkBadge: {
    background: C.white,
    color: C.orange,
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: "900",
    flexShrink: 0,
  },
  quickStats: {
    display: "flex",
    gap: "10px",
    marginBottom: "16px",
  },
  statCard: {
    flex: 1,
    background: C.white,
    borderRadius: "12px",
    padding: "14px 8px",
    textAlign: "center",
    border: `1px solid ${C.border}`,
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
  },
  statNum: {
    fontSize: "24px",
    fontWeight: "800",
    color: C.orange,
    lineHeight: 1,
    marginBottom: "4px",
  },
  statLabel: {
    fontSize: "11px",
    color: C.textLight,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.3px",
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    padding: "14px 20px",
    borderRadius: "12px",
    border: "none",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    background: `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeDark} 100%)`,
    color: C.white,
    boxShadow: "0 4px 12px rgba(253,111,47,0.3)",
    transition: "transform 0.15s, box-shadow 0.15s",
    textDecoration: "none",
    marginBottom: "10px",
  },
  btnSecondary: {
    background: C.white,
    color: C.orange,
    border: `2px solid ${C.orange}`,
    boxShadow: "none",
  },
  sectionTitle: {
    fontSize: "17px",
    fontWeight: "700",
    color: C.text,
    margin: "20px 0 12px",
  },
  featuredScroll: {
    display: "flex",
    gap: "12px",
    overflowX: "auto",
    paddingBottom: "8px",
    scrollbarWidth: "none",
    marginBottom: "4px",
    marginLeft: "-16px",
    marginRight: "-16px",
    paddingLeft: "16px",
    paddingRight: "16px",
  },
  featuredCard: {
    minWidth: "160px",
    background: C.white,
    borderRadius: "14px",
    padding: "14px",
    border: `1px solid ${C.border}`,
    cursor: "pointer",
    flexShrink: 0,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: "transform 0.15s",
  },
  featuredEmoji: {
    fontSize: "36px",
    display: "block",
    marginBottom: "8px",
  },
  featuredName: {
    fontSize: "13px",
    fontWeight: "600",
    color: C.text,
    lineHeight: 1.3,
    marginBottom: "4px",
  },
  featuredTime: {
    fontSize: "11px",
    color: C.textLight,
  },
  recipeCard: {
    background: C.white,
    borderRadius: "14px",
    padding: "14px",
    marginBottom: "10px",
    border: `1px solid ${C.border}`,
    display: "flex",
    gap: "14px",
    alignItems: "flex-start",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
    transition: "transform 0.15s, box-shadow 0.15s",
  },
  recipeEmoji: {
    fontSize: "40px",
    flexShrink: 0,
    lineHeight: 1,
  },
  recipeInfo: {
    flex: 1,
    minWidth: 0,
  },
  recipeName: {
    fontSize: "15px",
    fontWeight: "700",
    color: C.text,
    margin: "0 0 4px",
    lineHeight: 1.3,
  },
  recipeMeta: {
    fontSize: "12px",
    color: C.textLight,
    marginBottom: "6px",
  },
  tagRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "4px",
  },
  tag: {
    fontSize: "10px",
    background: C.creamDark,
    color: C.olive,
    padding: "2px 7px",
    borderRadius: "20px",
    fontWeight: "600",
    textTransform: "lowercase",
  },
  favBtn: {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    padding: "2px",
    flexShrink: 0,
    transition: "transform 0.15s",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: C.white,
    border: `1.5px solid ${C.border}`,
    borderRadius: "12px",
    padding: "10px 14px",
    marginBottom: "12px",
  },
  searchInput: {
    border: "none",
    outline: "none",
    fontSize: "14px",
    flex: 1,
    background: "transparent",
    color: C.text,
  },
  catScroll: {
    display: "flex",
    gap: "8px",
    overflowX: "auto",
    paddingBottom: "8px",
    scrollbarWidth: "none",
    marginBottom: "12px",
    marginLeft: "-16px",
    marginRight: "-16px",
    paddingLeft: "16px",
    paddingRight: "16px",
  },
  catBtn: {
    flexShrink: 0,
    padding: "7px 14px",
    borderRadius: "20px",
    border: `1.5px solid ${C.border}`,
    background: C.white,
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    color: C.textLight,
    transition: "all 0.15s",
    whiteSpace: "nowrap",
  },
  catBtnActive: {
    background: C.orange,
    color: C.white,
    border: `1.5px solid ${C.orange}`,
  },
  selectedBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  selectedCount: {
    fontSize: "13px",
    fontWeight: "600",
    color: C.olive,
  },
  clearBtn: {
    background: "none",
    border: "none",
    fontSize: "13px",
    color: C.orange,
    cursor: "pointer",
    fontWeight: "600",
    padding: "4px 8px",
  },
  chipGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  chip: {
    padding: "7px 13px",
    borderRadius: "20px",
    border: `1.5px solid ${C.border}`,
    background: C.white,
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    color: C.text,
    transition: "all 0.15s",
  },
  chipActive: {
    background: C.orange,
    color: C.white,
    border: `1.5px solid ${C.orange}`,
  },
  detailBack: {
    background: "none",
    border: "none",
    fontSize: "14px",
    fontWeight: "600",
    color: C.orange,
    cursor: "pointer",
    padding: "4px 0",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  detailCard: {
    background: C.white,
    borderRadius: "16px",
    overflow: "hidden",
    border: `1px solid ${C.border}`,
    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
  },
  detailHero: {
    background: `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeDark} 100%)`,
    padding: "30px 24px",
    textAlign: "center",
  },
  detailEmoji: {
    fontSize: "64px",
    display: "block",
    marginBottom: "12px",
  },
  detailTitle: {
    fontSize: "20px",
    fontWeight: "800",
    color: C.white,
    margin: "0 0 8px",
    lineHeight: 1.3,
  },
  detailMeta: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    fontSize: "13px",
    color: "rgba(255,255,255,0.9)",
  },
  detailBody: {
    padding: "20px",
  },
  detailSection: {
    marginBottom: "20px",
  },
  detailSectionTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: C.text,
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  ingredienteItem: {
    fontSize: "14px",
    color: C.text,
    padding: "6px 0",
    borderBottom: `1px solid ${C.border}`,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  pasoItem: {
    display: "flex",
    gap: "12px",
    marginBottom: "12px",
    alignItems: "flex-start",
  },
  pasoNum: {
    minWidth: "26px",
    height: "26px",
    background: C.orange,
    color: C.white,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "700",
    flexShrink: 0,
  },
  pasoText: {
    fontSize: "14px",
    color: C.text,
    lineHeight: 1.5,
    paddingTop: "3px",
  },
  emptyState: {
    textAlign: "center",
    padding: "40px 20px",
    color: C.textLight,
  },
  emptyEmoji: {
    fontSize: "48px",
    display: "block",
    marginBottom: "12px",
  },
  emptyTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: C.text,
    marginBottom: "8px",
  },
  emptyText: {
    fontSize: "14px",
    lineHeight: 1.5,
  },
  bonoCard: {
    background: C.white,
    borderRadius: "14px",
    padding: "16px",
    marginBottom: "12px",
    border: `1px solid ${C.border}`,
    display: "flex",
    gap: "14px",
    alignItems: "flex-start",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  bonoEmoji: {
    fontSize: "36px",
    flexShrink: 0,
    lineHeight: 1,
  },
  bonoTag: {
    fontSize: "10px",
    fontWeight: "700",
    color: C.orange,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "4px",
  },
  bonoTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: C.text,
    margin: "0 0 6px",
    lineHeight: 1.3,
  },
  bonoDesc: {
    fontSize: "13px",
    color: C.textLight,
    margin: "0 0 10px",
    lineHeight: 1.4,
  },
  verifyCard: {
    background: `linear-gradient(135deg, ${C.creamDark} 0%, ${C.oliveLight} 100%)`,
    borderRadius: "14px",
    padding: "16px",
    marginBottom: "16px",
    border: `1px solid ${C.oliveLight}`,
  },
  verifyTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: C.text,
    margin: "0 0 6px",
  },
  verifyText: {
    fontSize: "13px",
    color: C.textLight,
    margin: "0 0 8px",
    lineHeight: 1.4,
  },
  verifyLink: {
    color: C.orange,
    fontWeight: "700",
    textDecoration: "none",
    fontSize: "14px",
  },
  watermark: {
    textAlign: "center",
    fontSize: "11px",
    color: C.textLight,
    padding: "16px 0 8px",
    lineHeight: 1.6,
    opacity: 0.6,
  },
  tabbar: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: "480px",
    background: C.white,
    borderTop: `1px solid ${C.border}`,
    display: "flex",
    zIndex: 200,
    paddingBottom: "env(safe-area-inset-bottom, 0px)",
    boxShadow: "0 -4px 16px rgba(0,0,0,0.08)",
  },
  tabBtn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 4px",
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "10px",
    fontWeight: "600",
    color: C.textLight,
    transition: "color 0.15s",
    gap: "2px",
  },
  tabBtnActive: {
    color: C.orange,
  },
  tabIcon: {
    fontSize: "20px",
    lineHeight: 1,
  },
  instagramIcon: {
    width: "14px",
    height: "14px",
    fill: "currentColor",
  },
};

export default function App() {
  const [activeView, setActiveView] = useState("inicio");
  const [previousView, setPreviousView] = useState(null);
  const [selectedIngredientes, setSelectedIngredientes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoria, setActiveCategoria] = useState("Todas");
  const [favoritas, setFavoritas] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favoritas") || "[]");
    } catch {
      return [];
    }
  });
  const [detalleReceta, setDetalleReceta] = useState(null);
  const [bonoFiltro, setBonoFiltro] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("favoritas", JSON.stringify(favoritas));
    } catch {}
  }, [favoritas]);

  const navigate = (view, extra = {}) => {
    setPreviousView(activeView);
    if (extra.receta) setDetalleReceta(extra.receta);
    if (extra.bonoFiltro !== undefined) setBonoFiltro(extra.bonoFiltro);
    setActiveView(view);
    window.scrollTo(0, 0);
  };

  const toggleFavorita = (id) => {
    setFavoritas((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const isFav = (id) => favoritas.includes(id);

  const recetasFiltradas = RECETAS_DATA.filter((r) => {
    const matchSearch =
      !searchQuery ||
      r.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.ingredientes.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchCat =
      activeCategoria === "Todas" || r.categoria === activeCategoria;
    const matchBono = bonoFiltro === null || r.source === bonoFiltro;
    return matchSearch && matchCat && matchBono;
  });

  const recetasPorIngredientes = RECETAS_DATA.filter((r) => {
    if (selectedIngredientes.length === 0) return false;
    return selectedIngredientes.some((ing) =>
      r.ingredientes.includes(ing)
    );
  }).sort((a, b) => {
    const matchA = a.ingredientes.filter((i) =>
      selectedIngredientes.includes(i)
    ).length;
    const matchB = b.ingredientes.filter((i) =>
      selectedIngredientes.includes(i)
    ).length;
    return matchB - matchA;
  });

  const RecipeCard = ({ receta, onPress }) => {
    const [hovered, setHovered] = useState(false);
    return (
      <div
        style={{
          ...styles.recipeCard,
          transform: hovered ? "translateY(-2px)" : "none",
          boxShadow: hovered
            ? "0 6px 16px rgba(0,0,0,0.1)"
            : "0 2px 6px rgba(0,0,0,0.04)",
        }}
        onClick={onPress}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span style={styles.recipeEmoji}>{receta.emoji}</span>
        <div style={styles.recipeInfo}>
          <p style={styles.recipeName}>{receta.nombre}</p>
          <p style={styles.recipeMeta}>
            🕐 {receta.tiempo} &nbsp;·&nbsp; 🍽 {receta.porciones} porciones &nbsp;·&nbsp;{" "}
            {receta.categoria}
          </p>
          <div style={styles.tagRow}>
            {receta.tags.map((tag) => (
              <span key={tag} style={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <button
          style={{
            ...styles.favBtn,
            transform: isFav(receta.id) ? "scale(1.2)" : "scale(1)",
          }}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorita(receta.id);
          }}
          aria-label={isFav(receta.id) ? "Quitar de favoritas" : "Agregar a favoritas"}
        >
          {isFav(receta.id) ? "❤️" : "🤍"}
        </button>
      </div>
    );
  };

  const ViewInicio = () => (
    <div style={styles.view}>
      {/* Hero */}
      <div style={styles.hero}>
        <h1 style={styles.heroH1}>Tu cocina antiinflamatoria, resuelta.</h1>
        <p style={styles.heroP}>
          Elegí qué tenés en la heladera y encontrá qué cocinar. 218 recetas
          listas para armar tu semana.
        </p>
        <div style={styles.verifiedBanner}>
          <span style={styles.checkBadge}>✓</span>
          <span>App oficial verificada de Cocina Resuelta Antiinflamatoria</span>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.quickStats}>
        <div style={styles.statCard}>
          <div style={styles.statNum}>218</div>
          <div style={styles.statLabel}>Recetas</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNum}>30+</div>
          <div style={styles.statLabel}>Categorías</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNum}>4</div>
          <div style={styles.statLabel}>Bonos incluidos</div>
        </div>
      </div>

      {/* Botones principales */}
      <BtnPrimary
        id="buscar"
        onClick={() => navigate("ingredientes")}
        label="🥗 Buscar por ingredientes"
      />
      <BtnSecondary
        id="recetas"
        onClick={() => { setBonoFiltro(null); navigate("recetas"); }}
        label="📖 Ver todas las recetas"
      />

      {/* Featured recetas de videos */}
      <div>
        <h2 style={{ ...styles.sectionTitle, marginBottom: "2px" }}>
          📣 Las recetas de nuestros videos
        </h2>
        <p style={{ fontSize: "13px", color: C.oliveSoft, marginBottom: "10px" }}>
          Las que viste en nuestras publicidades, todas juntas acá
        </p>
      </div>
      <div style={styles.featuredScroll}>
        {RECETAS_DATA.filter((r) => r.featured).map((r) => (
          <FeaturedCard
            key={r.id}
            receta={r}
            onPress={() => navigate("detalle", { receta: r })}
          />
        ))}
      </div>

      {/* Empezá por acá */}
      <h2 style={styles.sectionTitle}>Empezá por acá</h2>
      {RECETAS_DATA.filter((r) => r.destacada).map((r) => (
        <RecipeCard
          key={r.id}
          receta={r}
          onPress={() => navigate("detalle", { receta: r })}
        />
      ))}

      <div style={styles.watermark}>
        Cocina Resuelta® — Contenido original, prohibida su reventa
        <br />
        @cocinaresuelta_
      </div>
    </div>
  );

  const FeaturedCard = ({ receta, onPress }) => {
    const [hovered, setHovered] = useState(false);
    return (
      <div
        style={{
          ...styles.featuredCard,
          transform: hovered ? "scale(1.03)" : "scale(1)",
        }}
        onClick={onPress}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span style={styles.featuredEmoji}>{receta.emoji}</span>
        <p style={styles.featuredName}>{receta.nombre}</p>
        <p style={styles.featuredTime}>🕐 {receta.tiempo}</p>
      </div>
    );
  };

  const ViewIngredientes = () => (
    <div style={styles.view}>
      <h1 style={{ fontSize: "22px", marginTop: "6px", marginBottom: "6px", fontWeight: "800", color: C.text }}>
        ¿Qué tenés en la heladera?
      </h1>
      <p style={{ fontSize: "13.5px", color: C.oliveSoft, marginBottom: "14px" }}>
        Elegí los ingredientes que tenés a mano y te mostramos las mejores recetas.
      </p>

      <div style={styles.selectedBar}>
        <span style={styles.selectedCount}>
          {selectedIngredientes.length} seleccionado
          {selectedIngredientes.length !== 1 ? "s" : ""}
        </span>
        <button
          style={styles.clearBtn}
          onClick={() => setSelectedIngredientes([])}
        >
          Limpiar
        </button>
      </div>

      <div style={styles.chipGrid}>
        {INGREDIENTES_UNICOS.map((ing) => (
          <button
            key={ing}
            style={{
              ...styles.chip,
              ...(selectedIngredientes.includes(ing) ? styles.chipActive : {}),
            }}
            onClick={() =>
              setSelectedIngredientes((prev) =>
                prev.includes(ing)
                  ? prev.filter((i) => i !== ing)
                  : [...prev, ing]
              )
            }
          >
            {ing}
          </button>
        ))}
      </div>

      <div style={{ height: "16px" }} />
      <BtnPrimary
        id="ver-resultados"
        onClick={() => {
          setBonoFiltro(null);
          navigate("resultados-ingredientes");
        }}
        label={`Ver recetas que coinciden${selectedIngredientes.length > 0 ? ` (${recetasPorIngredientes.length})` : ""}`}
        disabled={selectedIngredientes.length === 0}
      />
    </div>
  );

  const ViewResultadosIngredientes = () => (
    <div style={styles.view}>
      <button
        style={styles.detailBack}
        onClick={() => navigate("ingredientes")}
      >
        ← Volver a ingredientes
      </button>
      <h1 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "6px" }}>
        Recetas que coinciden
      </h1>
      <p style={{ fontSize: "13px", color: C.textLight, marginBottom: "16px" }}>
        Basado en: {selectedIngredientes.join(", ")}
      </p>
      {recetasPorIngredientes.length === 0 ? (
        <div style={styles.emptyState}>
          <span style={styles.emptyEmoji}>🥺</span>
          <p style={styles.emptyTitle}>Sin coincidencias</p>
          <p style={styles.emptyText}>
            Probá seleccionar otros ingredientes o agregar más opciones.
          </p>
        </div>
      ) : (
        recetasPorIngredientes.map((r) => (
          <div key={r.id}>
            <div
              style={{
                fontSize: "11px",
                color: C.orange,
                fontWeight: "700",
                marginBottom: "4px",
              }}
            >
              {r.ingredientes.filter((i) => selectedIngredientes.includes(i)).length}{" "}
              de {r.ingredientes.length} ingredientes disponibles
            </div>
            <RecipeCard
              receta={r}
              onPress={() => navigate("detalle", { receta: r })}
            />
          </div>
        ))
      )}
    </div>
  );

  const ViewRecetas = () => (
    <div style={styles.view}>
      <h1 style={{ fontSize: "22px", marginTop: "6px", marginBottom: "14px", fontWeight: "800", color: C.text }}>
        {bonoFiltro
          ? BONOS.find((b) => b.id === bonoFiltro)?.titulo || "Recetas"
          : "Todas las recetas"}
      </h1>
      {bonoFiltro && (
        <button
          style={{ ...styles.clearBtn, marginBottom: "12px", display: "block" }}
          onClick={() => setBonoFiltro(null)}
        >
          ← Ver todas las recetas
        </button>
      )}

      {/* Búsqueda */}
      <div style={styles.searchBox}>
        <span style={{ color: C.textLight }}>🔍</span>
        <input
          type="text"
          placeholder="Buscar receta o ingrediente..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            style={{ background: "none", border: "none", cursor: "pointer", color: C.textLight, fontSize: "16px" }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Categorías */}
      <div style={styles.catScroll}>
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            style={{
              ...styles.catBtn,
              ...(activeCategoria === cat ? styles.catBtnActive : {}),
            }}
            onClick={() => setActiveCategoria(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lista */}
      {recetasFiltradas.length === 0 ? (
        <div style={styles.emptyState}>
          <span style={styles.emptyEmoji}>🔍</span>
          <p style={styles.emptyTitle}>Sin resultados</p>
          <p style={styles.emptyText}>
            Probá con otro término o cambiá la categoría.
          </p>
        </div>
      ) : (
        recetasFiltradas.map((r) => (
          <RecipeCard
            key={r.id}
            receta={r}
            onPress={() => navigate("detalle", { receta: r })}
          />
        ))
      )}
    </div>
  );

  const ViewDetalle = () => {
    if (!detalleReceta) return null;
    const r = detalleReceta;
    return (
      <div style={styles.view}>
        <button
          style={styles.detailBack}
          onClick={() => navigate(previousView || "recetas")}
        >
          ← Volver
        </button>

        <div style={styles.detailCard}>
          {/* Hero del detalle */}
          <div style={styles.detailHero}>
            <span style={styles.detailEmoji}>{r.emoji}</span>
            <h1 style={styles.detailTitle}>{r.nombre}</h1>
            <div style={styles.detailMeta}>
              <span>🕐 {r.tiempo}</span>
              <span>🍽 {r.porciones} porciones</span>
              <span>📂 {r.categoria}</span>
            </div>
          </div>

          <div style={styles.detailBody}>
            {/* Tags */}
            <div style={{ ...styles.tagRow, marginBottom: "16px" }}>
              {r.tags.map((tag) => (
                <span key={tag} style={{ ...styles.tag, fontSize: "12px", padding: "4px 10px" }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Descripción */}
            <div style={styles.detailSection}>
              <p style={{ fontSize: "14px", color: C.textLight, lineHeight: 1.6, margin: 0 }}>
                {r.descripcion}
              </p>
            </div>

            {/* Ingredientes */}
            <div style={styles.detailSection}>
              <h2 style={styles.detailSectionTitle}>🛒 Ingredientes</h2>
              {r.ingredientes.map((ing, i) => (
                <div key={i} style={styles.ingredienteItem}>
                  <span style={{ color: C.orange, fontWeight: "700" }}>•</span>
                  <span style={{ textTransform: "capitalize" }}>{ing}</span>
                </div>
              ))}
            </div>

            {/* Pasos */}
            <div style={styles.detailSection}>
              <h2 style={styles.detailSectionTitle}>👨‍🍳 Preparación</h2>
              {r.pasos.map((paso, i) => (
                <div key={i} style={styles.pasoItem}>
                  <span style={styles.pasoNum}>{i + 1}</span>
                  <p style={styles.pasoText}>{paso}</p>
                </div>
              ))}
            </div>

            {/* Favorita */}
            <button
              style={{
                ...styles.btn,
                ...(isFav(r.id) ? { background: C.red, boxShadow: "0 4px 12px rgba(229,57,53,0.3)" } : {}),
                marginTop: "8px",
              }}
              onClick={() => toggleFavorita(r.id)}
            >
              {isFav(r.id) ? "❤️ Quitar de favoritas" : "🤍 Guardar en favoritas"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ViewFavoritas = () => {
    const recetasFav = RECETAS_DATA.filter((r) => favoritas.includes(r.id));
    return (
      <div style={styles.view}>
        <h1 style={{ fontSize: "22px", marginTop: "6px", marginBottom: "16px", fontWeight: "800", color: C.text }}>
          Tus favoritas
        </h1>
        {recetasFav.length === 0 ? (
          <div style={styles.emptyState}>
            <span style={styles.emptyEmoji}>🤍</span>
            <p style={styles.emptyTitle}>Aún no tenés favoritas</p>
            <p style={styles.emptyText}>
              Tocá el corazón en cualquier receta para guardarla acá.
            </p>
            <div style={{ height: "16px" }} />
            <BtnSecondary
              id="ir-recetas"
              onClick={() => navigate("recetas")}
              label="Explorar recetas"
            />
          </div>
        ) : (
          recetasFav.map((r) => (
            <RecipeCard
              key={r.id}
              receta={r}
              onPress={() => navigate("detalle", { receta: r })}
            />
          ))
        )}
      </div>
    );
  };

  const ViewBonos = () => (
    <div style={styles.view}>
      <h1 style={{ fontSize: "22px", marginTop: "6px", marginBottom: "16px", fontWeight: "800", color: C.text }}>
        Bonos incluidos
      </h1>

      {/* Verificar compra */}
      <div style={styles.verifyCard}>
        <h4 style={styles.verifyTitle}>🔒 Verificá tu compra</h4>
        <p style={styles.verifyText}>
          El único canal oficial de Cocina Resuelta Antiinflamatoria es nuestro
          Instagram. Ante cualquier duda sobre la autenticidad de tu copia,
          escribinos ahí.
        </p>
        <a
          href="https://instagram.com/cocinaresuelta_"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.verifyLink}
        >
          @cocinaresuelta_ →
        </a>
      </div>

      {/* Bonos */}
      {BONOS.map((bono) => (
        <div
          key={bono.id}
          style={{
            ...styles.bonoCard,
            opacity: bono.tipo === "pronto" ? 0.6 : 1,
          }}
        >
          <span style={styles.bonoEmoji}>{bono.emoji}</span>
          <div style={{ flex: 1 }}>
            <span style={styles.bonoTag}>{bono.tag}</span>
            <h4 style={styles.bonoTitle}>{bono.titulo}</h4>
            <p style={styles.bonoDesc}>{bono.descripcion}</p>
            {bono.tipo === "recetas" && (
              <button
                style={{
                  ...styles.btn,
                  ...styles.btnSecondary,
                  width: "auto",
                  padding: "8px 16px",
                  fontSize: "13px",
                  marginBottom: 0,
                }}
                onClick={() => {
                  setBonoFiltro(bono.id);
                  setActiveCategoria("Todas");
                  setSearchQuery("");
                  navigate("recetas");
                }}
              >
                Ver recetas
              </button>
            )}
            {bono.tipo === "pdf" && (
              // TODO: Reemplazar href con URL real del PDF del planificador semanal
              <a
                href={bono.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...styles.btn,
                  ...styles.btnSecondary,
                  width: "auto",
                  padding: "8px 16px",
                  fontSize: "13px",
                  display: "inline-flex",
                  marginBottom: 0,
                  textDecoration: "none",
                }}
              >
                Descargar PDF
              </a>
            )}
          </div>
        </div>
      ))}

      <div style={styles.watermark}>
        Cocina Resuelta® — Contenido original, prohibida su reventa
        <br />
        @cocinaresuelta_
      </div>
    </div>
  );

  // Botones reutilizables
  const BtnPrimary = ({ id, onClick, label, disabled }) => {
    const [hov, setHov] = useState(false);
    return (
      <button
        style={{
          ...styles.btn,
          opacity: disabled ? 0.5 : 1,
          transform: hov && !disabled ? "scale(1.01)" : "scale(1)",
          boxShadow: hov && !disabled
            ? "0 6px 20px rgba(253,111,47,0.4)"
            : "0 4px 12px rgba(253,111,47,0.3)",
        }}
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {label}
      </button>
    );
  };

  const BtnSecondary = ({ id, onClick, label }) => {
    const [hov, setHov] = useState(false);
    return (
      <button
        style={{
          ...styles.btn,
          ...styles.btnSecondary,
          background: hov ? C.creamDark : C.white,
        }}
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {label}
      </button>
    );
  };

  const TABS = [
    { id: "inicio", icon: "🏠", label: "Inicio" },
    { id: "ingredientes", icon: "🥕", label: "Ingredientes" },
    { id: "recetas", icon: "📖", label: "Recetas" },
    { id: "favoritas", icon: "♡", label: "Favoritas" },
    { id: "bonos", icon: "🎁", label: "Bonos" },
  ];

  const renderView = () => {
    switch (activeView) {
      case "inicio": return <ViewInicio />;
      case "ingredientes": return <ViewIngredientes />;
      case "resultados-ingredientes": return <ViewResultadosIngredientes />;
      case "recetas": return <ViewRecetas />;
      case "detalle": return <ViewDetalle />;
      case "favoritas": return <ViewFavoritas />;
      case "bonos": return <ViewBonos />;
      default: return <ViewInicio />;
    }
  };

  const getActiveTab = () => {
    if (activeView === "resultados-ingredientes") return "ingredientes";
    if (activeView === "detalle") return null;
    return activeView;
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F5EDD8; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { display: none; }
        input::placeholder { color: #B0A898; }
      `}</style>

      <div style={styles.app}>
        {/* Topbar */}
        <div style={styles.topbar}>
          <div style={styles.logo}>
            Cocina <span style={styles.logoSpan}>Resuelta</span>
          </div>
          <a
            href="https://instagram.com/cocinaresuelta_"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.igBadge}
          >
            <svg style={styles.instagramIcon} viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 2.2c3.2 0 3.6 0 4.9.07 3.3.15 4.8 1.7 5 5 .06 1.3.07 1.6.07 4.8s0 3.6-.07 4.9c-.15 3.3-1.7 4.8-5 5-1.3.06-1.6.07-4.9.07s-3.6 0-4.9-.07c-3.3-.15-4.8-1.7-5-5C2.03 15.6 2 15.3 2 12s0-3.6.07-4.9c.15-3.3 1.7-4.8 5-5C8.4 2.2 8.7 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.07-2.4.1-3.5 1.2-3.6 3.6C3.6 8.5 3.6 8.9 3.6 12s0 3.5.07 4.7c.1 2.4 1.2 3.5 3.6 3.6 1.2.06 1.6.07 4.7.07s3.5 0 4.7-.07c2.4-.1 3.5-1.2 3.6-3.6.06-1.2.07-1.6.07-4.7s0-3.5-.07-4.7c-.1-2.4-1.2-3.5-3.6-3.6C15.5 4 15.1 4 12 4zm0 3.4a4.6 4.6 0 110 9.2 4.6 4.6 0 010-9.2zm0 1.8a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6zm4.8-2.9a1.08 1.08 0 110 2.16 1.08 1.08 0 010-2.16z"
              />
            </svg>
            @cocinaresuelta_
          </a>
        </div>

        {/* Vista activa */}
        <div key={activeView}>
          {renderView()}
        </div>

        {/* Tabbar */}
        <div style={styles.tabbar}>
          {TABS.map((tab) => {
            const isActive = getActiveTab() === tab.id;
            return (
              <button
                key={tab.id}
                style={{
                  ...styles.tabBtn,
                  ...(isActive ? styles.tabBtnActive : {}),
                }}
                onClick={() => {
                  if (tab.id === "recetas") {
                    setBonoFiltro(null);
                    setSearchQuery("");
                    setActiveCategoria("Todas");
                  }
                  navigate(tab.id);
                }}
                aria-label={tab.label}
              >
                <span style={styles.tabIcon}>{tab.id === "favoritas" && favoritas.length > 0 ? "❤️" : tab.icon}</span>
                <span style={{ fontSize: "10px" }}>{tab.label}</span>
                {tab.id === "favoritas" && favoritas.length > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "6px",
                      right: "calc(50% - 14px)",
                      background: C.orange,
                      color: C.white,
                      borderRadius: "10px",
                      fontSize: "9px",
                      fontWeight: "700",
                      padding: "1px 5px",
                      minWidth: "16px",
                      textAlign: "center",
                    }}
                  >
                    {favoritas.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}