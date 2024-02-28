import React from 'react'
import "./loading.css"
import {AiOutlineLoading3Quarters} from "react-icons/ai"
const Loading = () => {
  return (
    <div className='loading'>
        <AiOutlineLoading3Quarters  className='loadericon' size={50}/>
    </div>
  )
}

export default Loading