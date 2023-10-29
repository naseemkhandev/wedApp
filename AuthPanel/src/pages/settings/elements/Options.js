import React, { useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
const Options = ({
  index,
  value,
  optionValues,
  setOptionValue,
  onChange,
  onRemove,
  sequence,
  onRowAdd,
  onRowRemove,
  handleOptionRowChange

}) => {
  const [priority, setPriority] = useState(sequence);
  console.log(optionValues);

  // Sort the options by priority
  const sortedOptions = [...optionValues].sort((a, b) => a.priority - b.priority);

  const handleChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue, priority,index);
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
        {optionValues &&
          optionValues.map((option, optionIndex) => (
            <div key={option.id} className="w-full p-3 mt-2 border rounded-md">
              
              <input
                type="text"
                className="w-full p-4 mt-2 border rounded-md"
                placeholder="Question"
                value={option.question}
                onChange={(e) => {
                  setOptionValue((prevOptionValues) => {
                    const updatedOptions = [...prevOptionValues];
                    updatedOptions[optionIndex].question = e.target.value;
                    return updatedOptions;
                  });
                  onChange(optionValues, priority);
                }}
              />
              <div>
                {option.rows.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex items-center justify-between gap-2" >
                    <input
                      type="text"
                      placeholder="Answer"
                      className="w-[40%] p-2 mt-2 border rounded-md"
                      value={row.answer}
                      onChange={(e) => {
                        handleOptionRowChange(e.target.value, optionIndex, rowIndex);
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Move On"
                      className=" w-[40%] p-2 mt-2 border rounded-md"
                      value={row.moveOn}
                      onChange={(e) => {
                        setOptionValue((prevOptionValues) => {
                          const updatedOptions = [...prevOptionValues];
                          updatedOptions[optionIndex].rows[rowIndex].moveOn =
                            e.target.value;
                          return updatedOptions;
                        });
                      }}
                    />
                    {rowIndex < option.rows.length - 1 && (
                      <button className=" w-[9%] text-xs text-red-500"
                        onClick={() => onRowRemove(optionIndex, rowIndex)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={() => onRowAdd(optionIndex)}>Add Row</button>
            </div>
          ))}
      </div>
      <div className="flex justify-between">
        <div>
          <RemoveCircleOutlineIcon onClick={onRemove} className="text-right" />{" "}
          Delete this Element
        </div>
        {/* <div>
          <b>
            Priority: <span>{priority}</span>{' '}
          </b>
          <ArrowDownwardIcon onClick={handleDecreasePriority} />
          <ArrowUpwardIcon onClick={handleIncreasePriority} />
        </div> */}
      </div>
    </>
  );
};
export default Options;
