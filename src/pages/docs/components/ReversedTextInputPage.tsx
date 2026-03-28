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
            <Badge variant="accent">컴포넌트</Badge>
            <Badge variant="success">Stable</Badge>
          </div>
          <DocHeading level={1}>ReversedTextInput</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            모든 문장을 반대 방향에서 표시하는 텍스트 입력 필드입니다.
          </DocParagraph>
        </div>

        <DocSection>
          <DocHeading level={2}>데모</DocHeading>
          <DocParagraph>
            평소처럼 입력하세요. 필드는 텍스트를 거꾸로 렌더링하면서 내부적으로는
            원래 순서로 저장합니다.
          </DocParagraph>
          <DemoFrame label="ReversedTextInput.tsx" height="h-56" className="my-5 px-6">
            <div className="w-full max-w-md">
              <ReversedTextInput value={value} onChange={setValue} />
            </div>
          </DemoFrame>
        </DocSection>

        <DocDivider />

        <DocSection>
          <DocHeading level={2}>사용법</DocHeading>
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
          <DocHeading level={2}>동작 설명</DocHeading>
          <DocList
            items={[
              "보이는 텍스트는 붙여넣은 내용 포함 항상 역순으로 표시됩니다.",
              "컴포넌트는 역순이 아닌 문자열을 state에 전달합니다. 덕분에 디버깅이 완전히 불가능하기보다는 약간 혼란스럽습니다.",
              "구조적으로 망가진 것이 아니라 언어적으로 적대적인 느낌을 주어야 하는 폼에 유용합니다.",
            ]}
          />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>접근성</DocHeading>
          <DocCallout variant="info">
            보조 기술은 렌더링된 필드 값을 받습니다. 보이는 것만큼 정확히 거꾸로입니다.
          </DocCallout>
        </DocSection>
      </div>
    </DocsLayout>
  );
}
