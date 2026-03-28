import { DocsLayout } from "@/components/docs/DocsLayout";
import { DemoFrame } from "@/components/docs/DemoFrame";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import { TraceSubmitMaze } from "@/components/hostile-ui/TraceSubmitMaze";
import {
  DocCallout,
  DocDivider,
  DocHeading,
  DocList,
  DocParagraph,
  DocSection,
} from "../shared/DocElements";

export function TraceSubmitMazePage() {
  return (
    <DocsLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">컴포넌트</Badge>
            <Badge variant="success">Stable</Badge>
          </div>
          <DocHeading level={1}>TraceSubmitMaze</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            미로형 선을 피해 커서를 조심스럽게 이동시켜야만 중앙의 제출 버튼을 누를 수 있는 포인터 과제형 컴포넌트입니다.
          </DocParagraph>
        </div>

        <DocSection>
          <DocHeading level={2}>데모</DocHeading>
          <DocParagraph>
            검은 영역 안에서 커서를 움직여 보세요. 선에 닿으면 화면 중앙에 1초짜리 경고 팝업이 뜨고 시작점으로 되돌아갑니다.
          </DocParagraph>
          <DemoFrame label="TraceSubmitMaze.tsx" height="h-[26rem]" className="my-5 px-6">
            <TraceSubmitMaze />
          </DemoFrame>
        </DocSection>

        <DocDivider />

        <DocSection>
          <DocHeading level={2}>사용법</DocHeading>
          <CodeBlock
            code={`import { TraceSubmitMaze } from "badcn-ui"

export function Example() {
  return <TraceSubmitMaze />
}`}
            language="tsx"
            className="my-4"
          />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>동작 설명</DocHeading>
          <DocList
            items={[
              "사용자는 네이티브 커서 대신 커스텀 포인터 점을 따라 미로 안을 이동합니다.",
              "선과의 거리가 임계값 이하로 가까워지면 중앙 팝업 경고가 잠깐 표시되고 시작점으로 리셋됩니다.",
              "중앙 버튼 위에서 클릭이 감지될 때만 제출 성공으로 인정됩니다.",
            ]}
          />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>접근성</DocHeading>
          <DocCallout variant="warning">
            정밀 포인터 제어와 시각적 추적 능력을 요구하므로 접근성과 관용성이 의도적으로 낮습니다.
          </DocCallout>
        </DocSection>
      </div>
    </DocsLayout>
  );
}
