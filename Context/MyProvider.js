// MyProvider.js

import React, { useState } from 'react';
import MyContext from './MyContext';

const MyProvider = ({ children }) => {
  // Define the state you want to share
  const [documentData, setMyData] = useState('');

  // Create a function to update the context state
  const updateMyData = (newData) => {
    setMyData(newData);
  };

  return (
    <MyContext.Provider value={{ documentData, updateMyData }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
