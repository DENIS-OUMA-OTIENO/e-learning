// import React from 'react'
// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import FormControl from "@mui/material/FormControl"
// import FormLabel from "@mui/material/FormLabel"
// import { useRegisterMutation } from './authApiSlice'

// const NewAdmin = () => {

//         const navigate = useNavigate()
    
//         const [addNewAdmin, { 
//                 isSuccess,
//                 isLoading,
//                 isError,
//                 error       
    
//             }] = useRegisterMutation()
    
        
//         const [adminName, setAdminName] = useState('')
//         const [school, setSchool] = useState('')
//         const [password, setPassword] = useState('')
//         const [email, setEmail] = useState('')
    
//         useEffect(() => {
//             if(isSuccess) {
//                 setAdminName('')
//                 setSchool('')
//                 setPassword('')
//                 setEmail('')
//                 navigate('/login')
//             }
//         }, [isSuccess, navigate])
    
//         const onAdminNameChange = e => setAdminName(e.target.value)
//         const onSchoolChange = e => setSchool(e.target.value)
//         const onEmailChange = e => setEmail(e.target.value)
//         const onPasswordChange = e => setPassword(e.target.value)
    
//         const canSave = adminName && school && email &&  password && !isLoading
        
//         const onAdminSaveClicked = async(e) => {
//             e.preventDefault()
//             if(canSave) {
//                 await addNewAdmin({ adminName, email, password, school })
//             }
//         }
    
//         let content
//         if(isError) content = <p>{error?.data?.message}</p>
//         content = (
//             <>
            
//             <FormControl>
//               <div>New School</div>
//               <FormLabel>School Name</FormLabel>
              
//               <input
//               id="school"
//               name="school"
//               placeholder="Enter school"
//               type="text"
//               value={school}
//               onChange={onSchoolChange}
//               />
    
              
//               <FormLabel>Admin Name</FormLabel>
//               <input
//               id="adminName"
//               name="adminName"
//               placeholder="Enter Admin name"
//               type="text"
//               value={adminName}
//               onChange={onAdminNameChange}
//               />
            
//             <FormLabel>Email</FormLabel>
//               <input
//               id="email"
//               name="email"
//               placeholder="Enter Email"
//               type="text"
//               value={email}
//               onChange={onEmailChange}
//               />
              
//               <FormLabel color="primary">Password</FormLabel>
//               <input
//               id="password"
//               name="password"
//               placeholder="Enter password"
//               type="password"
//               value={password}
//               onChange={onPasswordChange}
//               />
    
//               <button
//               title="Save"
//               disabled={!canSave}
//               onClick={onAdminSaveClicked}
//               >
//               Add School
//               </button>
                
//             </FormControl>
//           </>
//         )
       
//         return content
//     }
    
// export default NewAdmin

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRegisterMutation } from './authApiSlice'
import { Box, Button, FormControl, FormLabel, TextField, Typography } from "@mui/material"

const NewAdmin = () => {
    const navigate = useNavigate()

    const [addNewAdmin, { isSuccess, isLoading, isError, error }] = useRegisterMutation()

    const [adminName, setAdminName] = useState('')
    const [school, setSchool] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (isSuccess) {
            setAdminName('')
            setSchool('')
            setPassword('')
            setEmail('')
            navigate('/login')
        }
    }, [isSuccess, navigate])

    const onAdminNameChange = e => setAdminName(e.target.value)
    const onSchoolChange = e => setSchool(e.target.value)
    const onEmailChange = e => setEmail(e.target.value)
    const onPasswordChange = e => setPassword(e.target.value)

    const canSave = adminName && school && email && password && !isLoading

    const onAdminSaveClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewAdmin({ adminName, email, password, school })
        }
    }

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2, mt: 4 }}>
            {isError && <Typography color="error">{error?.data?.message}</Typography>}
            
            <FormControl fullWidth>
                <Typography variant="h5" gutterBottom>
                    New Admin Registration
                </Typography>

                <FormLabel sx={{ mt: 2 }}>School Name</FormLabel>
                <TextField
                    id="school"
                    name="school"
                    placeholder="Enter school"
                    type="text"
                    value={school}
                    onChange={onSchoolChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />

                <FormLabel sx={{ mt: 2 }}>Admin Name</FormLabel>
                <TextField
                    id="adminName"
                    name="adminName"
                    placeholder="Enter Admin name"
                    type="text"
                    value={adminName}
                    onChange={onAdminNameChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />

                <FormLabel sx={{ mt: 2 }}>Email</FormLabel>
                <TextField
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    type="email"
                    value={email}
                    onChange={onEmailChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />

                <FormLabel sx={{ mt: 2 }}>Password</FormLabel>
                <TextField
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    type="password"
                    value={password}
                    onChange={onPasswordChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />

                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                    onClick={onAdminSaveClicked}
                    disabled={!canSave}
                >
                    Add Admin
                </Button>
            </FormControl>
        </Box>
    )
}

export default NewAdmin