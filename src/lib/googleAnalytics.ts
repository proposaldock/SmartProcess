export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";

type AnalyticsValue = string | number | boolean | undefined;

type AnalyticsParams = Record<string, AnalyticsValue>;

type GoogleAnalyticsWindow = Window &
  typeof globalThis & {
    gtag?: (
      command: "config" | "event",
      targetIdOrEventName: string,
      params?: AnalyticsParams,
    ) => void;
  };

function getAnalyticsWindow() {
  if (typeof window === "undefined") {
    return null;
  }

  return window as GoogleAnalyticsWindow;
}

export function trackPageView(url: string) {
  const analyticsWindow = getAnalyticsWindow();

  if (!analyticsWindow || !GA_MEASUREMENT_ID || !analyticsWindow.gtag) {
    return;
  }

  analyticsWindow.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  const analyticsWindow = getAnalyticsWindow();

  if (!analyticsWindow || !GA_MEASUREMENT_ID || !analyticsWindow.gtag) {
    return;
  }

  analyticsWindow.gtag("event", name, params);
}
