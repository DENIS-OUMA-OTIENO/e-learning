import React from 'react'
import { useSelector } from 'react-redux'
import { selectSubjectById } from '../subject/subjectApiSlice'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import { BlueButton } from '../../../components/styles/buttonStyles';

const SubjectLesson = ({ subjectId }) => {
  
    const subject = useSelector(state => selectSubjectById(state, subjectId))
  
    const navigate = useNavigate()
    
    const formattedText = (text) => {
        return text 
        ? text
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
        : ''
    }
    let content
   
    if(subject ) {
        content = (
            <TableRow>
            <TableCell>{formattedText(subject.subjectName)}</TableCell>
            <TableCell align="right">
                <BlueButton
                onClick={() => navigate(`${subject.subjectName}`)}
                >
                    Choose
                </BlueButton>
            </TableCell>
          </TableRow>
        )
    } else {
        content = 'No subjects found'
    }
    return content
    
}

export default SubjectLesson