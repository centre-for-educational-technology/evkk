import { Link } from 'react-router-dom';
import Can from '../../security/Can';


export default function LibraryNavbar(){
    return (
        <nav className="libary-navbar-container">
            <ul className="library-navbar-list">
                <Link to="/library/exercises">Harjutused</Link>
                <br/>
                <Can requireAuth={true}>
                  <Link to="/library/studymaterial">Õppematerjalid</Link>
                </Can>
            </ul>
        </nav>
    )
}
