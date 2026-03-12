import axios from "axios";

const TRACKING_URL = "/api/stats/track";
const SESSION_KEY = "amcoeur_session_started";

/**
 * Tracks a user event and optionally a new session
 */
export const trackEvent = async (action?: string, category?: string) => {
  try {
    const isNewSession = !sessionStorage.getItem(SESSION_KEY);
    
    if (isNewSession) {
      sessionStorage.setItem(SESSION_KEY, "true");
    }

    // Only send if it's a new session OR if there's an actual event to track
    if (isNewSession || action || category) {
      await axios.post(TRACKING_URL, {
        action,
        category,
        isNewSession,
      });
    }
  } catch (err) {
    // Silent fail for tracking
    console.debug("Metrics tracking failed", err);
  }
};
