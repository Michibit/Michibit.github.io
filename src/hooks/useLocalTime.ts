"use client";

import { useEffect, useState } from "react";

/**
 * Live wall-clock time in the visitor's target time zone.
 *
 * Returns `null` on the server and on the first client render so the markup
 * matches during hydration — a formatted time would differ between the build
 * machine and the visitor's clock and throw a hydration error.
 */
export function useLocalTime(timeZone: string, locale = "en-GB"): string | null {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    });

    const update = () => setTime(formatter.format(new Date()));
    update();

    // Half a minute is plenty: we only render hours and minutes.
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, [timeZone, locale]);

  return time;
}
