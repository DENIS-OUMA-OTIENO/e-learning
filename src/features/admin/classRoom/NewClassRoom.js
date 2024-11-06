import NewClassRoomForm from "./NewClassRoomForm"
import { useGetAdminsQuery } from "../adminApiSlice"
import useAuth from "../hooks/useAuth"


const NewClassRoom = () => {
    
    const { data: admins, isSuccess } = useGetAdminsQuery()

    const { username } = useAuth()

    let content
    if(isSuccess){
        const { ids } = admins

        const currentAdmin = ids.filter(id => admins.entities[id].school === username)

        if(currentAdmin){
            content = currentAdmin.map(adminId  => <NewClassRoomForm />)
        }
    }
    console.log('content', content)

    return content
}

export default NewClassRoom