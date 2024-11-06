import React from 'react'
import { useSelector } from 'react-redux'
import { selectLessonById } from './lessonApiSlice'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import { useGetTeachersQuery } from '../teacher/teacherApiSlice';
import { useGetSubjectsQuery } from '../subject/subjectApiSlice';
import Button from '@mui/material/Button';
import { BlueButton } from '../../../components/styles/buttonStyles';

const Lesson = ({ lessonId }) => {
    const lesson = useSelector(state => selectLessonById(state, lessonId ))
    const { data: teachers, isSuccess: isTeacherSuccess } = useGetTeachersQuery()
    const { data: subjects, isSuccess: isSubjectSuccess } = useGetSubjectsQuery()
    

    let teacherName
    if (isTeacherSuccess && lesson) {
        const teacher = teachers.entities[lesson.teacher];
        teacherName = teacher ? teacher.teacherName : 'No assigned Teacher';
    }

    let lessonSubjectName
    if (isSubjectSuccess && lesson) {
        const subject = subjects.entities[lesson.subject];
        lessonSubjectName = subject ? subject.subjectName : 'No assigned Subject';
    }

    let content

    const navigate = useNavigate()
    const lessonDate = new Date(lesson.date).toLocaleString('en-US', { day: 'numeric', month: 'numeric' , year: 'numeric'})
    const dateCreated = new Date(lesson.createdAt).toLocaleString()

    const formattedText = (text) => {

        return text 
        ? text
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
        : null
      }
   
    if(lesson) {
        content = (
            <TableRow>
            <TableCell>{formattedText(lessonSubjectName)}</TableCell>
            <TableCell>{lesson.title}</TableCell>
            <TableCell>{lessonDate}</TableCell>
            <TableCell>{teacherName}</TableCell>
            <TableCell>{dateCreated}</TableCell>
            <TableCell align="right">

            
                <BlueButton
                variant='contained'
                onClick={() => navigate(`/dash/lessons/view/${lessonId}`)}
                >
                    View
                </BlueButton>
                <Button
                variant='outlined'
                onClick={() => navigate(`/dash/lessons/edit/${lessonId}`)}
                >
                    Edit
                </Button> 
            </TableCell>
          </TableRow>
        )
    } 
    return content
}

export default Lesson