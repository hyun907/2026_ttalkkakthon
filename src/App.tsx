import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PageShell } from "@/components/layout/PageShell";
import { LandingPage } from "@/pages/LandingPage";
import { IntroductionPage } from "@/pages/docs/IntroductionPage";
import { GettingStartedPage } from "@/pages/docs/GettingStartedPage";
import { DesignPrinciplesPage } from "@/pages/docs/DesignPrinciplesPage";
import { HoverEscapeButtonPage } from "@/pages/docs/components/HoverEscapeButtonPage";

export default function App() {
  return (
    <BrowserRouter>
      <PageShell>
        <Routes>
          {/* Landing */}
          <Route path="/" element={<LandingPage />} />

          {/* Docs */}
          <Route path="/docs" element={<IntroductionPage />} />
          <Route path="/docs/getting-started" element={<GettingStartedPage />} />
          <Route path="/docs/design-principles" element={<DesignPrinciplesPage />} />

          {/* Component docs */}
          <Route
            path="/docs/components/hover-escape-button"
            element={<HoverEscapeButtonPage />}
          />

          {/* Future component pages can be added here:
              <Route path="/docs/components/spam-click-button" element={<SpamClickButtonPage />} />
              <Route path="/docs/components/time-picker-phone-input" element={<TimePickerPhoneInputPage />} />
              <Route path="/docs/components/rhythm-select" element={<RhythmSelectPage />} />
          */}

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageShell>
    </BrowserRouter>
  );
}
