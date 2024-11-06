import { useSelector } from "react-redux"
import { selectCurrentToken } from "../auth/authSlice"
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)

    if(token){
        const decoded = jwtDecode(token)
        const { username, role, userId } = decoded.UserInfo

        return { username, role, userId }
    }
    
    return { username: '', role: '', userId: ''}

}
export default useAuth