import type { ReactNode } from "react";
import { SidebarNav } from "./SidebarNav";
import { Container } from "../layout/Container";

interface DocsLayoutProps {
  children: ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <Container size="xl" className="py-8">
      <div className="flex gap-10 min-h-[calc(100vh-7rem)]">
        {/* Sidebar */}
        <aside className="hidden md:block w-56 shrink-0">
          <div className="sticky top-20">
            <SidebarNav />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <article className="prose-docs max-w-none">{children}</article>
        </div>
      </div>
    </Container>
  );
}
