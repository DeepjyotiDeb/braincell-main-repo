import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import moment from 'moment';

export default function SinglePost() {
  const navigate = useNavigate();
  const { id } = useParams(); // Reads the URL on the URL Bar and gets whatever is after ":"
  const [post, setPost] = useState({});
  const [done, setDone] = useState(undefined);

  const handleSubmit = () => {
    axios
      .delete(`/delete-post/${id}`, {
        json: true,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((response) => console.log(response))
      .then(() => navigate('/'));
  };

  // mount
  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`/get-post/${id}`)
        .then(function (response) {
          // handle success
          setPost(response.data.post);
          setDone(true);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }, 10);
  }, [id]);

  const SuperButton = () => {
    if (post.user_id === localStorage.getItem('user_id')) {
      return (
        <>
          <Button variant='contained' color='success'>
            <Link
              to={`/update-post/${post.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              edit post{' '}
            </Link>
          </Button>
          <Button variant='contained' color='error' onClick={handleSubmit}>
            delete post
          </Button>
        </>
      );
    } else {
      // return(console.log("empty"))
    }
  };

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
        <Container maxWidth='lg' sx={{ margin: 3 }}>
          <Card>
            <CardContent>
              <Typography variant='h5'>{post.title}</Typography>
              <Typography variant='body1' sx={{ fontWeight: '500', pl: 0.3 }}>
                {post.summary}
              </Typography>
              <Typography variant='caption' sx={{ pl: 0.3 }}>
                Created on{' '}
                {moment(post.created_on).format('MMMM Do YYYY, h:mm a')}
              </Typography>
              <div dangerouslySetInnerHTML={{ __html: post.body }} />
            </CardContent>
          </Card>
          {SuperButton()}
        </Container>
      )}
    </>
  );
}
