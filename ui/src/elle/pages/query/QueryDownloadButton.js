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
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import Popover from '@mui/material/Popover';
import { useTranslation } from 'react-i18next';
import '../styles/QueryDownloadButton.css';
import { useState } from 'react';
import i18n from 'i18next';
import FileSaver from 'file-saver';
import { loadFetch } from '../../service/LoadFetch';
import { CC_BY_4_0_LICENSE_PATH, DefaultButtonStyle } from '../../const/Constants';
import NewTabHyperlink from '../../components/NewTabHyperlink';

export default function QueryDownloadButton({selected}) {
  const [downloadForm, setDownloadForm] = useState('BASIC_TEXT');
  const [downloadFileType, setDownloadFileType] = useState('TXT');
  const [anchorEl, setAnchorEl] = useState(null);
  const optionsDialogOpen = Boolean(anchorEl);
  const {t} = useTranslation();

  const handleOptionsDialogOpenButtonClick = (event) => {
    setDownloadForm('BASIC_TEXT');
    setDownloadFileType('TXT');
    setAnchorEl(event.currentTarget);
  };

  const handleOptionsDialogClose = () => {
    setAnchorEl(null);
  };

  const changeDownloadForm = (event) => {
    setDownloadForm(event.target.value);
  };

  const changeDownloadFileType = (event) => {
    setDownloadFileType(event.target.value);
  };

  const downloadTexts = () => {
    loadFetch(`/api/texts/tekstidfailina`, {
      method: 'POST',
      body: JSON.stringify({
        form: downloadForm,
        fileType: downloadFileType,
        fileList: Array.from(selected)
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.blob())
      .then(blob => FileSaver.saveAs(blob, `${i18n.language === 'ET' ? 'tekstid' : 'texts'}.${downloadFileType === 'TXT' ? 'txt' : 'zip'}`));
  };

  return (
    <span className="query-download-button-span">
      <Tooltip title={t('common_download')} placement="top">
        <Button
          sx={DefaultButtonStyle}
          variant="contained"
          disabled={selected.size === 0}
          className="query-download-modal-button"
          onClick={handleOptionsDialogOpenButtonClick}
        >
          <DownloadIcon fontSize="medium" />
        </Button>
      </Tooltip>
      <Popover
        open={optionsDialogOpen}
        anchorEl={anchorEl}
        onClose={handleOptionsDialogClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Box className="query-download-dialog">
          <Box className="download-dialog-inner" id="fileDownload">
            <FormControl fullWidth>
              <InputLabel>{t('query_download_form')}</InputLabel>
              <Select
                size="medium"
                defaultValue="BASIC_TEXT"
                label={t('query_download_form')}
                onChange={changeDownloadForm}
              >
                <MenuItem value="BASIC_TEXT">{t('query_download_basictext')}</MenuItem>
                <MenuItem value="TEI"
                          disabled>{t('query_download_tei')}</MenuItem>
                <MenuItem value="CONLLU">{t('query_download_stanza')}</MenuItem>
                <MenuItem value="VISLCG3">{t('query_download_vislcg3')}</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="query-download-modal-radio-group">
              <RadioGroup defaultValue="TXT" onChange={changeDownloadFileType}>
                <FormControlLabel
                  value="TXT"
                  control={<Radio />}
                  label={t('query_download_txt')}
                />
                <FormControlLabel
                  value="ZIP"
                  control={<Radio />}
                  label={t('query_download_zip')}
                />
              </RadioGroup>
            </FormControl>
            <div className="download-license-and-button">
              {t('query_download_license')}&nbsp;
              <NewTabHyperlink path={CC_BY_4_0_LICENSE_PATH}
                               content={t('common_license_cc_by_4_0')} />
            </div>
            <div className="download-license-and-button">
              <Button
                onClick={downloadTexts}
                sx={DefaultButtonStyle}
                variant="contained"
              >
                {t('common_download')}
              </Button>
            </div>
          </Box>
        </Box>
      </Popover>
    </span>
  );
}
