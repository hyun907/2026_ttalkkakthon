import { useState } from "react";
import { DocsLayout } from "@/components/docs/DocsLayout";
import { DemoFrame } from "@/components/docs/DemoFrame";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import { MarkSenseGrid } from "@/components/hostile-ui/MarkSenseGrid";
import {
  DocSection,
  DocHeading,
  DocParagraph,
  DocList,
  DocDivider,
  DocCallout,
} from "../shared/DocElements";

// ── Code samples ──────────────────────────────────────────────────────────────

const PHONE_USAGE = `import { MarkSenseGrid } from "badcn-ui"

<MarkSenseGrid
  label="Phone verification"
  description="Mark each digit carefully."
  length={11}
  segmented
  segmentPattern={[3, 4, 4]}
  onComplete={(value) => console.log(value)}
/>`;

const OTP_USAGE = `// OTP 인증 코드
<MarkSenseGrid
  label="Verification code"
  description="Enter the 6-digit code you received."
  length={6}
  onComplete={(value) => console.log(value)}
/>`;

const ACCOUNT_USAGE = `// 계좌번호
<MarkSenseGrid
  label="Account number"
  length={14}
  segmented
  segmentPattern={[4, 4, 6]}
  onChange={(v) => console.log("partial:", v)}
  onComplete={(v) => console.log("complete:", v)}
/>`;

// ── Props ─────────────────────────────────────────────────────────────────────

