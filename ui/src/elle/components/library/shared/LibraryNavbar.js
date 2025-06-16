import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export default function LibraryNavbar(){
    const { t } = useTranslation();
    return (
        <nav className="libary-navbar-container">
            <ul className="library-navbar-list">
                <Link to="/library/exercises">{t('exercises')}</Link>
                <br/>
                <Link to="/library/studymaterial">{t('study_materials')}</Link>
            </ul>
        </nav>
    )
}
