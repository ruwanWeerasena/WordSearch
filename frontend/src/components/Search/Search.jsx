import React, {  useRef } from 'react'
import {FaSearch} from 'react-icons/fa';
import './search.css';
import SearchResult from './SearchResults/SearchResults';

const Search = ({setShowResults,focus,setFocus,handleSearchButton,searchHits,handleSearch,searchTerm}) => {
  
  const searchInputRef = useRef(null);

  const handleOutsideClick = (e)=>{
    if(!searchInputRef.current.contains(e.target)){
      setFocus(false)
    }
  }

  return (
    <div  className='searchcontainer'>
        <div className='search'>
              <button onClick={handleSearchButton}>
                <FaSearch size={25} color="#2F3C7E" />
              </button>
              <input 
                ref={searchInputRef}
                onFocus={()=>{setFocus(true);}} 
            
                type="text" 
                placeholder='Type Here Your Words...' 
                value={searchTerm} 
                onChange={(e)=>{setFocus(true);setShowResults(false);handleSearch(e.target.value)}}
                onKeyDown={(e)=>{if(e.key==="Enter"){handleSearchButton()}}}  /> 
              
        </div>
   
        {
          focus && searchHits.length>0 ? <SearchResult setFocus={setFocus} focus={focus} handleOutsideClick={handleOutsideClick} searchInputRef={searchInputRef} searchHits={searchHits} handleSearchButton={handleSearchButton}/> : <></>
        }
    </div>
    
  )
}

export default Search