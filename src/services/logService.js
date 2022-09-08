import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
function init() {
  Sentry.init({
    dsn: "https://149fd3edbd934eb4b1331069f0a3cf59@o1400211.ingest.sentry.io/6728811",
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}
export default {
  init,
};
