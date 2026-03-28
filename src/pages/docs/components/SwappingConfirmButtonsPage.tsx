import { DocsLayout } from "@/components/docs/DocsLayout";
import { DemoFrame } from "@/components/docs/DemoFrame";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import { SwappingConfirmButtons } from "@/components/hostile-ui/SwappingConfirmButtons";
import {
  DocCallout,
  DocDivider,
  DocHeading,
  DocList,
  DocParagraph,
  DocSection,
} from "../shared/DocElements";

export function SwappingConfirmButtonsPage() {
  return (
    <DocsLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">컴포넌트</Badge>
            <Badge variant="success">Stable</Badge>
          </div>
          <DocHeading level={1}>SwappingConfirmButtons</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            확인과 취소 버튼의 위치를 계속 뒤바꿔서 근육 기억을 적으로 돌리는 확인 패턴입니다.
          </DocParagraph>
        </div>

        <DocSection>
          <DocHeading level={2}>데모</DocHeading>
          <DocParagraph>
            가만히 보고 있어도 두 버튼의 위치가 계속 바뀝니다. 눌러도 물론 또 바뀝니다.
          </DocParagraph>
          <DemoFrame label="SwappingConfirmButtons.tsx" height="h-64" className="my-5 px-6">
            <SwappingConfirmButtons />
          </DemoFrame>
        </DocSection>

        <DocDivider />

        <DocSection>
          <DocHeading level={2}>사용법</DocHeading>
          <CodeBlock
            code={`import { SwappingConfirmButtons } from "badcn-ui"

export function Example() {
  return <SwappingConfirmButtons autoSwapMs={1100} />
}`}
            language="tsx"
            className="my-4"
          />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>동작 설명</DocHeading>
          <DocList
            items={[
              "확인과 취소는 일정 시간마다 자동으로 번갈아 위치를 바꿉니다.",
              "버튼을 클릭해도 즉시 또 위치가 바뀌므로 반응 패턴을 학습하기 어렵습니다.",
              "선택 결과보다 위치 교란 자체가 핵심이므로 두 버튼 모두 같은 수준의 혼란을 생산합니다.",
              "반복 클릭 습관과 타이밍 의존적 행동을 동시에 노리는 데 최적화되어 있습니다.",
            ]}
          />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>접근성</DocHeading>
          <DocCallout variant="warning">
            동일한 시각 표현에 비해 버튼 위치가 안정적이지 않아 예측 가능성과 운동 기억을 훼손합니다.
          </DocCallout>
        </DocSection>
      </div>
    </DocsLayout>
  );
}
