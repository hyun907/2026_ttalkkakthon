import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PageShell } from "@/components/layout/PageShell";
import { LandingPage } from "@/pages/LandingPage";
import { IntroductionPage } from "@/pages/docs/IntroductionPage";
import { GettingStartedPage } from "@/pages/docs/GettingStartedPage";
import { DesignPrinciplesPage } from "@/pages/docs/DesignPrinciplesPage";
import { HoverEscapeButtonPage } from "@/pages/docs/components/HoverEscapeButtonPage";
import { ShrinkOnApproachButtonPage } from "@/pages/docs/components/ShrinkOnApproachButtonPage";
import { NeverCompleteProgressPage } from "@/pages/docs/components/NeverCompleteProgressPage";
import { ReversedTextInputPage } from "@/pages/docs/components/ReversedTextInputPage";
import { InvertedSwipeCarouselPage } from "@/pages/docs/components/InvertedSwipeCarouselPage";
import { JudgmentalNameInputPage } from "@/pages/docs/components/JudgmentalNameInputPage";
import { AccordionOfChaosPage } from "@/pages/docs/components/AccordionOfChaosPage";

export default function App() {
  return (
    <BrowserRouter>
      <PageShell>
        <Routes>
          {/* Landing */}
          <Route path="/" element={<LandingPage />} />

          {/* Docs */}
          <Route path="/docs" element={<IntroductionPage />} />
          <Route
            path="/docs/getting-started"
            element={<GettingStartedPage />}
          />
          <Route
            path="/docs/design-principles"
            element={<DesignPrinciplesPage />}
          />

          {/* Component docs */}
          <Route
            path="/docs/components/hover-escape-button"
            element={<HoverEscapeButtonPage />}
          />
          <Route
            path="/docs/components/shrink-on-approach-button"
            element={<ShrinkOnApproachButtonPage />}
          />
          <Route
            path="/docs/components/never-complete-progress"
            element={<NeverCompleteProgressPage />}
          />
          <Route
            path="/docs/components/reversed-text-input"
            element={<ReversedTextInputPage />}
          />
          <Route
            path="/docs/components/judgmental-name-input"
            element={<JudgmentalNameInputPage />}
          />
          <Route
            path="/docs/components/inverted-swipe-carousel"
            element={<InvertedSwipeCarouselPage />}
          />
          <Route
            path="/docs/components/accordion-of-chaos"
            element={<AccordionOfChaosPage />}
          />

          {/* Future component pages can be added here:
              <Route path="/docs/components/spam-click-button" element={<SpamClickButtonPage />} />
          */}

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageShell>
    </BrowserRouter>
  );
}
