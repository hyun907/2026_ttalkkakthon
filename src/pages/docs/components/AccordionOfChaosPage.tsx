import { DocsLayout } from "@/components/docs/DocsLayout";
import { DemoFrame } from "@/components/docs/DemoFrame";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import { AccordionOfChaos } from "@/components/hostile-ui/AccordionOfChaos";
import {
  DocSection,
  DocHeading,
  DocParagraph,
  DocList,
  DocDivider,
  DocCallout,
} from "../shared/DocElements";

// ── Demo data ─────────────────────────────────────────────────────────────────

const DEMO_ITEMS = [
  {
    id: "1",
    title: "이게 뭔가요?",
    content: "시각적으로 안정적이고, 감정적으로는 불안정한 아코디언입니다.",
  },
  {
    id: "2",
    title: "어떻게 작동하나요?",
    content: "작동하지 않습니다. 신뢰할 수 있는 방식으로는요.",
  },
  {
    id: "3",
    title: "제가 제어할 수 있나요?",
    content: "시도해볼 수 있습니다.",
  },
  {
    id: "4",
    title: "접근 가능한가요?",
    content: "감정적으로는요? 아닙니다.",
  },
];

// ── Code samples ──────────────────────────────────────────────────────────────

const BASIC_USAGE = `import { AccordionOfChaos } from "badcn-ui"

export function Example() {
  return (
    <AccordionOfChaos
      items={[
        { id: "1", title: "이게 뭔가요?",    content: "시각적으로 안정적인 아코디언입니다." },
        { id: "2", title: "어떻게 작동하나요?", content: "신뢰할 수 없는 방식으로요." },
        { id: "3", title: "제어할 수 있나요?", content: "시도해볼 수 있습니다." },
        { id: "4", title: "접근 가능한가요?",  content: "감정적으로는? 아닙니다." },
      ]}
      chaosLevel={1}
    />
  )
}`;

const CHAOS_LEVELS = `// 정상 아코디언
<AccordionOfChaos items={items} chaosLevel={0} />

// 50% 확률로 혼돈 발생
<AccordionOfChaos items={items} chaosLevel={0.5} />

// 항상 혼돈 (기본값: 0.8)
<AccordionOfChaos items={items} chaosLevel={1} />`;

const MAX_OPEN = `// 최대 2개까지만 열릴 수 있지만,
// 혼돈이 이 숫자를 더 낮출 수 있습니다.
<AccordionOfChaos
  items={items}
  maxOpen={2}
  chaosLevel={0.6}
/>`;

// ── Props ─────────────────────────────────────────────────────────────────────

