import { Button, Tooltip } from '@mui/material';
import { DefaultButtonStyle } from '../const/Constants';
import DownloadIcon from '@mui/icons-material/Download';

export default function ImageDownloadButton({ element, sourceType, fileName }) {

  const handleClick = () => {
    if (sourceType === ImageDownloadSourceType.SVG) {
      downloadSvgAsImage();
    } else {
      downloadCanvasAsImage();
    }
  };

  const downloadSvgAsImage = () => {

  };

  const downloadCanvasAsImage = () => {

  };

  return (
    <Tooltip title={t('common_download')}
             placement="top">
      <Button
        style={DefaultButtonStyle}
        variant="contained"
        onClick={handleClick}
      >
        <DownloadIcon fontSize="large" />
      </Button>
    </Tooltip>
  );
}

export const ImageDownloadSourceType = {
  SVG: 'SVG',
  CANVAS: 'CANVAS'
};
