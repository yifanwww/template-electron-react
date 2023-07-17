import type { ReportCallback } from 'web-vitals';

export function reportWebVitals(onPerfEntry?: ReportCallback) {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        void import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
            onCLS(onPerfEntry);
            onFID(onPerfEntry);
            onFCP(onPerfEntry);
            onLCP(onPerfEntry);
            onTTFB(onPerfEntry);
        });
    }
}
