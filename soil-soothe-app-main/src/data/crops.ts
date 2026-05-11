import rice from "@/assets/crops/rice.jpg";
import wheat from "@/assets/crops/wheat.jpg";
import maize from "@/assets/crops/maize.jpg";
import cotton from "@/assets/crops/cotton.jpg";
import sugarcane from "@/assets/crops/sugarcane.jpg";
import pulses from "@/assets/crops/pulses.jpg";
import millets from "@/assets/crops/millets.jpg";
import groundnut from "@/assets/crops/groundnut.jpg";
import soybean from "@/assets/crops/soybean.jpg";
import mustard from "@/assets/crops/mustard.jpg";
import jowar from "@/assets/crops/jowar.jpg";
import bajra from "@/assets/crops/bajra.jpg";

export type WaterNeed = "low" | "medium" | "high" | "very_high";
export type Season = "Kharif" | "Rabi" | "Zaid" | "Year-round";

export type Pesticide = {
  name: string;
  target: string;
  priceInr: string; // approx price range in India
};

export type Crop = {
  id: string;
  nameKey: string; // i18n key
  image: string;
  waterNeed: WaterNeed;
  waterMm: string; // approx mm/season
  season: Season;
  tempC: string;
  soil: string;
  plantingMonths: string;
  steps: string[];
  precautions: string[];
  weatherTips: string[];
  seeds: string[];
  pesticides: Pesticide[];
};

export const CROPS: Crop[] = [
  {
    id: "rice",
    nameKey: "crop_rice",
    image: rice,
    waterNeed: "very_high",
    waterMm: "1200–2500 mm",
    season: "Kharif",
    tempC: "21–37 °C",
    soil: "Clayey, alluvial, water-retaining",
    plantingMonths: "June – July (with monsoon)",
    steps: [
      "Prepare nursery beds and soak seeds for 24 hrs.",
      "Puddle the field and maintain 5 cm standing water.",
      "Transplant 25–30 day-old seedlings in rows.",
      "Maintain water level 2–5 cm during growth.",
      "Apply nitrogen fertilizer in 3 splits.",
      "Drain field 10 days before harvest.",
    ],
    precautions: [
      "Avoid water-logging beyond 10 cm.",
      "Watch for blast and brown plant hopper.",
      "Use resistant varieties in flood-prone areas.",
    ],
    weatherTips: [
      "Heavy rain: ensure drainage to avoid lodging.",
      "Hot dry spells: keep continuous shallow water.",
    ],
    seeds: ["IR-64", "Pusa Basmati 1121", "MTU-1010", "Swarna"],
    pesticides: [
      { name: "Carbofuran 3G", target: "Stem borer", priceInr: "₹220–₹350 / kg" },
      { name: "Tricyclazole 75% WP", target: "Blast disease", priceInr: "₹450–₹700 / 100 g" },
    ],
  },
  {
    id: "wheat",
    nameKey: "crop_wheat",
    image: wheat,
    waterNeed: "medium",
    waterMm: "450–650 mm",
    season: "Rabi",
    tempC: "10–25 °C",
    soil: "Loamy, well-drained",
    plantingMonths: "October – November",
    steps: [
      "Plough field 2–3 times, level well.",
      "Treat seeds with fungicide before sowing.",
      "Sow in rows 22 cm apart, 5 cm deep.",
      "First irrigation 20–25 days after sowing (CRI stage).",
      "4–6 irrigations total; critical at tillering & flowering.",
      "Harvest when grains harden and turn golden.",
    ],
    precautions: [
      "Avoid late sowing — yield drops sharply after mid-Nov.",
      "Watch for rust diseases in humid weather.",
    ],
    weatherTips: [
      "Cold nights help grain filling — good.",
      "Warm wave during flowering: light irrigation to cool.",
    ],
    seeds: ["HD-2967", "PBW-343", "DBW-187", "HD-3086"],
    pesticides: [
      { name: "Propiconazole 25% EC", target: "Rust", priceInr: "₹350–₹550 / 250 ml" },
      { name: "2,4-D Sodium Salt", target: "Broadleaf weeds", priceInr: "₹180–₹280 / 500 g" },
    ],
  },
  {
    id: "maize",
    nameKey: "crop_maize",
    image: maize,
    waterNeed: "medium",
    waterMm: "500–800 mm",
    season: "Kharif",
    tempC: "21–30 °C",
    soil: "Well-drained loamy soil",
    plantingMonths: "June – July (Kharif), Oct – Nov (Rabi)",
    steps: [
      "Prepare fine seedbed with FYM.",
      "Sow seeds 60×20 cm apart, 4 cm deep.",
      "First irrigation if no rain in 4–5 days.",
      "Top dress with urea at knee-high & tasseling.",
      "Earth up at 30 days to support stems.",
      "Harvest cobs when husks turn brown.",
    ],
    precautions: [
      "Beware fall armyworm — scout weekly.",
      "Avoid water stress at tasseling/silking.",
    ],
    weatherTips: [
      "Strong winds can lodge plants — earth-up helps.",
      "Skip irrigation if heavy rain forecasted.",
    ],
    seeds: ["DHM-117", "Pioneer 30V92", "NK-6240"],
    pesticides: [
      { name: "Emamectin Benzoate 5% SG", target: "Fall armyworm", priceInr: "₹400–₹650 / 100 g" },
      { name: "Atrazine 50% WP", target: "Weeds", priceInr: "₹250–₹400 / 500 g" },
    ],
  },
  {
    id: "cotton",
    nameKey: "crop_cotton",
    image: cotton,
    waterNeed: "medium",
    waterMm: "600–1200 mm",
    season: "Kharif",
    tempC: "21–35 °C",
    soil: "Black cotton (regur), well-drained",
    plantingMonths: "May – June",
    steps: [
      "Deep plough during summer to expose soil.",
      "Sow Bt cotton seeds 90×60 cm spacing.",
      "First irrigation 30 days after sowing.",
      "Apply NPK in splits as per soil test.",
      "Spray growth regulators to manage canopy.",
      "Pick bolls when fully open, in dry weather.",
    ],
    precautions: [
      "Maintain refuge area for Bt cotton.",
      "Monitor pink bollworm with pheromone traps.",
    ],
    weatherTips: [
      "Avoid irrigation just before rain.",
      "Continuous wet spell increases boll rot risk.",
    ],
    seeds: ["Bollgard II varieties", "Suraj", "Bunny BG-II"],
    pesticides: [
      { name: "Imidacloprid 17.8% SL", target: "Sucking pests", priceInr: "₹350–₹500 / 250 ml" },
      { name: "Spinosad 45% SC", target: "Bollworm", priceInr: "₹900–₹1400 / 75 ml" },
    ],
  },
  {
    id: "sugarcane",
    nameKey: "crop_sugarcane",
    image: sugarcane,
    waterNeed: "very_high",
    waterMm: "1500–2500 mm",
    season: "Year-round",
    tempC: "20–35 °C",
    soil: "Deep loamy, rich in organic matter",
    plantingMonths: "Feb – March (Suru), Oct – Nov (pre-seasonal)",
    steps: [
      "Prepare deep furrows 90 cm apart.",
      "Treat setts with fungicide; plant 2–3 budded setts.",
      "Irrigate immediately after planting.",
      "Earth-up at 90 and 150 days for support.",
      "Apply nitrogen in 3–4 splits.",
      "Harvest at 12–14 months when sugar peaks.",
    ],
    precautions: [
      "Don't let field dry out — drip irrigation ideal.",
      "Watch for early shoot borer in summer.",
    ],
    weatherTips: [
      "Use mulch to reduce evaporation in hot months.",
      "Heavy rain: ensure drainage to prevent root rot.",
    ],
    seeds: ["Co-86032", "CoM-0265", "Co-0238"],
    pesticides: [
      { name: "Chlorantraniliprole 18.5% SC", target: "Top borer", priceInr: "₹900–₹1300 / 60 ml" },
      { name: "Trichoderma viride", target: "Root rot (bio)", priceInr: "₹150–₹250 / kg" },
    ],
  },
  {
    id: "pulses",
    nameKey: "crop_pulses",
    image: pulses,
    waterNeed: "low",
    waterMm: "300–500 mm",
    season: "Rabi",
    tempC: "15–30 °C",
    soil: "Sandy loam to clay loam, well-drained",
    plantingMonths: "October – November",
    steps: [
      "Treat seed with rhizobium culture.",
      "Sow at 30×10 cm spacing, 4–5 cm deep.",
      "Light irrigation if soil very dry at flowering.",
      "Avoid excess nitrogen — pulses fix their own.",
      "Spray for pod borer at flowering.",
      "Harvest when 80% pods mature.",
    ],
    precautions: [
      "Avoid water-logging completely.",
      "Pod borer is the biggest threat.",
    ],
    weatherTips: [
      "Dry weather at maturity = better yield.",
      "Skip irrigation if rain expected.",
    ],
    seeds: ["JG-11 (chickpea)", "Pusa Vishal (moong)", "T-9 (urad)"],
    pesticides: [
      { name: "Indoxacarb 14.5% SC", target: "Pod borer", priceInr: "₹500–₹800 / 100 ml" },
      { name: "Neem oil 1500 ppm", target: "General pests (organic)", priceInr: "₹200–₹350 / L" },
    ],
  },
  {
    id: "millets",
    nameKey: "crop_millets",
    image: millets,
    waterNeed: "low",
    waterMm: "300–450 mm",
    season: "Kharif",
    tempC: "20–35 °C",
    soil: "Light, sandy, low fertility tolerated",
    plantingMonths: "June – July",
    steps: [
      "Broadcast or line-sow seeds 25 cm apart.",
      "Thin seedlings at 2 weeks.",
      "Hand-weed at 20 and 40 days.",
      "Minimal irrigation — only at long dry spells.",
      "Harvest grain heads when fully ripe.",
    ],
    precautions: [
      "Birds love ripening grain — use scaring/nets.",
      "Avoid heavy nitrogen — promotes lodging.",
    ],
    weatherTips: [
      "Rain-fed crop — needs almost no irrigation.",
      "Drought-tolerant; skip watering if rain coming.",
    ],
    seeds: ["GPU-28 (ragi)", "DHFM-78-3", "Local landraces"],
    pesticides: [
      { name: "Neem cake", target: "Soil pests (organic)", priceInr: "₹40–₹70 / kg" },
      { name: "Quinalphos 25% EC", target: "Shoot fly", priceInr: "₹300–₹450 / 500 ml" },
    ],
  },
  {
    id: "groundnut",
    nameKey: "crop_groundnut",
    image: groundnut,
    waterNeed: "medium",
    waterMm: "500–700 mm",
    season: "Kharif",
    tempC: "20–30 °C",
    soil: "Sandy loam, well-drained",
    plantingMonths: "June – July",
    steps: [
      "Treat seeds with rhizobium and fungicide.",
      "Sow at 30×10 cm, 5 cm deep.",
      "Apply gypsum at flowering for pod filling.",
      "Earth-up to help peg penetration.",
      "Critical irrigation at flowering & pegging.",
      "Harvest when leaves turn yellow, pods mature.",
    ],
    precautions: [
      "Avoid heavy clay soils — pegs cannot penetrate.",
      "Watch for leaf miner and aflatoxin in storage.",
    ],
    weatherTips: [
      "Dry harvest period prevents aflatoxin.",
      "Stop irrigation 2 weeks before harvest.",
    ],
    seeds: ["TAG-24", "TG-37A", "JL-24"],
    pesticides: [
      { name: "Chlorpyriphos 20% EC", target: "White grub", priceInr: "₹300–₹500 / L" },
      { name: "Mancozeb 75% WP", target: "Tikka leaf spot", priceInr: "₹250–₹400 / 500 g" },
    ],
  },
  {
    id: "soybean",
    nameKey: "crop_soybean",
    image: soybean,
    waterNeed: "medium",
    waterMm: "450–700 mm",
    season: "Kharif",
    tempC: "20–30 °C",
    soil: "Well-drained loamy, slightly acidic OK",
    plantingMonths: "June – July",
    steps: [
      "Treat seed with rhizobium + fungicide.",
      "Sow at 45×5 cm, 3–4 cm deep.",
      "Hand-weed or apply pre-emergent herbicide.",
      "Light irrigation at pod-filling if dry.",
      "Spray for girdle beetle if seen.",
      "Harvest when 95% pods turn brown.",
    ],
    precautions: [
      "Avoid water-logging — roots rot quickly.",
      "Yellow mosaic virus — uproot infected plants.",
    ],
    weatherTips: [
      "Continuous rain can damage flowering — plant on raised beds.",
      "Drought at pod-fill drastically cuts yield.",
    ],
    seeds: ["JS-335", "JS-9560", "MAUS-71"],
    pesticides: [
      { name: "Thiamethoxam 25% WG", target: "Whitefly", priceInr: "₹600–₹900 / 100 g" },
      { name: "Quizalofop ethyl 5% EC", target: "Grassy weeds", priceInr: "₹450–₹700 / L" },
    ],
  },
  {
    id: "mustard",
    nameKey: "crop_mustard",
    image: mustard,
    waterNeed: "low",
    waterMm: "240–400 mm",
    season: "Rabi",
    tempC: "10–25 °C",
    soil: "Loamy, well-drained",
    plantingMonths: "October",
    steps: [
      "Fine seedbed with FYM mixed in.",
      "Sow at 30×10 cm, very shallow.",
      "Thin to one plant per hill at 15 days.",
      "First irrigation at 30 days, second at flowering.",
      "Monitor aphids — they can wipe out crop.",
      "Harvest when pods turn yellow-brown.",
    ],
    precautions: [
      "Aphid attack at flowering is critical — spray on time.",
      "Avoid late sowing — yield drops sharply.",
    ],
    weatherTips: [
      "Cool, dry weather is ideal.",
      "Frost at flowering: light irrigation protects.",
    ],
    seeds: ["Pusa Bold", "RH-30", "Varuna"],
    pesticides: [
      { name: "Imidacloprid 17.8% SL", target: "Mustard aphid", priceInr: "₹350–₹500 / 250 ml" },
      { name: "Sulphur 80% WDG", target: "Powdery mildew", priceInr: "₹180–₹280 / kg" },
    ],
  },
  {
    id: "jowar",
    nameKey: "crop_jowar",
    image: jowar,
    waterNeed: "low",
    waterMm: "400–600 mm",
    season: "Kharif",
    tempC: "25–32 °C",
    soil: "Black soil, well-drained",
    plantingMonths: "June – July (Kharif), Oct (Rabi)",
    steps: [
      "Plough and harrow to fine tilth.",
      "Sow at 45×15 cm, 3–5 cm deep.",
      "Thin to one plant per hill at 15 days.",
      "Hand-hoe twice in early growth.",
      "Critical moisture at flowering & grain filling.",
      "Harvest when grain is hard and dry.",
    ],
    precautions: [
      "Shoot fly attack in early stage — sow at right time.",
      "Birds at grain stage — protect with netting.",
    ],
    weatherTips: [
      "Drought tolerant — skip irrigation if rain coming.",
      "Excess rain at maturity: harvest early.",
    ],
    seeds: ["CSH-16", "Maldandi", "M-35-1"],
    pesticides: [
      { name: "Carbaryl 50% WP", target: "Shoot fly", priceInr: "₹220–₹350 / kg" },
      { name: "Cypermethrin 10% EC", target: "Earhead caterpillar", priceInr: "₹200–₹350 / L" },
    ],
  },
  {
    id: "bajra",
    nameKey: "crop_bajra",
    image: bajra,
    waterNeed: "low",
    waterMm: "250–400 mm",
    season: "Kharif",
    tempC: "25–35 °C",
    soil: "Sandy, well-drained, low fertility OK",
    plantingMonths: "June – July",
    steps: [
      "Light tillage; bajra likes loose soil.",
      "Sow at 45×15 cm, 3 cm deep.",
      "Thin within 2 weeks.",
      "One or two hoeings; rarely needs irrigation.",
      "Apply minimal NPK as per soil test.",
      "Harvest earheads when fully mature.",
    ],
    precautions: [
      "Downy mildew — use resistant hybrids.",
      "Birds love bajra — guard the crop.",
    ],
    weatherTips: [
      "Excellent for dryland farming.",
      "If unexpected wet spell: ensure drainage.",
    ],
    seeds: ["HHB-67 Improved", "Pusa-23", "ICTP-8203"],
    pesticides: [
      { name: "Metalaxyl 35% WS (seed)", target: "Downy mildew", priceInr: "₹400–₹650 / 250 g" },
      { name: "Malathion 50% EC", target: "Stem borer", priceInr: "₹250–₹400 / L" },
    ],
  },
];

export const getCropById = (id: string) => CROPS.find((c) => c.id === id);
