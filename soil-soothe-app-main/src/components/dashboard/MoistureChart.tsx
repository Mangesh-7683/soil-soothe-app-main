import { Card } from "@/components/ui/card";
import { useI18n } from "@/i18n/I18nProvider";
import { HistoryPoint } from "@/hooks/useSensorData";
import { Activity, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export function MoistureChart({ history }: { history: HistoryPoint[] }) {
  const { t } = useI18n();
  const data = history.map((p) => ({
    time: new Date(p.t).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    moisture: Math.round(p.moisture),
  }));

  const values = data.map((d) => d.moisture);
  const min = values.length ? Math.min(...values) : 0;
  const max = values.length ? Math.max(...values) : 0;
  const avg = values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0;

  return (
    <Card className="overflow-hidden border-0 shadow-card hover-lift gradient-card">
      <div className="p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Activity className="h-4 w-4 text-primary" />
              {t("moisture_history")}
            </div>
            <h3 className="mt-1 text-lg font-semibold text-foreground">Real-time graph</h3>
          </div>

          <div className="flex gap-3 text-xs">
            <div className="flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1.5">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="font-semibold text-foreground">Max {max}%</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
              <Minus className="h-3 w-3 text-muted-foreground" />
              <span className="font-semibold text-foreground">Avg {avg}%</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-danger/10 px-3 py-1.5">
              <TrendingDown className="h-3 w-3 text-danger" />
              <span className="font-semibold text-foreground">Min {min}%</span>
            </div>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="moistureArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="time"
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
                minTickGap={40}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  fontSize: "12px",
                  boxShadow: "var(--shadow-card)",
                }}
                labelStyle={{ color: "hsl(var(--muted-foreground))" }}
                formatter={(v: number) => [`${v}%`, "Moisture"]}
              />
              <Area
                type="monotone"
                dataKey="moisture"
                stroke="hsl(var(--primary))"
                strokeWidth={2.5}
                fill="url(#moistureArea)"
                isAnimationActive={true}
                animationDuration={500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
