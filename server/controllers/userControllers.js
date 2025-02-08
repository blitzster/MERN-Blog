//=================REGISTER A NEW USER
// POST : api/users/register
// UNPROTECTED

const registerUser = (req, res, next) => {
    res.json("Register User")
}


//=================LOGIN
// POST : api/users/login
// UNPROTECTED

const loginUser = (req, res, next) => {
    res.json("Login User")
}



//=================USER PROFILE
// POST : api/users/:id
// PROTECTED

const getUser = (req, res, next) => {
    res.json("User Profile")
}



//================= CHANGE AVATAR
// POST : api/users/change-avatar
// PROTECTED

const changeAvatar = (req, res, next) => {
    res.json("change User avatar")
}


//=================EDIT USER DETAILS
// POST : api/users/edit-user
// PROTECTED

const editUser = (req, res, next) => {
    res.json("Edit user details")
}



//=================GET AUTHORS
// POST : api/users/authors
// UNPROTECTED

const getAuthors = (req, res, next) => {
    res.json("get all users/authors")
}

module.exports = {registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors}