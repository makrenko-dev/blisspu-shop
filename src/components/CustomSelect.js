import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const CustomSelect = ({ onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectOptions, setSelectOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleInputChange = async (input) => {
    setInputValue(input);

    if (input.length > 0) {
      try {
        const response = await fetch(`http://localhost:3000/api/order/selectcity?writecity=${encodeURIComponent(input)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const cityOptions = data.map((city) => ({
          value: city.Present,
          label: city.Present,
        }));

        setSelectOptions(cityOptions);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setSelectOptions([]);
      }
    } else {
      setSelectOptions([]);
    }
  };

  const handleChange = (selectedOption) => {
    setSelectedValue(selectedOption?.value);
    onChange(selectedOption?.value); // Викликаємо передану функцію onChange
  };

  const handleInputChangeFromField = (value) => {
    setInputValue(value);
    handleInputChange(value);
  };

  const handleMenuClose = () => {
    setInputValue('');
  };

  useEffect(() => {
    console.log('Updated selectOptions:', selectOptions);
  }, [selectOptions]);

  useEffect(() => {
    handleInputChange("");
  }, []);

  useEffect(() => {
    if (selectedValue) {
      handleInputChange(selectedValue);
    }
  }, [selectedValue]);

  return (
    <div>
      <Select
        inputValue={inputValue}
        onInputChange={handleInputChangeFromField}
        options={selectOptions}
        onChange={handleChange}
        value={selectOptions.find((option) => option.value === selectedValue)}
        onMenuClose={handleMenuClose}
        isClearable
        menuIsOpen={inputValue.length > 0}
        styles={{ menu: (provided) => ({ ...provided, zIndex: 9999 }) }}
      />
    </div>
  );
};

export default CustomSelect;


