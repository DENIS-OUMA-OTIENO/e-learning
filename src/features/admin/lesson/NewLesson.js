import React from 'react'
import { useGetSubjectsQuery } from '../subject/subjectApiSlice'
import NewLessonForm from './NewLessonForm'
import { useParams } from 'react-router-dom'
import { useGetClassRoomsQuery } from '../classRoom/classRoomApiSlice'

const NewLesson = () => {
    const { data: subjects, isSuccess } = useGetSubjectsQuery()
    const { className, subjectName } = useParams()
    let content
 
    const { classroomId } = useGetClassRoomsQuery('classroomsList', {
        selectFromResult: ({ data }) => ({
          classroomId: data?.ids.filter(id => {
            let currentClassroomId
            if(data?.entities[id]?.className === className){
              currentClassroomId = id
            }
            return currentClassroomId
            })
        })
      })
    const formattedClassroomId = classroomId?.toString()

    const { urlSubjectId } = useGetSubjectsQuery('subjectsList', {
        selectFromResult: ({ data }) => ({
            urlSubjectId: data?.ids.filter(id => {
            let subjectId
            if(data?.entities[id]?.subjectName === subjectName && data?.entities[id]?.classroom === formattedClassroomId ){
                subjectId = id
            }
            return subjectId
            })
        })
      })
    const formattedurlSubjectId = urlSubjectId?.toString()


    if(isSuccess) {
        const { ids } = subjects

        const subjectData = ids.length ? ids.map(subjectId => {
            let currentSubject
            if(subjectId === formattedurlSubjectId){
                currentSubject = (<NewLessonForm key={subjectId} subjectId={subjectId} /> )
            } return currentSubject
        }) : null
        
        content = subjectData
    }
    return content
}

export default NewLesson