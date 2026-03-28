import { useState } from "react";
import { DocsLayout } from "@/components/docs/DocsLayout";
import { DemoFrame } from "@/components/docs/DemoFrame";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import { ShrinkOnApproachButton } from "@/components/hostile-ui/ShrinkOnApproachButton";
import {
  DocCallout,
  DocDivider,
  DocHeading,
  DocList,
  DocParagraph,
  DocSection,
} from "../shared/DocElements";

export function ShrinkOnApproachButtonPage() {
  const [strength, setStrength] = useState(1.2);

  return (
    <DocsLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">컴포넌트</Badge>
            <Badge variant="success">Stable</Badge>
          </div>
          <DocHeading level={1}>ShrinkOnApproachButton</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            사용자 의도에 반응해 자신의 클릭 영역을 줄이는 버튼입니다.
            포인터가 가까워질수록 버튼은 더 겸손해집니다.
          </DocParagraph>
        </div>

        <DocSection>
          <DocHeading level={2}>데모</DocHeading>
          <DocParagraph>
            버튼으로 커서를 이동해보세요. 접근을 자신이 없어지는 이유로 해석합니다.
          </DocParagraph>
          <DemoFrame label="ShrinkOnApproachButton.tsx" height="h-56" className="my-5">
            <ShrinkOnApproachButton label="계속하기" shrinkStrength={strength} />
          </DemoFrame>
          <div className="flex items-center gap-4 mt-3 p-4 rounded-lg border border-border bg-surface">
            <label className="text-xs text-muted-foreground font-mono shrink-0 w-40">
              shrinkStrength:{" "}
              <span className="text-foreground font-semibold">{strength.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min={0.5}
              max={2.2}
              step={0.1}
              value={strength}
              onChange={(e) => setStrength(parseFloat(e.target.value))}
              className="flex-1 accent-primary cursor-pointer"
            />
          </div>
        </DocSection>

        <DocDivider />

        <DocSection>
          <DocHeading level={2}>사용법</DocHeading>
          <CodeBlock
            code={`import { ShrinkOnApproachButton } from "badcn-ui"

export function Example() {
  return (
    <div className="relative w-full h-48">
      <ShrinkOnApproachButton
        label="계속하기"
        shrinkStrength={1.4}
      />
    </div>
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
              "버튼은 지속적으로 포인터 근접도를 계산하고, 클릭이 편안하게 이루어지기 전에 크기를 줄입니다.",
              "크기와 함께 불투명도도 약간 낮아져 버튼이 미안한 듯한 모습을 유지하면서도 비협조적입니다.",
              "포인터가 떠나면 버튼은 원래 크기로 돌아와 협조할 것처럼 보이지만, 약속하지는 않습니다.",
            ]}
          />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>접근성</DocHeading>
          <DocCallout variant="warning">
            포인터 타겟 크기는 사용자가 가장 필요할 때 정확히 줄어듭니다.
          </DocCallout>
        </DocSection>
      </div>
    </DocsLayout>
  );
}
