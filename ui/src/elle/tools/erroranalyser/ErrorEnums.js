export const languageLevels = ['A2', 'B1', 'B2', 'C1', 'C2']
export const languageErrors = [{
  type: 'R',
  name: 'asendused',
  subtype: [{
    type: 'R:SPELL',
    name: 'õigekirjaviga'
  },{
    type: 'R:CASE',
    name: 'algustäheviga'
  },{
    type: 'R:WS',
    name: 'kokku-lahkukirjutamise viga'
  },{
    type: 'R:NOM:FORM',
    name: 'käändsõna vormivaliku viga'
  },{
    type: 'R:VERB:FORM',
    name: 'tegusõna vormivaliku viga'
  },{
    type: 'R:LEX',
    name: 'sõnavalikuviga'
  },{
    type:'R:WO',
    name: 'sõnajärjeviga'
  }, {
    type: 'R:PUNCT',
    name: 'kirjavahemärgi valiku viga'
  }]}, {
  type: 'M',
  name: 'kustutused',
  subtype: [{
    type: 'M:LEX',
    name: 'puuduv sõna'
  }, {
    type: 'M:PUNCT',
    name: 'puuduv kirjavahemärk'
  }]}, {
  type: 'U',
  name: 'lisamised',
  subtype: [{
    type: 'U:LEX',
    name: 'liigne sõna'
  },{
    type: 'U:PUNCT',
    name: 'liigne kirjavahemärk'}]}]