const PROPS = [
  {
    name: "items",
    type: "AccordionItemData[]",
    default: "—",
    description: "렌더링할 아코디언 항목의 배열입니다.",
  },
  {
    name: "defaultOpenIds",
    type: "string[]",
    default: "[]",
    description: "초기 렌더링 시 열려 있을 항목의 id 목록입니다.",
  },
  {
    name: "maxOpen",
    type: "number",
    default: "undefined",
    description:
      "동시에 열릴 수 있는 최대 항목 수입니다. 혼돈으로 인해 이 수치 아래로 내려갈 수 있습니다.",
  },
  {
    name: "chaosLevel",
    type: "number",
    default: "0.8",
    description: "혼돈 발동 확률 (0~1). 0 = 정상 동작, 1 = 항상 혼돈.",
  },
  {
    name: "className",
    type: "string",
    default: "—",
    description: "루트 컨테이너에 적용되는 추가 클래스입니다.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export function AccordionOfChaosPage() {
  return (
    <DocsLayout>
      <div className="max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">컴포넌트</Badge>
            <Badge variant="success">Stable</Badge>
          </div>
          <DocHeading level={1}>AccordionOfChaos</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            시각적으로 안정적이고, 상태 관리는 감정적으로 불안정한 아코디언입니다.
            열려는 항목은 항상 열립니다. 그 직후에 무언가가 닫힐 뿐입니다.
          </DocParagraph>
        </div>

        {/* Demo */}
        <DocSection>
          <DocHeading level={2}>데모</DocHeading>
          <DocParagraph>
            항목을 클릭해보세요. 아코디언은 당신의 선택을 존중합니다. 약 200ms 동안은요.
          </DocParagraph>
          <DemoFrame label="AccordionOfChaos.tsx" height="h-auto" className="my-5">
            <div className="w-full p-5">
              <AccordionOfChaos items={DEMO_ITEMS} chaosLevel={1} />
            </div>
          </DemoFrame>
        </DocSection>

        <DocDivider />

        {/* Installation */}
        <DocSection>
          <DocHeading level={2}>설치</DocHeading>
          <CodeBlock code="npm install badcn-ui" language="bash" className="my-4" />
        </DocSection>

        {/* Basic usage */}
        <DocSection>
          <DocHeading level={2}>사용법</DocHeading>
          <DocParagraph>
            각 항목은{" "}
            <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">id</code>,{" "}
            <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">title</code>,{" "}
            <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">content</code>를
            받습니다.{" "}
            <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">content</code>는
            임의의 ReactNode를 허용합니다.
          </DocParagraph>
          <CodeBlock code={BASIC_USAGE} language="tsx" className="my-4" />
        </DocSection>

        {/* Chaos levels */}
        <DocSection>
          <DocHeading level={2}>혼돈 강도 조절</DocHeading>
          <DocParagraph>
            <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">chaosLevel</code>은
            0~1 사이의 값으로 혼돈 발동 확률을 제어합니다.
            0이면 정상적인 아코디언, 1이면 매번 혼돈이 발생합니다.
          </DocParagraph>
          <CodeBlock code={CHAOS_LEVELS} language="tsx" className="my-4" />
        </DocSection>

        {/* maxOpen */}
        <DocSection>
          <DocHeading level={2}>최대 열림 수 제한</DocHeading>
          <DocParagraph>
            <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">maxOpen</code>을
            설정하면 열릴 수 있는 항목 수에 상한이 생깁니다. 단, 혼돈이 이 숫자를
            더 낮출 수 있습니다. 최솟값을 보장하지는 않습니다.
          </DocParagraph>
          <CodeBlock code={MAX_OPEN} language="tsx" className="my-4" />
        </DocSection>

        <DocDivider />

        {/* Props table */}
        <DocSection>
          <DocHeading level={2}>Props</DocHeading>
          <div className="mt-4 rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-2">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Prop
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Default
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">
                    설명
                  </th>
                </tr>
              </thead>
              <tbody>
                {PROPS.map((prop, i) => (
                  <tr
                    key={prop.name}
                    className={i > 0 ? "border-t border-border" : ""}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-foreground">
                      {prop.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {prop.type}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {prop.default}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell">
                      {prop.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DocSection>

        <DocDivider />

        {/* Behavior notes */}
        <DocSection>
          <DocHeading level={2}>동작 설명</DocHeading>
          <DocCallout variant="info">
            이 섹션은 정확합니다. 동작 자체가 그렇지 않습니다.
          </DocCallout>
          <DocList
            items={[
              "항목 클릭 → 즉시 열림. 이 부분은 신뢰할 수 있습니다.",
              "열림 직후 160~240ms 뒤, 혼돈이 발동됩니다. 이 딜레이는 의도적입니다 — 사용자가 성공을 인식한 뒤 빼앗깁니다.",
              "혼돈은 현재 열려 있는 다른 항목 중 하나를 균등한 확률로 선택해 닫습니다.",
              "다른 열린 항목이 없으면, 방금 열린 항목 자체를 닫습니다. chaosLevel=1일 때 클릭이 아무 효과도 없는 것처럼 느껴지는 이유입니다.",
              "닫기는 항상 즉시 적용되며 혼돈이 없습니다. 닫는 사람은 당신이니까요.",
              "maxOpen 제한은 혼돈보다 먼저 적용됩니다. 두 제약 모두 항목 수를 줄이는 방향으로 작동합니다.",
              "애니메이션은 CSS grid-template-rows 트릭을 사용합니다. JS로 높이를 측정하지 않으며 레이아웃 시프트가 없습니다.",
            ]}
          />
        </DocSection>

        <DocDivider />

        {/* Accessibility */}
        <DocSection>
          <DocHeading level={2}>접근성</DocHeading>
          <DocCallout variant="warning">
            구조는 올바릅니다. 결과는 올바르지 않습니다.
          </DocCallout>
          <DocList
            items={[
              <>
                <strong>키보드 탐색:</strong> Tab으로 포커스 이동이 가능합니다.
                Enter/Space로 항목을 열 수 있습니다. 혼돈은 키보드도 존중하지 않습니다.
              </>,
              <>
                <strong>aria-expanded:</strong> 각 버튼에 정확히 반영됩니다. 상태가 변경되기 전까지는요.
              </>,
              <>
                <strong>role="region":</strong> 각 콘텐츠 패널에 설정되어 있습니다. 스크린 리더는
                패널을 인식합니다. 패널이 사라지는 이유는 안내하지 않습니다.
              </>,
              <>
                <strong>포커스 관리:</strong> 포커스 링이 표시되며 올바르게 테마가 적용됩니다.
                포커스된 항목이 닫혀도 포커스는 이동하지 않습니다. 사용자가 직접 처리해야 합니다.
              </>,
            ]}
          />
        </DocSection>
      </div>
    </DocsLayout>
  );
}
