import React from 'react';
import ContactCard from './ContactCard';
import WORKER_IMAGES from '../../resources/images/workers';

export default function FilledContacts() {
  return (
    <>
      <ContactCard name={'PhD Pille Eslon'}
                   role={'dotsent'}
                   email={'peslon@tlu.ee'}
                   etisUrl={'https://www.etis.ee/CV/Pille_Eslon/est/'}
                   icon={WORKER_IMAGES.pille}/>
      <ContactCard name={'MSc Jaagup Kippar'}
                   role={'tarkvaratehnika teenekas lektor'}
                   email={'jaagup@tlu.ee'}
                   etisUrl={'https://www.etis.ee/CV/Jaagup_Kippar/est/'}
                   icon={WORKER_IMAGES.jaagup}/>
      <ContactCard name={'MA Kais Allkivi-Metsoja'}
                   role={'nooremteadur'}
                   email={'kais@tlu.ee'}
                   etisUrl={'https://www.etis.ee/CV/Kais_Allkivi/est/'}
                   icon={WORKER_IMAGES.kais}/>
      <ContactCard name={'MSc Kaisa Norak'}
                   role={'analüütik'}
                   email={'kaisa.norak@gmail.com'}
                   etisUrl={'https://www.etis.ee/CV/Kaisa_Norak/est/'}
                   icon={WORKER_IMAGES.kaisa}/>
      <ContactCard name={'BSc Harli Kodasma'}
                   role={'keeletehnoloog-analüütik, magistrant'}
                   email={'harli.kodasma@tlu.ee'}
                   etisUrl={'https://www.etis.ee/CV/Harli_Kodasma/est/'}
                   icon={WORKER_IMAGES.harli}/>
      <ContactCard name={'Taavi Kamarik'}
                   role={'keeletehnoloog-analüütik, bakalaureuseõppe üliõpilane'}
                   email={'taavik@tlu.ee'}
                   etisUrl={'https://www.etis.ee/CV/Taavi_Kamarik/est/'}
                   icon={WORKER_IMAGES.taavi}/>
      <ContactCard name={'BA Karina Kert'}
                   role={'analüütik, magistrant'}
                   email={'karina.kert@tlu.ee'}
                   etisUrl={'https://www.etis.ee/CV/Karina_Kert/est/'}
                   icon={WORKER_IMAGES.karina}/>
      <ContactCard name={'BA Silvia Maine'}
                   role={'analüütik'}
                   email={'silvia.maine@tlu.ee'}
                   etisUrl={'https://www.etis.ee/CV/Silvia_Maine/est/'}
                   icon={WORKER_IMAGES.silvia}/>
      <ContactCard name={'BSc Mikk Tarvas'}
                   role={'konsultant'}
                   email={'mikk.tarvas@gmail.com'}
                   icon={WORKER_IMAGES.mikk}/>
    </>
  );
}
