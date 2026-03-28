import { DocsLayout } from "@/components/docs/DocsLayout";
import { DemoFrame } from "@/components/docs/DemoFrame";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import { HoverProgressButton } from "@/components/hostile-ui/HoverProgressButton";
import {
  DocSection,
  DocHeading,
  DocParagraph,
  DocList,
  DocDivider,
  DocCallout,
} from "../shared/DocElements";

// ── Code samples ──────────────────────────────────────────────────────────────

const BASIC_USAGE = `import { HoverProgressButton } from "badcn-ui"

// fill 변형 — 내부 게이지
<HoverProgressButton variant="fill" holdDuration={1800}>
  제출하기
</HoverProgressButton>

// circle 변형 — 원형 링
<HoverProgressButton variant="circle" holdDuration={1800}>
  확인
</HoverProgressButton>`;

const RESET_EXAMPLE = `// 마우스가 떠나도 진행 유지
<HoverProgressButton
  variant="fill"
  resetOnLeave={false}
  holdDuration={2000}
>
  주문하기
</HoverProgressButton>`;

const CLICK_HANDLER = `<HoverProgressButton
  variant="fill"
  holdDuration={1500}
  onClick={() => console.log("드디어 클릭됨")}
  autoResetAfterClick={true}
>
  결제하기
</HoverProgressButton>`;

// ── Props ─────────────────────────────────────────────────────────────────────

