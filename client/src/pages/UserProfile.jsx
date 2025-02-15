import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from '../images/avatar15.jpg'
import { FaUserEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { UserContext } from '../context/userContext';

const UserProfile = () => {
  const [avatar, setAvatar] = useState(Avatar)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const navigate = useNavigate();

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;

  //redirect to login page for any user who isn't logged in
  useEffect(() => {
    if(!token){
      navigate('/login')
    }
  }, [token, navigate]);


  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myposts/${currentUser?.id}`} className='btn'>My posts</Link>
        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={avatar} alt="" />
            </div>
            <form className="avatar__form">
              <input type="file" name='avatar' id='avatar' onChange={e => setAvatar(e.target.files[0])} accept='png, jpg, jpeg'/>
              <label htmlFor="avatar"><FaUserEdit/></label>
            </form>
            <button className='profile__avatar-btn'><FaCheck/></button>

          </div>

          <h1>Akshay</h1>


          <form className="form profile__form">
            <p className="form__error-message">This is an Error Message</p>
            <input type="text" placeholder='Fullname' value={name} onChange={e => setName(e.target.value)}/>
            <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
            <input type="password" placeholder='Current Password' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}/>
            <input type="password" placeholder='New Password' value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
            <input type="password" placeholder='Confrim New Password' value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)}/>
            <button type='submit' className='btn primary'>Update Details</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile