import React from 'react'
import "./wordtile.css"
import axios from 'axios'

const Wordtile = ({word,setSelectedWordTile,worddetailref}) => {

  const fetchfullData= async()=>{
    await axios.get(`/word/get/${word.id}`).then((res)=>setSelectedWordTile(res.data))
  } 

  return (
    <div className='container' onClick={fetchfullData}>
        <h2>{word.name}</h2>
        <p style={{overflow:"hidden", paddingBottom:"5px"}}>{word.description}</p>
    </div>
  )
}

export default Wordtile