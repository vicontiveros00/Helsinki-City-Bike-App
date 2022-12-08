import { Link } from "react-router-dom";

function Error() {
    return (
        <div style={{
            textAlign: 'center'
        }}>
            <p>Sorry, something's not right. Please try again.</p>
            <Link to={'/'}>Return Home</Link>
        </div>
    )
}

export default Error;