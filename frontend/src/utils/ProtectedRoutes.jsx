import { Outlet, Navigate } from "react-router-dom"

import useStore from "../store/store"


export function AlreadyLogin () {
    const { user } = useStore()
    return user ? <Navigate to="/" /> : <Outlet/>
}

// export default ProtectedRoutes