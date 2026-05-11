import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useI18n } from "@/i18n/I18nProvider";
import { CROPS, WaterNeed } from "@/data/crops";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSensorData } from "@/hooks/useSensorData";
import { useWeather } from "@/hooks/useWeather";
import { Droplets, ArrowRight, Sparkles, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

const WATER_BADGE: Record<WaterNeed, { color: string; key: string; icon: number }> = {
  low: { color: "bg-success/15 text-success border-success/30", key: "low", icon: 1 },
  medium: { color: "bg-secondary/15 text-secondary border-secondary/30", key: "medium", icon: 2 },
  high: { color: "bg-warning/15 text-warning border-warning/30", key: "high", icon: 3 },
  very_high: { color: "bg-danger/15 text-danger border-danger/30", key: "very_high", icon: 4 },
};

function recommendCrops(moisture: number, rainSoon: boolean) {
  // Suggest crops whose water need fits current moisture trajectory
  const wet = moisture >= 55 || rainSoon;
  const dry = moisture < 35 && !rainSoon;
  const order: WaterNeed[] = wet
    ? ["very_high", "high", "medium", "low"]
    : dry
      ? ["low", "medium", "high", "very_high"]
      : ["medium", "low", "high", "very_high"];

  const sorted = [...CROPS].sort(
    (a, b) => order.indexOf(a.waterNeed) - order.indexOf(b.waterNeed)
  );
  return sorted.slice(0, 3);
}

const Crops = () => {
  const { t } = useI18n();
  const [filter, setFilter] = useState<"all" | WaterNeed>("all");
  const { moisture } = useSensorData();
  const { weather } = useWeather();
  const rainSoon = !!weather?.rainSoon;

  const recommended = useMemo(
    () => recommendCrops(moisture, rainSoon),
    [moisture, rainSoon]
  );

  const filtered = useMemo(
    () => (filter === "all" ? CROPS : CROPS.filter((c) => c.waterNeed === filter)),
    [filter]
  );

  return (
    <Layout>
      <section className="border-b border-border/40 gradient-sky">
        <div className="container py-10 md:py-12">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sprout className="h-3 w-3" /> {t("crop_library")}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            {t("crop_library")}
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {t("crop_recommend_sub")}
          </p>
        </div>
      </section>

      <div className="container space-y-8 py-8">
        {/* Recommendations */}
        <Card className="overflow-hidden border-0 shadow-card gradient-card">
          <div className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-bold text-foreground">
                {t("crop_recommend_title")}
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {recommended.map((c) => {
                const badge = WATER_BADGE[c.waterNeed];
                return (
                  <Link
                    key={c.id}
                    to={`/crops/${c.id}`}
                    className="group flex items-center gap-3 rounded-xl border border-border bg-background p-3 transition-smooth hover:border-primary hover:shadow-soft"
                  >
                    <img
                      src={c.image}
                      alt={t(c.nameKey)}
                      className="h-14 w-14 rounded-lg object-cover"
                      loading="lazy"
                      width={56}
                      height={56}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold text-foreground">{t(c.nameKey)}</div>
                      <div className={cn("mt-0.5 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium", badge.color)}>
                        💧 {t(badge.key)}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-smooth group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            {t("filter_by_water")}:
          </span>
          {(["all", "low", "medium", "high", "very_high"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition-smooth",
                filter === key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              {t(key)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => {
            const badge = WATER_BADGE[c.waterNeed];
            return (
              <Link
                key={c.id}
                to={`/crops/${c.id}`}
                className="group block animate-fade-in"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <Card className="overflow-hidden border-0 shadow-card hover-lift">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={c.image}
                      alt={t(c.nameKey)}
                      className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                      loading="lazy"
                      width={800}
                      height={600}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute left-3 top-3">
                      <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold backdrop-blur", badge.color, "bg-background/80")}>
                        <Droplets className="h-3 w-3" />
                        {t(badge.key)}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                      <div>
                        <div className="text-xl font-extrabold drop-shadow">{t(c.nameKey)}</div>
                        <div className="text-xs font-medium opacity-90">{c.season}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div className="text-xs text-muted-foreground">
                      💧 {c.waterMm} · 🌡 {c.tempC}
                    </div>
                    <Button size="sm" variant="ghost" className="rounded-full text-primary">
                      {t("view_details")} <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Crops;
