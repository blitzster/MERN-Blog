import React, { useContext, useEffect, useState } from 'react';
import './TextEditor.css';
import { UserContext } from '../context/userContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState(''); // Initial empty description
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const {id} = useParams();

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;


  //redirect to login page for any user who isn't logged in
  useEffect(() => {
    if(!token){
      navigate('/login')
    }
  }, [token, navigate]);

  // Categories for the dropdown
  const POST_CATEGORIES = [
    'Agriculture', 'Business', 'Education', 'Entertainment', 'Art', 'Investment', 'Uncategorized', 'Weather'
  ];

  // Handle changes to the description (text area content)
  const handleTextChange = (e) => {
    setDescription(e.target.innerHTML);
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

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`)
        setTitle(response.data.title)
        setDescription(response.data.description)
      } catch (error) {
        console.log(error);
      }
    }

    getPost();
  }, [])



  const editPost = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.set('title', title)
    postData.set('category', category)
    postData.set('description', description)
    postData.set('thumbnail', thumbnail)

    try {
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, postData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      if(response.status == 200){
        return navigate('/')
      }
    } catch (err) {
      setError(err.response.data.message);

    }
  }

  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit Post</h2>
        {error && <p className="form__error-message">{error}</p>}
        <form className="form create-post__form" onSubmit={editPost}>
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
            suppressContentEditableWarning={true}
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
