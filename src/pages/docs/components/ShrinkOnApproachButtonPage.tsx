import { useState } from "react";
import { DocsLayout } from "@/components/docs/DocsLayout";
import { DemoFrame } from "@/components/docs/DemoFrame";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import { ShrinkOnApproachButton } from "@/components/hostile-ui/ShrinkOnApproachButton";
import {
  DocCallout,
  DocDivider,
  DocHeading,
  DocList,
  DocParagraph,
  DocSection,
} from "../shared/DocElements";

export function ShrinkOnApproachButtonPage() {
  const [strength, setStrength] = useState(1.2);

  return (
    <DocsLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Components</Badge>
            <Badge variant="success">Stable</Badge>
          </div>
          <DocHeading level={1}>ShrinkOnApproachButton</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            A button that responds to user intent by reducing its own hit area.
            The closer the pointer gets, the more modest the button becomes.
          </DocParagraph>
        </div>

        <DocSection>
          <DocHeading level={2}>Demo</DocHeading>
          <DocParagraph>
            Move your cursor toward the button. It interprets approach as a reason to
            become less available.
          </DocParagraph>
          <DemoFrame label="ShrinkOnApproachButton.tsx" height="h-56" className="my-5">
            <ShrinkOnApproachButton label="Continue" shrinkStrength={strength} />
          </DemoFrame>
          <div className="flex items-center gap-4 mt-3 p-4 rounded-lg border border-border bg-surface">
            <label className="text-xs text-muted-foreground font-mono shrink-0 w-40">
              shrinkStrength:{" "}
              <span className="text-foreground font-semibold">{strength.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min={0.5}
              max={2.2}
              step={0.1}
              value={strength}
              onChange={(e) => setStrength(parseFloat(e.target.value))}
              className="flex-1 accent-primary cursor-pointer"
            />
          </div>
        </DocSection>

        <DocDivider />

        <DocSection>
          <DocHeading level={2}>Usage</DocHeading>
          <CodeBlock
            code={`import { ShrinkOnApproachButton } from "badcn-ui"

export function Example() {
  return (
    <div className="relative w-full h-48">
      <ShrinkOnApproachButton
        label="Continue"
        shrinkStrength={1.4}
      />
    </div>
  )
}`}
            language="tsx"
            className="my-4"
          />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>Behavior notes</DocHeading>
          <DocList
            items={[
              "The button continuously computes pointer proximity and scales down before a click can land comfortably.",
              "Opacity falls slightly with scale, helping the button look apologetic while remaining unhelpful.",
              "Pointer departure restores the button to full size, implying cooperation without committing to it.",
            ]}
          />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>Accessibility</DocHeading>
          <DocCallout variant="warning">
            Pointer target size degrades exactly when the user needs it most.
          </DocCallout>
        </DocSection>
      </div>
    </DocsLayout>
  );
}
