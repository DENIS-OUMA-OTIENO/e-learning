import { useSelector } from "react-redux"
import { selectStudentById } from "./studentApiSlice"
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const Student = ({ studentId }) => {

    
    const student = useSelector(state => selectStudentById(state, studentId))
    
    const formattedText = (text) => {
        return text ? text.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
        : ''
    }

    
    let content
    if(student ) {
        content = (
            <TableRow>
            <TableCell>{(student.studentNumber).toUpperCase()}</TableCell>
            <TableCell>{formattedText(student.name)}</TableCell>
            <TableCell>{formattedText(student.gender)}</TableCell>
            <TableCell>{formattedText(student.classroom)}</TableCell>
            <TableCell align="right">actions</TableCell>
          </TableRow>
        )
    }
    return content
    
    
}            


export default Student


