import React, { useState } from 'react'
import { useGetTeachersQuery } from '../teacher/teacherApiSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetClassRoomsQuery } from '../classRoom/classRoomApiSlice'
import { useUpdateSubjectMutation } from './subjectApiSlice'
import { useSelector } from 'react-redux'
import { selectAdminById } from '../adminApiSlice'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography  from '@mui/material/Typography'


const EditSubjectForm = ({ subject, adminId }) => {
  const admin = useSelector(state => selectAdminById(state, adminId))
  const school = admin.id
  const { id } = useParams()
    const [updateSubject, {
        
        isLoading,
        isError,
        error

    }] = useUpdateSubjectMutation()

    const { data: teachers, isSuccess } = useGetTeachersQuery()
    const { data: classrooms, isSuccess: isClassroomSuccess} = useGetClassRoomsQuery()

    console.log('subject', id)
    const navigate = useNavigate()

    const [subjectCode, setSubjectCode] = useState(subject.subjectCode)
    const [subjectName, setSubjectName] = useState(subject.subjectName)
    const [subjectClass, setSubjectClass] = useState(subject.classroom)
    const [subjectTeacher, setSubjectTeacher] = useState(subject.teacher)

    let teachersOption
    if(isSuccess) {
        teachersOption = teachers.ids.map(id => (
            <MenuItem key={id} value={id}>
                {teachers.entities[id].teacherName}
            </MenuItem>
        ))

    }

    let classroomsOptions
    if(isClassroomSuccess) {
      classroomsOptions = classrooms.ids.map(id => (
        
        <MenuItem key={id} value={id}>
          {classrooms.entities[id].className}
        </MenuItem>
      ))
    }


    const onSubjectCodeChange = e => setSubjectCode(e.target.value)
    const onSubjectNameChange = e => setSubjectName(e.target.value)
    const onSubjectClassChange = e => setSubjectClass(e.target.value)
    const onSubjectTeacherChange = e => setSubjectTeacher(e.target.value)
    
    const canSave = id && subjectCode && subjectName && subjectClass && subjectTeacher && school && !isLoading
    console.log('cansave', canSave)
    
    const onSaveSubjectClicked = async(e) => {
        e.preventDefault()
        if(canSave){
          try {
            await updateSubject({ id, subjectCode, subjectName, school, classroom: subjectClass, teacher: subjectTeacher }).unwrap()
            setSubjectCode('')
            setSubjectName('')
            setSubjectClass('')
            setSubjectTeacher('')
            navigate('/dash/subjects')
           
              }
          catch (error) {
                console.log(error)
              }
              
            }
    } 
    let content
      if(isError) content = <p>{error?.data?.message}</p>
  
      content = (
        
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
          
          <Typography variant="h4" gutterBottom align="center">Edit Subject</Typography>

    
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
            id="subjectClass"
            name="subjectClass"
            labelId='class-label'
            label="Select Class"
            placeholder='Select Class'
            value={subjectClass}
            onChange={onSubjectClassChange}
            fullWidth
          >
            <MenuItem disabled value='Select Teacher'>Select class</MenuItem>
            {classroomsOptions}
          </Select>
          <Select
            id="subjectTeacher"
            name="subjectTeacher"
            labelId='teacher-label'
            label="Select Teacher"
            placeholder='Select Teacher'
            value={subjectTeacher}
            onChange={onSubjectTeacherChange}
            fullWidth
          >
            <MenuItem disabled value='Select Teacher'>Select Teacher</MenuItem>
            {teachersOption}
          </Select>
    
          <Button 
            variant="contained" 
            color="primary" 
            disabled={!canSave} 
            onClick={onSaveSubjectClicked}
            sx={{ alignSelf: 'center', padding: '0.5rem 2rem' }}
          >
            Save
          </Button>
        </Box>

      )
    
      return content

}

export default EditSubjectForm