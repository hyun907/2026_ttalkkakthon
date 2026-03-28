import { DocsLayout } from "@/components/docs/DocsLayout";
import { Badge } from "@/components/ui/Badge";
import { DocSection, DocHeading, DocParagraph, DocDivider } from "./shared/DocElements";

const PRINCIPLES = [
  {
    number: "01",
    title: "시각적 신뢰, 상호작용 배신",
    body: `사용자는 시각적 접촉 후 50밀리초 안에 신뢰 판단을 내립니다.
    badcn/ui는 그 50밀리초를 현명하게 투자합니다. 간격은 정밀합니다. 타이포그래피는
    의도적입니다. 색상 사용은 신중합니다. 상호작용이 시작될 즈음,
    사용자의 경계심은 완전히 내려가 있습니다. 이것은 우연이 아닙니다.`,
  },
  {
    number: "02",
    title: "형식의 일관성, 동작의 혼돈",
    body: `이 라이브러리의 모든 버튼은 서로 같은 모습을 합니다. 크기 체계,
    라디우스, 그림자, 색상 — 모두 일관됩니다. badcn/ui 인터페이스를 마주한 사용자는
    모든 요소를 정확히 인식할 것입니다. 단지 예상대로 사용하지 못할 뿐입니다.`,
  },
  {
    number: "03",
    title: "세련된 미학, 적대적 어포던스",
    body: `어포던스는 사물의 외형과 기능 사이의 관계입니다. 문 손잡이는 당기는 것을
    유도합니다. 밀기 판은 미는 것을 유도합니다. badcn/ui 컴포넌트는 클릭, 선택,
    제출을 유도합니다. 그 어느 것도 우아하게 허용하지 않습니다.`,
  },
  {
    number: "04",
    title: "부드러운 좌절, 절대 거친 충격 없이",
    body: `적대적 동작은 의도적으로 느껴져야 합니다. 버튼이 움직인다면,
    사려 깊은 스프링 곡선으로 움직여야 합니다. 입력 필드가 저항한다면, 우아하게
    저항해야 합니다. 우리는 조잡한 것을 배포하지 않습니다. 아름다운 방해물을 배포합니다.`,
  },
  {
    number: "05",
    title: "문서는 정직합니다",
    body: `이 라이브러리의 모든 컴포넌트는 정확한 문서와 함께 제공됩니다. 동작 설명은
    정밀하고 완전합니다. 접근성 주석은 사실대로 작성됩니다. 도망가는 버튼의 정확한 문서가
    코미디처럼 읽힌다면, 그것은 사용자의 문제이지 저희 문제가 아닙니다.`,
  },
];

export function DesignPrinciplesPage() {
  return (
    <DocsLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <Badge variant="accent" className="mb-4">개요</Badge>
          <DocHeading level={1}>디자인 원칙</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            모든 컴포넌트 결정의 배경이 되는 철학입니다. 주의 깊게 읽어주세요.
            논리는 내부적으로 일관됩니다.
          </DocParagraph>
        </div>

        {PRINCIPLES.map((p, i) => (
          <div key={p.number}>
            {i > 0 && <DocDivider />}
            <DocSection>
              <div className="flex gap-5 items-start">
                <span className="text-xs font-mono text-muted-foreground mt-1 shrink-0 w-6">
                  {p.number}
                </span>
                <div>
                  <DocHeading level={2}>{p.title}</DocHeading>
                  <DocParagraph>{p.body}</DocParagraph>
                </div>
              </div>
            </DocSection>
          </div>
        ))}

        <DocSection>
          <DocDivider />
          <DocParagraph className="text-muted-foreground italic text-sm">
            이 원칙들은 몇 시간의 신중한 사고 끝에 개발되어 단 하나의 버튼에 적용되었습니다.
            나머지 라이브러리는 적절한 시기에 따라올 것입니다.
          </DocParagraph>
        </DocSection>
      </div>
    </DocsLayout>
  );
}
