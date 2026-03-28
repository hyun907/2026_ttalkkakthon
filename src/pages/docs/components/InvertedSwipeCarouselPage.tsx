import { DocsLayout } from "@/components/docs/DocsLayout";
import { DemoFrame } from "@/components/docs/DemoFrame";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import { InvertedSwipeCarousel } from "@/components/hostile-ui/InvertedSwipeCarousel";
import {
  DocCallout,
  DocDivider,
  DocHeading,
  DocList,
  DocParagraph,
  DocSection,
} from "../shared/DocElements";

export function InvertedSwipeCarouselPage() {
  return (
    <DocsLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">컴포넌트</Badge>
            <Badge variant="success">Stable</Badge>
          </div>
          <DocHeading level={1}>InvertedSwipeCarousel</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            귀 기울여 듣고, 정반대로 행동하는 스와이프 캐러셀입니다.
          </DocParagraph>
        </div>

        <DocSection>
          <DocHeading level={2}>데모</DocHeading>
          <DocParagraph>
            왼쪽으로 드래그하면 오른쪽으로 이동합니다. 오른쪽으로 드래그하면 왼쪽으로 이동합니다.
            반전이 기능입니다.
          </DocParagraph>
          <DemoFrame label="InvertedSwipeCarousel.tsx" height="h-72" className="my-5 px-6">
            <InvertedSwipeCarousel />
          </DemoFrame>
        </DocSection>

        <DocDivider />

        <DocSection>
          <DocHeading level={2}>사용법</DocHeading>
          <CodeBlock
            code={`import { InvertedSwipeCarousel } from "badcn-ui"

export function Example() {
  return (
    <InvertedSwipeCarousel
      items={[
        "슬라이드 1",
        "슬라이드 2",
        "슬라이드 3",
      ]}
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
              "포인터 및 터치 드래그 방향이 의도적으로 반전되어 해석됩니다.",
              "작은 우발적 드래그는 무시되어 더 큰 실수가 더욱 의도적으로 느껴집니다.",
              "인디케이터 도트는 정직하게 표시됩니다. 이것이 모순을 더욱 선명하게 만들 뿐입니다.",
            ]}
          />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>접근성</DocHeading>
          <DocCallout variant="warning">
            제스처 기대가 반전되어 있지만, 시각적 계층 구조는 전반적으로 전문적입니다.
          </DocCallout>
        </DocSection>
      </div>
    </DocsLayout>
  );
}
