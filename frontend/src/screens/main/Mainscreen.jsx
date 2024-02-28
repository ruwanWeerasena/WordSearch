import React, { useContext, useEffect, useRef } from 'react'
import { useState } from 'react';
import "./mainscreen.css";

import Search from '../../components/Search/Search';
import Words from '../../components/words/Words';
import WordDetail from '../../components/WordDetail/WordDetail';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from '../../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const Mainscreen = () => {
  const navigate = useNavigate();
  const {profile} = useContext(ProfileContext);
  const [searchTerm, setSearchTem] = useState("");
  const [searchHits, setSearchHits] = useState([]);

  const [focus,setFocus] = useState(false);
  
  const [showResults,setShowResults]= useState(false);

  const [selectedWordTile,setSelectedWordTile] = useState(null);

  const worddetailref = useRef(null);

  const handleSearch = async(value)=>{
    
    setSearchTem(value)
    if(value!==""){

      await axios.get(`/word/${value}`).then((res)=>setSearchHits(res.data))
    }
  }

  useEffect(()=>{
    if(searchTerm===""){
      setShowResults(false);
      setFocus(true)
    }
    
  },[searchTerm])


  const handleSearchButton = ()=>{
    setShowResults(true);
    setFocus(false)
  } 
  
  const handleDelete = async()=>{
    const confirm = window.confirm("Are You sure to delete this word?")

    confirm && await axios.delete(`/word/${selectedWordTile.id}`).then((res)=>{
   
        toast("Deleted Successfully",{type:"success"});
        setSearchHits((current)=>current.filter((item)=>item.id!==selectedWordTile.id))
        setSelectedWordTile(null);
      
    }).catch((err)=>{
        toast("Request Failed",{type:"error"});
    })
  }

  return (
    <div className='mainbody'>
      <Search 
          setShowResults={setShowResults}
          focus={focus} 
          setFocus={setFocus} 
          handleSearchButton={handleSearchButton} 
          searchHits={searchHits} 
          handleSearch={handleSearch} 
          searchTerm={searchTerm} />
          

      <div className='content'>
        { showResults===false?
            <div className='welcometext'>
              <h1>Your Own <br/> Personal <br/>Dictionary...</h1>
            </div> 
            :
            <Words words={searchHits} worddetailref={worddetailref} setSelectedWordTile={setSelectedWordTile} />
        }
        {selectedWordTile!=null && <WordDetail handleDelete={handleDelete}  worddetailref={worddetailref} setSelectedWordTile={setSelectedWordTile} word={selectedWordTile}/>}

        
      </div>     
    </div>
  )
}

export default Mainscreen

