import { useState } from 'react';
import ContactCard from './ContactCard';
import { WORKER_IMAGES } from '../../resources/images/workers';
import i18n from 'i18next';
import { Languages } from '../../translations/i18n';

export default function FilledContacts() {

  const getEtisLanguage = () => {
    return i18n.language === Languages.ESTONIAN ? 'est' : 'eng';
  };

  const [etisLanguage, setEtisLanguage] = useState(getEtisLanguage());

  i18n.on('languageChanged', () => {
    setEtisLanguage(getEtisLanguage());
  });

  return (
    <div className="contacts-grid">
      <ContactCard name="Kais Allkivi, PhD omandamisel"
                   role="keeletehnoloogia projektijuht"
                   email="kais@tlu.ee"
                   etisUrl={`https://www.etis.ee/CV/Kais_Allkivi/${etisLanguage}`}
                   icon={WORKER_IMAGES.kais} />
      <ContactCard name="Harli Kodasma, MSc"
                   role="keeletehnoloog-tarkvaraarendaja"
                   email="harli.kodasma@tlu.ee"
                   etisUrl={`https://www.etis.ee/CV/Harli_Kodasma/${etisLanguage}`}
                   icon={WORKER_IMAGES.harli} />
      <ContactCard name="Taavi Kamarik, MSc omandamisel"
                   role="keeletehnoloog-tarkvaraarendaja"
                   email="taavik@tlu.ee"
                   etisUrl={`https://www.etis.ee/CV/Taavi_Kamarik/${etisLanguage}`}
                   icon={WORKER_IMAGES.taavi} />
      <ContactCard name="Jaagup Kippar, MSc"
                   role="tarkvaratehnika teenekas lektor"
                   email="jaagup@tlu.ee"
                   etisUrl={`https://www.etis.ee/CV/Jaagup_Kippar/${etisLanguage}`}
                   icon={WORKER_IMAGES.jaagup} />
      <ContactCard name="Pille Eslon, PhD"
                   role="emeriitdotsent"
                   email="peslon@tlu.ee"
                   etisUrl={`https://www.etis.ee/CV/Pille_Eslon/${etisLanguage}`}
                   icon={WORKER_IMAGES.pille} />
      <ContactCard name="Annekatrin Kaivapalu, PhD"
                   role="keeleõppe digilahenduste külalisteadur"
                   email="annekatrin.kaivapalu@tlu.ee"
                   etisUrl={`https://www.etis.ee/CV/Annekatrin_Kaivapalu/${etisLanguage}`} />
      <ContactCard name="Olga Gaitšenja, PhD"
                   role="arvutipõhise keeleõppe külalisteadur"
                   email="olga.gaitsenja@tlu.ee"
                   etisUrl={`https://www.etis.ee/CV/Olga_Pastuhhova/${etisLanguage}`} />
      <ContactCard name="Karina Kert, MA"
                   role="analüütik"
                   email="karina.kert@tlu.ee"
                   etisUrl={`https://www.etis.ee/CV/Karina_Kert/${etisLanguage}`}
                   icon={WORKER_IMAGES.karina} />
      <ContactCard name="Silvia Maine, BA"
                   role="analüütik"
                   email="silvia.maine@tlu.ee"
                   etisUrl={`https://www.etis.ee/CV/Silvia_Maine/${etisLanguage}`}
                   icon={WORKER_IMAGES.silvia} />
      <ContactCard name="Ester Ojala, MSc omandamisel"
                   role="keeletehnoloog-analüütik"
                   email="ester.ojala@tlu.ee" />
      <ContactCard name="Kaisa Norak, MSc"
                   role="konsultant, lõputööde juhendaja"
                   email="kaisa.norak@gmail.com"
                   etisUrl={`https://www.etis.ee/CV/Kaisa_Norak/${etisLanguage}`}
                   icon={WORKER_IMAGES.kaisa} />
      <ContactCard name="Mikk Tarvas, BSc"
                   role="konsultant, lõputööde juhendaja"
                   email="mikk.tarvas@gmail.com"
                   icon={WORKER_IMAGES.mikk} />
    </div>
  );
}
