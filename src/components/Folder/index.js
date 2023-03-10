import React from 'react'
import { useSelector } from 'react-redux';
import ShowItems from '../ShowItems';


const FolderComponent = () => {
  const {isLoading, childrenFolders, childrenFiles } = useSelector((state)=>(
    {
      isLoading: state.filefolders.isLoading,
      childrenFolders: state.filefolders.userFolders,
      childrenFiles: state.filefolders.userFiles,
    }
  ));


  return (
    <div>
    { isLoading ? (
      <h1 className='display-1 my-5 text-center'>Loading...</h1>
    ) : (
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
    )}
    
    </div>

  )
}

export default FolderComponent