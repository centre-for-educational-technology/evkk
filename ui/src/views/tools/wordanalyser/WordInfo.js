export const WordInfo = ({ onShowWordInfo, onWordInfo }) => {
  
  return (
    <div>
      <h2>Sõnaanalüüs</h2> 
      <p>Sõna: {onShowWordInfo && onWordInfo.word}</p>
      <p>Lemma: {onShowWordInfo && onWordInfo.lemma}</p>
      <p>Silbid: {onShowWordInfo && onWordInfo.syllables}</p>
      <p>Sõnatüüp: {onShowWordInfo && onWordInfo.type}</p>
    </div>
  )
}
