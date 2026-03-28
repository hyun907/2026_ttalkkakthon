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
            <Badge variant="accent">컴포넌트</Badge>
            <Badge variant="success">Stable</Badge>
          </div>
          <DocHeading level={1}>NeverCompleteProgress</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            헌신, 추진력, 그리고 완전한 종결 결여를 동시에 보여주는 프로그레스 인디케이터입니다.
          </DocParagraph>
        </div>

        <DocSection>
          <DocHeading level={2}>데모</DocHeading>
          <DocParagraph>
            완료될 때까지 기다려보세요. 컴포넌트는 그것을 제공하지 않을 것입니다.
          </DocParagraph>
          <DemoFrame label="NeverCompleteProgress.tsx" height="h-56" className="my-5 px-6">
            <NeverCompleteProgress />
          </DemoFrame>
        </DocSection>

        <DocDivider />

        <DocSection>
          <DocHeading level={2}>사용법</DocHeading>
          <CodeBlock
            code={`import { NeverCompleteProgress } from "badcn-ui"

export function Example() {
  return (
    <NeverCompleteProgress
      label="업로드 중"
      stalledLabel="거의 다 됐어요"
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
              "프로그레스는 낙관적으로 가속되다가 99에서 재시도 어포던스 없이 멈춥니다.",
              "최종 상태 메시지는 즉각적인 성공을 암시하지만, 절대 그 위험을 감수하지 않습니다.",
              "가짜 희망이 프리미엄처럼 느껴져야 하는 모든 곳에 유용합니다.",
            ]}
          />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>접근성</DocHeading>
          <DocCallout variant="warning">
            상태 변화는 시각적으로 명확하지만 의미론적으로는 영원히 미해결 상태입니다.
          </DocCallout>
        </DocSection>
      </div>
    </DocsLayout>
  );
}
