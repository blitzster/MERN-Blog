import React, { useState } from 'react';
import './TextEditor.css';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState(''); // Initial empty description
  const [thumbnail, setThumbnail] = useState('');

  // Categories for the dropdown
  const POST_CATEGORIES = [
    'Agriculture', 'Business', 'Education', 'Entertainment', 'Art', 'Investment', 'Uncategorized', 'Weather'
  ];

  // Handle changes to the description (text area content)
  const handleTextChange = (e) => {
    setDescription(e.target.value);
  };

  // Functions for text formatting
  const handleBold = () => {
    document.execCommand('bold');
  };

  const handleItalic = () => {
    document.execCommand('italic');
  };

  const handleUnderline = () => {
    document.execCommand('underline');
  };

  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit Post</h2>
        <p className="form__error-message">
          This is an error message
        </p>
        <form className="form create-post__form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {POST_CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          {/* Toolbar buttons for text formatting */}
          <div className="toolbar">
            <button type="button" onClick={handleBold}><b>B</b></button>
            <button type="button" onClick={handleItalic}><i>I</i></button>
            <button type="button" onClick={handleUnderline}><u>U</u></button>
          </div>

          {/* Custom Text Editor (ContentEditable div) */}
          <div
            contentEditable
            className="text-editor"
            onInput={handleTextChange}
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="image/png, image/jpg, image/jpeg"
          />

          <button type="submit" className="btn primary">Update</button>
        </form>
      </div>
    </section>
  );
};

export default EditPost;
