import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Post from './Post';
import ReactLoading from 'react-loading';
// import axios from 'axios';
import axios from '../../api/axios';

export default function BlogContainer() {
  const [posts, setPosts] = useState([]);
  const [done, setDone] = useState(undefined);
  // mount
  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`/getblogs`)
        .then(function (response) {
          // handle success
          // console.log('here is my data', response.data);
          setPosts(response.data.blog);
          setDone(true);
        })
        .catch(function (error) {
          // handle error
          console.log({ error });
        });
    }, 10);
  }, []);

  const postComponents = posts.map((item) => {
    return <Post key={item._id} postData={item}></Post>; //passing item as props to <Post>
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
