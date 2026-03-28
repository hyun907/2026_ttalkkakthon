import { Link, useLocation } from "react-router-dom";
import { Container } from "./Container";
import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  const location = useLocation();
  const isDocsPage = location.pathname.startsWith("/docs");

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
                Docs
              </NavLink>
              <NavLink to="/docs/components/hover-escape-button" active={false}>
                Components
              </NavLink>
              <a
                href="https://github.com"
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
              <span>Built for anti-conversion workflows.</span>
            </div>
            <p className="text-xs text-muted-foreground">
              No users were helped in the making of this library.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
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

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}
