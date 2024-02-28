import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WordForm from "../../components/WordForm/WordForm";
import axios from "axios";
import { ProfileContext } from "../../App";
import { toast } from "react-toastify";
import { handleLogin } from "../../authConfig";
import { useMsal } from "@azure/msal-react";
import Loading from "../../components/loading/Loading";

const EditWordscreen = () => {

  const {profile,setProfile} = useContext(ProfileContext);
  const [status,setStatus] = useState("idle");
  const { instance } = useMsal();
  const location = useLocation();
  const word = location.state;
  const navigate = useNavigate();

  useEffect(()=>{
    if(profile.account==null)
    {
      navigate("/")
    }
  },[])

  const [data,setData]= useState({
    id:word.id,
    name:word.name,
    description:word.description,
    example1:word.example1,
    example2:word.example2,
    voice:word.voice,
    userId:profile.account.localAccountId,
    userName:profile.account.name
  })





  const handleEdit = async()=>{
    if(profile.account!==null)
    {
      setStatus("loading");
      await axios.put(`/word`,data).then((res)=>{
        
        setStatus("idle")
        navigate("/")
        toast("Updated Successfully",{type:"success"})
      
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
    <WordForm data={data} setData={setData} type={"Edit"} handler={handleEdit}/>
  );
};

export default EditWordscreen;
