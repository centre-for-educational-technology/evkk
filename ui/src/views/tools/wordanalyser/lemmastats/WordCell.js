
export const WordCell = ({ onWordSelect, sendWord, sendCount }) => {
  return (
    <>
    <span  className="word" onClick={(e) => onWordSelect(e.target.textContent)}>{sendWord}</span> ({sendCount})&nbsp;
    </>
  )
}
