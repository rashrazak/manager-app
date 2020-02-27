import React, {useEffect, useState, createContext} from 'react'
import axios from 'axios'
export const PostContext = createContext();

function PostProvider(props) {
    const [Posts, setPosts] = useState([]);
    const [Post, setPost] = useState(null);
    const [Comments, setComments] = useState([])

    useEffect(() => {
        getPosts()
    },[!Posts])

    const getPosts = async () => {
        await axios.get('https://jsonplaceholder.typicode.com/posts').then((res)=>{
            console.log(res.data)
            setPosts(res.data)
        }).catch((error)=>{
            console.log(error)
            alert('Server offline')
        })
    }

    const getPost = async (id) => {
        await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res)=>{
            console.log(res.data)
            setPost(res.data)
        }).catch((error)=>{
            console.log(error)
            alert('Error 404')
        })
    }

    const getComments = async (id) => {
        await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`).then((res)=>{
            console.log(res.data)
            setComments(res.data)
        }).catch((error)=>{
            console.log(error)
            alert('Error 404')
        })
    }

   

    return (
        <PostContext.Provider value={{Posts, Post, getPost, getComments, Comments}}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostProvider
