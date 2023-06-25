import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import './Header.css'

const Header = (props) => {
    const userId = Cookies.get('userId');
    return(
        <ul>
            <Link to="/"><li>Головна</li></Link>
            {userId && props.page!=='login' ? null: <Link to="/login"><li>Log in</li></Link>}
        </ul>
    )
}

export default Header;