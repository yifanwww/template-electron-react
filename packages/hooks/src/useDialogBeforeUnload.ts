import { useEffect } from 'react';

// Refer to https://developer.mozilla.org/en-US/docs/Web/API/BeforeUnloadEvent for more information.

function listener(event: BeforeUnloadEvent) {
    event.preventDefault();
    // In modern browsers, `returnValue` can only enable the `beforeunload` dialog, we cannot customize the message.
    // References:
    // - https://developer.apple.com/library/archive/releasenotes/General/WhatsNewInSafari/Articles/Safari_9_1.html#//apple_ref/doc/uid/TP40014305-CH10-SW11
    // - https://chromestatus.com/feature/5349061406228480
    event.returnValue = 'warning';
}

/**
 * Hook to register a listener to trigger a confirmation dialog asking the user if they really want to leave the page.
 *
 * @param enabled Enable the confirmation dialog or not.
 */
export function useDialogBeforeUnload(enabled: boolean = true) {
    useEffect(() => {
        if (!enabled) return undefined;

        window.addEventListener('beforeunload', listener);
        return () => window.removeEventListener('beforeunload', listener);
    }, [enabled]);
}
