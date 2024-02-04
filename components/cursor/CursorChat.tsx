import CursorSVG from '@/public/assets/CursorSVG'
import { CursorChatProps, CursorMode } from '@/types/type'
import React from 'react'

const CursorChat = ({cursor,cursorState,setCursorState,updateMyPresence}:CursorChatProps) => {
     
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        updateMyPresence({message:event.target.value});
        setCursorState({mode:CursorMode.Chat, 
            previousMessage:null,
            message:event.target.value});
    }
    const handleKeyDown = (event:React.KeyboardEvent<HTMLInputElement>)=>{
        if(event.key === 'Enter'){
            setCursorState({mode:CursorMode.Hidden, 
                previousMessage:cursorState.message,
                message:''
            });
           
        } 
        else if( event.key === 'Escape'){
            setCursorState({mode:CursorMode.Hidden, 
                previousMessage:null,
                message:''
            });
        }
    }
  
    return (
    <div className="absolute top-0 left-0"
    style={{
        transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`}}>

            {cursorState.mode === CursorMode.Chat && (
                <>
                <CursorSVG color="#000" />

                <div className="absolute left-2 top-5 bg-blue-500 px-3 py-2 text-sm leading-relaxed
                 text-white rounded-[20px]">
                    {cursorState.previousMessage && (
                        <div>{cursorState.previousMessage}</div>
                    )}
                    <input 
                     className='z-10 w-60 border-none bg-transparent outline-none
                      text-white placeholder-blue-300'
                      autoFocus={true}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      placeholder={cursorState.previousMessage ?
                        '' : "Type a message..."}
                        value={cursorState.message}
                        maxLength={50}
                     />
                </div>
                
                
                
                </> )
            
             } 
        
      
    </div>
  )
}

export default CursorChat
