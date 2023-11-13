import { Link } from 'react-router-dom'

const Navbar = () => {
    return ( 
        <div className="navbarContainer">
            <Link to="/">Home</Link>
            <Link to="/maths">Maths</Link>
            <Link to="/biology">Biology</Link>
            <Link to="/physics">Physics</Link>
            <Link to="/create">Add Question</Link>
        </div>
     );
}
 
export default Navbar;