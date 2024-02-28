import React from 'react'
import Wordtile from '../Wordtile/Wordtile'

const Words = ({words,setSelectedWordTile,worddetailref}) => {
  return (
    <div style={{display:"flex",padding:"0 50px", flexWrap:"wrap", gap:"10px", justifyContent:"center"}}>
        {
            words.map(word=>{
                return <Wordtile worddetailref={worddetailref} setSelectedWordTile={setSelectedWordTile} key={word.id} word={word}/>
            })
        }
    </div>
  )
}

export default Words