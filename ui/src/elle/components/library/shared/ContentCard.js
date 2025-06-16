import '../../../pages/styles/Library.css';
import { Link } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ShareButton from "./ShareButton";

export default function ContentCard({ item, type }) {
    if (!item) return null;

    const isMaterial = type === 'material';

    return (
        <div className="content-card">
            {/* Type label */}
            <div className="content-card-type-label">
                {isMaterial ? (
                    <MenuBookIcon fontSize="small" style={{ marginRight: 4 }} />
                ) : (
                    <EditNoteIcon fontSize="small" style={{ marginRight: 4 }} />
                )}
                {isMaterial ? 'ÕPPEMATERJAL' : 'E-HARJUTUS'}
            </div>

          <ShareButton originalUrl={`${window.location.origin}/library/exercises/${item.id}`} />

            {/* Title and description */}
            <div style={{ marginTop: 30 }}>
                <div className='body2'><strong>{item.title}</strong></div>
                <div className='body2'>{item.description}</div>
                <div className="content-card-tags" style={{ marginTop: 10 }}>
                   {item.category}, &nbsp;&nbsp;
                   {item.levelLabel}, {item.level} &nbsp;&nbsp;
                    {isMaterial && `.${item.filename?.split('.').pop() || 'pdf'}`}
                </div>
            </div>

            {/* Download for material */}
            <div className="library-buttons" style={{ marginTop: 12, marginBottom: 8 }}>
                {isMaterial && (
                    <div className="library-buttons" style={{ marginTop: 12, marginBottom: 8 }}>
                        <Link
                            href={
                                process.env.NODE_ENV === 'production'
                                    ? `/api/files/${item.filename}`
                                    : `http://localhost:9090/api/files/${item.filename}`
                            }
                            download
                            underline="hover"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Lae alla
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
