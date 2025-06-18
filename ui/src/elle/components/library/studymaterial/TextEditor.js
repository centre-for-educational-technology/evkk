import React, { useRef, useEffect } from "react";

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import TitleIcon from '@mui/icons-material/Title';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ImageIcon from '@mui/icons-material/Image';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';


const ToolbarButton = ({ command, icon, label, onClick }) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    onMouseDown={e => { e.preventDefault(); onClick(command); }}
    style={{
      background: 'none',
      border: 'none',
      padding: '6px 8px',
      marginRight: '4px',
      cursor: 'pointer',
      color: '#555',
      fontSize: '20px',
    }}
  >
    {icon || label}
  </button>
);

const TOOLBAR_ACTIONS = [
  { command: 'formatBlock-h1', icon: <LooksOneIcon />, label: 'Heading 1' },
  { command: 'formatBlock-h2', icon: <LooksTwoIcon />, label: 'Heading 2' },
  { command: 'formatBlock-h3', icon: <Looks3Icon />, label: 'Heading 3' },
  { command: 'bold', icon: <FormatBoldIcon />, label: 'Bold' },
  { command: 'italic', icon: <FormatItalicIcon />, label: 'Italic' },
  { command: 'underline', icon: <FormatUnderlinedIcon />, label: 'Underline' },
  { command: "link", icon: <InsertLinkIcon />, label: "Link" },
  { command: "image", icon: <ImageIcon />, label: "Image" },
  { command: "video", icon: <OndemandVideoIcon />, label: "Video" },
];


export default function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
        editorRef.current.innerHTML = value || "";
    }
  }, [value]);
  const handleCommand = (command) => {

    if(command === 'link') {
      window.alert('EI TÖÖTA');
    }
    if(command === 'image') {
        window.alert('EI TÖÖTA');
        return;
    }
    if(command === 'video'){
        window.alert('EI TÖÖTA');
        return;
    }

    if (command.startsWith('formatBlock-')) {
      const tag = command.split('-')[1].toUpperCase();
      document.execCommand('formatBlock', false, `<${tag}>`);
      if (onChange) onChange(editorRef.current.innerHTML);
      return;
    }


    document.execCommand(command, false, null);
    if (onChange) onChange(editorRef.current.innerHTML);
  };

  // Handle changes to text
  const handleInput = e => {
    if (onChange) onChange(e.currentTarget.innerHTML);
  };

  return (
    <div>
      <div style={{ borderBottom: "1px solid #ccc", marginBottom: 4 }}>
        {TOOLBAR_ACTIONS.map(tool => (
          <ToolbarButton
            key={tool.command}
            {...tool}
            onClick={handleCommand}
          />
        ))}
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        style={{
          marginTop:'10px',
          minHeight: 120,
          border: "1px solid #ccc",
          padding: 8,
          borderRadius: 4,
          outline: "none",
        }}
        onInput={handleInput}
      />
    </div>
  );
}
