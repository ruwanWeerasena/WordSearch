import React, { useContext, useEffect, useState } from 'react'
import "./worddetail.css";
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from '../../App';

export const convertbase64toblob = (bas64string) =>{
  const binaryAudio = atob(bas64string);
  const uint8Array = new Uint8Array(binaryAudio.length);
  for (let i = 0; i < binaryAudio.length; i++) {
    uint8Array[i] = binaryAudio.charCodeAt(i);
  }
  const audioBlob = new Blob([uint8Array], { type: 'audio/webm;codecs=opus' });
  return audioBlob;
}


const WordDetail = ({handleDelete,word,setSelectedWordTile,worddetailref}) => {
  
  const navigate = useNavigate();
  const [voiceobject,setVoiceObject] = useState(null);
  const {profile} = useContext(ProfileContext);

  useEffect(()=>{
    worddetailref.current.focus();
    document.addEventListener("click",handleOutsideClick)
    if(word.voice!=null){
      const audioBlob = URL.createObjectURL(convertbase64toblob(word.voice));
      setVoiceObject(audioBlob);
    }
    return ()=>{
      document.removeEventListener("click",handleOutsideClick);
    }
  },[word.id])

  const handleOutsideClick = (e)=>{
    if(!(worddetailref?.current.contains(e.target) )){
      setSelectedWordTile(null);
    }
  }

  
  return (
    <div tabIndex={0} ref={worddetailref} className='worddetail'  >
        <div id='title'>{word.name}</div>
        <div id='description'>"{word.description}"</div>
        <div id="example1"><span className='exspans'>example 1:</span> {word.example1}</div>
        <div id="example2"><span className='exspans' >example 2:</span> {word.example2}</div>
        {
        voiceobject !=null?
          <div style={{display:"flex", justifyContent:"center",alignItems:"center",width:"100%"}} >
              
              <audio controls controlsList="nodownload " style={{height:"35px"}}   >
                <source src={voiceobject} type="audio/webm;codecs=opus"/>
                Your browser does not support the audio tag.
              </audio>
          </div>
          :
          <div style={{fontSize:"1rem"}} >No voice available</div>
        }
        
          {
            profile.account!=null && profile.account.localAccountId===word.userId?
              <div id="modifybuttons">
                <button   onClick={()=>navigate("/edit", {state:word})} style={{backgroundColor:"#FFBF00"}}>Edit</button>
                <button  onClick={handleDelete} style={{backgroundColor:"#f77d85"}}>Delete</button>
              </div>
              :
              <div style={{fontSize:"1rem"}}>By {word.userName}</div>
          }
          
        
    </div>
  )
}


export default WordDetail

