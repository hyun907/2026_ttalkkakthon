import { DocsLayout } from "@/components/docs/DocsLayout";
import { DemoFrame } from "@/components/docs/DemoFrame";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import { SlotMachineInput } from "@/components/hostile-ui/SlotMachineInput";
import {
  DocCallout,
  DocDivider,
  DocHeading,
  DocList,
  DocParagraph,
  DocSection,
} from "../shared/DocElements";

export function SlotMachineInputPage() {
  return (
    <DocsLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">컴포넌트</Badge>
            <Badge variant="success">Stable</Badge>
          </div>
          <DocHeading level={1}>SlotMachineInput</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            나이를 입력하려면 각 자릿수를 슬롯머신처럼 돌린 뒤 원하는 숫자가 나왔을 때 STOP을 정확히 눌러야 하는 입력 방식입니다.
          </DocParagraph>
        </div>

        <DocSection>
          <DocHeading level={2}>데모</DocHeading>
          <DocParagraph>
            십의 자리와 일의 자리를 따로 돌려보세요. 숫자 하나도 제대로 못 맞추시면 잭팟이 아니라 분노만 터집니다.
          </DocParagraph>
          <DemoFrame label="SlotMachineInput.tsx" height="h-64" className="my-5 px-6">
            <SlotMachineInput />
          </DemoFrame>
        </DocSection>

        <DocDivider />

        <DocSection>
          <DocHeading level={2}>사용법</DocHeading>
          <CodeBlock
            code={`import { SlotMachineInput } from "badcn-ui"

export function Example() {
  return <SlotMachineInput />
}`}
            language="tsx"
            className="my-4"
          />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>동작 설명</DocHeading>
          <DocList
            items={[
              "나이는 직접 타이핑할 수 없고 각 자릿수를 개별 회전시켜야 합니다.",
              "숫자가 자동으로 계속 바뀌기 때문에 원하는 값이 지나가기 전에 STOP을 눌러야 합니다.",
              "실패할수록 컴포넌트가 점점 더 사람을 얕보는 식의 피드백을 제공합니다.",
            ]}
          />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>접근성</DocHeading>
          <DocCallout variant="warning">
            시간 의존적 입력과 미세 타이밍 제어를 요구하므로 관용성과 예측 가능성이 낮습니다.
          </DocCallout>
        </DocSection>
      </div>
    </DocsLayout>
  );
}
