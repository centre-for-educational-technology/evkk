import { Button, Tooltip } from '@mui/material';
import { DefaultButtonStyle } from '../const/Constants';
import DownloadIcon from '@mui/icons-material/Download';
import { useTranslation } from 'react-i18next';
import './styles/ImageDownloadButton.css';

export default function ImageDownloadButton({ element, sourceType, fileName }) {

  const { t } = useTranslation();

  const handleClick = () => {
    if (sourceType === ImageDownloadSourceType.SVG) {
      downloadSvgAsImage();
    } else {
      downloadCanvasAsImage();
    }
  };

  const downloadSvgAsImage = () => {
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(element);

    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);

      canvasAsImage(canvas);
    };

    image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
  };

  const downloadCanvasAsImage = () => {
    canvasAsImage(element);
  };

  const canvasAsImage = (canvasElement) => {
    const canvasDataURL = canvasElement.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = canvasDataURL;
    link.download = t(fileName);
    link.click();
  };

  return (
    <div className="image-download-button-row">
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
    </div>
  );
}

export const ImageDownloadSourceType = {
  SVG: 'SVG',
  CANVAS: 'CANVAS'
};
