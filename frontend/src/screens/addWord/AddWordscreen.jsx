import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WordForm from "../../components/WordForm/WordForm";
import { ProfileContext } from "../../App";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import { toast } from "react-toastify";
import { useMsal } from "@azure/msal-react";
import { handleLogin } from "../../authConfig";

const AddWordscreen = () => {

  const [status,setStatus] = useState("idle");
  const navigate = useNavigate();
  const {profile,setProfile} = useContext(ProfileContext)
  const { instance } = useMsal(); 
  const [data,setData]= useState({
    name:"",
    description:"",
    example1:"",
    example2:"",
    voice:null
  })

  




const handleAdd = async()=>{
    if(profile.account!==null)
    {
      setStatus("loading")
      const requestData = {
        name: data.name,
        description: data.description,
        example1: data.example1,
        example2: data.example2,
        voice: data.voice,
        userId:profile.account.localAccountId,
        userName:profile.account.name
      };
      
      await axios.post(`/word`,requestData).then(
        (res)=>{
        
            setStatus("idle")
            navigate("/")
            toast("Added Successfully",{type:"success"})
          
        }).catch(err=>{
          setStatus("idle")
          toast("Request Failed",{type:"error"})
        })

    }else{
      setStatus("loading")
      toast("You must Login First",{type:"warning"})
      handleLogin("popup",instance,setProfile)

    }
    setStatus("idle")

  }



  if(status=="loading"){
    return(
      <Loading/>
    )
  }
  
  return (
    <WordForm data={data} setData={setData} type={"Add"} handler={handleAdd}/>
  );
};

export default AddWordscreen;

