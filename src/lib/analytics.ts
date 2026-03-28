const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let isInitialized = false;

export function initAnalytics() {
  if (typeof window === "undefined" || !measurementId || isInitialized) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };

  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[data-ga-id="${measurementId}"]`
  );

  if (!existingScript) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.dataset.gaId = measurementId;
    document.head.appendChild(script);
  }

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: false,
  });

  isInitialized = true;
}

export function trackPageView(pathname: string, search: string) {
  if (!measurementId || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("event", "page_view", {
    page_path: `${pathname}${search}`,
    page_title: document.title,
    page_location: window.location.href,
  });
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (!measurementId || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("event", eventName, params ?? {});
}

export function trackChaosInteraction(
  componentName: string,
  action: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  trackEvent("chaos_interaction", {
    component_name: componentName,
    action,
    ...params,
  });
}
