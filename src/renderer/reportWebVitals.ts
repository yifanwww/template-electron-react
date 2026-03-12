import type { MetricType } from 'web-vitals';

export function reportWebVitals(onPerfEntry?: (metric: MetricType) => void) {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        void import('web-vitals').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
            onCLS(onPerfEntry);
            onFCP(onPerfEntry);
            onINP(onPerfEntry);
            onLCP(onPerfEntry);
            onTTFB(onPerfEntry);
        });
    }
}
