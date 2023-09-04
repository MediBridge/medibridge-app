import React, { useContext, useEffect } from 'react'
import MyContext from '../Context/MyContext';

const RecordView = () => {
  const { documentData, updateMyData } = useContext(MyContext);
  console.log(documentData);
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Perform your action here before the page unloads
      // You can show a confirmation message or save data, for example
      updateMyData("");

      // Customize the confirmation message as needed
    };

    // Add the 'beforeunload' event listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  return (
    <div>{documentData.decryptedText}</div>
  )
}

export default RecordView