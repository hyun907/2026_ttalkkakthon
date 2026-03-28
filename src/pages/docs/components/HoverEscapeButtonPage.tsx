import { useState } from "react";
import { DocsLayout } from "@/components/docs/DocsLayout";
import { DemoFrame } from "@/components/docs/DemoFrame";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import { HoverEscapeButton } from "@/components/hostile-ui/HoverEscapeButton";
import {
  DocSection,
  DocHeading,
  DocParagraph,
  DocList,
  DocDivider,
  DocCallout,
} from "../shared/DocElements";

// ── Code samples ─────────────────────────────────────────────────────────────

const INSTALL_CODE = `npm install badcn-ui`;

const BASIC_USAGE = `import { HoverEscapeButton } from "badcn-ui"

export function Example() {
  return (
    // The parent must be position:relative and have defined dimensions.
    <div className="relative w-full h-48 overflow-hidden">
      <HoverEscapeButton label="Submit" />
    </div>
  )
}`;

const ADVANCED_USAGE = `import { HoverEscapeButton } from "badcn-ui"

export function CheckoutPage() {
  return (
    <div className="relative w-full h-64 overflow-hidden border rounded-lg">
      <HoverEscapeButton
        label="Complete Purchase"
        evadeStrength={2.1}
        bounded={true}
        onClick={() => console.log("How.")}
      />
    </div>
  )
}`;

const DISABLED_ESCAPE = `// Rendering with disabledEscape={true} produces a normal button.
// Useful for A/B testing which variant loses more users.
<HoverEscapeButton
  label="Submit"
  disabledEscape={true}
/>`;

// ── Props table ───────────────────────────────────────────────────────────────

const PROPS = [
  {
    name: "label",
    type: "string",
    default: '"Submit"',
    description: "Text rendered inside the button.",
  },
  {
    name: "evadeStrength",
    type: "number",
    default: "1.4",
    description: "Evasion intensity. 1 = mild displacement. 3 = aggressive relocation.",
  },
  {
    name: "bounded",
    type: "boolean",
    default: "true",
    description: "Constrains movement within the parent container. Recommended.",
  },
  {
    name: "disabledEscape",
    type: "boolean",
    default: "false",
    description: "Disables evasion. Renders a standard, cooperative button.",
  },
  {
    name: "className",
    type: "string",
    default: "—",
    description: "Additional classes applied to the button element.",
  },
  {
    name: "onClick",
    type: "(e: MouseEvent) => void",
    default: "—",
    description: "Click handler. Fires on the rare occasion a click lands.",
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export function HoverEscapeButtonPage() {
  const [strength, setStrength] = useState(1.4);

  return (
    <DocsLayout>
      <div className="max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Components</Badge>
            <Badge variant="success">Stable</Badge>
          </div>
          <DocHeading level={1}>HoverEscapeButton</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            A primary call-to-action button that relocates itself when the pointer
            approaches. Visually identical to a standard button. Functionally evasive.
          </DocParagraph>
        </div>

        {/* Live demo */}
        <DocSection>
          <DocHeading level={2}>Demo</DocHeading>
          <DocParagraph>
            Hover over the button below. The button will respond to your cursor in a
            manner you may find unexpected.
          </DocParagraph>

          <DemoFrame label="HoverEscapeButton.tsx" height="h-56" className="my-5">
            <HoverEscapeButton label="Submit" evadeStrength={strength} />
          </DemoFrame>

          {/* Strength control */}
          <div className="flex items-center gap-4 mt-3 p-4 rounded-lg border border-border bg-surface">
            <label className="text-xs text-muted-foreground font-mono shrink-0 w-40">
              evadeStrength: <span className="text-foreground font-semibold">{strength.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min={0.5}
              max={3.0}
              step={0.1}
              value={strength}
              onChange={(e) => setStrength(parseFloat(e.target.value))}
              className="flex-1 accent-primary cursor-pointer"
            />
          </div>
        </DocSection>

        <DocDivider />

        {/* Installation */}
        <DocSection>
          <DocHeading level={2}>Installation</DocHeading>
          <CodeBlock code={INSTALL_CODE} language="bash" className="my-4" />
        </DocSection>

        {/* Usage */}
        <DocSection>
          <DocHeading level={2}>Usage</DocHeading>
          <DocParagraph>
            The component must be placed inside a{" "}
            <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
              position: relative
            </code>{" "}
            container with defined dimensions. The button uses absolute positioning
            to navigate within that space.
          </DocParagraph>
          <CodeBlock code={BASIC_USAGE} language="tsx" className="my-4" />
        </DocSection>

        {/* Advanced */}
        <DocSection>
          <DocHeading level={2}>Advanced usage</DocHeading>
          <CodeBlock code={ADVANCED_USAGE} language="tsx" className="my-4" />
        </DocSection>

        {/* Disable escape */}
        <DocSection>
          <DocHeading level={2}>Disabling evasion</DocHeading>
          <DocParagraph>
            Set <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">disabledEscape</code> to{" "}
            <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">true</code> to render
            a cooperative button. This prop exists exclusively to measure the conversion
            impact of the hostile variant.
          </DocParagraph>
          <CodeBlock code={DISABLED_ESCAPE} language="tsx" className="my-4" />
        </DocSection>

        <DocDivider />

        {/* Props */}
        <DocSection>
          <DocHeading level={2}>Props</DocHeading>
          <div className="mt-4 rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-2">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Prop</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Default</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">Description</th>
                </tr>
              </thead>
              <tbody>
                {PROPS.map((prop, i) => (
                  <tr key={prop.name} className={i > 0 ? "border-t border-border" : ""}>
                    <td className="px-4 py-3 font-mono text-xs text-foreground">{prop.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{prop.type}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{prop.default}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DocSection>

        <DocDivider />

        {/* Behavior notes */}
        <DocSection>
          <DocHeading level={2}>Behavior notes</DocHeading>
          <DocList items={[
            "Evasion is triggered when the pointer enters a radius of approximately 22% of the container dimensions.",
            "The button moves away from the cursor using a normalized flee vector with a spring-like cubic-bezier transition.",
            "When bounded=true, the button bounces off container walls rather than clamping. This preserves motion quality.",
            "If a click somehow lands, the button acknowledges it gracefully and increments a counter.",
            "The button returns to its last position (not center) when the pointer leaves, with a slower spring curve.",
          ]} />
        </DocSection>

        <DocDivider />

        {/* Accessibility */}
        <DocSection>
          <DocHeading level={2}>Accessibility</DocHeading>
          <DocCallout variant="info">
            This section is written accurately. The accessibility situation is what it is.
          </DocCallout>

          <DocList items={[
            <><strong>Keyboard support:</strong> Emotionally inconsistent. The button is technically focusable. It cannot evade the keyboard.</>,
            <><strong>Screen reader:</strong> Announces as a button. Does not announce its spatial anxiety.</>,
            <><strong>Pointer targeting:</strong> Evasive by design. Mouse users are specifically disadvantaged.</>,
            <><strong>ARIA role:</strong> <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">button</code>. Accurate.</>,
            <><strong>Focus management:</strong> Standard. Focus ring is visible and correctly themed.</>,
            <><strong>Reduced motion:</strong> Currently not respected. A future release will make the button evade more slowly under <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">prefers-reduced-motion</code>. This is still evasion.</>,
          ]} />
        </DocSection>
      </div>
    </DocsLayout>
  );
}
