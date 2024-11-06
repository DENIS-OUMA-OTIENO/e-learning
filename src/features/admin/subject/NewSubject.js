import React from 'react'
import { useGetAdminsQuery } from '../adminApiSlice'
import NewSubjectForm from './NewSubjectForm'
import useAuth from '../hooks/useAuth'

const NewSubject = () => {

        const { data: admins, isSuccess } = useGetAdminsQuery()
        const { username } = useAuth()
        const school = username
        let content
        if(isSuccess) {
            const { ids } = admins

            const currentAdmin = ids.filter(adminId => admins.entities[adminId].school === school)
    
            if(currentAdmin){
                content = currentAdmin.map(adminId => <NewSubjectForm key={adminId} adminId={adminId} />)
            }
        
        }
        return content
    
    }
    
export default NewSubject



