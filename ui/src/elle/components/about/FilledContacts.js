import React from 'react';
import ContactCard from './ContactCard';

export default function FilledContacts() {
  return (
    <>
      <ContactCard name={'PhD Pille Eslon'}
                   role={'dotsent'}
                   email={'peslon@tlu.ee'}
                   etisUrl={'https://www.etis.ee/CV/Pille_Eslon/est/'}/>
      <ContactCard name={'MSc Jaagup Kippar'}
                   role={'tarkvaratehnika teenekas lektor'}
                   email={'jaagup@tlu.ee'}
                   etisUrl={'https://www.etis.ee/CV/Jaagup_Kippar/est/'}/>
      <ContactCard name={'MA Kais Allkivi-Metsoja'}
                   role={'nooremteadur'}
                   email={'kais@tlu.ee'}
                   etisUrl={'https://www.etis.ee/CV/Kais_Allkivi/est/'}/>
      <ContactCard name={'MSc Kaisa Norak'}
                   role={'analüütik'}
                   email={'kaisa.norak@gmail.com'}
                   etisUrl={'https://www.etis.ee/CV/Kaisa_Norak/est/'}/>
      <ContactCard name={'BSc Harli Kodasma'}
                   role={'keeletehnoloog-analüütik, magistrant'}
                   email={'harli.kodasma@tlu.ee'}
                   etisUrl={'https://www.etis.ee/CV/Harli_Kodasma/est/'}/>
      <ContactCard name={'Taavi Kamarik'}
                   role={'keeletehnoloog-analüütik, bakalaureuseõppe üliõpilane'}
                   email={'taavik@tlu.ee'}
                   etisUrl={'https://www.etis.ee/CV/Taavi_Kamarik/est/'}/>
      <ContactCard name={'BA Karina Kert'}
                   role={'analüütik, magistrant'}
                   email={'karina.kert@tlu.ee'}
                   etisUrl={'https://www.etis.ee/CV/Karina_Kert/est/'}/>
      <ContactCard name={'BA Silvia Maine'}
                   role={'analüütik'}
                   email={'silvia.maine@tlu.ee'}
                   etisUrl={'https://www.etis.ee/CV/Silvia_Maine/est/'}/>
      <ContactCard name={'BSc Mikk Tarvas'}
                   role={'konsultant'}
                   email={'mikk.tarvas@gmail.com'}/>
    </>
  );
}
