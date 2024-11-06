import { useGetAdminsQuery } from "./adminApiSlice"
import AdminProfile from "./AdminProfile"
import useAuth from "./hooks/useAuth"

const ViewAdmin = () => {
     
        const {
            data: admins,
            isLoading,
            isSuccess,
            isError,
            error
        } = useGetAdminsQuery()

        const { username } = useAuth()
        const currentSchool = username
        
          
        if(isLoading) <p>Loading</p>
        if(isError) <p>{error?.data?.message}</p>

       
        let tableContent
        if(isSuccess) {
            const { ids } = admins
            const filteredAdmins = ids.filter(adminId => (
              admins.entities[adminId].school === currentSchool 
            //   || 
            //   lessons.entities[lessonId].school === studentSchoolId ||
            //   lessons.entities[lessonId].school === teacherSchoolId
            ))
    
            if(filteredAdmins.length > 0) {
              tableContent = filteredAdmins.map(adminId => (<AdminProfile key={adminId} adminId={adminId} />))
            } else { tableContent = <p>Loading..</p>}
         }
        return tableContent
        
    }
    
   
export default ViewAdmin