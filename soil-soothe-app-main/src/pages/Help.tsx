import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/i18n/I18nProvider";
import {
  Cable,
  Sprout,
  Power,
  LayoutDashboard,
  Wrench,
  HelpCircle,
} from "lucide-react";

const STEPS = [
  {
    icon: Cable,
    color: "from-secondary to-secondary-glow",
    title: {
      en: "Install the device",
      hi: "डिवाइस स्थापित करें",
      mr: "डिव्हाइस बसवा",
    },
    points: {
      en: [
        "Connect soil moisture sensor to Arduino A0 pin.",
        "Connect relay module signal to Arduino digital pin.",
        "Power Arduino with 5V adapter or USB.",
        "Place sensor 6–8 inches deep in the field soil.",
      ],
      hi: [
        "मिट्टी सेंसर को Arduino के A0 पिन से जोड़ें।",
        "रिले मॉड्यूल को डिजिटल पिन से जोड़ें।",
        "Arduino को 5V एडॉप्टर या USB से चलाएँ।",
        "सेंसर को मिट्टी में 6-8 इंच गहराई में लगाएँ।",
      ],
      mr: [
        "मातीचा सेंसर Arduino च्या A0 पिनला जोडा.",
        "रिले मॉड्यूल डिजिटल पिनला जोडा.",
        "Arduino ला 5V अडॅप्टर किंवा USB ने चालू करा.",
        "सेंसर मातीत 6-8 इंच खोल लावा.",
      ],
    },
  },
  {
    icon: Sprout,
    color: "from-primary to-primary-glow",
    title: {
      en: "Use the soil sensor",
      hi: "मिट्टी सेंसर का उपयोग",
      mr: "मातीचा सेंसर वापरा",
    },
    points: {
      en: [
        "Sensor reads moisture as 0% (dry) to 100% (wet).",
        "Place between two plant rows for best accuracy.",
        "Avoid stones or roots touching the sensor.",
        "Clean monthly with a soft cloth — no water on the board.",
      ],
      hi: [
        "सेंसर 0% (सूखा) से 100% (गीला) तक नमी मापता है।",
        "दो पौधों की पंक्तियों के बीच लगाएँ।",
        "पत्थर या जड़ें सेंसर से न टकराएँ।",
        "महीने में एक बार मुलायम कपड़े से साफ करें।",
      ],
      mr: [
        "सेंसर 0% (कोरडा) ते 100% (ओला) पर्यंत ओलावा मोजतो.",
        "दोन रोपांच्या ओळींमधे लावा.",
        "दगड किंवा मुळे सेंसरला लागू देऊ नका.",
        "महिन्यातून एकदा मऊ कापडाने स्वच्छ करा.",
      ],
    },
  },
  {
    icon: Power,
    color: "from-accent to-warning",
    title: {
      en: "Control the motor",
      hi: "मोटर नियंत्रण करें",
      mr: "मोटर नियंत्रित करा",
    },
    points: {
      en: [
        "Open the dashboard on phone or computer.",
        "Tap the big ON / OFF button on Motor card.",
        "Command goes to Firebase, Arduino reads it instantly.",
        "Watch the moisture rise on the live graph.",
      ],
      hi: [
        "फोन या कंप्यूटर पर डैशबोर्ड खोलें।",
        "Motor कार्ड पर बड़े ON / OFF बटन को दबाएँ।",
        "कमांड Firebase जाती है, Arduino तुरंत पढ़ता है।",
        "लाइव ग्राफ पर नमी बढ़ती देखें।",
      ],
      mr: [
        "फोनवर किंवा संगणकावर डॅशबोर्ड उघडा.",
        "Motor कार्डवरील मोठ्या ON / OFF बटनवर टॅप करा.",
        "आदेश Firebase ला जातो, Arduino लगेच वाचतो.",
        "लाइव्ह आलेखावर ओलावा वाढताना पहा.",
      ],
    },
  },
  {
    icon: LayoutDashboard,
    color: "from-primary to-secondary",
    title: {
      en: "Reading the dashboard",
      hi: "डैशबोर्ड पढ़ना",
      mr: "डॅशबोर्ड वाचा",
    },
    points: {
      en: [
        "😊 Happy face = soil is wet & healthy.",
        "😐 Neutral face = soil moisture is okay.",
        "☹️ Sad face = soil is dry, needs water.",
        "Green ring around motor button = motor is running.",
      ],
      hi: [
        "😊 खुश चेहरा = मिट्टी गीली और स्वस्थ।",
        "😐 सामान्य चेहरा = नमी ठीक है।",
        "☹️ उदास चेहरा = मिट्टी सूखी, पानी चाहिए।",
        "मोटर बटन के चारों ओर हरा घेरा = मोटर चालू।",
      ],
      mr: [
        "😊 आनंदी चेहरा = माती ओली व चांगली.",
        "😐 साधारण चेहरा = ओलावा ठीक.",
        "☹️ दुःखी चेहरा = माती कोरडी, पाणी हवे.",
        "मोटर बटनभोवती हिरवे वलय = मोटर चालू.",
      ],
    },
  },
  {
    icon: Wrench,
    color: "from-warning to-danger",
    title: {
      en: "Troubleshooting",
      hi: "समस्या समाधान",
      mr: "समस्या निवारण",
    },
    points: {
      en: [
        "No data? Check Arduino is powered & WiFi is connected.",
        "Motor not responding? Check relay wiring & power.",
        "Wrong moisture reading? Re-insert sensor in fresh soil.",
        "Still stuck? Restart Arduino and refresh dashboard.",
      ],
      hi: [
        "डेटा नहीं? देखें Arduino चालू और WiFi कनेक्ट है।",
        "मोटर नहीं चल रही? रिले की वायरिंग जाँचें।",
        "गलत रीडिंग? सेंसर को नई मिट्टी में लगाएँ।",
        "फिर भी समस्या? Arduino रीस्टार्ट करें।",
      ],
      mr: [
        "डेटा नाही? Arduino चालू आहे का व WiFi जोडलेले आहे का तपासा.",
        "मोटर चालत नाही? रिलेची वायरिंग तपासा.",
        "चुकीचा रीडिंग? सेंसर नवीन मातीत बसवा.",
        "तरीही अडचण? Arduino रीस्टार्ट करा.",
      ],
    },
  },
];

const Help = () => {
  const { t, lang } = useI18n();

  return (
    <Layout>
      <section className="border-b border-border/40 gradient-sky">
        <div className="container py-10 md:py-12">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <HelpCircle className="h-3 w-3" /> {t("help_title")}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            {t("help_title")}
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">{t("help_sub")}</p>
        </div>
      </section>

      <div className="container space-y-6 py-8">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <Card
              key={i}
              className="overflow-hidden border-0 shadow-card hover-lift gradient-card animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="grid md:grid-cols-[200px_1fr]">
                <div className={`relative flex items-center justify-center bg-gradient-to-br ${s.color} p-8 text-primary-foreground`}>
                  <div className="absolute left-4 top-4 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur">
                    {t("step")} {i + 1}
                  </div>
                  <Icon className="h-20 w-20 animate-float" strokeWidth={1.5} />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-extrabold text-foreground md:text-2xl">
                    {s.title[lang]}
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {s.points[lang].map((p, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-foreground md:text-base">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                          {j + 1}
                        </span>
                        <span className="leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Layout>
  );
};

export default Help;
