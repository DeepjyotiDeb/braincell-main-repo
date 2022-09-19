import { Container } from '@mui/material'
import React, {useEffect, useState} from 'react'
// import axios from 'axios'

import Post from '../post/Post'
import axios from '../../../api/axios'

export default function MyPost() {

    const [myPosts, setMyPosts] = useState([])
    let uid = localStorage.getItem('user_id')

    useEffect(()=>{
        // console.log("these are my posts")
        // console.log(uid)
        axios.get(`/get-user/${uid}`)
        .then((response)=>{
            // console.log('my data only', response.data);
            setMyPosts(response.data.blogs);
            // console.log(response.data.blogs)
        })
        .catch((error)=>{
            console.log(error);
        })},[]);

    const postComponents = myPosts.map(item => {
        return <Post key={item.id} postData={item}></Post>
    })
    return (
        <Container maxWidth="lg">
            {postComponents}
        </Container>
    )
}
