import React, { useState } from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const Inputbox = ({ index, value, onChange, onRemove, sequence }) => {
  const [priority, setPriority] = useState(sequence);

  const handleChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue, priority);
  
  };

  const handleDecreasePriority = () => {
    // Decrease the priority value
    const newPriority = priority - 1;
    setPriority(newPriority);
    onChange(index, value, newPriority);
  };

  const handleIncreasePriority = () => {
    // Increase the priority value
    const newPriority = priority + 1;
    setPriority(newPriority);
    onChange(index, value, newPriority);
  };

  return (
    <>
      <div>
        <input
          type="text"
          className="textLayout"
          placeholder="Add Input"
          onChange={handleChange}
        />
      </div>
      {/* <div className="flex justify-between">
        <div>
          <RemoveCircleOutlineIcon onClick={onRemove} className="text-right" /> Delete this Element
        </div>
        <div>
          <b>
           Sequence: <span>{priority}</span>{' '}
          </b>
          <ArrowDownwardIcon onClick={handleDecreasePriority} />
          <ArrowUpwardIcon onClick={handleIncreasePriority} />
        </div>
      </div> */}
    </>
  );
};

export default Inputbox;