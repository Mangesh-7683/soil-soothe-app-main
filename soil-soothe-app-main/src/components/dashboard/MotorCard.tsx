import { Power, Zap, Droplet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { MotorState } from "@/hooks/useSensorData";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function MotorCard({
  motor,
  onToggle,
  isLive,
  suggestOn,
}: {
  motor: MotorState;
  onToggle: (s: MotorState) => Promise<void>;
  isLive: boolean;
  suggestOn: boolean;
}) {
  const { t } = useI18n();
  const isOn = motor === "ON";

  const handleClick = async () => {
    const next: MotorState = isOn ? "OFF" : "ON";
    await onToggle(next);
    toast.success(next === "ON" ? t("motor_on_toast") : t("motor_off_toast"));
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-0 shadow-card hover-lift transition-smooth",
        isOn ? "bg-gradient-to-br from-secondary/15 to-secondary/5" : "bg-gradient-to-br from-muted to-background"
      )}
    >
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Zap className="h-4 w-4 text-accent" />
              {t("motor_control")}
            </div>
            <h3 className="mt-1 text-lg font-semibold text-foreground">
              {isOn ? t("motor_on") : t("motor_off")}
            </h3>
          </div>
          <div
            className={cn(
              "rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide",
              isOn ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
            )}
          >
            {isOn ? "ON" : "OFF"}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-6">
          <div className="relative">
            {isOn && (
              <>
                <div className="absolute inset-0 rounded-full bg-secondary/30 animate-pulse-ring" />
                <div
                  className="absolute inset-0 rounded-full bg-secondary/20 animate-pulse-ring"
                  style={{ animationDelay: "0.6s" }}
                />
              </>
            )}
            <button
              onClick={handleClick}
              className={cn(
                "relative flex h-32 w-32 items-center justify-center rounded-full transition-smooth focus:outline-none focus:ring-4 focus:ring-secondary/40",
                isOn
                  ? "gradient-water shadow-water text-secondary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              )}
              aria-label={isOn ? t("turn_off") : t("turn_on")}
            >
              {isOn ? (
                <Droplet className="h-14 w-14 animate-water-drop" />
              ) : (
                <Power className="h-14 w-14" />
              )}
            </button>
          </div>
          <Button
            onClick={handleClick}
            size="lg"
            variant={isOn ? "destructive" : "default"}
            className="mt-6 min-w-[140px] rounded-full text-base shadow-soft"
          >
            {isOn ? t("turn_off") : t("turn_on")}
          </Button>
        </div>

        {suggestOn && !isOn && (
          <div className="mt-2 rounded-xl border border-warning/30 bg-warning/10 p-3 text-xs text-foreground animate-fade-in">
            💡 {t("soil_dry_alert")}
          </div>
        )}

        {!isLive && (
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Demo mode — connect Firebase to control real motor
          </p>
        )}
      </div>
    </Card>
  );
}
