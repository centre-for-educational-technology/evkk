import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  Tooltip
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import Popover from "@mui/material/Popover";
import {useTranslation} from "react-i18next";
import './styles/QueryDownloadButton.css';
import {useState} from "react";
import i18n from "i18next";
import FileSaver from 'file-saver';
import LoadingButton from "@mui/lab/LoadingButton";

export default function QueryDownloadButton({selected}) {

  const [downloadForm, setDownloadForm] = useState('basictext');
  const [downloadFileType, setDownloadFileType] = useState('txt');
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const optionsDialogOpen = Boolean(anchorEl);
  const {t} = useTranslation();

  const handleOptionsDialogOpenButtonClick = (event) => {
    setDownloadForm('basictext');
    setDownloadFileType('txt');
    setAnchorEl(event.currentTarget);
  };

  const handleOptionsDialogClose = () => {
    setAnchorEl(null);
  };

  const handleSnackbarClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  }

  const changeDownloadForm = (event) => {
    setDownloadForm(event.target.value);
  }

  const changeDownloadFileType = (event) => {
    setDownloadFileType(event.target.value);
  }

  const downloadTexts = () => {
    setIsLoading(true);
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
      .then((res) => {
        if (res.ok) {
          return res.blob();
        }
        throw new Error();
      })
      .then((blob) => {
        FileSaver.saveAs(blob, `${i18n.language === 'et' ? 'tekstid' : 'texts'}.${downloadFileType === 'txt' ? 'txt' : 'zip'}`);
        setIsLoading(false);
      })
      .catch(() => {
        setSnackbarOpen(true);
        setIsLoading(false);
      });
  }

  return (
    <span className="query-download-button-span">
      <Snackbar open={snackbarOpen}
                autoHideDuration={6000}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose}
               className="error-alert"
               severity="error">
          {t('error_generic_server_error')}
        </Alert>
      </Snackbar>
      <Tooltip title={t("common_download")}
               placement="top">
        <Button variant="contained"
                disabled={selected.size === 0}
                className='query-download-modal-button'
                onClick={handleOptionsDialogOpenButtonClick}>
          <DownloadIcon fontSize="medium"/>
        </Button>
      </Tooltip>
      <Popover
        open={optionsDialogOpen}
        anchorEl={anchorEl}
        onClose={handleOptionsDialogClose}
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
              <LoadingButton variant={isLoading ? "outlined" : "contained"}
                             loading={isLoading}
                             onClick={downloadTexts}>
                {t("common_download")}
              </LoadingButton>
            </div>
          </Box>
        </Box>
      </Popover>
    </span>
  );
}
