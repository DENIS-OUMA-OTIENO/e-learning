import { useSelector } from "react-redux"
import { selectAdminById } from "../adminApiSlice"
import { useAddNewTeacherMutation } from "./teacherApiSlice"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import FormControl from "@mui/material/FormControl"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

const NewTeacherForm = ({ adminId }) => {
    const admin = useSelector(state => selectAdminById(state, adminId))

    const school = admin.id
    const navigate = useNavigate()

    const [addNewTeacher, { 
            isSuccess,
            isLoading,
            isError,
            error       

        }] = useAddNewTeacherMutation()

    const [teacherNumber, setTeacherNumber] = useState('')
    const [teacherName, setTeacherName] = useState('')
    const [gender, setGender] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if(isSuccess) {
            setTeacherNumber('')
            setTeacherName('')
            setGender('')
            setPassword('')
            navigate('/dash/teachers')
        }
    }, [isSuccess, navigate])

    const onTeacherNumberChange = e => setTeacherNumber(e.target.value)
    const onTeacherNameChange = e => setTeacherName(e.target.value)
    const onGenderChange = e => setGender(e.target.value)
    const onPasswordChange = e => setPassword(e.target.value)

    const canSave = teacherNumber && teacherName && gender && password && school && !isLoading
    
    const onTeacherSaveClicked = async(e) => {
        e.preventDefault()
        if(canSave) {
            await addNewTeacher({ teacherNumber, teacherName, gender, password, school })
        }
    }

    let content
    if(isError) content = <p>{error?.data?.message}</p>
    content = (
       <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
          <Typography variant="h4" gutterBottom align="center">New Teacher</Typography>
          <FormControl fullWidth>
              <Grid container spacing={2}>
                  <Grid item xs={12}>
                      <TextField
                          id="teacherNumber"
                          label="Teacher Number"
                          placeholder="Enter teacher TSC number"
                          value={teacherNumber}
                          onChange={onTeacherNumberChange}
                          fullWidth
                          required
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                          id="teacherName"
                          label="teacherName"
                          placeholder="Enter teacher name"
                          value={teacherName}
                          onChange={onTeacherNameChange}
                          fullWidth
                          required
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                          id="gender"
                          label="Gender"
                          placeholder="Enter teacher gender"
                          value={gender}
                          onChange={onGenderChange}
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
                          onChange={onPasswordChange}
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
                      onClick={onTeacherSaveClicked}
                  >
                      Add Teacher
                  </Button>
              </Box>
          </FormControl>
          {isError && <Typography color="error" sx={{ mt: 2 }}>{error?.data?.message}</Typography>}
      </Box> 
    )
   
    return content
}

export default NewTeacherForm

