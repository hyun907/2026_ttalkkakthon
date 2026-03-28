import { DocsLayout } from "@/components/docs/DocsLayout";
import { DemoFrame } from "@/components/docs/DemoFrame";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import { InfiniteConfirmDialog } from "@/components/hostile-ui/InfiniteConfirmDialog";
import {
  DocCallout,
  DocDivider,
  DocHeading,
  DocList,
  DocParagraph,
  DocSection,
} from "../shared/DocElements";

export function InfiniteConfirmDialogPage() {
  return (
    <DocsLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">컴포넌트</Badge>
            <Badge variant="success">Stable</Badge>
          </div>
          <DocHeading level={1}>InfiniteConfirmDialog</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            제출 직전의 망설임을 6단계에 걸쳐 정성스럽게 증폭시키는 반복형 확인 다이얼로그입니다.
          </DocParagraph>
        </div>

        <DocSection>
          <DocHeading level={2}>데모</DocHeading>
          <DocParagraph>
            제출하기를 누른 뒤 확인을 계속 눌러보세요. 단계별 공격 멘트가 이어지고,
            마지막까지 가도 처음부터 다시 시작합니다.
          </DocParagraph>
          <DemoFrame label="InfiniteConfirmDialog.tsx" height="h-80" className="my-5 px-6">
            <InfiniteConfirmDialog />
          </DemoFrame>
        </DocSection>

        <DocDivider />

        <DocSection>
          <DocHeading level={2}>사용법</DocHeading>
          <CodeBlock
            code={`import { InfiniteConfirmDialog } from "badcn-ui"

export function Example() {
  return (
    <InfiniteConfirmDialog triggerLabel="제출하기" />
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
              "확인을 누를 때마다 다음 공격 멘트 단계로 진행됩니다.",
              "6단계의 마지막 문구까지 본 뒤 다시 확인을 누르면 성공하지 않고 1단계로 돌아갑니다.",
              "취소는 다이얼로그를 닫아주고, 다시 열면 항상 1단계에서 시작합니다.",
            ]}
          />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>접근성</DocHeading>
          <DocCallout variant="warning">
            제출 흐름의 종료 조건을 흐리게 만들어 사용자의 확신과 진행 감각을 소모시킵니다.
          </DocCallout>
        </DocSection>
      </div>
    </DocsLayout>
  );
}
