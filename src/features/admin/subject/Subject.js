import React from 'react'
import { useSelector } from 'react-redux'
import { selectSubjectById } from './subjectApiSlice'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useGetClassRoomsQuery } from '../classRoom/classRoomApiSlice';
import { useNavigate } from 'react-router-dom';
import { useGetTeachersQuery } from '../teacher/teacherApiSlice';
import { Button } from '@mui/material';


const Subject = ({ subjectId }) => {
    const subject = useSelector(state => selectSubjectById(state, subjectId))
    const { data: classrooms, isSuccess } = useGetClassRoomsQuery()
    const { data: teachers, isSuccess: isTeacherSuccess} = useGetTeachersQuery()
  

    const navigate = useNavigate()


    let classroomNames
    if(isSuccess) {
        const classroom = classrooms.entities[subject.classroom]
        classroomNames = classroom ? classroom.className : 'No classes'
    }

    let teacherNames
    if(isTeacherSuccess && subject) {
        const teacher = teachers.entities[subject.teacher];
        teacherNames = teacher ? teacher.teacherName : 'No assigned Teacher';
    }
    
    const formattedText = (text) => {
        return text ?
            text
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')
        : ''
    }

    let content
   
    if(subject ) {
        content = (
            <TableRow>
            <TableCell>{subject.subjectCode}</TableCell>
            <TableCell>{formattedText(subject.subjectName)}</TableCell>
            <TableCell>{formattedText(classroomNames)}</TableCell>
            <TableCell>{formattedText(teacherNames)}</TableCell>
            <TableCell align="right">
                
                <Button
                variant='outlined'
                onClick={() => navigate(`/dash/subjects/${subjectId}`)}
                >
                    Edit
                </Button>
            </TableCell>
          </TableRow>
        )
    } else {
        content = <p>No subjects found</p>
    }
    return content
    
}

export default Subject