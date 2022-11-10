import {useContext} from 'react'
import AuthContext from '../context/AuthProvides'

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth