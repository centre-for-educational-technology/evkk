import {useState} from 'react'
import {ExpandLess, MoreHoriz} from '@mui/icons-material'
import {Button} from '@mui/material'
import {v4 as uuidv4} from "uuid";

const ToggleCell = ({onCellContent}) => {

  const wordsVisible = 3
  const [open, setOpen] = useState(true)
  const toggleCellContent = () => {
    setOpen(!open);
  }

  return (
    <>
      {onCellContent.length < (wordsVisible + 1)
        ? onCellContent
        : open === true
          ?
          onCellContent.slice(0, wordsVisible).concat(
            <Button size="large"
                    sx={{margin: 0, padding: 0, borderRadius: 8, minWidth: 0}}
                    key={uuidv4()}
                    onClick={() => toggleCellContent()}>
              <MoreHoriz sx={{fontSize: "large"}}/>
            </Button>)
          : onCellContent.concat(
            <Button size="large"
                    sx={{ml: 1, padding: 0, borderRadius: 8, minWidth: 0}}
                    key={uuidv4()}
                    onClick={() => toggleCellContent()}>
              <ExpandLess sx={{fontSize: "large"}}/>
            </Button>)
      }
    < />
  )
}

export default ToggleCell;
