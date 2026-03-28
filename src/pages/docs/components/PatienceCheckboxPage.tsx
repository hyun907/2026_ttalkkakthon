import { DocsLayout } from "@/components/docs/DocsLayout";
import { DemoFrame } from "@/components/docs/DemoFrame";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import { PatienceCheckbox } from "@/components/hostile-ui/PatienceCheckbox";
import {
  DocCallout,
  DocDivider,
  DocHeading,
  DocList,
  DocParagraph,
  DocSection,
} from "../shared/DocElements";

export function PatienceCheckboxPage() {
  return (
    <DocsLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">컴포넌트</Badge>
            <Badge variant="success">Stable</Badge>
          </div>
          <DocHeading level={1}>PatienceCheckbox</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            약관 동의 체크박스를 길게 눌러야만 체크되는, 불필요하게 진지한 동의 입력 방식입니다.
          </DocParagraph>
        </div>

        <DocSection>
          <DocHeading level={2}>데모</DocHeading>
          <DocParagraph>
            체크박스를 약 3초간 꾹 눌러보세요. 중간에 손을 떼면 진행이 초기화됩니다.
          </DocParagraph>
          <DemoFrame label="PatienceCheckbox.tsx" height="h-56" className="my-5 px-6">
            <PatienceCheckbox />
          </DemoFrame>
        </DocSection>

        <DocDivider />

        <DocSection>
          <DocHeading level={2}>사용법</DocHeading>
          <CodeBlock
            code={`import { PatienceCheckbox } from "badcn-ui"

export function Example() {
  return <PatienceCheckbox holdDuration={3000} />
}`}
            language="tsx"
            className="my-4"
          />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>동작 설명</DocHeading>
          <DocList
            items={[
              "클릭은 무시되고, 길게 누르는 동안에만 진행이 차오릅니다.",
              "테두리 진행은 마지막 10%에서 더 느려져 인내심을 추가로 시험합니다.",
              "중간에 손을 떼거나 포인터가 벗어나면 진행이 0으로 초기화됩니다.",
            ]}
          />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>접근성</DocHeading>
          <DocCallout variant="warning">
            시간 의존적 장기 입력과 지속 압박을 요구하므로 일반적인 체크박스보다 훨씬 비관용적입니다.
          </DocCallout>
        </DocSection>
      </div>
    </DocsLayout>
  );
}
