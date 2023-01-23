import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Tooltip
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import Popover from "@mui/material/Popover";
import {useTranslation} from "react-i18next";
import './styles/QueryDownloadButton.css';
import {useState} from "react";
import i18n from "i18next";
import FileSaver from 'file-saver';

export default function QueryDownloadButton({selected}) {

  const [downloadForm, setDownloadForm] = useState('basictext');
  const [downloadFileType, setDownloadFileType] = useState('txt');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const {t} = useTranslation();

  const handleClick = (event) => {
    setDownloadForm('basictext');
    setDownloadFileType('txt');
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeDownloadForm = (event) => {
    setDownloadForm(event.target.value);
  }

  const changeDownloadFileType = (event) => {
    setDownloadFileType(event.target.value);
  }

  const downloadTexts = () => {
    fetch(`/api/texts/tekstidfailina`, {
      method: "POST",
      body: JSON.stringify({
        form: downloadForm,
        type: downloadFileType,
        fileList: Array.from(selected)
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.blob())
      .then((blob) => {
        FileSaver.saveAs(blob, `${i18n.language === 'et' ? 'tekstid' : 'texts'}.${downloadFileType === 'txt' ? 'txt' : 'zip'}`);
      });
  }

  return (
    <span className="query-download-button-span">
      <Tooltip title={t("common_download")}
               placement="top">
        <Button variant="contained"
                disabled={selected.size === 0}
                className='query-download-modal-button'
                onClick={handleClick}>
          <DownloadIcon fontSize="medium"/>
        </Button>
      </Tooltip>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box className="query-download-dialog">
          <Box className="download-dialog-inner"
               id='fileDownload'>
            <FormControl fullWidth>
              <InputLabel>{t('query_download_form')}</InputLabel>
              <Select
                size="medium"
                defaultValue='basictext'
                label={t('query_download_form')}
                onChange={changeDownloadForm}
              >
                <MenuItem value="basictext">{t('query_download_basictext')}</MenuItem>
                <MenuItem value="tei"
                          disabled>{t('query_download_tei')}</MenuItem>
                <MenuItem value="stanza">{t('query_download_stanza')}</MenuItem>
                <MenuItem value="vislcg3">{t('query_download_vislcg3')}</MenuItem>
              </Select>
            </FormControl>
            <FormControl className='query-download-modal-radio-group'>
              <RadioGroup
                defaultValue="txt"
                onChange={changeDownloadFileType}
              >
                <FormControlLabel value="txt"
                                  control={<Radio/>}
                                  label={t('query_download_txt')}/>
                <FormControlLabel value="zip"
                                  control={<Radio/>}
                                  label={t('query_download_zip')}/>
              </RadioGroup>
            </FormControl>
            <div className="download-button">
              <Button variant='contained'
                      onClick={downloadTexts}>
                {t("common_download")}
              </Button>
            </div>
          </Box>
        </Box>
      </Popover>
    </span>
  );
}
