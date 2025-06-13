import { TextField, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'


export default function SearchBar() {
    const { t } = useTranslation();
    return (
        <div className="library-search-box">
            <TextField label={t('search')}
                variant="outlined"
                name="otsing"
                style={{ width: '100%', maxWidth: '50%' }}
            ></TextField>
            <Button>{t('search_button')}</Button>
        </div>
    )
}
