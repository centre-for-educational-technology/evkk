export const WordInfo = ({ onShowWordInfo, onWordInfo }) => {

  return (
    <div className="containerItem wordInfo">
      <h2>Sõnaanalüüs</h2> 
      <p>Sõna: {onShowWordInfo && onWordInfo.word}</p>
      <p>Algvorm: {onShowWordInfo && onWordInfo.lemma}</p>
      <p>Silbid: {onShowWordInfo && onWordInfo.syllables}</p>
      <p>Sõnaliik: {onShowWordInfo && onWordInfo.type}</p>
      <p>Vorm: {onShowWordInfo && onWordInfo.form}</p>
    </div>
  )
}
