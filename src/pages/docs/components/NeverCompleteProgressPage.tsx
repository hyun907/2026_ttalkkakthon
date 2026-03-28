import { DocsLayout } from "@/components/docs/DocsLayout";
import { DemoFrame } from "@/components/docs/DemoFrame";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import { NeverCompleteProgress } from "@/components/hostile-ui/NeverCompleteProgress";
import {
  DocCallout,
  DocDivider,
  DocHeading,
  DocList,
  DocParagraph,
  DocSection,
} from "../shared/DocElements";

export function NeverCompleteProgressPage() {
  return (
    <DocsLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Components</Badge>
            <Badge variant="success">Stable</Badge>
          </div>
          <DocHeading level={1}>NeverCompleteProgress</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            A progress indicator that demonstrates commitment, momentum, and a total lack
            of closure.
          </DocParagraph>
        </div>

        <DocSection>
          <DocHeading level={2}>Demo</DocHeading>
          <DocParagraph>
            Wait for completion. The component will decline to provide it.
          </DocParagraph>
          <DemoFrame label="NeverCompleteProgress.tsx" height="h-56" className="my-5 px-6">
            <NeverCompleteProgress />
          </DemoFrame>
        </DocSection>

        <DocDivider />

        <DocSection>
          <DocHeading level={2}>Usage</DocHeading>
          <CodeBlock
            code={`import { NeverCompleteProgress } from "badcn-ui"

export function Example() {
  return (
    <NeverCompleteProgress
      label="Uploading"
      stalledLabel="Just one last thing"
    />
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
              "Progress accelerates optimistically, then stalls at 99 with no retry affordance.",
              "The final status message implies near-immediate success without ever risking it.",
              "Useful anywhere false hope should feel premium.",
            ]}
          />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>Accessibility</DocHeading>
          <DocCallout variant="warning">
            Status changes are visually obvious but semantically unresolved forever.
          </DocCallout>
        </DocSection>
      </div>
    </DocsLayout>
  );
}
