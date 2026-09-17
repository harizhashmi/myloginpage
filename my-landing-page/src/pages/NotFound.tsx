import { Link } from 'react-router'

function NotFound() {
    return (
        <div>
            <h1>404</h1>
            <p>This page does not exist</p>
            <Link to="/">Go back home</Link>
        </div>
    )
}

export default NotFound