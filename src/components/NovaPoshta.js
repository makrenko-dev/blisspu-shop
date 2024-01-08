import React, { useState, useEffect } from 'react';
import CustomSelect from './CustomSelect';
import Select from 'react-select';

const NovaPoshta = ({ onSelectCityAndHouse }) => {
  const [city, setCity] = useState(null);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [optionsLoaded, setOptionsLoaded] = useState(false);

  const handleCityChange = async (selectedCity) => {
    setCity(selectedCity);

    try {
      const response = await fetch(`http://localhost:3000/api/order/warehouses?writecity=${encodeURIComponent(selectedCity)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const branchOptions = data.map((branch) => ({
        value: branch,
        label: branch,
      }));

      setBranches(branchOptions.length > 1 ? branchOptions : [{ value: data, label: data }]);
    } catch (error) {
      console.error('Error fetching branches:', error);
      setBranches([]);
    }
  };

  const fetchFilteredBranches = async (city, inputValue) => {
    try {
      const response = await fetch(`http://localhost:3000/api/order/warehouses?writecity=${encodeURIComponent(city)}&selecthouse=${encodeURIComponent(inputValue)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const rawData = await response.json();
      return Array.isArray(rawData) ? rawData.filter(item => typeof item === 'string') : [];
    } catch (error) {
      console.error('Error fetching filtered branches:', error);
      return [];
    }
  };

  const handleBranchChange = async (inputValue) => {
    setOptionsLoaded(false);

    try {
      const data = await fetchFilteredBranches(city, inputValue);

      const branchOptions = data.map((branch) => ({
        value: branch,
        label: branch,
      }));

      setBranches(branchOptions.length > 0 ? branchOptions : []);
      // Pass selected city and house to the parent component

      setOptionsLoaded(true);
    
           } catch (error) {
      console.error('Error fetching filtered branches:', error);
      setBranches([]);
      setOptionsLoaded(false);
    }
  };

  useEffect(() => {
    setOptionsLoaded(false);
    handleCityChange(city);
  }, [city]);

  useEffect(() => {
    if (branches.length > 0) {
      
     
      setOptionsLoaded(true);
    }
  }, [branches]);

  return (
    <div>
      <CustomSelect 
        label='*Ваше місто'
        endpoint='http://localhost:3000/api/order/selectcity'
        onChange={handleCityChange}
      />
      {city && (
        <div style={{ marginTop: '20px' }}>
          <Select
            label='*Номер відділення\поштамату'
            options={optionsLoaded ? branches : []}
            value={optionsLoaded ? selectedBranch : null}
            onChange={(selectedOption) => {
            setSelectedBranch(selectedOption);
              Promise.resolve().then(() => {
          onSelectCityAndHouse(city, selectedOption.value);
          console.log('city', city, 'house', selectedOption.value);
        });

          }}
            onInputChange={(inputValue) => {
              if (optionsLoaded) {
                handleBranchChange(inputValue);
              }
            }}
            isClearable
            styles={{ menu: (provided) => ({ ...provided, zIndex: 9999 }) }}
          />
        </div>
      )}
    </div>
  );
};

export default NovaPoshta;
