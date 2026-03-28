import { DocsLayout } from "@/components/docs/DocsLayout";
import { Badge } from "@/components/ui/Badge";
import { DocSection, DocHeading, DocParagraph, DocDivider } from "./shared/DocElements";

const PRINCIPLES = [
  {
    number: "01",
    title: "Visual trust, interaction betrayal",
    body: `Users form trust judgements in the first 50 milliseconds of visual contact.
    badcn/ui invests those milliseconds wisely. Spacing is precise. Typography is deliberate.
    Color usage is intentional. By the time the interaction begins, the user's guard is fully down.
    This is not an accident.`,
  },
  {
    number: "02",
    title: "Consistency in form, chaos in behavior",
    body: `Every button in this library looks like every other button. Size scale, radius,
    shadow, color — all consistent. A user encountering a badcn/ui interface will correctly
    identify every element. They will simply fail to use them as expected.`,
  },
  {
    number: "03",
    title: "Polished aesthetics, hostile affordances",
    body: `An affordance is the relationship between an object's appearance and its function.
    A door handle affords pulling. A push plate affords pushing. badcn/ui components afford
    clicking, selecting, and submitting. They tolerate none of these behaviors gracefully.`,
  },
  {
    number: "04",
    title: "Smooth frustration, never jarring",
    body: `The hostile behavior must feel intentional. If a button moves, it should move
    with a thoughtful spring curve. If a field resists input, it should resist elegantly.
    We do not ship jank. We ship beautiful obstruction.`,
  },
  {
    number: "05",
    title: "The documentation is honest",
    body: `Every component in this library ships with accurate documentation. Behavior
    descriptions are precise and complete. Accessibility notes are written truthfully.
    The fact that accurate documentation of a button that runs away reads as comedy
    is the user's burden, not ours.`,
  },
];

export function DesignPrinciplesPage() {
  return (
    <DocsLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <Badge variant="accent" className="mb-4">Overview</Badge>
          <DocHeading level={1}>Design Principles</DocHeading>
          <DocParagraph className="text-lg text-muted-foreground">
            The philosophy behind every component decision. Read carefully.
            The logic is internally consistent.
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
            These principles were developed over several hours of careful thought and
            applied to a single button. The remaining library surface area will follow
            in due course.
          </DocParagraph>
        </DocSection>
      </div>
    </DocsLayout>
  );
}
