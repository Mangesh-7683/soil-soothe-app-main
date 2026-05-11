import { ReactNode } from "react";
import { Header } from "./Header";
import { useI18n } from "@/i18n/I18nProvider";
import { Sprout } from "lucide-react";

export function Layout({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-20 md:pb-12">{children}</main>
      <footer className="hidden border-t border-border/60 bg-background/60 py-6 md:block">
        <div className="container flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sprout className="h-4 w-4 text-primary" />
            <span>{t("app_name")} · {t("built_for_farmers")}</span>
          </div>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
