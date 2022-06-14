
export const WordCell = ({ onWordSelect, sendWord, sendCount }) => {
  return (
    <>
    <span onClick={(e) => onWordSelect(e.target.textContent)}>{sendWord}</span> ({sendCount})&nbsp;
    </>
  )
}
