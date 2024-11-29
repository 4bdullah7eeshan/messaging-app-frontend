import { Link } from 'react-router-dom';
import Logo from "../Logo/Logo";

function Nav() {
    return (
        <nav>
            <div>
                <Link to="/"><Logo /></Link>
            </div>
            <div>
                <Link to="/sign_in">Sign In</Link>
                <Link to="/sign_up">Sign Up</Link>
            </div>    
        </nav>
    );
}


export default Nav;