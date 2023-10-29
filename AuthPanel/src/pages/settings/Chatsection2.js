import axios from 'axios';
import React from 'react'
import { useState } from "react";
import Dropzone from "react-dropzone";
import { Alert } from '@mui/material';
import BASE_URL from '../../components/BASE_URL';
const Chatsettings = (inputs, title ) => {

  const [files, setFiles] = useState([]);
  const [venue, setVenue] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleVenueChange = (event) => {
    setVenue(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };
  const onDrop = (acceptedFiles) => {
    setFiles([...files, ...acceptedFiles]);
  };


  
  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };
const handleSubmit=async(event)=>{
event.preventDefault();
const formData = new FormData();
formData.append('venue', venue);
formData.append('location', location);
formData.append('date', date);
formData.append('time', time);
    for (let i = 0; i < files.length; i++) {
      formData.append('photos', files[i]);
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/weddingeventdetails`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "X-Requested-With"
          },
        }
      );

      // console.log('Data saved successfully', response.data);
      setShowAlert(true); 
    } catch (error) {
      console.error(error);
      setShowAlert(true);
      setErrorMessage('Error saving data');
    }
}

    return (
        <>
         <form>
         {showAlert && (
    <Alert severity={errorMessage ? 'error' : 'success'} onClose={() => setShowAlert(false)}>
    {errorMessage ? errorMessage : 'Data saved successfully'}
  </Alert>
  )}
        <fieldset> 
  <legend>Add Event details:</legend>

  <div className="formInput" key="message1">
 <input type="text" placeholder="Add Venue here"  className="textLayout" value={venue} 
 onChange={handleVenueChange} required />
 <input type="text" placeholder="Location Link"  className="textLayout" value={location}
  onChange={handleLocationChange} required />
 <input type="Date" placeholder="Wedding Date "  className="textLayout" value={date}
  onChange={handleDateChange} required />
 <input type="time" placeholder="Wedding time "  className="textLayout" value={time} 
 onChange={handleTimeChange} required />
  </div>
  <div className="formInput" key="messageUploader">
  <Dropzone onDrop={onDrop} multiple>
    {({ getRootProps, getInputProps }) => (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or <strong>click to select files</strong></p>
      </div>
    )}
  </Dropzone>
  {files.map((file, index) => (
    <div key={file.name}>
      <img src={URL.createObjectURL(file)} alt={file.name} width={50} height={50} />
      <button className="closeBtn" onClick={() => removeFile(index)}>x</button>
    </div>
  ))}
  
</div>
 
      <div>
      <button className="btnSolid" onClick={handleSubmit}>Save</button>
      </div>
      </fieldset>
      </form>  
       
        </>
  );
};

export default Chatsettings;