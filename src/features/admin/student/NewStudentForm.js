import { useNavigate, useParams } from "react-router-dom"
import { useAddNewStudentMutation } from "./studentApiSlice"
import { useState } from "react"
import FormControl from "@mui/material/FormControl"
//import FormLabel from "@mui/material/FormLabel"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

const NewStudentForm = ({ adminId }) => {
    
    const { id } = useParams()
    const classroomId = id
    const school = adminId
    
    const [addNewStudent, {
        isLoading,
        isError,
        error
    }] = useAddNewStudentMutation()

    const navigate = useNavigate()

    const [studentNumber, setStudentNumber] = useState('')
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [password, setPassword] = useState('')
  

    const onStudentNumberChanged = (e) => setStudentNumber(e.target.value)
    const onNameChanged = (e) => setName(e.target.value)
    const onPasswordChanged = (e) => setPassword(e.target.value)
    const onGenderChanged = (e) => setGender(e.target.value)

 
    const canSave = studentNumber && name && gender && school && password && classroomId && !isLoading

    const onStudentSaveClicked = async (e) => {
        e.preventDefault()
        if(canSave){
          try {
            await addNewStudent({ studentNumber, name, gender, school, password, classroom: classroomId }).unwrap()
            setStudentNumber('')
            setName('')
            setGender('')
            setPassword('')
            navigate('/dash/students')
          } catch (error) {
            console.error('Failed to save the student')
            
          }
        }
    }

    let content
    if(isError) content = <p>{error?.data?.message}</p>

    content = (
      <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
          <Typography variant="h4" gutterBottom align="center">New Student</Typography>
          <FormControl fullWidth>
              <Grid container spacing={2}>
                  <Grid item xs={12}>
                      <TextField
                          id="studentNumber"
                          label="Admission / Assessment Number"
                          placeholder="Enter student adm or assessment number"
                          value={studentNumber}
                          onChange={onStudentNumberChanged}
                          fullWidth
                          required
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                          id="name"
                          label="Name"
                          placeholder="Enter student name"
                          value={name}
                          onChange={onNameChanged}
                          fullWidth
                          required
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                          id="gender"
                          label="Gender"
                          placeholder="Enter student gender"
                          value={gender}
                          onChange={onGenderChanged}
                          fullWidth
                          required
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                          id="password"
                          label="Password"
                          placeholder="Enter password"
                          type="password"
                          value={password}
                          onChange={onPasswordChanged}
                          fullWidth
                          required
                      />
                  </Grid>
              </Grid>
              <Box sx={{ mt: 3, mb: 3 }}>
                  <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={!canSave}
                      onClick={onStudentSaveClicked}
                  >
                      Add Student
                  </Button>
              </Box>
          </FormControl>
          {isError && <Typography color="error" sx={{ mt: 2 }}>{error?.data?.message}</Typography>}
      </Box>
  )

  return content
}

export default NewStudentForm