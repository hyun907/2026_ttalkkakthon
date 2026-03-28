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
        label="Complete Purchase"
        evadeStrength={1.8}
      />
    </div>
  )
}`;

const CSS_IMPORT = `// In your root CSS or entry file:
@import "badcn-ui/styles/tokens.css";`;

export function GettingStartedPage() {
  return (
    <DocsLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <Badge variant="accent" className="mb-4">Overview</Badge>
          <DocHeading level={1}>Getting Started</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            Install badcn/ui in minutes. Regret the decision at your own pace.
          </DocParagraph>
        </div>

        <DocSection>
          <DocHeading level={2}>Requirements</DocHeading>
          <DocParagraph>
            badcn/ui is designed for React 18+ applications with Tailwind CSS 3.4+.
            TypeScript support is built-in and encouraged.
          </DocParagraph>
        </DocSection>

        <DocSection>
          <DocHeading level={2}>Installation</DocHeading>
          <DocParagraph>Install the package from the registry of your choice.</DocParagraph>

          <div className="flex flex-col gap-2 my-5">
            <CommandChip command={INSTALL_NPM} />
            <CommandChip command={INSTALL_PNPM} />
            <CommandChip command={INSTALL_YARN} />
          </div>

          <DocCallout variant="warning">
            This package is not yet published. It exists in its current form as a warning.
          </DocCallout>
        </DocSection>

        <DocSection>
          <DocHeading level={2}>Import styles</DocHeading>
          <DocParagraph>
            Import the design token stylesheet once at your application root. This provides
            all CSS custom properties used by the component library.
          </DocParagraph>
          <CodeBlock code={CSS_IMPORT} language="css" className="my-5" />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>Usage</DocHeading>
          <DocParagraph>
            Import any component directly from the package root. Each component is
            individually tree-shakeable.
          </DocParagraph>
          <CodeBlock code={IMPORT_EXAMPLE} language="tsx" className="my-5" />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>Tailwind configuration</DocHeading>
          <DocParagraph>
            badcn/ui extends Tailwind&apos;s default theme with semantic color tokens.
            To ensure the component styles resolve correctly in your application,
            add the library to your <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">content</code> paths:
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
