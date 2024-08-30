import React, { useState, useEffect, useRef } from 'react'
import Codemirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/dracula.css'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import { actions } from '../action'
export default function Editors({socketref, roomId,oncodechange}) {
    const editorref=useRef(null)
    const textareas=useRef(null)
    useEffect(()=>{

       function init(){
        editorref.current=Codemirror.fromTextArea(textareas.current,{
                mode:{name:"javascript",json:true},
                theme:'dracula',
                autoCloseTags:true,
                autoCloseBrackets:true,
                lineNumbers:true,
                
            });

            editorref.current.on('change',(instance,changes)=>{
                console.log(changes)

                const {origin}=changes
                const code=instance.getValue();
                oncodechange(code)
                if(origin !== 'setValue'){
                    socketref.current.emit(actions.CODE_CHANGE,{
                        roomId,
                        code,
                    })
                }
              })


              return editorref
            }


          const edit=  init();
    return ()=>{
        edit.toTextArea();
 } },[])

 useEffect(()=>{
    
    const handleCodeChange = ({ code }) => {
      if (code !== null) {
        editorref.current.setValue(code);
      }
    };

    if (socketref.current) {
      socketref.current.on(actions.CODE_CHANGE, handleCodeChange);
    }

    return () => {
      if (socketref.current) {
        socketref.current.off(actions.CODE_CHANGE, handleCodeChange);
      }
    };
  }, [socketref.current]);
  return <textarea id="realtimeEditor" ref={textareas}></textarea>
}
