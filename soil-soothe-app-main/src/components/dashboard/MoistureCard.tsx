import { Droplets, Smile, Meh, Frown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/i18n/I18nProvider";
import { MoistureStatus } from "@/hooks/useSensorData";
import { cn } from "@/lib/utils";

const STATUS_META: Record<
  MoistureStatus,
  { color: string; ring: string; bg: string; icon: typeof Smile; labelKey: string }
> = {
  happy: {
    color: "text-success",
    ring: "ring-success/40",
    bg: "from-success/10 to-success/5",
    icon: Smile,
    labelKey: "soil_happy",
  },
  okay: {
    color: "text-warning",
    ring: "ring-warning/40",
    bg: "from-warning/10 to-warning/5",
    icon: Meh,
    labelKey: "soil_okay",
  },
  dry: {
    color: "text-danger",
    ring: "ring-danger/40",
    bg: "from-danger/10 to-danger/5",
    icon: Frown,
    labelKey: "soil_dry",
  },
};

export function MoistureCard({
  moisture,
  status,
  lastSeen,
  isLive,
}: {
  moisture: number;
  status: MoistureStatus;
  lastSeen: number;
  isLive: boolean;
}) {
  const { t } = useI18n();
  const meta = STATUS_META[status];
  const Icon = meta.icon;
  const value = Math.round(moisture);
  // gauge: stroke-dashoffset on circle. circumference 2*pi*r, r=70 -> 439.8
  const C = 2 * Math.PI * 70;
  const offset = C - (value / 100) * C;
  const updated = new Date(lastSeen).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <Card className={cn("overflow-hidden border-0 shadow-card hover-lift bg-gradient-to-br", meta.bg)}>
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Droplets className="h-4 w-4 text-secondary" />
              {t("soil_moisture")}
            </div>
            <h3 className="mt-1 text-lg font-semibold text-foreground">{t("current_moisture")}</h3>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                isLive ? "bg-success animate-pulse" : "bg-warning"
              )}
            />
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {isLive ? "LIVE" : "DEMO"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center py-4">
          <div className="relative">
            {/* glow ring */}
            <div
              className={cn(
                "absolute inset-0 rounded-full ring-8 transition-all duration-700",
                meta.ring
              )}
              style={{ filter: "blur(8px)" }}
            />
            <svg width="180" height="180" viewBox="0 0 180 180" className="relative -rotate-90">
              <circle
                cx="90"
                cy="90"
                r="70"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="14"
              />
              <circle
                cx="90"
                cy="90"
                r="70"
                fill="none"
                stroke="url(#moistureGrad)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={offset}
                style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)" }}
              />
              <defs>
                <linearGradient id="moistureGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--secondary))" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Icon className={cn("mb-1 h-10 w-10", meta.color, "animate-float")} />
              <div className="text-4xl font-bold tabular-nums text-foreground">
                {value}
                <span className="text-xl text-muted-foreground">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 text-center">
          <p className={cn("text-base font-semibold", meta.color)}>{t(meta.labelKey)}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("last_updated")}: {updated}
          </p>
        </div>
      </div>
    </Card>
  );
}
