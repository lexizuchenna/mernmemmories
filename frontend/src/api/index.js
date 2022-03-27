import axios from 'axios'

const url = 'https://mernmem.herokuapp.com/posts'


export const fetchPosts = () => axios.get(url)
export const createPost = (newPost) => axios.post(url, newPost)
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost)
export const likePost = (id, likedPost) => axios.patch(`${url}/likepost/${id}`, likedPost)
export const deletePost = (id) => axios.delete(`${url}/${id}`)