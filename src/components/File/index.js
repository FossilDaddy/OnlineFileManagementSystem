import React, { useState, useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import CodeEditor from './CodeEditor';
import Header from './header';

const FileComponent = () => {
  const { fileName } = useParams();
  const [ fileData, setFileData ] = useState("");

  const { currentFile } = useSelector((state)=>({
    currentFile: state.filefolders.userFiles.find(
      (file)=> file.name === fileName
    ),
  }),shallowEqual)

  useEffect(()=>{
    if(currentFile) {
      setFileData(currentFile.data);
    }
  }, [currentFile]);

  return (
    <>
      <Header fileName={currentFile.name} fileData={fileData} prevFileData={currentFile.data}/>
      <CodeEditor fileName={currentFile.name} fileData={fileData} setFileData={setFileData}/>
    </>
    
  )
}

export default FileComponent