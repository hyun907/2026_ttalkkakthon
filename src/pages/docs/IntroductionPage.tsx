import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocSection, DocHeading, DocParagraph, DocList } from "./shared/DocElements";

export function IntroductionPage() {
  return (
    <DocsLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <Badge variant="accent" className="mb-4">개요</Badge>
          <DocHeading level={1}>소개</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            badcn/ui는 React 애플리케이션을 위한 오픈 소스 컴포넌트 라이브러리입니다.
            접근 가능하고 커스터마이징 가능한 UI 기본 요소를 제공합니다 — 각각 시각적으로
            신뢰할 수 있는 상대와 구분이 불가능하며, 동작 방식은 즉시 알아채실 것입니다.
          </DocParagraph>
        </div>

        <DocSection>
          <DocHeading level={2}>이게 뭔가요?</DocHeading>
          <DocParagraph>
            대부분의 컴포넌트 라이브러리는 사용자가 작업을 효율적으로 완료하도록 설계됩니다.
            badcn/ui는 다른 성공 기준을 염두에 두고 만들어졌습니다.
          </DocParagraph>
          <DocParagraph>
            이 라이브러리의 모든 컴포넌트는 진지한 디자인 시스템에서 기대할 수 있는
            프로덕션 품질 기준으로 제작됩니다: 시맨틱 토큰, 접근 가능한 마크업,
            일관된 크기 체계, 문서화된 API. 그 결과로 만들어지는 경험은 사용자 친화적이라고
            부르기 어렵습니다.
          </DocParagraph>
          <DocParagraph>
            의도된 결과입니다.
          </DocParagraph>
        </DocSection>

        <DocSection>
          <DocHeading level={2}>핵심 원칙</DocHeading>
          <DocList items={[
            "시각적 신뢰성은 협상 불가입니다. 모든 컴포넌트는 5초 디자인 리뷰를 통과해야 합니다.",
            "상호작용 실패는 매끄러워야 합니다. 좌절감은 부드럽고, 세련되고, 불가피하게 느껴져야 합니다.",
            "접근성 주석은 포함되며 성실하게 작성됩니다. 키보드 지원은 정확하게 기술됩니다.",
            "문서는 정확합니다. 동작 방식이 적대적이라는 사실도 정확하게 기술됩니다.",
          ]} />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>누구를 위한 건가요?</DocHeading>
          <DocParagraph>
            badcn/ui가 적합한 경우:
          </DocParagraph>
          <DocList items={[
            "만우절 릴리즈",
            "완전히 통제하는 내부 도구",
            "하면 안 되는 것의 데모",
            "UX가 없는 경험을 통해 UX의 중요성을 이해하고 싶은 분",
          ]} />
        </DocSection>

        <div className="flex items-center gap-3 mt-10 pt-6 border-t border-border">
          <Button variant="primary" size="md" asChild>
            <Link to="/docs/getting-started">시작하기</Link>
          </Button>
          <Button variant="ghost" size="md" asChild>
            <Link to="/docs/components/hover-escape-button">컴포넌트 둘러보기 →</Link>
          </Button>
        </div>
      </div>
    </DocsLayout>
  );
}
