import React from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { useAddNewSubjectMutation } from './subjectApiSlice'
import { useGetTeachersQuery } from '../teacher/teacherApiSlice'
import useAuth from '../hooks/useAuth'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField  from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'


const NewSubjectForm = () => {
    
            
      const { id } = useParams()
      const classroom = id
      
        
      const [addNewSubject, {
          isLoading,
          isError,
          error
        }] = useAddNewSubjectMutation()

      const { userId } = useAuth()  
      const navigate = useNavigate()
  
      const [subjectCode, setSubjectCode] = useState('')
      const [subjectName, setSubjectName] = useState('')  
      const [teacher, setTeacher] = useState('')  
  
      const onSubjectCodeChange = (e) => setSubjectCode(e.target.value)
      const onSubjectNameChange = (e) => setSubjectName(e.target.value)
      const onTeacherChange = (e) => setTeacher(e.target.value)
      
      const { data: teachers, isSuccess: isTeacherSuccess } = useGetTeachersQuery()

      let teachersOption
      if(isTeacherSuccess) {
        const filteredTeachers = teachers.ids.filter(teacherId => teachers.entities[teacherId].school === userId)
          
           if(filteredTeachers){
            teachersOption = filteredTeachers.map(id => (
              <MenuItem key={id} value={id}>
                  {teachers.entities[id].teacherName}
              </MenuItem>
          ))
           } 
  
      }

      const school = userId
      const canSave = subjectCode && subjectName && school && classroom && !isLoading
      
      const onSubjectSaveClicked = async(e) => {
        e.preventDefault()
        if(canSave){
          try {
            await addNewSubject({ subjectCode, subjectName, school, classroom, teacher }).unwrap()
            setSubjectCode('')
            setSubjectName('')
            navigate('/dash/subjects')
              }
          catch (error) {
                console.log(error)
              }
              
            }
         }    
 

    
      
      let content
      if(isError) content = <p>{error?.data?.message}</p>
  
     content =  (
        <Box
          component="form"
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 3, 
            width: '100%', 
            maxWidth: 600, 
            margin: '0 auto', 
            padding: 3, 
            borderRadius: 2,
          }}
        >
          {isError && <p>{error?.data?.message}</p>}
          
          <Typography variant="h4" gutterBottom align="center">New Subject</Typography>

    
          <TextField
            id="subjectCode"
            name="subjectCode"
            label="Subject Code"
            placeholder="Enter Subject Code"
            value={subjectCode}
            onChange={onSubjectCodeChange}
            fullWidth
          />
    
          <TextField
            id="subjectName"
            name="subjectName"
            label="Subject Name"
            placeholder="Enter Subject Name"
            value={subjectName}
            onChange={onSubjectNameChange}
            fullWidth
          />
          <Select
            id="subjectTeacher"
            name="subjectTeacher"
            labelId='teacher-label'
            label="Select Teacher"
            placeholder='Select Teacher'
            value={teacher}
            onChange={onTeacherChange}
            fullWidth
          >
            <MenuItem disabled value='Select Teacher'>Select Teacher</MenuItem>
            {teachersOption}
          </Select>
    
          <Button 
            variant="contained" 
            color="primary" 
            disabled={!canSave} 
            onClick={onSubjectSaveClicked}
            sx={{ alignSelf: 'center', padding: '0.5rem 2rem' }}
          >
            Save
          </Button>
        </Box>

      )
      return content
}
export default NewSubjectForm   
    
    
      
      
    
