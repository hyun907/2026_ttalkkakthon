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
          <Badge variant="accent" className="mb-4">Overview</Badge>
          <DocHeading level={1}>Introduction</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            badcn/ui is an open-source component library for React applications. It provides
            a comprehensive set of accessible, customizable UI primitives — each one visually
            indistinguishable from its trustworthy counterpart, and behaviorally distinct in
            ways you will notice immediately.
          </DocParagraph>
        </div>

        <DocSection>
          <DocHeading level={2}>What is this?</DocHeading>
          <DocParagraph>
            Most component libraries are designed to help users accomplish tasks efficiently.
            badcn/ui was designed with a different success criterion in mind.
          </DocParagraph>
          <DocParagraph>
            Every component in this library is built to the same production-quality standards
            you would expect from a serious design system: semantic tokens, accessible markup,
            consistent sizing scale, documented API. The resulting experience is not what you
            would call user-friendly.
          </DocParagraph>
          <DocParagraph>
            This is intentional.
          </DocParagraph>
        </DocSection>

        <DocSection>
          <DocHeading level={2}>Core principles</DocHeading>
          <DocList items={[
            "Visual credibility is non-negotiable. Every component must pass a five-second design review.",
            "Interaction failures must be seamless. The frustration should feel smooth, polished, and inevitable.",
            "Accessibility annotations are included and written in good faith. Keyboard support is described accurately.",
            "The documentation is accurate. The behavior is accurately described as hostile.",
          ]} />
        </DocSection>

        <DocSection>
          <DocHeading level={2}>Who is this for?</DocHeading>
          <DocParagraph>
            badcn/ui is appropriate for:
          </DocParagraph>
          <DocList items={[
            "April Fools releases",
            "Internal tooling you control entirely",
            "Demonstrations of what not to do",
            "Anyone who wants to understand why UX matters by experiencing the absence of it",
          ]} />
        </DocSection>

        <div className="flex items-center gap-3 mt-10 pt-6 border-t border-border">
          <Button variant="primary" size="md" asChild>
            <Link to="/docs/getting-started">Get Started</Link>
          </Button>
          <Button variant="ghost" size="md" asChild>
            <Link to="/docs/components/hover-escape-button">Browse Components →</Link>
          </Button>
        </div>
      </div>
    </DocsLayout>
  );
}
