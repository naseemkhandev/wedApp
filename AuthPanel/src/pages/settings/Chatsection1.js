import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, IconButton } from '@material-ui/core';
import { AddCircle, RemoveCircle } from '@material-ui/icons';
import { Alert } from '@mui/material';
import BASE_URL from '../../components/BASE_URL';
const Chatsection1 = () => {
  const [inputFields, setInputFields] = useState([{ message: '' }]);
  const [file, setFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ message: '' });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index].message = event.target.value;
    setInputFields(values);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
     const formData = new FormData();

    let msgArr = []
    inputFields.forEach((field, index) => {
          msgArr.push(field.message);
          
        });
      
      formData.append("messages", msgArr);

    formData.append("photo", file);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/welcomemessages`,
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
  };

  return (
    <form onSubmit={handleSubmit}>
            {showAlert && (
    <Alert severity={errorMessage ? 'error' : 'success'} onClose={() => setShowAlert(false)}>
    {errorMessage ? errorMessage : 'Data saved successfully'}
  </Alert>
  )}
      <div>
        {inputFields.map((inputField, index) => (
          <div key={index}>
            <TextField
              label={`Message ${index + 1}`}
              variant="outlined"
              fullWidth
              value={inputField.message}
              onChange={(event) => handleInputChange(index, event)}
            />
            <IconButton onClick={() => handleRemoveFields(index)}>
              <RemoveCircle />
            </IconButton>
          </div>
        ))}

        <Button onClick={handleAddFields} startIcon={<AddCircle />}>
          Add Message
        </Button>
      </div>
      <div>
        <input type="file" onChange={handleFileChange} />
      </div>
      <Button type="submit" className="btnSolid">Submit</Button>
    </form>
  );
};

export default Chatsection1;
