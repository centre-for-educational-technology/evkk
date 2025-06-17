import React, { useRef, useEffect } from "react";

const ToolbarButton = ({ command, icon, label, onClick }) => (
    <button
        type="button"
        aria-label={label}
        title={label}
        onMouseDown={e => { e.preventDefault(); onClick(command); }}
        style={{ margin: '0 0', color:'white', backgroundColor:'#2196F3', borderRadius:'4px', fontFamily:['Mulish', 'sans-serif']}}
        >
        {icon || label}
    </button>
);

const TOOLBAR_ACTIONS = [
    { command: 'formatBlock-h1', icon: <b>H1</b>, label: 'Heading 1'},
    { command: 'formatBlock-h2', icon: <b>H2</b>, label: 'Heading 2'},
    { command: 'formatBlock-h3', icon: <b>H3</b>, label: 'Heading 3'},
    { command: 'bold', icon: <b>B</b>, label: 'Bold' },
    { command: 'italic', icon: <i>I</i>, label: 'Italic' },
    { command: 'underline', icon: <u>U</u>, label: 'Underline' },
    { command: "link", icon: "🔗", label: "Link"},
    { command: "image", icon: "🖼️", label: "Image" },
    { command: "video", icon: "🎬", label: "Video" },
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