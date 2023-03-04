import React from 'react'
import { useSelector } from 'react-redux';
import ShowItems from '../ShowItems';


const FolderComponent = () => {
  const { childrenFolders, childrenFiles } = useSelector((state)=>(
    {
      childrenFolders: state.filefolders.userFolders,
      childrenFiles: state.filefolders.userFiles,
    }
  ));


  return (
    <div>
    {childrenFolders.length > 0 || childrenFiles.length > 0? (
      <>
        <ShowItems tittle={"Created Folders & Files"}
                    items={[...childrenFolders, ...childrenFiles]}
        />
      </>
    ): (
      <h3 className="text-center py-2">Empty Folder</h3>
    )}
    
    </div>

  )
}

export default FolderComponent