import React, {Component} from 'react';

class Employees extends Component {

  render() {
    return (
      <div className={'container'}>
        <h2>Töötajad</h2>
        <p/>
        <ul>
          <li>Pille Eslon - TLÜ digitehnoloogiate instituut, haridustehnoloogia keskus, vanemteadur (pille.eslon@tlu.ee)</li>
          <li>Jaagup Kippar - TLÜ digitehnoloogiate instituut, rakendusinformaatika, tarkvaratehnika lektor (jaagup.kippar@tlu.ee)</li>
        </ul>

        <h2>Grandid</h2>
        <ul>
          <li>SF 0132493s03 Eesti keelekeskkonna arengu analüüs, modelleerimine ja juhtimine (2003 – 2007)</li>
          <li>Projekt ETF6151 Koodivahetuse, eesti vahekeele ning lastekeele andmekorpuse koostamine ja üldkirjeldus (2005 - 2008)</li>
          <li>Projekt EKRM05-51 Koodivahetuse, vahe- ning lastekeele korpuste töötlemine ja haldamine (2004 - 2008)</li>
          <li>Projekt EKKTT08-26 VAKO - Eesti vahekeele korpuse keeletarkvara ja keeletehnoloogilise ressursi arendamine (2006 - 2010)</li>
          <li>Projekt EKKM09-98  REKKi käsikirjaliste materjalide digiteerimine, Eesti vahekeele korpuse alamkorpuste loomine ja korpuse kasutusvõimaluste populariseerimine (2009-2013)</li>
          <li>Projekt ETF8240  Keeltevaheline mõju ja teise keele omandamine (korpuspõhine uurimus)</li>
          <li>Projekt EKKM09-178 Teaduskeelekeskus</li>
          <li>Projekt ETF8222 Ülekantud tähenduses fraasid eesti keele korpustes </li>
        </ul>
      </div>
    );
  }

}

export default Employees;
