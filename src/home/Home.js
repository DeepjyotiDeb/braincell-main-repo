import React from 'react';
import Navbar from './navbar/Navbar';
import BlogContainer from './blog-container/BlogContainer';
import SinglePost from './blog-container/SinglePost';
import MakePost from './makepost/makePost';
import MyPost from './blog-container/MyPost';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import SignUp from './signup/SignUp';

export default function Home() {
  //on first login, the following portion before return does not run but runs after reload
  const token = localStorage.getItem('token');
  // console.log('token main , ', token);

  const ProtectedRoute = ({ token, redirectPath = '/' }) => {
    if (token) {
      return <Outlet />;
    } else {
      // console.log('token', token, localStorage.getItem('token'));
      return <Navigate to={redirectPath} replace />;
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<BlogContainer />}></Route>
        <Route path='/view-post/:id' element={<SinglePost />}></Route>
        <Route path='/sign-up' element={<SignUp />}></Route>
        <Route element={<ProtectedRoute token={token} />}>
          <Route path='/edit-post/:id' element={<MakePost />}></Route>
          <Route path='/create-post' element={<MakePost></MakePost>}></Route>
          <Route path='/my-posts' element={<MyPost />}></Route>
        </Route>
        <Route
          path='*'
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </Router>
  );
}
