import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useI18n } from "@/i18n/I18nProvider";
import { getCropById } from "@/data/crops";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Thermometer,
  Layers,
  Droplets,
  Calendar,
  ListChecks,
  AlertTriangle,
  CloudRain,
  Sprout,
  Bug,
} from "lucide-react";
import { useEffect } from "react";

const CropDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useI18n();
  const crop = id ? getCropById(id) : undefined;

  useEffect(() => {
    if (crop) {
      document.title = `${t(crop.nameKey)} · ${t("app_name")}`;
    }
  }, [crop, t]);

  if (!crop) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <p className="text-lg text-muted-foreground">Crop not found.</p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/crops">{t("back_to_crops")}</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const waterPct =
    crop.waterNeed === "low" ? 25 : crop.waterNeed === "medium" ? 50 : crop.waterNeed === "high" ? 75 : 95;

  const Section = ({
    icon: Icon,
    title,
    children,
    iconClass = "text-primary",
  }: {
    icon: typeof Sprout;
    title: string;
    children: React.ReactNode;
    iconClass?: string;
  }) => (
    <Card className="border-0 shadow-card hover-lift gradient-card">
      <div className="p-6">
        <div className="mb-3 flex items-center gap-2">
          <Icon className={`h-5 w-5 ${iconClass}`} />
          <h3 className="text-base font-bold text-foreground">{title}</h3>
        </div>
        {children}
      </div>
    </Card>
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${crop.image})` }}
          aria-hidden
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/85 to-background/40" aria-hidden />
        <div className="container py-10 md:py-14">
          <Button asChild variant="ghost" size="sm" className="mb-4 -ml-3 rounded-full">
            <Link to="/crops">
              <ArrowLeft className="h-4 w-4" /> {t("back_to_crops")}
            </Link>
          </Button>
          <div className="max-w-2xl animate-fade-in">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
              {crop.season}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
              {t(crop.nameKey)}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {t("planting_season")}: {crop.plantingMonths}
            </p>
          </div>
        </div>
      </section>

      <div className="container space-y-6 py-8">
        {/* Quick facts */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Thermometer, label: t("ideal_temperature"), value: crop.tempC, color: "text-warning" },
            { icon: Layers, label: t("soil_type"), value: crop.soil, color: "text-accent-foreground" },
            { icon: Droplets, label: t("moisture_requirement"), value: crop.waterMm, color: "text-secondary" },
            { icon: Calendar, label: t("planting_season"), value: crop.plantingMonths, color: "text-primary" },
          ].map((f, i) => (
            <Card
              key={i}
              className="border-0 shadow-soft hover-lift gradient-card animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="p-4">
                <f.icon className={`mb-2 h-5 w-5 ${f.color}`} />
                <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {f.label}
                </div>
                <div className="mt-0.5 text-sm font-bold text-foreground">{f.value}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Water need bar */}
        <Card className="border-0 shadow-card gradient-card">
          <div className="p-6">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-secondary" />
                <h3 className="font-bold text-foreground">{t("water_need")}</h3>
              </div>
              <span className="text-sm font-semibold text-secondary">{t(crop.waterNeed)}</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full gradient-water transition-all duration-700"
                style={{ width: `${waterPct}%` }}
              />
            </div>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Section icon={ListChecks} title={t("planting_steps")}>
            <ol className="space-y-2">
              {crop.steps.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full gradient-leaf text-[11px] font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{s}</span>
                </li>
              ))}
            </ol>
          </Section>

          <Section icon={AlertTriangle} title={t("precautions")} iconClass="text-warning">
            <ul className="space-y-2 text-sm text-foreground">
              {crop.precautions.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-warning">⚠️</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section icon={CloudRain} title={t("weather_tips")} iconClass="text-secondary">
            <ul className="space-y-2 text-sm text-foreground">
              {crop.weatherTips.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span>🌧️</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section icon={Sprout} title={t("seed_recommendations")}>
            <div className="flex flex-wrap gap-2">
              {crop.seeds.map((s, i) => (
                <span
                  key={i}
                  className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                >
                  🌱 {s}
                </span>
              ))}
            </div>
          </Section>

          <Section icon={Bug} title={t("pesticides")} iconClass="text-danger">
            <div className="space-y-3">
              {crop.pesticides.map((p, i) => (
                <div key={i} className="rounded-xl border border-border bg-background p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-foreground">{p.name}</div>
                      <div className="text-xs text-muted-foreground">🐛 {p.target}</div>
                    </div>
                    <span className="shrink-0 rounded-full bg-success/15 px-2.5 py-1 text-xs font-bold text-success">
                      {p.priceInr}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </Layout>
  );
};

export default CropDetail;
