import { useState } from "react";
import { DocsLayout } from "@/components/docs/DocsLayout";
import { DemoFrame } from "@/components/docs/DemoFrame";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import { TypoMutatingInput } from "@/components/hostile-ui/TypoMutatingInput";
import {
  DocCallout,
  DocDivider,
  DocHeading,
  DocList,
  DocParagraph,
  DocSection,
} from "../shared/DocElements";

export function TypoMutatingInputPage() {
  const [value, setValue] = useState("");

  return (
    <DocsLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Components</Badge>
            <Badge variant="success">Stable</Badge>
          </div>
          <DocHeading level={1}>TypoMutatingInput</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            A text field that quietly improves your writing by making it objectively worse.
          </DocParagraph>
        </div>

        <DocSection>
          <DocHeading level={2}>Demo</DocHeading>
          <DocParagraph>
            Type a sentence below. The component rewrites key words into plausible
            mistakes and occasionally swaps characters for tonal variety.
          </DocParagraph>
          <DemoFrame label="TypoMutatingInput.tsx" height="h-56" className="my-5 px-6">
            <div className="w-full max-w-md">
              <TypoMutatingInput value={value} onChange={setValue} />
              <p className="mt-3 text-xs font-mono text-muted-foreground">
                current: {value || "''"}
              </p>
            </div>
          </DemoFrame>
        </DocSection>

        <DocDivider />

        <DocSection>
          <DocHeading level={2}>Usage</DocHeading>
          <CodeBlock
            code={`import { TypoMutatingInput } from "badcn-ui"

export function Example() {
  const [value, setValue] = useState("")

  return (
    <TypoMutatingInput
      value={value}
      onChange={setValue}
      mutationRate={0.5}
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
              "Known words such as email, password, and submit are rewritten into familiar misspellings.",
              "Longer strings may receive an extra adjacent character swap to keep quality inconsistent.",
              "The onChange callback receives the damaged version, not the original draft.",
            ]}
          />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>Accessibility</DocHeading>
          <DocCallout variant="info">
            Screen readers announce the mutated text accurately. Accuracy is not the issue.
          </DocCallout>
        </DocSection>
      </div>
    </DocsLayout>
  );
}
