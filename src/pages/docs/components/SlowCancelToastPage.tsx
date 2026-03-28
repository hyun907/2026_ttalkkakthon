import { DocsLayout } from "@/components/docs/DocsLayout";
import { DemoFrame } from "@/components/docs/DemoFrame";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import { SlowCancelToast } from "@/components/hostile-ui/SlowCancelToast";
import {
  DocCallout,
  DocDivider,
  DocHeading,
  DocList,
  DocParagraph,
  DocSection,
} from "../shared/DocElements";

export function SlowCancelToastPage() {
  return (
    <DocsLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">컴포넌트</Badge>
            <Badge variant="success">Stable</Badge>
          </div>
          <DocHeading level={1}>SlowCancelToast</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            취소 버튼을 눌러도 피드백이 한 글자씩 느리게 도착하는 토스트형 상호작용입니다.
          </DocParagraph>
        </div>

        <DocSection>
          <DocHeading level={2}>데모</DocHeading>
          <DocParagraph>
            취소를 눌러보세요. `취`가 떴다가 사라지고, 그 다음 `소`, `되`, `었`처럼 토스트가 한 글자씩 따로 나타납니다.
          </DocParagraph>
          <DemoFrame label="SlowCancelToast.tsx" height="h-56" className="my-5 px-6">
            <SlowCancelToast />
          </DemoFrame>
        </DocSection>

        <DocDivider />

        <DocSection>
          <DocHeading level={2}>사용법</DocHeading>
          <CodeBlock
            code={`import { SlowCancelToast } from "badcn-ui"

export function Example() {
  return <SlowCancelToast />
}`}
            language="tsx"
            className="my-4"
          />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>동작 설명</DocHeading>
          <DocList
            items={[
              "취소를 누르면 하나의 문장이 아니라 글자 하나짜리 토스트가 순서대로 잠깐씩 뜹니다.",
              "사용자는 취소가 진짜 처리됐는지 짧은 시간 동안 반복 확인하게 됩니다.",
              "각 글자는 짧게 나타났다가 사라지고, 다음 글자가 이어서 나타납니다.",
            ]}
          />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>접근성</DocHeading>
          <DocCallout variant="warning">
            상태 피드백이 의도적으로 지연되므로 즉시성, 예측 가능성, 인지 부하 측면에서 불리합니다.
          </DocCallout>
        </DocSection>
      </div>
    </DocsLayout>
  );
}
