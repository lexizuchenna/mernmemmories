const PostMessage = require('../models/PostMessage')
const mongoose = require('mongoose')

const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({message: error})
    }
}  

const createPost = async (req, res) => {

    const post = req.body
    const newPost = new PostMessage(post)

    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message: error})
    }
}  

// updatePost
const updatePost = async (req, res) => {

    try {
        const post = req.body
        const { id: _id } = req.params

        if(!mongoose.Types.ObjectId.isValid(_id)){
            res.status(404).json('Post not Found')
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id}, {new: true})
        res.json(updatedPost)
    } catch (error) {
        res.status(409).json({message: error})
    }
}  

// deletePost
const deletePost = async (req, res) => {

    try {
        const post = await PostMessage.findById(req.params.id)

        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            res.status(404).json('Post not Found')
        }


        await post.remove()
        res.status(200).json({message: req.params.id})
    } catch (error) {
        console.log(error)
        res.status(409).json({message: error})
    }
}  
// likePost
const likePost = async (req, res) => {

    try {
        const {id} = req.params
        const post = await PostMessage.findById(id)

        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(404).json('Post not Found')
        }
        console.log(post)
        const likedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1}, {new: true})
        res.json(likedPost)
    } catch (error) {
        console.log(error)
        res.status(409).json(error)
    }
}  


module.exports =  {
    getPosts, createPost, updatePost, deletePost, likePost
}