const PROPS = [
  {
    name: "children",
    type: "ReactNode",
    default: "—",
    description: "버튼 레이블 콘텐츠입니다.",
  },
  {
    name: "variant",
    type: '"fill" | "circle"',
    default: '"fill"',
    description: "진행 표시 방식입니다. fill=내부 게이지, circle=원형 링.",
  },
  {
    name: "holdDuration",
    type: "number",
    default: "1800",
    description: "버튼이 활성화되기까지 필요한 호버 유지 시간(ms)입니다.",
  },
  {
    name: "onClick",
    type: "() => void",
    default: "—",
    description: "진행이 완료된 후 버튼 클릭 시 호출되는 콜백입니다.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "버튼을 비활성화합니다.",
  },
  {
    name: "resetOnLeave",
    type: "boolean",
    default: "true",
    description:
      "마우스가 버튼을 벗어나면 진행 상태를 초기화합니다. false로 설정하면 중단된 지점부터 재개됩니다.",
  },
  {
    name: "autoResetAfterClick",
    type: "boolean",
    default: "true",
    description: "클릭이 발생한 후 자동으로 진행 상태를 초기화합니다.",
  },
  {
    name: "className",
    type: "string",
    default: "—",
    description: "버튼 요소에 적용되는 추가 클래스입니다.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export function HoverProgressButtonPage() {
  return (
    <DocsLayout>
      <div className="max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">컴포넌트</Badge>
            <Badge variant="success">Stable</Badge>
          </div>
          <DocHeading level={1}>HoverProgressButton</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            클릭하기 전에 먼저 의도를 증명해야 하는 버튼입니다. 충분히 오래
            호버해야만 활성화됩니다. 기다림은 헌신의 증거입니다.
          </DocParagraph>
        </div>

        {/* Demo — fill */}
        <DocSection>
          <DocHeading level={2}>데모 — fill 변형</DocHeading>
          <DocParagraph>
            버튼 내부에서 게이지가 왼쪽에서 오른쪽으로 차오릅니다. 마우스를
            올리고 기다리세요.
          </DocParagraph>
          <DemoFrame label="variant='fill'" className="my-5">
            <div className="flex flex-col items-center justify-center gap-6 p-8">
              <HoverProgressButton variant="fill" holdDuration={1800}>
                제출하기
              </HoverProgressButton>
              <HoverProgressButton variant="fill" holdDuration={1200}>
                계속하기
              </HoverProgressButton>
            </div>
          </DemoFrame>
        </DocSection>

        {/* Demo — circle */}
        <DocSection>
          <DocHeading level={2}>데모 — circle 변형</DocHeading>
          <DocParagraph>
            원형 SVG 링이 버튼을 둘러쌉니다. 링이 완성되면 버튼을 클릭할 수
            있습니다.
          </DocParagraph>
          <DemoFrame label="variant='circle'" className="my-5">
            <div className="flex items-center justify-center gap-10 p-8">
              <HoverProgressButton variant="circle" holdDuration={1800}>
                확인
              </HoverProgressButton>
              <HoverProgressButton variant="circle" holdDuration={3000}>
                삭제
              </HoverProgressButton>
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
            두 가지 변형 모두 동일한 API를 공유합니다.{" "}
            <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
              variant
            </code>
            로 시각적 스타일을 선택하고,{" "}
            <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
              holdDuration
            </code>
            으로 기다림의 강도를 조절하세요.
          </DocParagraph>
          <CodeBlock code={BASIC_USAGE} language="tsx" className="my-4" />
        </DocSection>

        {/* resetOnLeave */}
        <DocSection>
          <DocHeading level={2}>진행 유지 모드</DocHeading>
          <DocParagraph>
            기본값인{" "}
            <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
              resetOnLeave=true
            </code>
            는 마우스가 이탈하면 진행이 초기화됩니다. 더 잔인한 버전을 원한다면
            false로 설정하세요 — 진행은 중단된 지점부터 재개됩니다. 이 경우
            사용자는 브라우저를 닫거나 포기하는 것 외에는 선택지가 없습니다.
          </DocParagraph>
          <CodeBlock code={RESET_EXAMPLE} language="tsx" className="my-4" />
        </DocSection>

        {/* onClick */}
        <DocSection>
          <DocHeading level={2}>클릭 핸들러</DocHeading>
          <DocParagraph>
            진행이 100%에 도달한 뒤 버튼을 클릭하면{" "}
            <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
              onClick
            </code>
            이 호출됩니다. 진행이 완료되기 전에는 클릭해도 아무 일도 일어나지
            않습니다. 이건 버그가 아닙니다.
          </DocParagraph>
          <CodeBlock code={CLICK_HANDLER} language="tsx" className="my-4" />
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
            버튼은 기다림에 보상합니다. 단지 오래 기다려야 할 뿐입니다.
          </DocCallout>
          <DocList
            items={[
              "포인터가 버튼 위에 올라오면 requestAnimationFrame 루프가 시작됩니다. 진행은 매 프레임 업데이트됩니다.",
              "progress가 1.0에 도달하면 버튼이 '잠금 해제' 상태가 됩니다. 이 시점부터 클릭이 동작합니다.",
              "잠금 해제 전에는 클릭해도 onClick이 호출되지 않습니다. 커서는 default로 유지됩니다.",
              "resetOnLeave=true(기본값)일 때 마우스가 이탈하면 진행이 0으로 초기화됩니다. 사용자는 처음부터 다시 시작해야 합니다.",
              "circle 변형은 고정 크기(80px) SVG 링을 사용합니다. 버튼은 링 안에 원형으로 렌더링됩니다.",
              "상태 텍스트('의도 확인 중...' / '확인됨 — 클릭하세요')는 CSS opacity 전환으로 부드럽게 나타납니다.",
            ]}
          />
        </DocSection>

        <DocDivider />

        {/* Accessibility */}
        <DocSection>
          <DocHeading level={2}>접근성</DocHeading>
          <DocCallout variant="warning">
            키보드 사용자는 호버할 수 없습니다. 이것은 알려진 문제입니다.
            수정 계획은 없습니다.
          </DocCallout>
          <DocList
            items={[
              <>
                <strong>키보드 접근성:</strong> Tab으로 포커스는 이동합니다. 하지만
                포인터가 없으면 진행이 시작되지 않습니다. 키보드 사용자는 영원히
                기다려야 합니다.
              </>,
              <>
                <strong>disabled 상태:</strong> HTML disabled 속성이 올바르게 적용됩니다.
                스크린 리더는 비활성화를 인식합니다. 왜 비활성화된지는 설명하지
                않습니다.
              </>,
              <>
                <strong>포커스 링:</strong> 표시됩니다. 포커스한 뒤 어디로도 이동할
                수 없는 경우에도 마찬가지입니다.
              </>,
            ]}
          />
        </DocSection>
      </div>
    </DocsLayout>
  );
}
