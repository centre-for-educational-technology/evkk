import '../../../pages/styles/Library.css';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useTranslation } from 'react-i18next';
import ShareButton from './ShareButton';

export default function ContentCard({ item, type, onClick }) {
  const { t } = useTranslation();
  if (!item) return null;

  const isMaterial = type === 'material';
  const isExercise = type === 'exercise';

  const isFile = isMaterial && item.materialType?.type?.toLowerCase() === 'file';
  const extension = isMaterial
    ? item.fileFormat
    : item.filename?.split('.').pop();

  const size = isMaterial ? item.fileSize : null;

  const translatedType = isMaterial
    ? {
    file: 'Fail',
    link: 'Link',
    text: 'Tekst',
    video: 'Video'
  }[item.materialType?.type?.toLowerCase()] || '-'
    : null;

  return (
    <div className="content-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="content-card-type-label">
        {isMaterial ? (
          <MenuBookIcon fontSize="small" style={{ marginRight: 4 }} />
        ) : (
          <EditNoteIcon fontSize="small" style={{ marginRight: 4 }} />
        )}
        {isMaterial ? 'ÕPPEMATERJAL' : 'E-HARJUTUS'}
      </div>

      {/* Materjali tüüp */}
      {isMaterial && (
        <div className="material-type-badge">{translatedType}</div>
      )}

      {/* Jaga nupp */}
      <ShareButton
        sx={{ top: '24px' }}
        originalUrl={
          isMaterial
            ? `${window.location.origin}/library/studymaterial?open=${item.id}`
            : `${window.location.origin}/library/exercises/${item.id}`
        }
      />

      {/* Pealkiri ja kirjeldus */}
      <div style={{ marginTop: 30 }}>
        <div className="body2"><strong>{item.title}</strong></div>
        <div className="body2">{item.description}</div>

        <div className="content-card-tags" style={{ marginTop: 10 }}>
          {type === 'exercise' && (
            <>
              {item.targetGroups?.map(tg => tg.name).join(', ') || '-'}, &nbsp;&nbsp;
              {item.categories?.map(c => c.name).join(', ') || '-'}, &nbsp;&nbsp;
              {item.languageLevel?.level || '-'} &nbsp;&nbsp;
              {item.duration?.label && `${t("exercise_modal_duration")}: ${item.duration.label} min`}
            </>
          )}

          {type === 'material' && (
            <>
              {item.targetGroups?.map(tg => tg.name).join(', ') || '-'}, &nbsp;&nbsp;
              {item.categories?.map(c => c.name).join(', ') || '-'}, &nbsp;&nbsp;
              {item.languageLevel?.level || '-'}
              {item.materialType?.type?.toLowerCase() === 'file' && item.fileFormat && (
                <>,&nbsp;&nbsp;.{item.fileFormat}</>
              )}
              {item.materialType?.type?.toLowerCase() === 'file' && item.fileSize && (
                <> ({(item.fileSize / (1024 * 1024)).toFixed(2)} MB)</>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
