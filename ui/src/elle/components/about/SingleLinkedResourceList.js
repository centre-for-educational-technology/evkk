import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import React from 'react';
import '../styles/SingleLinkedResourceList.css';

export default function SingleLinkedResourceList({list}) {

  return (
    <List>
      {list.map(elem =>
        <ListItem key={elem.href}>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href={elem.href}
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={<span dangerouslySetInnerHTML={{__html: elem.content}}></span>}/>
          </ListItemButton>
        </ListItem>
      )}
    </List>
  );
}
