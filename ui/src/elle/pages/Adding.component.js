import React, { Component } from 'react';
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import TextUpload from '../components/TextUpload';
import './styles/Adding.css';
import { loadFetch } from '../service/LoadFetch';
import { withTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import {
  countryOptions,
  DefaultButtonStyle,
  degreeOptions,
  domainOptions,
  educationOptions,
  ElleOuterDivStyle,
  genderOptions,
  modalStyle,
  studyLevelOptions,
  textPublishAcademicCategoryOptions,
  textPublishAcademicResearchSubtypeOptions,
  textPublishAcademicStudiesSubtypeOptions,
  textPublishMainTextTypesOptions,
  textPublishSubTextTypesOptions,
  textPublishUsedMaterialsOptions,
  usedMaterialsSaveOptions
} from '../const/Constants';
import { successEmitter } from '../../App';

class Adding extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pealkiri: '',
      kirjeldus: '',
      sisu: '',
      liik: 'akadeemiline',
      oppematerjal: null,
      akadOppematerjal: [],
      akadOppematerjalMuu: '',
      mitteakadAlamliik: '',
      akadKategooria: '',
      akadAlamliik: '',
      artikkelValjaanne: '',
      artikkelAasta: '',
      artikkelNumber: '',
      artikkelLehekyljed: '',
      autoriVanus: '',
      autoriSugu: '',
      autoriOppeaste: '',
      autoriTeaduskraad: '',
      autoriHaridus: '',
      autoriEriala: '',
      autoriEmakeel: '',
      autorKakskeelne: false,
      autoriMuudKeeled: '',
      muukeel: '',
      autoriElukohariik: 'eesti',
      elukohariikMuu: '',
      nousOlek: false,
      ennistusNupp: false,
      modalOpen: false
    };
    this.startingstate = {...this.state};
    this.previous = {...this.state};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendTextFromFile = this.sendTextFromFile.bind(this);
    this.formDataElement = React.createRef();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChange(event) {
    if (event.target.type === 'checkbox') {
      this.setState({[event.target.name]: event.target.checked});
    } else {
      this.setState({[event.target.name]: event.target.value});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.previous = {...this.state};
    const request_test = {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    this.setState(this.startingstate);
    this.setState({ennistusnupp: true});
    loadFetch('/api/texts/lisatekst', request_test).then(() => successEmitter.emit('generic-success'));
  }

  taastaVormiSisu() {
    this.setState(this.previous, () => this.setState(
      {'pealkiri': '', 'kirjeldus': '', 'sisu': '', 'ennistusnupp': false}));
  }

  sendTextFromFile(tekst) {
    this.setState({sisu: tekst});
  }

  render() {
    const {t} = this.props;
    return (
      <Box className="adding-rounded-corners" sx={ElleOuterDivStyle}>
        <div className="add-container">
          <div style={{width: '100%', textAlign: 'center'}}>
            <Typography className="py-5"
                        variant="h5"><strong>{t('common_publish_your_text')}</strong></Typography>
          </div>
          <form onSubmit={this.handleSubmit}
                id="f1"
                ref={this.formDataElement}>
            <Grid container
                  xs={12}>
              <Grid
                item
                xs={6}
                direction="column">
                <Grid item
                      style={{paddingTop: '4.5em'}}
                      xs={2}>
                  <div>
                    <TextField required
                               multiline
                               size="small"
                               label={t('publish_your_text_title')}
                               variant="outlined"
                               name="pealkiri"
                               value={this.state.pealkiri}
                               onChange={this.handleChange}
                               style={{width: '75%'}}></TextField>
                  </div>
                  <div>
                    <TextField multiline
                               rows={2}
                               label={t('publish_your_text_exercise_description')}
                               variant="outlined"
                               name="kirjeldus"
                               value={this.state.kirjeldus}
                               onChange={this.handleChange}
                               style={{width: '75%', marginTop: 20}}></TextField>
                  </div>
                  <div>
                    <TextField required
                               multiline
                               rows={8}
                               helperText={t('publish_your_text_content_helper_text')}
                               label={t('publish_your_text_content')}
                               variant="outlined"
                               name="sisu"
                               value={this.state.sisu}
                               onChange={this.handleChange}
                               style={{width: '90%', marginTop: 20}}
                               InputProps={{
                                 endAdornment: <TextUpload
                                   sendTextFromFile={this.sendTextFromFile}
                                   outerClassName="adding-text-upload-component"/>
                               }}></TextField>
                  </div>
                </Grid>
                <div>
                  <Grid style={{paddingTop: '40px'}}
                        container
                        spacing={1}>
                    <Grid item>
                      <Alert severity="info">
                        <Typography fontSize={12}>
                          {t('publish_your_text_terms_of_service_infobox_1')}
                          <u style={{cursor: 'pointer'}}
                             onClick={() => this.setState({modalOpen: true})}>
                            {t('publish_your_text_terms_of_service_infobox_2')}
                          </u>.
                        </Typography>
                      </Alert>
                    </Grid>
                  </Grid>
                  <div style={{paddingTop: '10px', paddingBottom: '50px'}}>
                    <Button type="submit"
                            variant="contained"
                            sx={DefaultButtonStyle}>{t('publish_your_text_submit_button')}</Button> &nbsp;
                    {this.state.ennistusnupp && <Button type="button"
                                                        onClick={() => this.taastaVormiSisu()}
                                                        variant="contained"
                                                        sx={DefaultButtonStyle}>{t('restore_data_button')}</Button>}
                  </div>
                </div>
              </Grid>
              <Grid container
                    item
                    xs={6}
                    direction="column"
                    style={{padding: '20px'}}>
                <div style={{width: '100%'}}>
                  <Grid container
                        item
                        xs={12}
                        spacing={2}>
                    <Grid container
                          item
                          direction="column"
                          style={{width: '100%'}}
                          xs={6}>
                      <Grid>
                        <div><h5>{t('common_text_data')}</h5></div>
                        <FormControl size="small"
                                     className="form-control">
                          <InputLabel>{`${t('publish_your_text_text_data_main_text_type')} *`}</InputLabel>
                          <Select
                            name="liik"
                            value={this.state.liik}
                            label={`${t('publish_your_text_text_data_main_text_type')} *`}
                            required
                            onChange={this.handleChange}
                          >
                            {Object.keys(textPublishMainTextTypesOptions).map((type) => (
                              <MenuItem key={type}
                                        value={type}>{t(textPublishMainTextTypesOptions[type])}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      {this.state.liik === 'akadeemiline' && <Grid>
                        <Grid>
                          <FormControl size="small"
                                       className="form-control">
                            <InputLabel
                              id="valdkond-select-label">{`${t('common_text_data_field_of_research')} *`}</InputLabel>
                            <Select
                              label={`${t('common_text_data_field_of_research')} *`}
                              labelId="valdkond-select-label"
                              name="autoriEriala"
                              value={this.state.autoriEriala}
                              required
                              onChange={this.handleChange}
                            >
                              {Object.keys(domainOptions).map((domain) => (
                                <MenuItem key={domain}
                                          value={domain}>{t(domainOptions[domain])}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>}
                      {this.state.liik === 'mitteakadeemiline' && <Grid>
                        <FormControl size="small"
                                     className="form-control">
                          <InputLabel
                            id="mitteakad-alamliik-select-label">{t('publish_your_text_text_data_sub_text_type')}</InputLabel>
                          <Select
                            labelId="mitteakad-alamliik-select-label"
                            name="mitteakadAlamliik"
                            value={this.state.mitteakadAlamliik}
                            label={t('publish_your_text_text_data_sub_text_type')}
                            onChange={this.handleChange}
                          >
                            {Object.keys(textPublishSubTextTypesOptions).map((type) => (
                              <MenuItem
                                key={type}
                                value={type}
                                disabled={type.includes('_disabled')}
                              >{t(textPublishSubTextTypesOptions[type])}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>}
                      {this.state.liik === 'akadeemiline' && <Grid>
                        <FormControl className="form-control"
                                     size="small">
                          <InputLabel
                            id="akad-kategooria-select-label">{`${t('publish_your_text_text_data_academic_category')} *`}</InputLabel>
                          <Select
                            labelId="akad-kategooria-select-label"
                            name="akadKategooria"
                            value={this.state.akadKategooria}
                            label={`${t('publish_your_text_text_data_academic_category')} *`}
                            required
                            onChange={this.handleChange}
                          >
                            {Object.keys(textPublishAcademicCategoryOptions).map((category) => (
                              <MenuItem key={category}
                                        value={category}>{t(textPublishAcademicCategoryOptions[category])}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>}
                      {this.state.liik === 'akadeemiline' && this.state.akadKategooria !== '' &&
                        <Grid>
                          <FormControl className="form-control"
                                       size="small">
                            <InputLabel
                              id="akad-alamliik-select-label">{t('publish_your_text_text_data_sub_text_type')}</InputLabel>
                            <Select
                              labelId="akad-alamliik-select-label"
                              name="akadAlamliik"
                              value={this.state.akadAlamliik}
                              label={t('publish_your_text_text_data_sub_text_type')}
                              onChange={this.handleChange}
                            >
                              {this.state.akadKategooria === 'ak_erialaopingud' &&
                                Object.keys(textPublishAcademicStudiesSubtypeOptions).map((type) => (
                                  <MenuItem key={type}
                                            value={type}>{t(textPublishAcademicStudiesSubtypeOptions[type])}</MenuItem>
                                ))}
                              {this.state.akadKategooria === 'ak_uurimused' &&
                                Object.keys(textPublishAcademicResearchSubtypeOptions).map((type) => (
                                  <MenuItem key={type}
                                            value={type}>{t(textPublishAcademicResearchSubtypeOptions[type])}</MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        </Grid>}
                      {this.state.akadAlamliik === 'ak_uurimus_artikkel' && <>
                        <Grid>
                          <FormControl className="form-control"
                                       size="small">
                            <TextField
                              multiline
                              required
                              size="small"
                              label={t('publish_your_text_text_data_publication')}
                              variant="outlined"
                              name="artikkelValjaanne"
                              value={this.state.artikkelValjaanne}
                              onChange={this.handleChange}></TextField>
                          </FormControl>
                        </Grid>
                        <Grid>
                          <FormControl className="form-control"
                                       size="small">
                            <TextField
                              multiline
                              required
                              size="small"
                              type="number"
                              label={t('publish_your_text_text_data_year')}
                              variant="outlined"
                              name="artikkelAasta"
                              value={this.state.artikkelAasta}
                              onChange={this.handleChange}></TextField>
                          </FormControl>
                        </Grid>
                        <Grid>
                          <FormControl className="form-control"
                                       size="small">
                            <TextField
                              multiline
                              size="small"
                              label={t('publish_your_text_text_data_number')}
                              variant="outlined"
                              name="artikkelNumber"
                              value={this.state.artikkelNumber}
                              onChange={this.handleChange}></TextField>
                          </FormControl>
                        </Grid>
                        <Grid>
                          <FormControl className="form-control"
                                       size="small">
                            <TextField
                              multiline
                              size="small"
                              label={t('publish_your_text_text_data_pages')}
                              variant="outlined"
                              name="artikkelLehekyljed"
                              value={this.state.artikkelLehekyljed}
                              onChange={this.handleChange}></TextField>
                          </FormControl>
                        </Grid>
                      </>
                      }
                      <Grid>
                        <FormControl className="form-control"
                                     size="small">
                          <InputLabel
                            id="oppematerjal-label">{t('query_text_data_used_study_or_supporting_materials')}</InputLabel>
                          <Select
                            labelId="oppematerjal-label"
                            name="oppematerjal"
                            value={this.state.oppematerjal}
                            label={t('query_text_data_used_study_or_supporting_materials')}
                            onChange={this.handleChange}
                          >
                            {Object.keys(usedMaterialsSaveOptions).map((material) => (
                              <MenuItem key={material}
                                        value={material}>{t(usedMaterialsSaveOptions[material])}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {this.state.oppematerjal === 'true' && <>
                          <Grid>
                            <FormControl className="form-control"
                                         size="small">
                              <InputLabel>{t('publish_your_text_text_data_supporting_material')}</InputLabel>
                              <Select multiple
                                      labelId="akad-materjalid-label"
                                      name="akadOppematerjal"
                                      value={this.state.akadOppematerjal}
                                      label={t('publish_your_text_text_data_supporting_material')}
                                      onChange={this.handleChange}
                              >
                                {Object.keys(textPublishUsedMaterialsOptions).map((material) => (
                                  <MenuItem key={material}
                                            value={material}>{t(textPublishUsedMaterialsOptions[material])}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          {this.state.akadOppematerjal.indexOf('muu') !== -1 &&
                            <Grid>
                              <FormControl className="form-control"
                                           size="small">
                                <TextField
                                  multiline
                                  label={t('publish_your_text_text_data_supporting_material_other')}
                                  variant="outlined"
                                  size="small"
                                  name="akadOppematerjalMuu"
                                  value={this.state.akadOppematerjalMuu}
                                  onChange={this.handleChange}
                                ></TextField>
                              </FormControl>
                            </Grid>
                          }
                        </>}
                      </Grid>
                    </Grid>
                    <Grid container
                          item
                          direction="column"
                          style={{width: '100%'}}
                          xs={6}>
                      <Grid>
                        <h5>{t('common_author_data')}</h5>
                        <TextField className="form-control"
                                   size="small"
                                   type="number"
                                   label={t('query_author_data_age')}
                                   variant="outlined"
                                   name="autoriVanus"
                                   value={this.state.autoriVanus}
                                   onChange={this.handleChange}></TextField><br/>
                        <FormControl className="form-control"
                                     size="small">
                          <InputLabel
                            id="sugu-select-label">{t('query_author_data_gender')}</InputLabel>
                          <Select
                            labelId="sugu-select-label"
                            name="autoriSugu"
                            value={this.state.autoriSugu}
                            label={t('query_author_data_gender')}
                            onChange={this.handleChange}
                          >
                            {Object.keys(genderOptions).map((gender) => (
                              <MenuItem key={gender}
                                        value={gender}>{t(genderOptions[gender])}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid>
                        <FormControl className="form-control"
                                     size="small">
                          <TextField
                            size="small"
                            multiline
                            required
                            label={t('query_author_data_native_language')}
                            variant="outlined"
                            name="autoriEmakeel"
                            value={this.state.autoriEmakeel}
                            onChange={this.handleChange}
                          ></TextField>
                        </FormControl>
                      </Grid>
                      <Grid>
                        <FormControl className="form-control"
                                     size="small">
                          <Tooltip
                            title={t('publish_your_text_author_data_other_languages_tooltip')}
                            placement={'top-start'}>
                            <TextField
                              size="small"
                              multiline
                              label={t('query_author_data_other_languages_plural')}
                              variant="outlined"
                              name="autoriMuudKeeled"
                              value={this.state.autoriMuudKeeled}
                              onChange={this.handleChange}></TextField>
                          </Tooltip>
                        </FormControl>
                      </Grid>
                      <Grid>
                        <FormControl className="form-control"
                                     size="small">
                          <InputLabel
                            id="elukohariik">{t('query_author_data_country')}</InputLabel>
                          <Select value={this.state.autoriElukohariik}
                                  onChange={this.handleChange}
                                  name="autoriElukohariik"
                                  label={t('query_author_data_country')}
                                  labelId="elukohariik">
                            {Object.keys(countryOptions).map((country) => (
                              <MenuItem key={country}
                                        value={country}>{t(countryOptions[country])}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      {this.state.autoriElukohariik === 'muu' &&
                        <Grid>
                          <FormControl className="form-control"
                                       size="small">
                            <TextField
                              multiline
                              size="small"
                              label={t('query_author_data_country_other')}
                              variant="outlined"
                              name="elukohariikMuu"
                              value={this.state.elukohariikMuu}
                              onChange={this.handleChange}
                            ></TextField>
                          </FormControl>
                        </Grid>}
                      {this.state.liik === 'akadeemiline' && <Grid>
                        <FormControl className="form-control"
                                     size="small">
                          <InputLabel
                            id="oppeaste-select-label">{t('query_author_data_level_of_study')}</InputLabel>
                          <Select
                            labelId="oppeaste-select-label"
                            name="autoriOppeaste"
                            value={this.state.autoriOppeaste}
                            label={t('query_author_data_level_of_study')}
                            onChange={this.handleChange}
                          >
                            {Object.keys(studyLevelOptions).map((level) => (
                              <MenuItem key={level}
                                        value={level}>{t(studyLevelOptions[level])}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>}
                      {this.state.liik === 'akadeemiline' && <Grid>
                        <FormControl className="form-control"
                                     size="small">
                          <InputLabel
                            id="teaduskraad-select-label">{t('query_author_data_degree')}</InputLabel>
                          <Select
                            labelId="teaduskraad-select-label"
                            name="autoriTeaduskraad"
                            value={this.state.autoriTeaduskraad}
                            label={t('query_author_data_degree')}
                            onChange={this.handleChange}
                          >
                            {Object.keys(degreeOptions).map((degree) => (
                              <MenuItem key={degree}
                                        value={degree}>{t(degreeOptions[degree])}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>}
                      {this.state.liik === 'mitteakadeemiline' && <Grid>
                        <FormControl className="form-control"
                                     size="small">
                          <InputLabel
                            id="haridus-select-label">{t('query_author_data_education')}</InputLabel>
                          <Select
                            labelId="haridus-select-label"
                            name="autoriHaridus"
                            value={this.state.autoriHaridus}
                            label={t('query_author_data_education')}
                            onChange={this.handleChange}
                          >
                            {Object.keys(educationOptions).map((education) => (
                              <MenuItem key={education}
                                        value={education}>{t(educationOptions[education])}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>}
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </form>
          <Modal
            open={this.state.modalOpen}
            onClose={() => {
              this.setState({modalOpen: false});
            }}
          >
            <Box sx={modalStyle} className="terms-of-service-modal">
              <div className="modal-head">
                {t('publish_your_text_terms_of_service_title')}
              </div>
              <div>
                <IconButton
                  aria-label="close"
                  onClick={() => {
                    this.setState({modalOpen: false});
                  }}
                  className="close-button"
                >
                  <CloseIcon/>
                </IconButton>
              </div>
              <br/>
              <div>
                {t('publish_your_text_terms_of_service_1')}
                <br/><br/>
                {t('publish_your_text_terms_of_service_2')}
              </div>
            </Box>
          </Modal>
        </div>
      </Box>
    );
  }
}

export default withTranslation()(Adding);
