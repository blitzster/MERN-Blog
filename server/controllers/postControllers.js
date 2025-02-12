const Post = require('../models/postModel')
const User = require('../models/userModel')
const path = require('path')
const fs = require('fs')
const {v4:uuid} = require('uuid')
const HttpError = require('../models/errorModel')


//CREATE A POST
//POST: api/posts
//PROTECTED
const createPost = async (req, res, next) => {
    try {
        let {title, category, description} = req.body;
        if(!title || !category || !description || !req.files){
            return next(new HttpError("Fill in all fields and choose Thumbnail.", 422))
        }
        const {thumbnail} = req.files

        //check the filesize
        if(thumbnail.size > 2000000){
            return next(new HttpError("File size too big. File should be less than 2 MB."))
        }
        let fileName = thumbnail.name;
        let splittedFilename = fileName.split('.')
        let newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length - 1]
        thumbnail.mv(path.join(__dirname, '..', '/uploads', newFilename), async (err) => {
            if(err){
                return next(new HttpError(err))
            }
            else{
                const newPost = await Post.create({title, category, description, thumbnail:newFilename, creator:req.user.id})
                if(!newPost){
                    return next(new HttpError("Post couldn't be created.", 422))
                }

                //find user and increase the post count by 1
                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser.posts + 1;
                await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})

                res.status(201).json(newPost)
            }
        })
    } catch (error) {
        return next(new HttpError(error))
    }
}


//GET A POST
//GET: api/posts
//UNPROTECTED
const getPosts = async (req, res, next) => {
    res.json("Get all Posts")
}


//GET A SINGLE POST
//GET: api/posts/:id
//UNPROTECTED
const getPost = async (req, res, next) => {
    res.json("Get a Single Post")
}

//GET POSTS BY CATEGORY
//GET: api/posts/categories/:category 
//UNPROTECTED
const getCatPosts = async (req, res, next) => {
    res.json("Get posts by category")
}


//GET POST BY AUTHOR
//GET: api/posts/users/:id
//UNPROTECTED
const getUserPosts = async (req, res, next) => {
    res.json("Get user posts")
}


//EDIT POST
//PATCH: api/posts/:id
//PROTECTED
const editPost = async (req, res, next) => {
    res.json("Edit Post")
}


//DELETE A POST
//DELETE: api/posts/:id
//PROTECTED
const deletePost = async (req, res, next) => {
    res.json("Delete Post")
}


module.exports = {createPost, getPost, getPosts, getCatPosts, getUserPosts, editPost, deletePost}