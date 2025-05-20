import { TextField, Button } from '@mui/material'


export default function SearchBar(){
    return(
        <div className="library-search-box">
            <h2>Kategooriad</h2>
            <TextField label="Otsing"
                    variant="outlined"
                    name="otsing"
                    style={{width: '100%', maxWidth: '50%'}}
                    ></TextField>
            <Button>Otsi</Button>
        </div>
    )
}