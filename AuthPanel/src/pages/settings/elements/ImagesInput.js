import React, { useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Dropzone from "react-dropzone";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const ImagesInput = ({
  index,
  value,
  onChange,
  onRemove,
  sequence,
  fetchAndSetImages
}) => {
  const [files, setFiles] = useState([]);
  const [priority, setPriority] = useState(sequence);

  const onDrop = async (acceptedFiles) => {
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
    // console.log(index,files);
    const newFiles = [...files];
    newFiles.splice(index, 1);
    // console.log(index,newFiles);
    setFiles(newFiles);
    onChange(newFiles, priority);
  };

  const handleClick = () => {
    onChange(files, priority);
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

  return (
    <div>
      <div>
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div
              className="border border-gray-400 rounded-md p-4"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <div>Drag and drop images here or click to select</div>
            </div>
          )}
        </Dropzone>

        <div className="flex gap-4 mt-4">
          {files.map((file, index) => (
            <div key={file.name} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                width={100}
                height={100}
                className="border border-gray-50"
              />
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
          <RemoveCircleOutlineIcon onClick={onRemove} className="text-right" />{" "}
          Delete this Element
        </div>
        {/* <button onClick={handleClick}>Upload Pictures</button> */}
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

export default ImagesInput;
