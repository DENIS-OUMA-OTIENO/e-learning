import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { store } from '../../../app/store'
import { studentApiSlice } from '../student/studentApiSlice'
import { classRoomApiSlice } from '../classRoom/classRoomApiSlice'
import { adminApiSlice } from '../adminApiSlice'
import { teacherApiSlice } from '../teacher/teacherApiSlice'
import { subjectApiSlice } from '../subject/subjectApiSlice'
import { lessonApiSlice } from '../lesson/lessonApiSlice'

const Prefetch = () => {
    useEffect(() => {
        store.dispatch(studentApiSlice.util.prefetch('getStudents', 'studentsList', { force: true }))
        store.dispatch(classRoomApiSlice.util.prefetch('getClassRooms', 'classRoomsList', { force: true }))
        store.dispatch(adminApiSlice.util.prefetch('getAdmins', 'adminsList', { force: true }))
        store.dispatch(teacherApiSlice.util.prefetch('getTeachers', 'teachersList', { force: true }))
        store.dispatch(subjectApiSlice.util.prefetch('getSubjects', 'subjectsList', { force: true }))
        store.dispatch(lessonApiSlice.util.prefetch('getLessons', 'lessonsList', { force: true }))
      
    }, [])
  return <Outlet />
}

export default Prefetch