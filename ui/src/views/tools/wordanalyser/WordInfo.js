export const WordInfo = ({ onShowWordInfo, onWordInfo }) => {

  return (
    <div className="containerItem wordInfo">
      <h2>Sõnaanalüüs</h2> 
      <p>Sõna: {onWordInfo.word}</p>
      <p>Algvorm: {onWordInfo.lemma}</p>
      <p>Silbid: {onWordInfo.syllables}</p>
      <p>Sõnaliik: {onWordInfo.type}</p>
      <p>Vorm: {onWordInfo.form}</p>
    </div>
  )
}
