// import React, { useRef, useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { useLoginMutation } from './authApiSlice'
// import { setCredentials } from './authSlice'
// import { useNavigate } from 'react-router-dom'
// //import { jwtDecode } from 'jwt-decode'
// import useAuth from '../hooks/useAuth'

// const AdminLogin = () => {

//     const userRef = useRef()
//     const errRef = useRef()
    
    
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')
//     const [errorMsg, setErrMsg] = useState('')
    
//     const navigate = useNavigate()
//     const dispatch = useDispatch()

//     const [login, {
//         isLoading
//     }] = useLoginMutation()

//     useEffect(() => {
//         userRef.current.focus()
//     }, [])

//     useEffect(() => {
//         setErrMsg('')
//     }, [username, password])


//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         try {
//             const { accessToken } = await login({ username, password }).unwrap()
            
//             dispatch(setCredentials({ accessToken }))
//             setUsername('')
//             setPassword('')
//             navigate('/dash')

//         } catch (err) {
//             if (!err.status) {
//                 setErrMsg('No Server Response');
//             } else if (err.status === 400) {
//                 setErrMsg('Missing username or Password');
//             } else if (err.status === 401) {
//                 setErrMsg('wrong username or Password');
//             } else {
//                 setErrMsg(err.data?.message);
//             }
//             errRef.current.focus();
//         }
//     }
//     const { role } = useAuth()
//     // useEffect(() => {
//     //     if(role === 'Admin') {
//     //         navigate('/dash')
//     //     } 
//     // },[role, navigate])

//     // useEffect(() => {
//     //     if(role === 'Student'){
//     //         navigate('/dash/lesson')
//     //     }
//     // },[role, navigate])

    
//     console.log('role: ', role)

//     const handleAdminInput = e => setUsername(e.target.value)
//     const handlerPwdInput = e => setPassword(e.target.value)

//     let content
//     if(isLoading) content = <p>Loading...</p>

//     content = (
//         <section>
//             <header>
//                 <h1>Admin Login</h1>
//             </header>
//             <main>
//             <p ref={errRef} aria-live="assertive">{errorMsg}</p>
//                 <form onSubmit={handleSubmit}>
//                     <label htmlFor="username">username:</label>
//                     <input
                        
//                         type="text"
//                         id="username"
//                         ref={userRef}
//                         value={username}
//                         onChange={handleAdminInput}
                        
//                         required
//                     />

//                     <label htmlFor="password">Password:</label>
//                     <input
//                         type="password"
//                         id="password"
//                         onChange={handlerPwdInput}
//                         value={password}
//                         required
//                     />
//                     <button className="form__submit-button">Login In</button>

//                 </form>
//             </main>

//         </section>
//     )

    
//     return content
// } 

// export default AdminLogin

import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from './authApiSlice';
import { setCredentials } from './authSlice';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';

const AdminLogin = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrMsg] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { accessToken } = await login({ username, password }).unwrap();
            dispatch(setCredentials({ accessToken }));
            setUsername('');
            setPassword('');
            navigate('/dash');
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Wrong Username or Password');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    };


    const handleAdminInput = (e) => setUsername(e.target.value);
    const handlePwdInput = (e) => setPassword(e.target.value);

    let content;
    if (isLoading) content = <Typography>Loading...</Typography>;

    content = (
        <Box
            component="section"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: 2,
            }}
        >
            <Typography component="h1" variant="h4" mb={2}>
                Admin Login
            </Typography>
            <Box component="main">
                {errorMsg && (
                    <Alert severity="error" ref={errRef} sx={{ mb: 2 }}>
                        {errorMsg}
                    </Alert>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        id="username"
                        inputRef={userRef}
                        value={username}
                        onChange={handleAdminInput}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        id="password"
                        type="password"
                        value={password}
                        onChange={handlePwdInput}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </Box>
    );

    return content;
};

export default AdminLogin;