import '../../pages/styles/Library.css';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';


export default function ExerciseCard() {
  return (
    <div className="exercise-card">
      <div className="exercise-type-label">
           <ModeOutlinedIcon fontSize="small"/>E-HARJUTUS
        </div>
      <div>
        <h4 style={{marginLeft: '15%'}}>Pealkiri</h4>
        <div style={{fontWeight: 'bold'}}>Kirjeldus</div>
        <div className="exercise-tags">Kategooriad</div>
      </div>
    </div>
  );
}