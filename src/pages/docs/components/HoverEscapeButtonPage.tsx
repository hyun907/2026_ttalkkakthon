import { useState } from "react";
import { DocsLayout } from "@/components/docs/DocsLayout";
import { DemoFrame } from "@/components/docs/DemoFrame";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import { HoverEscapeButton } from "@/components/hostile-ui/HoverEscapeButton";
import {
  DocSection,
  DocHeading,
  DocParagraph,
  DocList,
  DocDivider,
  DocCallout,
} from "../shared/DocElements";

const INSTALL_CODE = `npm install badcn-ui`;

const BASIC_USAGE = `import { HoverEscapeButton } from "badcn-ui"

export function Example() {
  return (
    // 부모는 position:relative이어야 하며 크기가 정의되어야 합니다.
    <div className="relative w-full h-48 overflow-hidden">
      <HoverEscapeButton label="제출하기" />
    </div>
  )
}`;

const ADVANCED_USAGE = `import { HoverEscapeButton } from "badcn-ui"

export function CheckoutPage() {
  return (
    <div className="relative w-full h-64 overflow-hidden border rounded-lg">
      <HoverEscapeButton
        label="결제 완료"
        evadeStrength={2.1}
        bounded={true}
        onClick={() => console.log("어떻게.")}
      />
    </div>
  )
}`;

const DISABLED_ESCAPE = `// disabledEscape={true}로 렌더링하면 일반 버튼이 됩니다.
// A/B 테스트로 어느 변형이 더 많은 사용자를 잃는지 측정하는 데 유용합니다.
<HoverEscapeButton
  label="제출하기"
  disabledEscape={true}
/>`;

const PROPS = [
  {
    name: "label",
    type: "string",
    default: '"Submit"',
    description: "버튼 내부에 렌더링되는 텍스트입니다.",
  },
  {
    name: "evadeStrength",
    type: "number",
    default: "1.4",
    description: "회피 강도. 1 = 완만한 이동, 3 = 공격적인 이탈.",
  },
  {
    name: "bounded",
    type: "boolean",
    default: "true",
    description: "부모 컨테이너 내에서의 이동을 제한합니다. 권장됩니다.",
  },
  {
    name: "disabledEscape",
    type: "boolean",
    default: "false",
    description: "회피를 비활성화합니다. 협조적인 일반 버튼을 렌더링합니다.",
  },
  {
    name: "className",
    type: "string",
    default: "—",
    description: "버튼 요소에 적용되는 추가 클래스입니다.",
  },
  {
    name: "onClick",
    type: "(e: MouseEvent) => void",
    default: "—",
    description: "클릭 핸들러입니다. 드물게 클릭이 성공할 때 발생합니다.",
  },
];

