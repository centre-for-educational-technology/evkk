import React from 'react';
import { Box } from '@mui/material';
import './styles/FooterElement.css';
import DTILogo from '../resources/images/footer/DTI-logo.svg';
import { useTranslation } from 'react-i18next';
import { FooterLink } from '../const/Constants';

export default function FooterElement() {
  const year = new Date().getFullYear();
  const {t} = useTranslation();

  const linkValues = [
    {title: t('footer_resources_introduction'), target: 'tutvustus'},
    {title: t('footer_resources_dictionaries'), target: 'sõnastikud'},
    {title: t('footer_resources_translate_tools'), target: 'tõlkerakendused'},
    {title: t('footer_resources_estonian'), target: 'eestikeelsed'},
    {title: t('footer_resources_audiovisual'), target: 'audiovisuaalne'},
    {title: t('footer_resources_language_tools'), target: 'keeleõppevara'},
    {title: t('footer_resources_environments_courses'), target: 'keskkonnadkursused'},
    {title: t('footer_resources_teacher_aid'), target: 'abiksõpetajale'},
    {title: t('footer_resources_language_corp'), target: 'keelekorpused'}
  ];

  const aboutValues = [
    {title: t('footer_about_us'), target: 'us'},
    {title: t('footer_about_people'), target: 'people'},
    {title: t('footer_about_grants'), target: 'grants'},
    {title: t('footer_about_publications'), target: 'publications'},
    {title: t('footer_about_publications_thesis'), target: 'publications#loputood'},
    {title: t('footer_about_publications_conferences'), target: 'publications#konverentsid'},
    {title: t('footer_about_publications_publications'), target: 'publications#publikatsioonid'}
  ];

  const toolsValues = [
    {title: t('footer_tools_wordlist'), target: 'wordlist'},
    {title: t('footer_tools_wordcontext'), target: 'wordcontext'},
    {title: t('footer_tools_collocates'), target: 'collocates'},
    {title: t('footer_tools_wordanalyser'), target: 'wordanalyser'},
    {title: t('footer_tools_clusterfinder'), target: 'clusterfinder'}
  ];

  const outLinksValues = [
    {title: t('footer_links_evkk'), target: 'https://evkk.tlu.ee/vers1/'},
    {title: t('footer_links_elle_github'), target: 'https://github.com/centre-for-educational-technology/evkk'},
    {title: t('footer_links_elle_license'), target: 'https://opensource.org/license/mit'},
    {title: t('footer_links_evkk_license'), target: 'https://creativecommons.org/licenses/by/4.0/'},
    {title: t('footer_links_adding'), target: '/adding'}
  ];

  return (
    <Box className="footer-container">
      <Box className="footer-inner">
        <Box className="footer-logo-box">
          <img className="dti-logo" src={DTILogo} alt="DTI logo"/>
          <p><b>{t('footer_contact')}</b> elle@tlu.ee</p>
        </Box>
        <Box className={'footer-inner-right'}>
          <Box className="footer-middle-box">
            <p className="font-weight-bold">{t('footer_links')}</p>
            {outLinksValues.map((link, index) => {
              return (
                <FooterLink target="_blank" key={link.target}
                            to={link.target}>{t(link.title)}</FooterLink>
              );
            })}
          </Box>
          <Box className="footer-middle-box">
            <p className="font-weight-bold">{t('footer_texts_and_tools')}</p>
            {toolsValues.map((link, index) => {
              return (
                <FooterLink key={link.target}
                            to={`/tools/${link.target}`}>{t(link.title)}</FooterLink>
              );
            })}
          </Box>
          <Box className="footer-middle-box">
            <p className="font-weight-bold">{t('footer_link_collections')}</p>
            {linkValues.map((link, index) => {
              return (
                <FooterLink key={link.target}
                            to={`/links#${link.target}`}>{t(link.title)}</FooterLink>
              );
            })}
          </Box>
          <Box className="footer-box-right">
            <p className="font-weight-bold">{t('footer_about')}</p>
            {aboutValues.map((link, index) => {
              return (
                <FooterLink key={link.target}
                            to={`/about/${link.target}`}>{t(link.title)}</FooterLink>
              );
            })}
          </Box>
        </Box>
      </Box>
      <div className="footer-date-stamp">ELLE, {year}</div>
    </Box>
  );
};
