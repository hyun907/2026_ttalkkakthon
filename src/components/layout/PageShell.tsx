import { Link, useLocation } from "react-router-dom";
import { Container } from "./Container";
import { useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "badcn-ui-theme";

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  const location = useLocation();
  const isDocsPage = location.pathname.startsWith("/docs");
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const syncSystemTheme = (event: MediaQueryListEvent) => {
      const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

      if (!storedTheme) {
        setTheme(event.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", syncSystemTheme);

    return () => {
      mediaQuery.removeEventListener("change", syncSystemTheme);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
        <Container size="xl">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-primary text-primary-foreground text-xs font-bold">
                b
              </span>
              <span className="font-mono tracking-tight">badcn/ui</span>
            </Link>

            {/* Nav */}
            <nav className="flex items-center gap-1">
              <NavLink to="/docs" active={isDocsPage}>
                문서
              </NavLink>
              <NavLink
                to="/docs/components/hover-escape-button"
                active={location.pathname.startsWith("/docs/components")}
              >
                컴포넌트
              </NavLink>
              <button
                type="button"
                onClick={toggleTheme}
                className="ml-2 inline-flex h-8 items-center gap-2 rounded-md border border-border bg-card px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
                aria-pressed={theme === "dark"}
              >
                <ThemeIcon theme={theme} />
                <span className="hidden sm:inline">
                  {theme === "dark" ? "라이트" : "다크"}
                </span>
              </button>
              <a
                href="https://github.com/hyun907/2026_ttalkkakthon"
                className="ml-2 flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
            </nav>
          </div>
        </Container>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border py-8">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-mono">badcn/ui</span>
              <span>·</span>
              <span>전환율을 거스르는 워크플로우를 위해 만들어졌습니다.</span>
            </div>
            <p className="text-xs text-muted-foreground">
              이 라이브러리를 만드는 과정에서 도움받은 사용자는 없습니다.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function NavLink({
  to,
  active,
  children,
}: {
  to: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      className={[
        "px-3 py-1.5 rounded-md text-sm transition-colors",
        active
          ? "bg-muted text-foreground font-medium"
          : "text-muted-foreground hover:text-foreground hover:bg-muted",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

function ThemeIcon({ theme }: { theme: Theme }) {
  if (theme === "dark") {
    return (
      <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current">
        <path d="M9.6 1.1a.75.75 0 00-.9.9A5.75 5.75 0 011.95 8.75 5.75 5.75 0 009.25 14.8a5.75 5.75 0 006.42-7.56.75.75 0 00-1.12-.41 4.25 4.25 0 01-6.19-4.57.75.75 0 00-.76-1.16z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current">
      <path d="M8 3.25a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0V4A.75.75 0 018 3.25zm0 7.25a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5A.75.75 0 018 10.5zm4-2.5a.75.75 0 01.75.75.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5H12zm-7.5 0a.75.75 0 010 1.5H4a.75.75 0 010-1.5h.5zM10.83 5.17a.75.75 0 011.06 0l.35.35a.75.75 0 01-1.06 1.06l-.35-.35a.75.75 0 010-1.06zM4.76 11.24a.75.75 0 011.06 0l.35.35a.75.75 0 11-1.06 1.06l-.35-.35a.75.75 0 010-1.06zm0-6.07a.75.75 0 010 1.06l-.35.35a.75.75 0 11-1.06-1.06l.35-.35a.75.75 0 011.06 0zm6.07 6.07a.75.75 0 010 1.06l-.35.35a.75.75 0 01-1.06-1.06l.35-.35a.75.75 0 011.06 0zM8 5.5A2.5 2.5 0 108 10.5 2.5 2.5 0 008 5.5z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}
