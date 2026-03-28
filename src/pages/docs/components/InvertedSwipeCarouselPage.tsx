import { DocsLayout } from "@/components/docs/DocsLayout";
import { DemoFrame } from "@/components/docs/DemoFrame";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import { InvertedSwipeCarousel } from "@/components/hostile-ui/InvertedSwipeCarousel";
import {
  DocCallout,
  DocDivider,
  DocHeading,
  DocList,
  DocParagraph,
  DocSection,
} from "../shared/DocElements";

export function InvertedSwipeCarouselPage() {
  return (
    <DocsLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Components</Badge>
            <Badge variant="success">Stable</Badge>
          </div>
          <DocHeading level={1}>InvertedSwipeCarousel</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            A swipeable carousel that listens carefully, then does the opposite.
          </DocParagraph>
        </div>

        <DocSection>
          <DocHeading level={2}>Demo</DocHeading>
          <DocParagraph>
            Drag left to move right. Drag right to move left. The inversion is the feature.
          </DocParagraph>
          <DemoFrame label="InvertedSwipeCarousel.tsx" height="h-72" className="my-5 px-6">
            <InvertedSwipeCarousel />
          </DemoFrame>
        </DocSection>

        <DocDivider />

        <DocSection>
          <DocHeading level={2}>Usage</DocHeading>
          <CodeBlock
            code={`import { InvertedSwipeCarousel } from "badcn-ui"

export function Example() {
  return (
    <InvertedSwipeCarousel
      items={[
        "Slide one",
        "Slide two",
        "Slide three",
      ]}
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
              "Pointer and touch drag direction are intentionally interpreted in reverse.",
              "Small accidental drags are ignored so the larger mistakes feel more deliberate.",
              "Indicator dots remain truthful, which only sharpens the contradiction.",
            ]}
          />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>Accessibility</DocHeading>
          <DocCallout variant="warning">
            Gesture expectations are inverted, but visual hierarchy remains professional throughout.
          </DocCallout>
        </DocSection>
      </div>
    </DocsLayout>
  );
}
