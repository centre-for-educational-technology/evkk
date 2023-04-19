import React from 'react';
import ContactCard from '../components/ContactCard';

export default function FilledContacts() {
  return (
    <>
      <ContactCard name={"PhD Pille Eslon"}
                   email={"peslon@tlu.ee"}
                   role={"dotsent"}/>
      <ContactCard name={"MSc Jaagup Kippar"}
                   email={"jaagup@tlu.ee"}
                   role={"tarkvaratehnika lektor"}/>
      <ContactCard name={"MA Kais Allkivi-Metsoja"}
                   email={"kais@tlu.ee"}
                   role={"nooremteadur"}/>
      <ContactCard name={"MSc Kaisa Norak"}
                   email={"kaisa.norak@tlu.ee"}
                   role={"analüütik"}/>
      <ContactCard name={"BSc Mikk Tarvas"}
                   email={"mtarvas@tlu.ee"}
                   role={"magistrant, analüütik-programmeerija"}/>
      <ContactCard name={"Harli Kodasma"}
                   email={"harli.kodasma@tlu.ee"}
                   role={"analüütik-programmeerija"}/>
      <ContactCard name={"Taavi Kamarik"}
                   email={"taavik@tlu.ee"}
                   role={"programmeerija"}/>
    </>
  )
}
