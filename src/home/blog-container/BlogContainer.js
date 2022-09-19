import { Container } from '@mui/material'
import React, {useEffect, useState} from 'react'
import Post from './post/Post'
import axios from "../../api/axios";
import ReactLoading from "react-loading"

export default function BlogContainer() {

    const [posts, setPosts] = useState([]);
    const [done, setDone] = useState(undefined)
    // mount
    useEffect(() => {
        setTimeout(() => {
        axios.get('/posts')
        .then(function (response) {
            // handle success
            // console.log('here is my data', response.data);
            setPosts(response.data.posts)
            setDone(true)
        })
        .catch(function (error) {
            // handle error
            console.log(error);            
        });
        }, 10)        
    }, []);

    const postComponents = posts.map(item => {
        return <Post key={item.id} postData={item}></Post> //passing item as props to <Post>
    })

    return (
        <>{!done? (
            <div
            style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)' //centering
            }}
        >
        <ReactLoading
            type={"balls"}
            color={"#7D3C98"}
            height={50}
            width={50}/>
        </div>  
        ) : (
            <Container maxWidth="lg">
            {postComponents}
        </Container>
        )}        
        </>)
}
