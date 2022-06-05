import React, { useState } from 'react'
import uuidv4 from 'uuid/v4';

const DEFAULT_FORM = {
  topText: "",
  bottomText: "",
  url: ""
}

function NewFormMeme({addMeme}) {
  const [form, setForm] = useState(DEFAULT_FORM);

  const handleSubmit = (e) => {
    e.preventDefault();
    addMeme({ ...form, id: uuidv4() });
    setForm(DEFAULT_FORM);
  }
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }


  return (
    <div>
      <h1>New Meme</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='topText'>Top Text</label>
        <input
          type = 'text' 
          id= 'form_topText'
          name='topText'
          onChange={handleChange}
          value={form.topText}
        >
        </input>
        <label htmlFor='bottomText'>Bottom Text</label>
        <input
          type = 'text' 
          id= 'form_bottomText'
          name='bottomText'
          onChange={handleChange}
          value={form.bottomText}
        >
        </input>
        <label htmlFor='url'>URL</label>
        <input
          type = 'text' 
          id= 'form_url'
          name='url'
          onChange={handleChange}
          value={form.url}
        >
        </input>
      </form>
    </div>
  )
}

export default NewFormMeme