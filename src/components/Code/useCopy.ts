import { useEffect, useRef, useState } from "react";

/** Copies text to the clipboard; `copied` stays true for `timeout` ms. */
export function useCopy(timeout = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), timeout);
  }

  return { copied, copy };
}