export function HoverEscapeButtonPage() {
  const [strength, setStrength] = useState(1.4);

  return (
    <DocsLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">컴포넌트</Badge>
            <Badge variant="success">Stable</Badge>
          </div>
          <DocHeading level={1}>HoverEscapeButton</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            마우스가 가까워지면 위치를 바꾸는 기본 CTA 버튼입니다. 시각적으로 표준 버튼과
            동일합니다. 기능적으로는 회피적입니다.
          </DocParagraph>
        </div>

        <DocSection>
          <DocHeading level={2}>데모</DocHeading>
          <DocParagraph>
            아래 버튼에 마우스를 올려보세요. 예상치 못한 방식으로 반응합니다.
          </DocParagraph>

          <DemoFrame label="HoverEscapeButton.tsx" height="h-56" className="my-5">
            <HoverEscapeButton label="제출하기" evadeStrength={strength} />
          </DemoFrame>

          <div className="flex items-center gap-4 mt-3 p-4 rounded-lg border border-border bg-surface">
            <label className="text-xs text-muted-foreground font-mono shrink-0 w-40">
              evadeStrength: <span className="text-foreground font-semibold">{strength.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min={0.5}
              max={3.0}
              step={0.1}
              value={strength}
              onChange={(e) => setStrength(parseFloat(e.target.value))}
              className="flex-1 accent-primary cursor-pointer"
            />
          </div>
        </DocSection>

        <DocDivider />

        <DocSection>
          <DocHeading level={2}>설치</DocHeading>
          <CodeBlock code={INSTALL_CODE} language="bash" className="my-4" />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>사용법</DocHeading>
          <DocParagraph>
            컴포넌트는 크기가 정의된{" "}
            <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
              position: relative
            </code>{" "}
            컨테이너 안에 배치해야 합니다. 버튼은 해당 공간 내에서 절대 위치를 사용해 이동합니다.
          </DocParagraph>
          <CodeBlock code={BASIC_USAGE} language="tsx" className="my-4" />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>고급 사용법</DocHeading>
          <CodeBlock code={ADVANCED_USAGE} language="tsx" className="my-4" />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>회피 비활성화</DocHeading>
          <DocParagraph>
            <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">disabledEscape</code>를{" "}
            <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">true</code>로 설정하면
            협조적인 버튼이 됩니다. 이 prop은 오직 적대적 변형의 전환율 영향을 측정하기 위해
            존재합니다.
          </DocParagraph>
          <CodeBlock code={DISABLED_ESCAPE} language="tsx" className="my-4" />
        </DocSection>

        <DocDivider />

        <DocSection>
          <DocHeading level={2}>Props</DocHeading>
          <div className="mt-4 rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-2">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Prop</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Default</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">설명</th>
                </tr>
              </thead>
              <tbody>
                {PROPS.map((prop, i) => (
                  <tr key={prop.name} className={i > 0 ? "border-t border-border" : ""}>
                    <td className="px-4 py-3 font-mono text-xs text-foreground">{prop.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{prop.type}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{prop.default}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DocSection>

        <DocDivider />

        <DocSection>
          <DocHeading level={2}>동작 설명</DocHeading>
          <DocList items={[
            "포인터가 컨테이너 크기의 약 22% 반경 내에 진입하면 회피가 시작됩니다.",
            "버튼은 정규화된 도주 벡터와 스프링형 cubic-bezier 트랜지션을 사용해 커서에서 멀어집니다.",
            "bounded=true일 때, 버튼은 단순 클램프 대신 컨테이너 벽에서 튕겨납니다. 이는 모션의 품질을 유지합니다.",
            "클릭이 성공하면 버튼은 그것을 우아하게 인정하고 카운터를 증가시킵니다.",
            "포인터가 떠나면 버튼은 마지막 위치로 돌아갑니다(중앙이 아님). 더 느린 스프링 곡선이 적용됩니다.",
          ]} />
        </DocSection>

        <DocDivider />

        <DocSection>
          <DocHeading level={2}>접근성</DocHeading>
          <DocCallout variant="info">
            이 섹션은 정확하게 작성되었습니다. 접근성 상황은 있는 그대로입니다.
          </DocCallout>

          <DocList items={[
            <><strong>키보드 지원:</strong> 감정적으로 일관되지 않습니다. 버튼은 기술적으로 포커스 가능합니다. 키보드는 회피할 수 없습니다.</>,
            <><strong>스크린 리더:</strong> 버튼으로 안내됩니다. 공간적 불안감은 안내하지 않습니다.</>,
            <><strong>포인터 타겟팅:</strong> 설계상 회피적입니다. 마우스 사용자는 특별히 불리합니다.</>,
            <><strong>ARIA role:</strong> <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">button</code>. 정확합니다.</>,
            <><strong>포커스 관리:</strong> 표준입니다. 포커스 링이 표시되며 올바르게 테마가 적용됩니다.</>,
            <><strong>Reduced motion:</strong> 현재 적용되지 않습니다. 향후 릴리즈에서 <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">prefers-reduced-motion</code> 환경에서는 버튼이 더 천천히 회피하게 될 예정입니다. 여전히 회피는 합니다.</>,
          ]} />
        </DocSection>
      </div>
    </DocsLayout>
  );
}
