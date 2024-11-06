import React from 'react'
import { useGetAdminsQuery } from '../adminApiSlice'
import NewTeacherForm from './NewTeacherForm'
import useAuth from '../hooks/useAuth'

const NewTeacher = () => {
    const {data: admins, isSuccess } = useGetAdminsQuery()

    const { username } = useAuth()
    let content
    if(isSuccess) {
        const { ids } = admins
        
        const currentAdmin = ids.filter(id => admins.entities[id].school === username)

        if(currentAdmin){
          content = currentAdmin.map(adminId => <NewTeacherForm key={adminId} adminId={adminId}/>)
        }        
    }
  return content
}

export default NewTeacher