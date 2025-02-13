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
    try {
        const posts = await Post.find().sort({updatedAt: -1})
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError(error))
    }
}


//GET A SINGLE POST
//GET: api/posts/:id
//UNPROTECTED
const getPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post){
            return next(new HttpError("Post not Found.", 404))
        }
        res.status(200).json(post)
    } catch (error) {
        return next(new HttpError(error))
    }
}

//GET POSTS BY CATEGORY
//GET: api/posts/categories/:category 
//UNPROTECTED
const getCatPosts = async (req, res, next) => {
    try {
        const {category} = req.params;
        const catPosts = await Post.find({category}).sort({createdAt: -1})
        res.status(200).json(catPosts)
    } catch (error) {
        return next(new HttpError(error))
    }
}


//GET POST BY AUTHOR
//GET: api/posts/users/:id
//UNPROTECTED
const getUserPosts = async (req, res, next) => {
    try {
        const {id} = req.params;
        const posts = await Post.find({creator: id}).sort({createdAt: -1})
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError(error))
    }
}


//EDIT POST
//PATCH: api/posts/:id
//PROTECTED
// const editPost = async (req, res, next) => {
//     try {
//         let fileName;
//         let newFilename;
//         let updatedPost;
//         const postId = req.params.id;
//         let {title, category, description} = req.body;

//         if(!title || !category || description.length < 12){
//             return next(new HttpError("Fill in all the fields.", 422))
//         }

//         if(!req.files || !req.files.thumbnail){
//             updatedPost = await Post.findByIdAndUpdate(postId, {title, category, description}, {new: true})
//         }
//         else{
//             //get old post from database
//             const oldPost = await Post.findById(postId);
//             //delete old thumbnail from upload
//             if (oldPost.thumbnail) {
//                 const oldFilePath = path.join(__dirname, '..', 'uploads', oldPost.thumbnail);
//                 fs.unlink(oldFilePath, (err) => {
//                     if (err) console.error("Error deleting old file:", err);
//                 });
//             }
            

//             //upload new thumbnail
//             const {thumbnail} = req.files;
//             //check the size of the file
//             if (thumbnail.size > 2000000){
//                 return next(new HttpError("Thumbnail too big. Should be less than 2 MB"))
//             }
//             fileName = thumbnail.name;
//             let splittedFilename = fileName.split('.')
//             newFilename = splittedFilename[0] + uuid() +"."+ splittedFilename[splittedFilename.length - 1]
//              // Move the new file
//              await thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename));

//             updatedPost = await Post.findByIdAndUpdate(postId, {title, category, description, thumbnail:newFilename}, {new:true})


//         }

//         if(!updatedPost){
//             return next(new HttpError("Couldn't updated the post", 400))
//         }

//         res.status(200).json(updatedPost)
//     } catch (error) {
//         return next(new HttpError(error))
//     }
// }



const editPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        let { title, category, description } = req.body;

        if (!title || !category || description.length < 12) {
            return next(new HttpError("Fill in all the fields.", 422));
        }

        let updatedPost;

        if (!req.files || !req.files.thumbnail) {
            // No new file uploaded, update text fields only
            updatedPost = await Post.findByIdAndUpdate(
                postId,
                { title, category, description },
                { new: true }
            );
        } else {
            // Handle new thumbnail upload
            const oldPost = await Post.findById(postId);
            if (!oldPost) {
                return next(new HttpError("Post not found.", 404));
            }

            // Delete the old thumbnail if it exists
            if (oldPost.thumbnail) {
                const oldFilePath = path.join(__dirname, '..', 'uploads', oldPost.thumbnail);
                fs.unlink(oldFilePath, (err) => {
                    if (err) console.error("Error deleting old file:", err);
                });
            }

            // Upload new file
            const { thumbnail } = req.files;

            // Check file size
            if (thumbnail.size > 2000000) {
                return next(new HttpError("Thumbnail too big. Should be less than 2 MB", 400));
            }

            // Generate a unique file name
            let fileName = thumbnail.name;
            let splittedFilename = fileName.split('.');
            let newFilename = `${splittedFilename[0]}_${uuid()}.${splittedFilename[splittedFilename.length - 1]}`;

            // Move the new file
            await thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename));

            // Update post with new data
            updatedPost = await Post.findByIdAndUpdate(
                postId,
                { title, category, description, thumbnail: newFilename },
                { new: true }
            );
        }

        if (!updatedPost) {
            return next(new HttpError("Couldn't update the post", 400));
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        return next(new HttpError(error.message || "Server error", 500));
    }
};


//DELETE A POST
//DELETE: api/posts/:id
//PROTECTED
const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        if(!postId){
            return next(new HttpError("Post Unavailable", 400))
        }
        const post = await Post.findById(postId);
        const fileName = post?.thumbnail;

        if(req.user.id == post.creator){
        //delete thumbnail from uploads folder
        fs.unlink(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
            if(err){
                return next(new HttpError(err))
            }
            else{
                await Post.findByIdAndDelete(postId);
                //find user and reduce post count by 1
                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser?.posts - 1;
                await User.findByIdAndUpdate(req.user.id, {posts:userPostCount})
                res.json(`Post ${postId} deleted successfully.`)
            }
        })
    }else{
        return next(new HttpError("Post couldn't be deleted", 403))
    }
  
    } catch (error) {
        return next(new HttpError(error))
    }
}


module.exports = {createPost, getPost, getPosts, getCatPosts, getUserPosts, editPost, deletePost}