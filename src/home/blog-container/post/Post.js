import React from 'react'
import { Card, CardHeader, CardContent, Typography, Box,  } from '@mui/material'
import { Link } from "react-router-dom";
import moment from 'moment'
export default function Post(props) {   

    const postData = props.postData;

    return (
        <Box m={3}><Link to={`/view-post/${postData.id}`} style={{ textDecoration: 'none' }}>
            <Card>
                <CardHeader
                title = {postData.title}>
                </CardHeader>
                <CardContent>
                    <Typography variant="h5">{postData.summary}</Typography>
                    <div><Typography variant="caption" m={4}>Created on {moment(postData.created_on).format('MMMM Do YYYY, h:mm a')}</Typography></div>
                </CardContent>
            </Card></Link>
        </Box>
    )
}
