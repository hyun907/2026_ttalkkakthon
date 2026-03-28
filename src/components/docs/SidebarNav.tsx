import { NavLink, useLocation } from "react-router-dom";

interface NavItem {
  label: string;
  href: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: "개요",
    items: [
      { label: "소개", href: "/docs" },
      { label: "시작하기", href: "/docs/getting-started" },
      { label: "디자인 원칙", href: "/docs/design-principles" },
    ],
  },
  {
    title: "컴포넌트",
    items: [
      { label: "Hover Escape Button", href: "/docs/components/hover-escape-button" },
      {
        label: "Shrink On Approach Button",
        href: "/docs/components/shrink-on-approach-button",
      },
      {
        label: "Never Complete Progress",
        href: "/docs/components/never-complete-progress",
      },
      { label: "Reversed Text Input", href: "/docs/components/reversed-text-input" },
      {
        label: "Inverted Swipe Carousel",
        href: "/docs/components/inverted-swipe-carousel",
      },
    ],
  },
];

interface SidebarNavProps {
  className?: string;
}

export function SidebarNav({ className = "" }: SidebarNavProps) {
  const location = useLocation();

  return (
    <nav className={["flex flex-col gap-6", className].join(" ")}>
      {NAV_GROUPS.map((group) => (
        <div key={group.title}>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {group.title}
          </p>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const isActive =
                item.href === "/docs"
                  ? location.pathname === "/docs"
                  : location.pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    end={item.href === "/docs"}
                    className={[
                      "flex items-center rounded-md px-3 py-1.5 text-sm transition-colors duration-100",
                      isActive
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    ].join(" ")}
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
