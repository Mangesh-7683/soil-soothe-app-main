import { Layout } from "@/components/Layout";
import { MoistureCard } from "@/components/dashboard/MoistureCard";
import { MotorCard } from "@/components/dashboard/MotorCard";
import { WeatherClockCard } from "@/components/dashboard/WeatherClockCard";
import { MoistureChart } from "@/components/dashboard/MoistureChart";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { useSensorData } from "@/hooks/useSensorData";
import { useWeather } from "@/hooks/useWeather";
import { useI18n } from "@/i18n/I18nProvider";
import heroFarm from "@/assets/hero-farm.jpg";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { t } = useI18n();
  const { moisture, motor, lastSeen, history, setMotor, status, isLive } = useSensorData();
  const { weather } = useWeather();
  const rainSoon = !!weather?.rainSoon;

  return (
    <Layout>
      {/* Hero strip */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroFarm})` }}
          aria-hidden
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/85 to-background" aria-hidden />
        <div className="container py-10 md:py-16">
          <div className="max-w-2xl animate-fade-in">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3 w-3" />
              {t("live_dashboard")}
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
              <span className="text-gradient-hero">{t("app_name")}</span>
            </h1>
            <p className="mt-3 max-w-xl text-base text-muted-foreground md:text-lg">
              {t("app_tagline")}
            </p>
          </div>
        </div>
      </section>

      <div className="container space-y-6 py-8">
        {/* Top row: weather + moisture + motor */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="animate-fade-in" style={{ animationDelay: "60ms" }}>
            <WeatherClockCard />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "120ms" }}>
            <MoistureCard
              moisture={moisture}
              status={status}
              lastSeen={lastSeen}
              isLive={isLive}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "180ms" }}>
            <MotorCard
              motor={motor}
              onToggle={setMotor}
              isLive={isLive}
              suggestOn={status === "dry"}
            />
          </div>
        </div>

        {/* Chart + alerts */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "240ms" }}>
            <MoistureChart history={history} />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
            <AlertsPanel status={status} rainSoon={rainSoon} />
          </div>
        </div>

        {/* CTA to crops */}
        <div className="rounded-2xl border-0 gradient-leaf p-6 text-primary-foreground shadow-card animate-fade-in md:p-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">
                {t("crop_recommend_title")}
              </h2>
              <p className="mt-1 text-sm text-primary-foreground/85 md:text-base">
                {t("crop_recommend_sub")}
              </p>
            </div>
            <Button asChild variant="secondary" size="lg" className="rounded-full">
              <Link to="/crops">
                {t("nav_crops")} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
