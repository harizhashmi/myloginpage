import { Navigate } from 'react-router'

type ProtectedRouteProps = {
    isLoggedIn: boolean
    children: React.ReactNode
}

function ProtectedRoute({
    isLoggedIn,
    children,
}: ProtectedRouteProps) {
    if (!isLoggedIn) {
        return <Navigate to="/login" />
    }

    return children
}

export default ProtectedRoute