const PROPS = [
  {
    name: "length",
    type: "number",
    default: "—",
    description: "입력할 자릿수. 각 자리마다 0~9 버블 열이 렌더링됩니다.",
  },
  {
    name: "label",
    type: "string",
    default: "—",
    description: "그리드 상단에 표시되는 레이블입니다.",
  },
  {
    name: "description",
    type: "string",
    default: "—",
    description: "레이블 아래 보조 설명 텍스트입니다.",
  },
  {
    name: "value",
    type: "string",
    default: "—",
    description: "제어 컴포넌트로 사용할 경우 외부에서 주입하는 현재 값입니다.",
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    default: "—",
    description: "선택이 변경될 때마다 현재 입력된 숫자 문자열로 호출됩니다.",
  },
  {
    name: "onComplete",
    type: "(value: string) => void",
    default: "—",
    description: "모든 열이 채워지면 완성된 값으로 한 번 호출됩니다.",
  },
  {
    name: "segmented",
    type: "boolean",
    default: "false",
    description: "segmentPattern에 따라 열을 시각적으로 그룹화합니다.",
  },
  {
    name: "segmentPattern",
    type: "number[]",
    default: "—",
    description: "각 세그먼트의 열 개수. 예: [3,4,4]는 전화번호 형식.",
  },
  {
    name: "strictMode",
    type: "boolean",
    default: "false",
    description:
      "true일 경우 이전 열이 채워지지 않으면 다음 열을 선택할 수 없습니다. 잠긴 열은 흐리게 표시됩니다.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "전체 그리드를 비활성화합니다.",
  },
  {
    name: "className",
    type: "string",
    default: "—",
    description: "루트 컨테이너에 적용되는 추가 클래스입니다.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export function MarkSenseGridPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [account, setAccount] = useState("");

  return (
    <DocsLayout>
      <div className="max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">컴포넌트</Badge>
            <Badge variant="success">Stable</Badge>
          </div>
          <DocHeading level={1}>MarkSenseGrid</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            타이핑이 너무 관대하다고 생각하는 팀을 위한 정밀 기반 숫자 입력
            컴포넌트. 각 자리마다 버블을 하나씩 선택해 숫자를 입력합니다.
            마킹 정확도는 공동 책임이나, 주로 사용자의 몫입니다.
          </DocParagraph>
        </div>

        {/* Demo 1 — phone */}
        <DocSection>
          <DocHeading level={2}>데모 — 전화번호 (strictMode)</DocHeading>
          <DocParagraph>
            앞 열을 채우지 않으면 뒷 열을 선택할 수 없습니다. 잠긴 열은 흐리게 표시됩니다.
          </DocParagraph>
          <DemoFrame label="전화번호 · strictMode · segmentPattern=[3,4,4]" height="h-auto" className="my-5">
            <div className="p-6 w-full">
              <MarkSenseGrid
                label="Phone verification"
                description="Mark each digit carefully. Columns unlock sequentially."
                length={11}
                segmented
                segmentPattern={[3, 4, 4]}
                strictMode
                value={phone}
                onChange={setPhone}
              />
            </div>
          </DemoFrame>
        </DocSection>

        {/* Demo 2 — OTP */}
        <DocSection>
          <DocHeading level={2}>데모 — OTP 인증 코드</DocHeading>
          <DemoFrame label="OTP · length=6" height="h-auto" className="my-5">
            <div className="p-6 w-full">
              <MarkSenseGrid
                label="Verification code"
                description="Enter the 6-digit code you received."
                length={6}
                value={otp}
                onChange={setOtp}
              />
            </div>
          </DemoFrame>
        </DocSection>

        {/* Demo 3 — account */}
        <DocSection>
          <DocHeading level={2}>데모 — 계좌번호</DocHeading>
          <DemoFrame label="계좌번호 · segmentPattern=[4,4,6]" height="h-auto" className="my-5">
            <div className="p-6 w-full">
              <MarkSenseGrid
                label="Account number"
                description="Mark carefully."
                length={14}
                segmented
                segmentPattern={[4, 4, 6]}
                value={account}
                onChange={setAccount}
              />
            </div>
          </DemoFrame>
        </DocSection>

        <DocDivider />

        {/* Installation */}
        <DocSection>
          <DocHeading level={2}>설치</DocHeading>
          <CodeBlock code="npm install badcn-ui" language="bash" className="my-4" />
        </DocSection>

        {/* Usage */}
        <DocSection>
          <DocHeading level={2}>사용법</DocHeading>
          <DocParagraph>전화번호 입력 예제:</DocParagraph>
          <CodeBlock code={PHONE_USAGE} language="tsx" className="my-4" />
          <DocParagraph>OTP 인증 코드 예제:</DocParagraph>
          <CodeBlock code={OTP_USAGE} language="tsx" className="my-4" />
          <DocParagraph>계좌번호 예제:</DocParagraph>
          <CodeBlock code={ACCOUNT_USAGE} language="tsx" className="my-4" />
        </DocSection>

        <DocDivider />

        {/* Props table */}
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
                    <td className="px-4 py-3 font-mono text-xs text-foreground whitespace-nowrap">{prop.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">{prop.type}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{prop.default}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell">{prop.description}</td>
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
          <DocList
            items={[
              "각 열에는 0~9 버블이 세로로 나열됩니다. 열당 하나만 선택할 수 있습니다.",
              "이미 선택된 버블을 다시 클릭하면 선택이 해제됩니다. 단, strictMode에서 이전 열이 비워지면 이후 열이 잠깁니다.",
              "strictMode=true일 경우 첫 번째 빈 열 이후의 모든 열이 잠깁니다. 잠긴 열은 시각적으로 흐리게 표시되며 클릭되지 않습니다.",
              "모든 열이 채워지면 onChange와 onComplete가 호출됩니다.",
              "segmented=true + segmentPattern을 사용하면 열을 그룹화하고 구분자를 표시합니다.",
              "하단 미리보기 스트립에서 현재 입력 상태를 확인할 수 있습니다. 미선택 자리는 · 로 표시됩니다.",
            ]}
          />
        </DocSection>

        <DocDivider />

        {/* Accessibility */}
        <DocSection>
          <DocHeading level={2}>접근성</DocHeading>
          <DocCallout variant="warning">
            구조는 올바릅니다. 사용 경험은 그렇지 않습니다.
          </DocCallout>
          <DocList
            items={[
              <>
                <strong>시맨틱 버튼:</strong> 각 버블은{" "}
                <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">button</code>{" "}
                요소로 렌더링됩니다. aria-label에 "Digit 5 for position 3" 형식의 설명이 포함됩니다.
              </>,
              <>
                <strong>aria-pressed:</strong> 선택된 버블에 정확히 반영됩니다.
              </>,
              <>
                <strong>키보드 탐색:</strong> Tab으로 버블 간 이동이 가능합니다. Enter/Space로 선택할 수 있습니다.
                단, 자릿수가 11개라면 최대 110번의 Tab이 필요합니다.
              </>,
            ]}
          />
        </DocSection>
      </div>
    </DocsLayout>
  );
}
