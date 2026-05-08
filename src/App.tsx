declare const browser: any; // For Firefox compatibility
import React, { useState } from 'react';

const App = () => {
  const [status, setStatus] = useState('SYSTEM READY');

  // Map of known multi-origin sites to all their relevant domains
  const multiOriginMap: Record<string, string[]> = {
    'www.youtube.com': [
      'https://www.youtube.com',
      'https://youtube.com',
      'https://accounts.google.com',
      'https://google.com',
    ],
    'youtube.com': [
      'https://www.youtube.com',
      'https://youtube.com',
      'https://accounts.google.com',
      'https://google.com',
    ],
    'mail.google.com': [
      'https://mail.google.com',
      'https://accounts.google.com',
      'https://google.com',
    ],
    'twitter.com': [
      'https://twitter.com',
      'https://api.twitter.com',
      'https://t.co',
      'https://abs.twimg.com',
    ],
    'mail.yahoo.com': [
      'https://mail.yahoo.com',
      'https://login.yahoo.com',
      'https://yahoo.com',
      'https://s.yimg.com',
    ],
  };

  const purgeProtocol = async () => {
    setStatus('SCANNING');
    const agent = (window as any).chrome;

    try {
      const [tab] = await agent.tabs.query({ active: true, currentWindow: true });
      if (!tab?.url) return;

      const url = new URL(tab.url);
      const hostname = url.hostname;
      
      // Determine the targets: Either the specific origin OR the full mapped suite
      let targets = [url.origin];
      if (multiOriginMap[hostname]) {
        targets = multiOriginMap[hostname];
      }

      setStatus('INVERTING');

      // Perform the "Nuclear" wipe on all associated origins simultaneously
      await agent.browsingData.remove(
        { "origins": targets },
        {
          "cache": true,
          "cookies": true,
          "localStorage": true,
          "indexedDB": true,
          "serviceWorkers": true
        }
      );

      setStatus('DELETED');
      agent.tabs.reload(tab.id);

    } catch (e) {
      console.error("MISSION FAILURE:", e);
      setStatus('ERROR');
    }
  };

  return (
    <div className="w-87.5 min-h-112.5 bg-[#020617] text-cyan-400 p-6 font-mono flex flex-col justify-between border-2 border-cyan-900 shadow-[0_0_20px_rgba(0,255,255,0.1)]">
      <div className="text-center border-b border-cyan-900/30 pb-4">
        <h1 className="text-2xl font-bold tracking-tighter text-white flex items-center justify-center gap-2">
          <span>AEGIS</span>
          <span>π</span> 
          <span>PROTOCOL</span>
        </h1>
      </div>

      <div className="text-center py-10">
        <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-700 mb-2">Protocol Status</p>
        <p className="text-lg tracking-tighter text-white drop-shadow-[0_0_5px_#fff]">{status}</p>
      </div>

      {/* <button 
        onClick={purgeProtocol}
        className="w-full py-4 bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold uppercase tracking-[0.3em] active:scale-95 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
      >
        Initiate Purge
      </button> */}

      <button 
        onClick={purgeProtocol}
        className="group relative w-full py-4 bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold uppercase tracking-[0.3em] active:scale-95 shadow-[0_0_15px_rgba(239,68,68,0.2)] overflow-hidden"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <span>INITIATE PURGE</span>
          <span className="text-xl">☢</span>
        </span>
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-red-500/10 group-hover:bg-red-500/20 transition-colors"></div>
      </button>

      <div className="text-[8px] opacity-20 mt-4 flex justify-between uppercase">
        <span>Mar 2026</span>
        <span>NULL_DATA_V1</span>
      </div>
    </div>
  );
};

export default App;

 // const purgeProtocol = async () => {
  //   setStatus('SCANNING');
  //   // Use 'chrome' for MV3 compatibility in both Firefox and Chrome
  //   const agent = (window as any).chrome;

  //   try {
  //     const [tab] = await agent.tabs.query({ active: true, currentWindow: true });
  //     if (!tab?.url) return;

  //     const url = new URL(tab.url);
      
  //     // FETCH: This requires the "cookies" permission you just added
  //     const allCookies = await agent.cookies.getAll({ domain: url.hostname });
  //     console.log(`Target Acquired: ${allCookies.length} cookies found.`);

  //     setStatus('SHREDDING');

  //     // DESTROY: Individual removal is the only way to bypass "protection"
  //     for (const cookie of allCookies) {
  //       const protocol = cookie.secure ? "https://" : "http://";
  //       // We reconstruct the URL to match exactly what the browser expects
  //       const cookieUrl = `${protocol}${cookie.domain.startsWith('.') ? cookie.domain.substring(1) : cookie.domain}${cookie.path}`;
        
  //       await agent.cookies.remove({
  //         url: cookieUrl,
  //         name: cookie.name,
  //         storeId: cookie.storeId
  //       });
  //     }

  //     setStatus('DELETED');
  //     agent.tabs.reload(tab.id);
  //   } catch (e) {
  //     console.error("MISSION FAILURE:", e);
  //     setStatus('ERROR');
  //   }
  // };

//   const purgeProtocol = async () => {
//   setStatus('SCANNING');
//   const agent = (window as any).chrome;

//   try {
//     const [tab] = await agent.tabs.query({ active: true, currentWindow: true });
//     if (!tab?.url) return;

//     const url = new URL(tab.url);
//     const origin = url.origin; // e.g., "https://mail.yahoo.com"

//     setStatus('INVERTING');

//     // This is the most powerful single command in the extension toolkit.
//     // It targets the specific site and wipes every type of data it holds.
//     await agent.browsingData.remove(
//       {
//         "origins": [origin]
//       },
//       {
//         "cache": true,
//         "cookies": true,
//         "localStorage": true,
//         "indexedDB": true,
//         "serviceWorkers": true
//       }
//     );

//     setStatus('DELETED');
    
//     // Refresh to prove the data is gone
//     agent.tabs.reload(tab.id);

//   } catch (e) {
//     console.error("MISSION FAILURE:", e);
//     setStatus('ERROR');
//   }
// };