import React, { useState } from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Dropzone from 'react-dropzone';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
const VideoInput = ({ index, value, onChange, onRemove, sequence, fetchAndSetImages }) => {
  const [files, setFiles] = useState([]);
  const [priority, setPriority] = useState(sequence);

  const onDrop = (acceptedFiles) => {
    const uploadedImages = acceptedFiles.filter(async (file) => {
      if(file)
      {
        file.countNumber = acceptedFiles.length;
        return file;
      }
    });

    setFiles((prevFiles) => [...prevFiles, ...uploadedImages]);
    onChange(uploadedImages, priority,index);
  };
  


  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };
const handleDecreasePriority = () => {
    const newPriority = priority - 1;
    setPriority(newPriority);
    onChange(index, value, newPriority);
  };

  const handleIncreasePriority = () => {
    const newPriority = priority + 1;
    setPriority(newPriority);
    onChange(index, value, newPriority);
  };
  const handleClick = () => {
    onChange(files, priority);
  };
  return (
    <div>

    <div>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <div className="border border-gray-400 rounded-md p-4" {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop Videos here or click to select</p>
          </div>
        )}
      </Dropzone>

      <div className="flex gap-4 mt-4">
        {files.map((videos, index) => (
          <div key={videos.name} className="relative">
             <video src={URL.createObjectURL(videos)} controls width={100} height={100}  className="border border-gray-50" />
            <button
              className="absolute top-0 right-0 bg-red-500 text-white rounded-sm p-1"
              onClick={() => removeFile(index)}
            >
              x
            </button>
          </div>
        ))}
      </div>

     </div>
  
       <div className="flex justify-between">
       <div>
         <RemoveCircleOutlineIcon onClick={onRemove} className="text-right" /> Delete this Element
       </div>
       {/* <button onClick={handleClick}>Upload videos</button> */}
       {/* <div>
         <b>
           Priority: <span>{priority}</span>{' '}
         </b>
         <ArrowDownwardIcon onClick={handleDecreasePriority} />
         <ArrowUpwardIcon onClick={handleIncreasePriority} />
       </div> */}
     </div>
    </div>
  );
};

export default VideoInput;