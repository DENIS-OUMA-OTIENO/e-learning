import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetLessonsQuery } from './lessonApiSlice'
import Table from '@mui/material/Table';

import TableCell from '@mui/material/TableCell';

import TableRow from '@mui/material/TableRow';


const ViewLesson = () => {
    const { id } = useParams()


    const { lesson } = useGetLessonsQuery('lessonList', {
        selectFromResult: ({ data }) => ({
            lesson: data?.entities[id]
        })
    })


    if(lesson){
        const content = (
            <React.Fragment>
            <Table size="small">

                <TableRow>
                  <TableCell>Topic: {lesson.title}</TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell>video link: <Link to={lesson.video}>{lesson.video}</Link></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{
                    whiteSpace: 'pre-wrap'
                  }}>{lesson.text}</TableCell>
                </TableRow>
              

            </Table>
    
            
          </React.Fragment>
        )
    
      return content 
    }
  
}

export default ViewLesson