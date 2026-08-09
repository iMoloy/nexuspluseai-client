'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

export function useSSE() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    const sseUrl = `${backendUrl}/events/stream`;

    let eventSource: EventSource | null = null;

    try {
      eventSource = new EventSource(sseUrl);

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data && data.message) {
            toast.info(`🔔 ${data.message}`);
          }
        } catch {}
      };

      eventSource.addEventListener('GIG_UPDATE', (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          toast.info(`⚡ Gig Notification: ${data.message || 'Status updated!'}`);
        } catch {}
      });

      eventSource.addEventListener('ESCROW_LOCK', (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          toast.success(`🛡️ Escrow Locked: ${data.message || 'Funds locked in Escrow ledger!'}`);
        } catch {}
      });

      eventSource.onerror = () => {
        // Quietly close on reconnect failure to prevent console noise
        eventSource?.close();
      };
    } catch (err) {
      console.warn('[useSSE] Realtime SSE Stream unavailable:', err);
    }

    return () => {
      eventSource?.close();
    };
  }, []);
}
