import { NavLink } from "react-router-dom";
import { Sprout, Home, BookOpen, HelpCircle, Languages } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { LANG_LABELS, Lang } from "@/i18n/dict";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", labelKey: "nav_home", icon: Home, end: true },
  { to: "/crops", labelKey: "nav_crops", icon: BookOpen, end: false },
  { to: "/help", labelKey: "nav_help", icon: HelpCircle, end: false },
];

export function Header() {
  const { t, lang, setLang } = useI18n();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="gradient-leaf flex h-10 w-10 items-center justify-center rounded-xl shadow-soft transition-smooth group-hover:scale-110">
              <Sprout className="h-5 w-5 text-primary-foreground animate-leaf-sway" />
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-bold text-foreground">{t("app_name")}</span>
            <span className="hidden text-[10px] font-medium text-muted-foreground sm:block">
              Arduino · IoT
            </span>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-smooth",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 rounded-full">
              <Languages className="h-4 w-4" />
              <span className="hidden sm:inline">{LANG_LABELS[lang]}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {(Object.keys(LANG_LABELS) as Lang[]).map((l) => (
              <DropdownMenuItem
                key={l}
                onClick={() => setLang(l)}
                className={cn("cursor-pointer", l === lang && "font-semibold text-primary")}
              >
                {LANG_LABELS[l]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur md:hidden">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-smooth",
                  isActive ? "text-primary" : "text-muted-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {t(item.labelKey)}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
