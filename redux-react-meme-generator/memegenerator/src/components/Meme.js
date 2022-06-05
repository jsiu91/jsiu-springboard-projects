import React from 'react'

function Meme({id, topText, bottomText, url, deleteMeme}) {
  const handleDeleteMeme = () =>{
    deleteMeme(id)
  }
  
  return (
    <div>
      <span id="top_text">{topText}</span>
      <img src={url} alt='a meme'></img>
      <span id="bottom_text">{bottomText}</span>
      <button onClick={handleDeleteMeme}>Delete</button>
    </div>
  )
}

export default Meme