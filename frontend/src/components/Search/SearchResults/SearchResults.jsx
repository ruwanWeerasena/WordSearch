import React, { useEffect } from 'react'

const SearchResults = ({handleOutsideClick,focus,searchHits,handleSearchButton}) => {

  useEffect(()=>{
    document.addEventListener("click",handleOutsideClick);

    return ()=>{
      document.removeEventListener("click",handleOutsideClick);
    }

  },[focus])
  
  return (
    <div  className='searchresults'>
          {
            searchHits.length>0?
            searchHits.map((item)=>{
              return <div  onClick={handleSearchButton}  className='searchresultitem' key={item.id}>{item.name}</div>
            })
            :""
          }
    </div>
  )
}

export default SearchResults