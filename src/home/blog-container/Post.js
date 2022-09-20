import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import moment from 'moment';
export default function Post(props) {
  const postData = props.postData;

  return (
    <Box m={3}>
      <Link
        to={`/view-post/${postData._id}`}
        style={{ textDecoration: 'none' }}
      >
        <Card>
          <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h5'>{postData.title}</Typography>
            <Typography variant='body1' sx={{ fontWeight: '500' }}>
              {postData.summary}
            </Typography>
            <Typography
              variant='caption'
              sx={{ alignSelf: 'flex-end', mt: '10px' }}
            >
              Created on{' '}
              {moment(postData.createdAt).format('MMMM Do YYYY, h:mm a')}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
}
