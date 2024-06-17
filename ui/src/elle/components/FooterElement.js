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
    {title: 'Tutvustus', target: 'tutvustus'},
    {title: 'Sõnastikud', target: 'sõnastikud'},
    {title: 'Tõlkerakendused', target: 'tõlkerakendused'},
    {title: 'Eestikeelsed tekstid', target: 'eestikeelsed'},
    //{title: 'Meediatekstid', target: 'meediatekstid'},
    //{title: 'Kirjandus', target: 'kirjandus'},
    //{title: 'Teadustekstid', target: 'teadustekstid'},
    {title: 'Audiovisuaalne meedia', target: 'audiovisuaalne'},
    //{title: 'Sarjad, filmid, videod', target: 'visuaalne'},
    //{title: 'Raadio, audio, taskuhäälingud', target: 'audio'},
    {title: 'Keeleõppevara', target: 'keeleõppevara'},
    //{title: 'Õppematerjalid ja harjutused', target: 'õppematerjalid'},
    //{title: 'Keeleõppemängud', target: 'õppemängud'},
    {title: 'Keeleõppekeskkonnad ja kursused', target: 'keskkonnadkursused'},
    //{title: 'Keeleõppekeskkonnad', target: 'keeleõppekeskkonnad'},
    //{title: 'Kursused', target: 'kursused'},
    {title: 'Abiks õpetajale', target: 'abiksõpetajale'},
    {title: 'Eesti keele korpused', target: 'keelekorpused'}
  ];

  const aboutValues = [
    {title: 'Meist', target: 'us'},
    {title: 'Töötajad', target: 'people'},
    {title: 'Grandid', target: 'grants'},
    {title: 'Üllitised', target: 'publications'},
    {title: 'Lõputööd', target: 'publications#loputood'},
    {title: 'Konverentsid ja töötoad', target: 'publications#konverentsid'},
    {title: 'Publikatsioonid', target: 'publications#publikatsioonid'}
  ];

  const toolsValues = [
    {title: 'Sõnaloend', target: 'wordlist'},
    {title: 'Sõna kontekstis', target: 'wordcontext'},
    {title: 'Nabersõnad', target: 'collocates'},
    {title: 'Sõnaanalüsaator', target: 'wordanalyser'},
    {title: 'Mustrileidja', target: 'clusterfinder'}
  ];

  const outLinksValues = [
    {title: 'Eesti vahekeele korpus', target: 'https://evkk.tlu.ee/vers1/'},
    {title: 'ELLE Github repositoorium', target: 'https://github.com/centre-for-educational-technology/evkk'},
    {title: 'ELLE litsents', target: 'https://opensource.org/license/mit'},
    {title: 'EVKK litsents', target: 'https://creativecommons.org/licenses/by/4.0/'},
    {title: 'Loovuta oma tekst', target: '/adding'}
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
            <p className="font-weight-bold">Viited</p>
            {outLinksValues.map((link, index) => {
              return (
                <FooterLink target="_blank" key={link.target}
                            to={link.target}>{t(link.title)}</FooterLink>
              );
            })}
          </Box>
          <Box className="footer-middle-box">
            <p className="font-weight-bold">Tekstid ja tööriistad</p>
            {toolsValues.map((link, index) => {
              return (
                <FooterLink key={link.target}
                            to={`/tools/${link.target}`}>{t(link.title)}</FooterLink>
              );
            })}
          </Box>
          <Box className="footer-middle-box">
            <p className="font-weight-bold">Lingikogu</p>
            {linkValues.map((link, index) => {
              return (
                <FooterLink key={link.target}
                            to={`/links#${link.target}`}>{t(link.title)}</FooterLink>
              );
            })}
          </Box>
          <Box className="footer-box-right">
            <p className="font-weight-bold">Keskkonnast</p>
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
