import { Link } from 'react-router-dom';
import Can from '../../security/Can';
import { useTranslation } from 'react-i18next';


export default function LibraryNavbar(){
    const { t } = useTranslation();
    return (
        <nav className="libary-navbar-container">
            <ul className="library-navbar-list">
                <Link to="/library/exercises">{t('exercises')}</Link>
                <br/>
                <Can requireAuth={true}>
                  <Link to="/library/studymaterial">{t('study_materials')}</Link>
                </Can>
            </ul>
        </nav>
    )
}
