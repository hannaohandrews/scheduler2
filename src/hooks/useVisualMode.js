import React, { useState } from "react";
import useVisualMode from "hooks/useVisualMode";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode,replace = false){
      if (replace){
        setMode(mode)

      } else {
    
        setMode(mode);
        setHistory([...history,mode]);
        console.log('added',history)
      }
  }

  function back() {
      if(history.length === 1){
          setMode(initial);
        //   console.log(setMode(initial))
      } else{
          // get the old history 
          console.log('history',history) /// first, second, third
          console.log('length',history.length) /// 3
          console.log('history[1]',history[1]) // = history.length - 2
          console.log('history.length-2',history[history.length-2] )
          // set the mode to old history
        setMode(history[history.length-2]);
        // set history 
        setHistory(history.slice(0,-1));
      }
    }
  return { mode, transition, back };
}
