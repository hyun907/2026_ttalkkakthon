import { DocsLayout } from "@/components/docs/DocsLayout";
import { CodeBlock, CommandChip } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import { DocSection, DocHeading, DocParagraph, DocCallout } from "./shared/DocElements";

const INSTALL_NPM = `npm install badcn-ui`;
const INSTALL_PNPM = `pnpm add badcn-ui`;
const INSTALL_YARN = `yarn add badcn-ui`;

const IMPORT_EXAMPLE = `import { HoverEscapeButton } from "badcn-ui"

export function CheckoutPage() {
  return (
    <div className="relative w-full h-64 overflow-hidden">
      <HoverEscapeButton
        label="결제 완료"
        evadeStrength={1.8}
      />
    </div>
  )
}`;

const CSS_IMPORT = `// 루트 CSS 또는 엔트리 파일에 추가:
@import "badcn-ui/styles/tokens.css";`;

export function GettingStartedPage() {
  return (
    <DocsLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <Badge variant="accent" className="mb-4">개요</Badge>
          <DocHeading level={1}>시작하기</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            몇 분이면 설치할 수 있습니다. 후회는 천천히 하셔도 됩니다.
          </DocParagraph>
        </div>

        <DocSection>
          <DocHeading level={2}>요구 사항</DocHeading>
          <DocParagraph>
            badcn/ui는 Tailwind CSS 3.4+를 사용하는 React 18+ 애플리케이션을 위해
            설계되었습니다. TypeScript 지원이 내장되어 있으며 권장됩니다.
          </DocParagraph>
        </DocSection>

        <DocSection>
          <DocHeading level={2}>설치</DocHeading>
          <DocParagraph>원하는 패키지 레지스트리에서 설치하세요.</DocParagraph>

          <div className="flex flex-col gap-2 my-5">
            <CommandChip command={INSTALL_NPM} />
            <CommandChip command={INSTALL_PNPM} />
            <CommandChip command={INSTALL_YARN} />
          </div>

          <DocCallout variant="warning">
            이 패키지는 아직 배포되지 않았습니다. 현재 형태로 존재하는 것 자체가 경고입니다.
          </DocCallout>
        </DocSection>

        <DocSection>
          <DocHeading level={2}>스타일 가져오기</DocHeading>
          <DocParagraph>
            애플리케이션 루트에서 디자인 토큰 스타일시트를 한 번 가져옵니다.
            컴포넌트 라이브러리에서 사용하는 모든 CSS 커스텀 속성을 제공합니다.
          </DocParagraph>
          <CodeBlock code={CSS_IMPORT} language="css" className="my-5" />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>사용법</DocHeading>
          <DocParagraph>
            패키지 루트에서 직접 컴포넌트를 가져옵니다. 각 컴포넌트는 개별적으로
            트리 쉐이킹이 가능합니다.
          </DocParagraph>
          <CodeBlock code={IMPORT_EXAMPLE} language="tsx" className="my-5" />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>Tailwind 설정</DocHeading>
          <DocParagraph>
            badcn/ui는 시맨틱 컬러 토큰으로 Tailwind 기본 테마를 확장합니다.
            컴포넌트 스타일이 올바르게 적용되려면 라이브러리를{" "}
            <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">content</code>{" "}
            경로에 추가하세요:
          </DocParagraph>
          <CodeBlock
            code={`// tailwind.config.ts
export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/badcn-ui/src/**/*.{ts,tsx}",
  ],
  // ...
}`}
            language="ts"
            className="my-5"
          />
        </DocSection>
      </div>
    </DocsLayout>
  );
}
