// collection of all the live functionallity on the app

import { useCallback, useEffect, useState } from "react";
import LiveCursors from "./cursor/LiveCursors"
import { useMyPresence, useOthers } from "@/liveblocks.config"
import { CursorMode } from "@/types/type";
import CursorChat from "./cursor/CursorChat";

const Live = () => {
    const others= useOthers();
    const [{cursor},updateMyPresence]=useMyPresence() as any;

    const [cursorState,setCursorState]=useState({
        mode:CursorMode.Hidden,
        previousMessage:null,
    }) as any;

    useEffect(()=>{

        const onKeyUp=(e :KeyboardEvent)=>{
            if(e.key==='/'){
                setCursorState({
                    mode:CursorMode.Chat,
                    previousMessage:null,
                    message:''
                })
            }
            else if(e.key==='Escape'){
                updateMyPresence({message:''})
                setCursorState({mode:CursorMode.Hidden})
            }
        }
        const onKeyDown=(e :KeyboardEvent)=>{
            if(e.key==='/'){
                e.preventDefault();
            }
        }

        window.addEventListener('keyup',onKeyUp);
        window.addEventListener('keydown',onKeyDown);

        return ()=>{
            window.removeEventListener('keyup',onKeyUp);
            window.removeEventListener('keydown',onKeyDown);
        }

    },[updateMyPresence]);

    const handlPointerMove = useCallback((event:React.PointerEvent)=>{
        event.preventDefault();

        const x= event.clientX - event.currentTarget.
        getBoundingClientRect().x;
        const y= event.clientY - event.currentTarget.
        getBoundingClientRect().y ;

        updateMyPresence({cursor:{x,y}});

    },[]);

    const handlPointerLeave = useCallback((event:React.PointerEvent)=>{
        setCursorState({ mode:CursorMode.Hidden});
        updateMyPresence({cursor:null,message:null});

    },[]);

    const handlPointerDown = useCallback((event:React.PointerEvent)=>{
        const x= event.clientX - event.currentTarget.
        getBoundingClientRect().x;
        const y= event.clientY - event.currentTarget.
        getBoundingClientRect().y ;

        updateMyPresence({cursor:{x,y}});

    },[]);

  return (
    <div 
    onPointerMove={handlPointerMove}
    onPointerLeave={handlPointerLeave}
    onPointerDown={handlPointerDown}
    className="h-[100vh] w-full flex justify-center items-center text-centre"
    >
      <h1 className="text-2xl text-white">Live Block figma Clone</h1>
        
        {
            cursor && 
             (<CursorChat 
             cursor={cursor} 
             cursorState={cursorState}
             setCursorState={setCursorState}
             updateMyPresence={updateMyPresence}
             />
             )
        }



      <LiveCursors others={others}  />
    </div>
  )
}

export default Live
