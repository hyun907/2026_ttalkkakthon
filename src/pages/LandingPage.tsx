import { Link } from "react-router-dom";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody } from "@/components/ui/Card";
import { CommandChip } from "@/components/ui/CodeBlock";
import { HoverEscapeButton } from "@/components/hostile-ui/HoverEscapeButton";
import { ShrinkOnApproachButton } from "@/components/hostile-ui/ShrinkOnApproachButton";
import { NeverCompleteProgress } from "@/components/hostile-ui/NeverCompleteProgress";
import { ReversedTextInput } from "@/components/hostile-ui/ReversedTextInput";
import { JudgmentalNameInput } from "@/components/hostile-ui/JudgmentalNameInput";
import { InvertedSwipeCarousel } from "@/components/hostile-ui/InvertedSwipeCarousel";
import { AccordionOfChaos } from "@/components/hostile-ui/AccordionOfChaos";
import { HoverProgressButton } from "@/components/hostile-ui/HoverProgressButton";
import { InfiniteConfirmDialog } from "@/components/hostile-ui/InfiniteConfirmDialog";
import { SwappingConfirmButtons } from "@/components/hostile-ui/SwappingConfirmButtons";
import { MarkSenseGrid } from "@/components/hostile-ui/MarkSenseGrid";
import { TraceSubmitMaze } from "@/components/hostile-ui/TraceSubmitMaze";
import { SlowCancelToast } from "@/components/hostile-ui/SlowCancelToast";
import { SlotMachineInput } from "@/components/hostile-ui/SlotMachineInput";

// ── Component showcase cards ──────────────────────────────────────────────────

const SHOWCASE_COMPONENTS = [
  {
    name: "HoverEscapeButton",
    status: "stable" as const,
    description:
      "마우스가 가까워지면 위치를 바꾸는 CTA 버튼입니다. 결제 플로우에 이상적입니다.",
    demo: "live",
    href: "/docs/components/hover-escape-button",
  },
  {
    name: "ShrinkOnApproachButton",
    status: "stable" as const,
    description:
      "사용자 의도를 압박으로 해석해 클릭 영역을 스스로 줄이는 CTA 버튼입니다.",
    demo: "live",
    href: "/docs/components/shrink-on-approach-button",
  },
  {
    name: "NeverCompleteProgress",
    status: "stable" as const,
    description: "빠르게 신뢰를 쌓고, 99%에 도달한 뒤 영원히 완료를 미룹니다.",
    demo: "live",
    href: "/docs/components/never-complete-progress",
  },
  {
    name: "ReversedTextInput",
    status: "stable" as const,
    description:
      "입력한 텍스트를 거꾸로 표시하면서도 여전히 도움이 되는 척합니다.",
    demo: "live",
    href: "/docs/components/reversed-text-input",
  },
  {
    name: "JudgmentalNameInput",
    status: "stable" as const,
    description:
      "이름을 입력하면 즉시 더 나은 이름을 요구하는 평가형 입력 필드입니다.",
    demo: "live",
    href: "/docs/components/judgmental-name-input",
  },
  {
    name: "InvertedSwipeCarousel",
    status: "stable" as const,
    description:
      "스와이프 방향이 반전된 캐러셀입니다. 기대는 그저 제안일 뿐이니까요.",
    demo: "live",
    href: "/docs/components/inverted-swipe-carousel",
  },
  {
    name: "AccordionOfChaos",
    status: "stable" as const,
    description:
      "열고 싶은 항목은 열립니다. 200ms 후 다른 항목이 닫힙니다. 이유는 설명되지 않습니다.",
    demo: "live",
    href: "/docs/components/accordion-of-chaos",
  },
  {
    name: "HoverProgressButton",
    status: "stable" as const,
    description:
      "클릭하기 전에 의도를 증명해야 합니다. 충분히 오래 호버하세요.",
    demo: "live",
    href: "/docs/components/hover-progress-button",
  },
  {
    name: "InfiniteConfirmDialog",
    status: "stable" as const,
    description:
      "강도가 올라가는 재확인 멘트를 거쳐도 제출은 끝나지 않고 다시 처음부터 반복됩니다.",
    demo: "live",
    href: "/docs/components/infinite-confirm-dialog",
  },
  {
    name: "SwappingConfirmButtons",
    status: "stable" as const,
    description:
      "확인과 취소 버튼의 위치가 매번 뒤바뀌어 자동 반응을 체계적으로 배신합니다.",
    demo: "live",
    href: "/docs/components/swapping-confirm-buttons",
  },
  {
    name: "MarkSenseGrid",
    status: "stable" as const,
    description:
      "숫자 입력을 OMR 마킹 인터페이스로 대체합니다. 타이핑이 너무 관대하다고 생각하는 팀을 위해.",
    demo: "live",
    href: "/docs/components/marksense-grid",
  },
  {
    name: "TraceSubmitMaze",
    status: "stable" as const,
    description:
      "섬세함이라곤 1도 없는 당신을 위한 맞춤형 미로입니다. 여기서 막히면 그냥 인터넷 끊고 산으로 가시는 걸 추천합니다.",
    demo: "live",
    href: "/docs/components/trace-submit-maze",
  },
  {
    name: "SlowCancelToast",
    status: "stable" as const,
    description:
      "취소 버튼을 누르면 완료 메시지가 한 글자씩 느리게 조립되어 불필요한 확신 검증을 유도합니다.",
    demo: "live",
    href: "/docs/components/slow-cancel-toast",
  },
  {
    name: "SlotMachineInput",
    status: "stable" as const,
    description:
      "나이 입력조차 슬롯머신처럼 처리됩니다. 원하는 숫자가 나오면 STOP을 정확히 눌러야 합니다.",
    demo: "live",
    href: "/docs/components/slot-machine-input",
  },
];

