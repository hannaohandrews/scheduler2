import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    console.log('MODE',mode)

    if (replace) {
      setMode(mode);
      setHistory(prev => [...prev.slice(0,prev.length-1), mode]);
    } else {
      setMode(mode);
      setHistory([...history, mode]);
    }
  }

  function back() {
    if (history.length === 1) {
      return 
    } else {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, -1));
    }
  }
  return { mode, transition, back };
}


// import { useState } from "react";
// export default function useVisualMode(initial) {
//   const [history, setHistory] = useState([initial]);
//   function transition(mode, replace) {
//     console.log('ANDY!', history)
//     setHistory(prev =>
//       replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]
//     );
//   }
//   function back() {
//     if (history.length < 2) return;
//     setHistory(prev => [...prev.slice(0, prev.length - 1)]);
//   }
//   return { mode: history[history.length - 1], transition, back };
// }