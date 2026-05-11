import { Bell, AlertTriangle, CloudRain, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/i18n/I18nProvider";
import { MoistureStatus } from "@/hooks/useSensorData";

type Alert = {
  type: "danger" | "info" | "success";
  icon: typeof AlertTriangle;
  text: string;
};

export function AlertsPanel({
  status,
  rainSoon,
}: {
  status: MoistureStatus;
  rainSoon: boolean;
}) {
  const { t } = useI18n();

  const alerts: Alert[] = [];
  if (status === "dry") {
    alerts.push({ type: "danger", icon: AlertTriangle, text: t("soil_dry_alert") });
  }
  if (rainSoon) {
    alerts.push({ type: "info", icon: CloudRain, text: t("rain_soon_alert") });
  }
  if (alerts.length === 0) {
    alerts.push({ type: "success", icon: CheckCircle2, text: t("soil_happy") });
  }

  const styles = {
    danger: "border-danger/30 bg-danger/10 text-danger",
    info: "border-secondary/30 bg-secondary/10 text-secondary",
    success: "border-success/30 bg-success/10 text-success",
  };

  return (
    <Card className="border-0 shadow-card hover-lift gradient-card">
      <div className="p-6">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Bell className="h-4 w-4 text-accent" />
          {t("smart_alerts")}
        </div>
        <div className="space-y-2.5">
          {alerts.map((a, i) => {
            const Icon = a.icon;
            return (
              <div
                key={i}
                className={`flex items-start gap-3 rounded-xl border p-3 animate-fade-in ${styles[a.type]}`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0" />
                <p className="text-sm font-medium text-foreground">{a.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
