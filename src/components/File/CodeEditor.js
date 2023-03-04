import React from 'react'
import { Prism as SyntaxHighligter } from "react-syntax-highlighter";
import { duotoneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import "./CodeEditor.css";


const CodeEditor = ({ fileName , fileData, setFileData}) => {

  const codes = {
    txt: "textile",
    html: "xml",
    js: "javascript",
    json: "javascript",
  }

  const handleKeyDown = (evt) =>{
    let value = fileData,
      selStartPos = evt.currentTarget.selectionStart;
    
    console.log(evt.currentTarget);

    if(evt.key === "Tab"){
      value = value.substring(0, selStartPos) + "    " + value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();

      setFileData(value);
    }
  }

    return(
      <div className='row px-5 mt-3'>
        <div className='col-md-12 mx-auto code-edit-container p-3'>
          <textarea
            className='code-input w-100'
            value={fileData}
            autoFocus
            onKeyDown={handleKeyDown}
            onChange={(e) => setFileData(e.target.value)}
          />
          <pre className='code-output'>
            <SyntaxHighligter
              language={codes[fileName.split(".")[1]]}
              showLineNumbers
              style={duotoneLight}
              wrapLines
              startingLineNumber={1}
              >
                {fileData}
              </SyntaxHighligter>
          </pre>
        </div>
      </div>
    )
}

export default CodeEditor