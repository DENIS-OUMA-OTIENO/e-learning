import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
const Editor = () => {
    const [text, setText] = useState('')
  return (
    <ReactQuill value={text} theme = 'snow' onChange={(e) => setText(e.target.value)} />
  )
}

export default Editor