import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import axios from 'axios'

import Post from './Post';
import axios from '../../api/axios';
import ReactLoading from 'react-loading';

export default function MyPost() {
  const [myPosts, setMyPosts] = useState([]);
  const [done, setDone] = useState(false);
  let uid = localStorage.getItem('id');

  useEffect(() => {
    const getMyPost = async () => {
      await axios
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
          setMyPosts(response.data.userBlogs);
          setDone(true);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getMyPost();
  }, [uid]);

  const postComponents = myPosts.map((item) => {
    return <Post key={item._id} postData={item}></Post>;
  });

  return (
    <>
      {!done ? (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)', //centering
          }}
        >
          <ReactLoading
            type={'balls'}
            color={'#7D3C98'}
            height={50}
            width={50}
          />
        </div>
      ) : (
        <Container
          maxWidth='lg'
          // sx={{ width: { lg: '1000px', md: '800px', xs: '600px' } }}
        >
          {postComponents}
        </Container>
      )}
    </>
  );
}
