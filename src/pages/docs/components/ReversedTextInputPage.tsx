import { useState } from "react";
import { DocsLayout } from "@/components/docs/DocsLayout";
import { DemoFrame } from "@/components/docs/DemoFrame";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import { ReversedTextInput } from "@/components/hostile-ui/ReversedTextInput";
import {
  DocCallout,
  DocDivider,
  DocHeading,
  DocList,
  DocParagraph,
  DocSection,
} from "../shared/DocElements";

export function ReversedTextInputPage() {
  const [value, setValue] = useState("");

  return (
    <DocsLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Components</Badge>
            <Badge variant="success">Stable</Badge>
          </div>
          <DocHeading level={1}>ReversedTextInput</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            A text input that presents every sentence from the wrong chronological direction.
          </DocParagraph>
        </div>

        <DocSection>
          <DocHeading level={2}>Demo</DocHeading>
          <DocParagraph>
            Type normally. The field renders your text in reverse while storing it in the
            original order behind the scenes.
          </DocParagraph>
          <DemoFrame label="ReversedTextInput.tsx" height="h-56" className="my-5 px-6">
            <div className="w-full max-w-md">
              <ReversedTextInput value={value} onChange={setValue} />
            </div>
          </DemoFrame>
        </DocSection>

        <DocDivider />

        <DocSection>
          <DocHeading level={2}>Usage</DocHeading>
          <CodeBlock
            code={`import { ReversedTextInput } from "badcn-ui"

export function Example() {
  const [value, setValue] = useState("")

  return (
    <ReversedTextInput
      value={value}
      onChange={setValue}
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
              "Visible text is always reversed, including pasted content.",
              "The component emits the unreversed string to state so debugging remains slightly confusing instead of impossible.",
              "Useful for forms that should feel linguistically adversarial rather than structurally broken.",
            ]}
          />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>Accessibility</DocHeading>
          <DocCallout variant="info">
            Assistive technology receives the rendered field value, which is exactly as backwards as it looks.
          </DocCallout>
        </DocSection>
      </div>
    </DocsLayout>
  );
}
