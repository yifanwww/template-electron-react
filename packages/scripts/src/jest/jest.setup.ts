declare const window: typeof globalThis;

async function setup() {
    // Make sure we're in a Browser-like environment before importing polyfills
    // This prevents `fetch()` from being imported in a Node test environment
    if (typeof window !== 'undefined') {
        // fetch() polyfill for making API calls.
        await import('whatwg-fetch');
    }
}

void setup();
