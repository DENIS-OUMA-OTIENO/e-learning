import React from 'react'
import { useGetAdminsQuery } from '../adminApiSlice'
import NewStudentForm from './NewStudentForm'
import useAuth from '../hooks/useAuth'

const NewStudent = () => {
    const { data: admins, isSuccess } = useGetAdminsQuery()
    const { username } = useAuth()
    
    let content
    
    if(isSuccess) {
        const { ids } = admins

        const currentAdmin = ids.filter(adminId => admins.entities[adminId].school === username)

        if(currentAdmin){
            content = currentAdmin.map(adminId => <NewStudentForm key={adminId} adminId={adminId} />)

        }
        
    }
    
    return content

}

export default NewStudent