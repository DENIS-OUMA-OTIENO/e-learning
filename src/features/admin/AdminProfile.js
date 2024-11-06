import { useSelector } from "react-redux"
import { selectAdminById } from "./adminApiSlice"

const AdminProfile = ({ adminId }) => {

    const admin = useSelector(state => selectAdminById(state, adminId))
    if(admin) {
        return(
            <div style={{ padding: '22px' }}>
            <p>Name: {admin.adminName}</p>
            <p>Email: {admin.email}</p>
            <p>School: {admin.school}</p>

            </div>
        )
    }

}

export default AdminProfile