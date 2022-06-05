import React from 'react';
import NewFormMeme from './components/NewFormMeme';
import Meme from './components/Meme'
import { useSelector, useDispatch } from 'react-redux';
import './App.css';

function App() {
  const memes = useSelector((state) => state.memes);
  const dispatch = useDispatch();

  const addMeme = (newMeme) => {
    dispatch({type: "ADD_MEME", meme: newMeme});
  }

    const deleteMeme = (id) => {
      dispatch({type: "REMOVE_MEME", id});
    }

    const memeComps = memes.map(meme => (
      <Meme 
        key={meme.id}
        id={meme.id}
        topText={meme.topText}
        botttomText={meme.bottomText}
        url={meme.url}
        deleteMeme={() => deleteMeme(meme.id)}
      />
    ));


  return (
    <div>
      <NewFormMeme addMeme={addMeme}/>
      {memeComps}
    </div>
  );
}

export default App;
