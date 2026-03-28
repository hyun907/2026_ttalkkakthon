import { useState } from "react";
import { DocsLayout } from "@/components/docs/DocsLayout";
import { DemoFrame } from "@/components/docs/DemoFrame";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import { JudgmentalNameInput } from "@/components/hostile-ui/JudgmentalNameInput";
import {
  DocCallout,
  DocDivider,
  DocHeading,
  DocList,
  DocParagraph,
  DocSection,
} from "../shared/DocElements";

export function JudgmentalNameInputPage() {
  const [value, setValue] = useState("");

  return (
    <DocsLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">컴포넌트</Badge>
            <Badge variant="success">Stable</Badge>
          </div>
          <DocHeading level={1}>JudgmentalNameInput</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            이름을 입력받는 척하다가 즉시 더 나은 선택지를 요구하는 입력 필드입니다.
          </DocParagraph>
        </div>

        <DocSection>
          <DocHeading level={2}>데모</DocHeading>
          <DocParagraph>
            이름을 입력한 뒤 확인 버튼을 눌러 보세요. 제출 순간 필드 값이 인격적인
            피드백으로 교체됩니다.
          </DocParagraph>
          <DemoFrame label="JudgmentalNameInput.tsx" height="h-56" className="my-5 px-6">
            <div className="w-full max-w-md">
              <JudgmentalNameInput value={value} onChange={setValue} />
            </div>
          </DemoFrame>
        </DocSection>

        <DocDivider />

        <DocSection>
          <DocHeading level={2}>사용법</DocHeading>
          <CodeBlock
            code={`import { JudgmentalNameInput } from "badcn-ui"

export function Example() {
  const [value, setValue] = useState("")

  return (
    <JudgmentalNameInput
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
              "입력 중에는 일반적인 이름 필드처럼 보이지만, 확인 버튼을 누른 뒤 값이 “흠… 더 나은 이름 없나요?”로 교체됩니다.",
              "상태 관리 코드 역시 제출 이후에는 사용자의 원본 입력이 아니라 평가된 문자열을 받습니다.",
              "즉시 에러를 띄우는 대신 제출 성공처럼 보이는 흐름 안에서 미묘하게 모욕합니다.",
            ]}
          />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>접근성</DocHeading>
          <DocCallout variant="warning">
            필드는 시각적으로 정상적인 텍스트 입력처럼 보이지만, 실제로는 사용자의
            의도를 지속적으로 거부합니다.
          </DocCallout>
        </DocSection>
      </div>
    </DocsLayout>
  );
}
