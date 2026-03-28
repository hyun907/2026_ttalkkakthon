import { Link } from "react-router-dom";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody } from "@/components/ui/Card";
import { CommandChip } from "@/components/ui/CodeBlock";
import { HoverEscapeButton } from "@/components/hostile-ui/HoverEscapeButton";
import { ShrinkOnApproachButton } from "@/components/hostile-ui/ShrinkOnApproachButton";
import { NeverCompleteProgress } from "@/components/hostile-ui/NeverCompleteProgress";
import { ReversedTextInput } from "@/components/hostile-ui/ReversedTextInput";
import { InvertedSwipeCarousel } from "@/components/hostile-ui/InvertedSwipeCarousel";

// ── Component showcase cards ──────────────────────────────────────────────────

const SHOWCASE_COMPONENTS = [
  {
    name: "HoverEscapeButton",
    status: "stable" as const,
    description:
      "A primary call-to-action button that relocates itself when the pointer approaches. Ideal for checkout flows.",
    demo: "live",
    href: "/docs/components/hover-escape-button",
  },
  {
    name: "ShrinkOnApproachButton",
    status: "stable" as const,
    description:
      "A call-to-action that interprets intent as pressure and reduces its own target area accordingly.",
    demo: "live",
    href: "/docs/components/shrink-on-approach-button",
  },
  {
    name: "NeverCompleteProgress",
    status: "stable" as const,
    description:
      "Builds confidence quickly, reaches 99%, and then preserves suspense indefinitely.",
    demo: "live",
    href: "/docs/components/never-complete-progress",
  },
  {
    name: "ReversedTextInput",
    status: "stable" as const,
    description:
      "Displays user input backwards while maintaining the fiction that the field is still helping.",
    demo: "live",
    href: "/docs/components/reversed-text-input",
  },
  {
    name: "InvertedSwipeCarousel",
    status: "stable" as const,
    description:
      "A swipe surface that reverses left and right because expectation is merely a suggestion.",
    demo: "live",
    href: "/docs/components/inverted-swipe-carousel",
  },
];

const STAT_CARDS = [
  { label: "Rage Quit Rate", value: "94.2%", note: "across all components" },
  { label: "Misclick Efficiency", value: "3.7×", note: "industry average" },
  { label: "User Trust Erosion", value: "–87 NPS", note: "net promoter score" },
  { label: "Form Completion Rate", value: "0.03%", note: "excl. determined users" },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export function LandingPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <Section className="pt-28 pb-24 border-b border-border">
        <Container size="lg">
          <div className="flex flex-col items-start gap-6 max-w-2xl">
            <Badge variant="accent">April 2026 · v0.1.0</Badge>

            <h1 className="text-5xl font-bold text-foreground leading-tight tracking-tight">
              Beautiful components.
              <br />
              <span className="text-primary">Horrific experiences.</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              A meticulously crafted library of anti-user interface components. Open source.
              Production-ready. Optimized for maximum hesitation and minimum conversion.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button size="lg" asChild>
                <Link to="/docs">Open Docs</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/docs/components/hover-escape-button">View Components</Link>
              </Button>
            </div>

            <CommandChip command="npm install badcn-ui" className="mt-2 w-72" />
          </div>
        </Container>
      </Section>

      {/* ── Component showcase ───────────────────────────────────────────── */}
      <Section>
        <Container size="xl">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Component Library
            </p>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              Familiar patterns. Hostile behavior.
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl">
              Every component adheres to established design conventions. The interactions
              do not.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {SHOWCASE_COMPONENTS.map((comp) => (
              <ShowcaseCard key={comp.name} comp={comp} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Philosophy ───────────────────────────────────────────────────── */}
      <Section className="border-t border-border bg-surface">
        <Container size="lg">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Design Philosophy
            </p>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              Principled. Thoughtful. Wrong.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PhilosophyCard
              title="Visual trust, interaction betrayal"
              body="Components earn visual confidence through precise spacing, consistent tokens, and typographic hierarchy. The interactions then squander it systematically."
            />
            <PhilosophyCard
              title="Consistency in form, chaos in behavior"
              body="A button looks like a button across every screen. Whether it behaves like one is a separate question, and one we have chosen to answer poorly."
            />
            <PhilosophyCard
              title="Polished aesthetics, hostile affordances"
              body="The surface is premium. The UX is a carefully engineered obstacle course. We believe these goals are not contradictory. We are correct."
            />
          </div>
        </Container>
      </Section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <Section className="border-t border-border">
        <Container size="xl">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Performance Metrics
            </p>
            <h2 className="text-2xl font-bold text-foreground tracking-tight">
              Benchmarked against leading UI libraries.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We outperform every comparable library on metrics that matter to us.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STAT_CARDS.map((s) => (
              <Card key={s.label} className="p-5">
                <p className="text-3xl font-bold text-foreground tracking-tight mb-1">
                  {s.value}
                </p>
                <p className="text-sm font-medium text-foreground">{s.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.note}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CTA strip ────────────────────────────────────────────────────── */}
      <Section className="border-t border-border bg-surface">
        <Container size="md">
          <div className="flex flex-col items-center text-center gap-5">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">
              Ready to frustrate your users?
            </h2>
            <p className="text-muted-foreground max-w-sm">
              Reliable visuals. Unreliable interactions. Ship with confidence.
            </p>
            <div className="flex gap-3">
              <Button size="lg" asChild>
                <Link to="/docs">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/docs/components/hover-escape-button">Docs</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ShowcaseCard({
  comp,
}: {
  comp: (typeof SHOWCASE_COMPONENTS)[0];
}) {
  const isLive = comp.demo === "live";

  return (
    <Card className="overflow-hidden group">
      {/* Demo area */}
      <div className="relative h-52 bg-surface border-b border-border flex items-center justify-center overflow-hidden p-4">
        {isLive ? (
          <LivePreview name={comp.name} />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-5 rounded-sm bg-border animate-pulse" />
            <p className="text-xs text-muted-foreground">Preview unavailable</p>
          </div>
        )}
      </div>

      <CardBody>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold font-mono text-foreground">{comp.name}</p>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              {comp.description}
            </p>
          </div>
          <Badge
            variant={comp.status === "stable" ? "success" : "outline"}
            className="shrink-0 mt-0.5"
          >
            {comp.status === "stable" ? "stable" : "soon"}
          </Badge>
        </div>
        <div className="mt-4">
          <Button size="sm" variant="outline" asChild>
            <Link to={comp.href}>Open Docs</Link>
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

function PhilosophyCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-8 h-px bg-primary" />
      <h3 className="text-base font-semibold text-foreground leading-snug">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

function LivePreview({ name }: { name: string }) {
  const [reversedValue, setReversedValue] = useState("backwards only");

  if (name === "HoverEscapeButton") {
    return (
      <div className="relative w-full h-full">
        <HoverEscapeButton label="Submit" evadeStrength={1.2} />
      </div>
    );
  }

  if (name === "ShrinkOnApproachButton") {
    return (
      <div className="relative w-full h-full">
        <ShrinkOnApproachButton label="Continue" shrinkStrength={1.1} />
      </div>
    );
  }

  if (name === "NeverCompleteProgress") {
    return (
      <div className="w-full">
        <NeverCompleteProgress />
      </div>
    );
  }

  if (name === "ReversedTextInput") {
    return (
      <div className="w-full">
        <ReversedTextInput value={reversedValue} onChange={setReversedValue} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <InvertedSwipeCarousel
        compact
        items={[
          "Swipe left for previous.",
          "Swipe right for next.",
          "Behavior remains inverted.",
        ]}
      />
    </div>
  );
}