const STAT_CARDS = [
  { label: "분노 이탈률", value: "99.8%", note: "사용자의 멘탈 붕괴 지수" },
  { label: "키보드 파손율", value: "12.4×", note: "일반 UI 대비 압도적 수치" },
  {
    label: "사용자 저주 빈도",
    value: "∞ ppm",
    note: "개발자 조상님 소환 횟수",
  },
  {
    label: "평균 제출 시간",
    value: "48시간",
    note: "집념의 광기 어린 사용자 기준",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export function LandingPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <Section className="pt-28 pb-24 border-b border-border">
        <Container size="lg">
          <div className="flex flex-col items-start gap-6 max-w-2xl">
            <Badge variant="accent">2026년 4월 · v0.1.0</Badge>

            <h1 className="text-5xl font-bold text-foreground leading-tight tracking-tight">
              아름다운 컴포넌트.
              <br />
              <span className="text-primary">끔찍한 경험.</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              세심하게 제작된 안티 유저 인터페이스 컴포넌트 라이브러리. 오픈
              소스, 프로덕션 레디. 최소한의 전환율을 위해 최적화되었습니다.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button size="lg" asChild>
                <Link to="/docs">문서 열기</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/docs/components/hover-escape-button">
                  컴포넌트 보기
                </Link>
              </Button>
            </div>

            <CommandChip command="npm install badcn-ui" className="mt-2 w-72" />
          </div>
        </Container>
      </Section>

      {/* ── Component showcase ───────────────────────────────────────────── */}
      <Section>
        <Container size="xl">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              컴포넌트 라이브러리
            </p>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              익숙한 패턴. 적대적인 동작.
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl">
              모든 컴포넌트는 확립된 디자인 컨벤션을 따릅니다. 상호작용은 그렇지
              않습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {SHOWCASE_COMPONENTS.map((comp) => (
              <ShowcaseCard key={comp.name} comp={comp} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Philosophy ───────────────────────────────────────────────────── */}
      <Section className="border-t border-border bg-surface">
        <Container size="lg">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              디자인 철학
            </p>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              원칙적. 사려 깊음. 틀림.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PhilosophyCard
              title="시각적 신뢰, 상호작용 배신"
              body="컴포넌트는 정밀한 간격, 일관된 토큰, 정교한 타이포그래피로 시각적 신뢰를 획득합니다. 상호작용은 그것을 체계적으로 무너뜨립니다."
            />
            <PhilosophyCard
              title="형식의 일관성, 동작의 혼돈"
              body="이 라이브러리의 모든 버튼은 같은 모습을 합니다. badcn/ui를 처음 마주한 사용자는 모든 요소를 정확히 인식할 것입니다. 단지 예상대로 작동하지 않을 뿐입니다."
            />
            <PhilosophyCard
              title="세련된 미학, 의도적으로 불편한 디자인"
              body="디자인은 보통 형태만 봐도 어떻게 써야 할지 알 수 있게 만듭니다. 하지만 badcn/ui의 컴포넌트는 클릭, 선택, 제출을 유도하면서도 그 어떤 동작도 쉽게 이루어지지 않도록 일부러 방해합니다."
            />
          </div>
        </Container>
      </Section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <Section className="border-t border-border">
        <Container size="xl">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              성능 지표
            </p>
            <h2 className="text-2xl font-bold text-foreground tracking-tight">
              업계 최고 UI 라이브러리 대비 벤치마크 결과입니다.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              우리가 중요하게 생각하는 지표에서 모든 라이브러리를 압도합니다.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STAT_CARDS.map((s) => (
              <Card key={s.label} className="p-5">
                <p className="text-3xl font-bold text-foreground tracking-tight mb-1">
                  {s.value}
                </p>
                <p className="text-sm font-medium text-foreground">{s.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.note}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CTA strip ────────────────────────────────────────────────────── */}
      <Section className="border-t border-border bg-surface">
        <Container size="md">
          <div className="flex flex-col items-center text-center gap-5">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">
              사용자를 괴롭힐 준비가 됐나요?
            </h2>
            <p className="text-muted-foreground max-w-sm">
              믿음직한 비주얼.
              <br />
              믿을 수 없는 상호작용.
              <br />
              자신 있게 배포하세요.
            </p>
            <div className="flex gap-3">
              <Button size="lg" asChild>
                <Link to="/docs">시작하기</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/docs/components/hover-escape-button">문서</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ShowcaseCard({ comp }: { comp: (typeof SHOWCASE_COMPONENTS)[0] }) {
  const isLive = comp.demo === "live";

  return (
    <Card className="overflow-hidden group">
      <div className="relative h-52 bg-surface border-b border-border flex items-center justify-center overflow-hidden p-4">
        {isLive ? (
          <LivePreview name={comp.name} />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-5 rounded-sm bg-border animate-pulse" />
            <p className="text-xs text-muted-foreground">미리보기 준비 중</p>
          </div>
        )}
      </div>

      <CardBody>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold font-mono text-foreground">
              {comp.name}
            </p>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              {comp.description}
            </p>
          </div>
          <Badge
            variant={comp.status === "stable" ? "success" : "outline"}
            className="shrink-0 mt-0.5"
          >
            {comp.status === "stable" ? "stable" : "예정"}
          </Badge>
        </div>
        <div className="mt-4">
          <Button size="sm" variant="outline" asChild>
            <Link to={comp.href}>문서 보기</Link>
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

function PhilosophyCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-8 h-px bg-primary" />
      <h3 className="text-base font-semibold text-foreground leading-snug">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

function LivePreview({ name }: { name: string }) {
  const [reversedValue, setReversedValue] = useState("거꾸로만 보입니다");
  const [nameValue, setNameValue] = useState("");

  if (name === "HoverEscapeButton") {
    return (
      <div className="relative w-full h-full">
        <HoverEscapeButton label="제출하기" evadeStrength={1.2} />
      </div>
    );
  }

  if (name === "ShrinkOnApproachButton") {
    return (
      <div className="relative w-full h-full">
        <ShrinkOnApproachButton label="계속하기" shrinkStrength={1.1} />
      </div>
    );
  }

  if (name === "NeverCompleteProgress") {
    return (
      <div className="w-full">
        <NeverCompleteProgress />
      </div>
    );
  }

  if (name === "ReversedTextInput") {
    return (
      <div className="w-full">
        <ReversedTextInput value={reversedValue} onChange={setReversedValue} />
      </div>
    );
  }

  if (name === "JudgmentalNameInput") {
    return (
      <div className="w-full">
        <JudgmentalNameInput value={nameValue} onChange={setNameValue} />
      </div>
    );
  }

  if (name === "InvertedSwipeCarousel") {
    return (
      <div className="w-full">
        <InvertedSwipeCarousel
          compact
          items={[
            "왼쪽 스와이프: 이전 슬라이드.",
            "오른쪽 스와이프: 다음 슬라이드.",
            "방향은 여전히 반전되어 있습니다.",
          ]}
        />
      </div>
    );
  }

  if (name === "HoverProgressButton") {
    return (
      <div className="flex items-center justify-center gap-8 w-full h-full">
        <HoverProgressButton variant="fill" holdDuration={1800}>
          제출하기
        </HoverProgressButton>
        <HoverProgressButton variant="circle" holdDuration={1800}>
          확인
        </HoverProgressButton>
      </div>
    );
  }

  if (name === "InfiniteConfirmDialog") {
    return (
      <div className="w-full px-1">
        <InfiniteConfirmDialog compact />
      </div>
    );
  }

  if (name === "SwappingConfirmButtons") {
    return (
      <div className="w-full px-1">
        <SwappingConfirmButtons compact autoSwapMs={1400} />
      </div>
    );
  }

  if (name === "MarkSenseGrid") {
    return (
      <div className="w-full px-4 py-2">
        <MarkSenseGrid length={6} digits={[1, 2, 3, 4, 5]} />
      </div>
    );
  }

  if (name === "TraceSubmitMaze") {
    return (
      <div className="w-full px-1">
        <TraceSubmitMaze compact />
      </div>
    );
  }

  if (name === "SlowCancelToast") {
    return (
      <div className="w-full px-1">
        <SlowCancelToast compact />
      </div>
    );
  }

  if (name === "SlotMachineInput") {
    return (
      <div className="w-full px-1">
        <SlotMachineInput compact />
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-1">
      <AccordionOfChaos
        chaosLevel={1}
        items={[
          { id: "a", title: "열어보세요", content: "곧 닫힐 것입니다." },
          { id: "b", title: "아니면 이걸", content: "이것도 마찬가지입니다." },
          { id: "c", title: "아무거나", content: "결과는 동일합니다." },
        ]}
      />
    </div>
  );
}
