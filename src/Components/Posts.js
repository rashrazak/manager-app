import React,{useState, useEffect, useContext} from 'react'
import {Row,Col,Container,Toast, ToastBody, ToastHeader} from 'reactstrap'
import { PostContext } from '../Context/Post'


function Posts() {
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const [post, setPost] = useState(null)
    const [viewPost, setViewPost] = useState(false)
    const [viewComment, setViewComment] = useState(false)
    const [search, setSearch] = useState('')
    const [searchList, setSearchList] = useState([])
    const {Posts, Post, getPost, getComments, Comments} = useContext(PostContext)

    useEffect(() => {
        if (posts.length == 0) {
            setPosts(Posts)
        }
    }, [Posts])

    useEffect(() => {
        console.log(Post)
        if (post == null) {
            setPost(Post)
        }
    }, [Post])

    useEffect(() => {
        if (comments.length == 0) {
            setComments(Comments)
        }
    }, [Comments])

    useEffect(() => {
       
            setSearchList((old) => {
                let v = comments.filter((x) => {
                    return (x.name.toLowerCase().includes(search.toLowerCase()) || x.email.toLowerCase().includes(search.toLowerCase()) || x.body.toLowerCase().includes(search.toLowerCase()));
                })
                return v
                
            })
    }, [search])

    function getPostFn(id){
        // alert(id)
        getPost(id)
        setViewPost(true)
    }

    function viewCommentFn(id){
        getComments(id)
        setViewComment(true)
    }
    return (
        <div>
            <Container style={{background:'#fff'}}>
                <Row style={{marginTop:'80px'}}>
                    <Col md="12" style={{marginBottom:'80px'}}>
                    {
                        viewPost === false ?
                        <div>
                            <h1>Posts</h1>
                            <Row>
                                {
                                    posts && posts.map((v,i)=>{
                                        return(
                                            <Col key={i} md="4">
                                                <div className="p-3 my-2 rounded">
                                                    <Toast onClick={()=> getPostFn(v.id)}>
                                                    <ToastHeader>
                                                        {v.title}
                                                    </ToastHeader>
                                                    <ToastBody>
                                                        {v.body}
                                                       
                                                    </ToastBody>
                                                    </Toast>
                                                </div>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </div>
                        :
                        <div>
                            <h1>Post </h1>
                            <Row>
                                {
                                    post ?
                                    <Col md="12">
                                        <div className="rounded">
                                            <Toast>
                                            <ToastHeader>
                                                {post.title}
                                            </ToastHeader>
                                            <ToastBody>
                                                {post.body}
                                                <br/>
                                                <button onClick={()=>setViewPost(false)}>View Post</button>
                                                <button onClick={()=>viewCommentFn(post.id)}>View Comments</button>
                                            </ToastBody>
                                            </Toast>
                                        </div>
                                    </Col>
                                    :''

                                    
                                }
                            </Row>
                            <Row>
                                {
                                    viewComment == true && comments ?
                                    <input style={{margin:'20px'}} type="text" placeholder="Search Comments" onChange={(e) => setSearch(e.target.value)} />
                                    :''
                                }
                                {
                                    viewComment == true && comments && search == ''&& comments.map((v,i)=>{
                                            return(
                                                <Col key={i} md="12 ">
                                                    <div className="my-2 rounded">
                                                        <Toast onClick={()=> getPostFn(v.id)}>
                                                        <ToastHeader>
                                                            {v.name} - {v.email}
                                                        </ToastHeader>
                                                        <ToastBody>
                                                            {v.body}
                                                        </ToastBody>
                                                        </Toast>
                                                    </div>
                                                </Col>
                                            )
                                        })
                                }

                                {
                                    viewComment == true && comments && search && searchList.map((v,i)=>{
                                            return(
                                                <Col key={i} md="12 ">
                                                    <div className="my-2 rounded">
                                                        <Toast onClick={()=> getPostFn(v.id)}>
                                                        <ToastHeader>
                                                            {v.name} - {v.email}
                                                        </ToastHeader>
                                                        <ToastBody>
                                                            {v.body}
                                                        </ToastBody>
                                                        </Toast>
                                                    </div>
                                                </Col>
                                            )
                                        })
                                }
                            </Row>
                        </div>
                    }
                    
                    </Col>
                </Row>
            </Container>
            
        </div>
    )
}

export default Posts
