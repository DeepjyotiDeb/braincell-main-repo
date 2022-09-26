import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import axios from 'axios'

import Post from './Post';
import axios from '../../api/axios';

export default function MyPost() {
  const [myPosts, setMyPosts] = useState([]);
  let uid = localStorage.getItem('id');

  useEffect(() => {
    // console.log("these are my posts")
    // console.log(uid)
    axios
      .post(
        `/blogsByUser`,
        {
          'userId': uid,
        },
        {
          headers: {
            'Authorization': `${localStorage.getItem('token')}`,
          },
        }
      )
      .then((response) => {
        console.log('my data only', response.data);
        setMyPosts(response.data.userBlogs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [uid]);

  const postComponents = myPosts.map((item) => {
    return <Post key={item._id} postData={item}></Post>;
  });
  return <Container maxWidth='lg'>{postComponents}</Container>;
}
