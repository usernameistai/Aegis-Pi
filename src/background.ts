// @ts-ignore
// This tells TypeScript to stop over-analyzing the chrome API in this file
const agent = chrome;

const TARGET_URLS: [string, ...string[]] = [
  'https://www.youtube.com',
  'https://accounts.google.com',
  'https://google.com',
  'https://login.yahoo.com',
  'https://twitter.com'
];

// Use underscores to stop "Unused Variable" errors
agent.tabs.onRemoved.addListener((_tabId: number, _removeInfo: object) => {
  console.log("AEGIS \u03c0: Tab Closure Detected. Purging...");

  agent.browsingData.remove(
    { "origins": TARGET_URLS },
    {
      "cache": true,
      "cookies": true,
      "localStorage": true,
      "indexedDB": true,
      "serviceWorkers": true
    },
    () => {
      // Use a simple log so you can see it in the 'Inspect Service Worker' view
      console.log("AEGIS \u03c0: Purge Complete.");
    }
  );
});

// This is the "Magic Bullet" for Vite/TS modules
export {};