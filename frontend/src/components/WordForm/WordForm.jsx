import React, { useEffect, useState } from "react";

import "./wordform.css";
import { AudioRecorder } from "react-audio-voice-recorder";
import { convertbase64toblob } from "../WordDetail/WordDetail";

const WordForm = ({data,setData,type,handler}) => {
    const [isValid,setIsValid]= useState(false);
    const [blob,setBlob] = useState(data.voice!=null?convertbase64toblob(data.voice):null);
  
    const [errors,setErrors]=useState({
      name:"",
      description:"",
      example1:"",
      example2:"",
      voice:null
    })

    useEffect(()=>{
      if(data.name!="" && data.description!=""&& data.example1!=""&& data.example2!="")
      {
        setIsValid(true);
      }else
      {
        setIsValid(false)
      }


      if(data.voice!=null)
      {
       
      }
    },[data])

    //everytime when user records a new voice blob state updated and calls the handleaudio and convert the latest blob to base64
    useEffect(()=>{
      if(blob!=null)
      {
        handleaudio(blob);
      }
    },[blob])
  
    //convert the blob to base64string and put it into state
    const handleaudio = (blob) =>{
      const reader = new FileReader();

      reader.onload = function () {
        const base64Voice = reader.result.split(',')[1]; // Extract the base64-encoded part
        setData((currentData) => {
          return { ...currentData, voice: base64Voice };
        });
        console.log(base64Voice);
      };

      reader.readAsDataURL(blob); 
 
    }
  
  return (
    <div id="wordcontainer">
      <div id="wordcontainerborder">
        <div id="wordcontainertitle">
          <p> {type} your Words here...</p>
        </div>

        <div id="wordcontainerinputs">

          <input 
              style={{border:`${errors.name!==""?"1px solid red":"none"}`}} 
              type="text" 
              placeholder={errors.name==""?"Title":`${errors.name}` }
              value={data.name} 
              onChange={(e)=>setData((c)=>{return {...c,name:e.target.value}})}
              onBlur={(e)=>{
                if(data.name==""){
                  setErrors((c)=>{return{...c,name:"Title cannot be empty"}})
                }else{
                  setErrors((c)=>{return{...c,name:""}})
                }}} />

          <textarea  
              style={{border:`${errors.description!==""?"1px solid red":"none"}`}} 
              placeholder={errors.description==""?"Description":`${errors.description}` }
              value={data.description} 
              onChange={(e)=>setData((c)=>{return {...c,description:e.target.value}})}
              onBlur={(e)=>{
                if(data.description==""){
                  setErrors((c)=>{return{...c,description:"Description cannot be empty"}})
                }else{
                  setErrors((c)=>{return{...c,description:""}})
                }}} />

          <input 
              style={{border:`${errors.example1!==""?"1px solid red":"none"}`}} 
              type="text" 
              placeholder={errors.example1==""?"Example 1":`${errors.example1}` } 
              value={data.example1} 
              onChange={(e)=>setData((c)=>{return {...c,example1:e.target.value}})}
              onBlur={(e)=>{
                if(data.example1==""){
                  setErrors((c)=>{return{...c,example1:"Example1 cannot be empty"}})
                }else{
                  setErrors((c)=>{return{...c,example1:""}})
                }}} />

          <input
              style={{border:`${errors.example2!==""?"1px solid red":"none"}`}}  
              type="text" 
              placeholder={errors.example2==""?"Example 2":`${errors.example2}` } 
              value={data.example2} 
              onChange={(e)=>setData((c)=>{return {...c,example2:e.target.value}})}
              onBlur={(e)=>{
                if(data.example2==""){
                  setErrors((c)=>{return{...c,example2:"Example2 cannot be empty"}})
                }else{
                  setErrors((c)=>{return{...c,example2:""}})
                }}} />

            <div style={{display:"flex", justifyContent:"center",alignItems:"center", gap:"10px"}}>
              <span>Click to record</span>
              <AudioRecorder
                onRecordingComplete={(blob)=>setBlob(blob)}
                audioTrackConstraints={{
                  noiseSuppression: true,
                  echoCancellation: true,
                }} 
                downloadOnSavePress={false}
                downloadFileExtension="webm"
                showVisualizer={true}
              /> 
            </div>
             
            <div style={{display:"flex", justifyContent:"center",alignItems:"center", gap:"10px",width:"auto"}}>
              {data.voice && <audio style={{height:"40px"}} key={URL.createObjectURL(blob)} controls controlsList="nodownload">
                <source src={URL.createObjectURL(blob)} type="audio/webm"/>
                Your browser does not support the audio tag.
              </audio>}
            </div>    
            
        </div>

        <div id="wordcontainerbutton">
          <button disabled={!isValid} onClick={handler}>{type}</button>
        </div>
      </div>
    </div>
  )
}

export default WordForm