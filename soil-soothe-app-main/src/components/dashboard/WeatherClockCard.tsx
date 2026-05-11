import { Cloud, CloudRain, Droplets, Sun, MapPin, Clock, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/i18n/I18nProvider";
import { useWeather } from "@/hooks/useWeather";
import { useIstClock } from "@/hooks/useIstClock";
import { Skeleton } from "@/components/ui/skeleton";

function pickIcon(code: number) {
  if (code === 0 || code === 1) return Sun;
  if ([2, 3, 45, 48].includes(code)) return Cloud;
  return CloudRain;
}

export function WeatherClockCard() {
  const { t } = useI18n();
  const { weather, loading } = useWeather();
  const { time, date } = useIstClock();
  const Icon = weather ? pickIcon(weather.code) : Sun;

  return (
    <Card className="overflow-hidden border-0 shadow-card hover-lift gradient-sky">
      <div className="p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm font-medium text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{t("location")}</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              IST
            </div>
            <div className="mt-1 text-3xl font-bold tabular-nums text-foreground">{time}</div>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {date}
            </div>
          </div>

          <div className="flex flex-col items-end justify-center">
            {loading || !weather ? (
              <>
                <Skeleton className="mb-1 h-8 w-20" />
                <Skeleton className="h-4 w-24" />
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Icon className="h-9 w-9 text-secondary animate-float" />
                  <span className="text-3xl font-bold text-foreground">{weather.tempC}°</span>
                </div>
                <span className="text-xs text-muted-foreground">{weather.description}</span>
              </>
            )}
          </div>
        </div>

        {weather && (
          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border/40 pt-4">
            <div className="text-center">
              <Droplets className="mx-auto mb-1 h-4 w-4 text-secondary" />
              <div className="text-sm font-bold text-foreground">{weather.humidity}%</div>
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                {t("humidity")}
              </div>
            </div>
            <div className="text-center">
              <CloudRain className="mx-auto mb-1 h-4 w-4 text-secondary" />
              <div className="text-sm font-bold text-foreground">{weather.rainChance}%</div>
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                {t("rain_chance")}
              </div>
            </div>
            <div className="text-center">
              <Sun className="mx-auto mb-1 h-4 w-4 text-accent" />
              <div className="text-sm font-bold text-foreground">{weather.tempC}°C</div>
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                {t("temperature")}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
