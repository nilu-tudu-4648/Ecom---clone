import React from 'react'

export default function useListner() {
     
    return null
}
export const getElementInfo = (elementId, value) => {
    const calculateWPM = (text, timeInSeconds=60) => {
      // Calculate the number of words in the text
      const words = text.trim().split(/\s+/);
      const wordCount = words.length;
    
      // Calculate WPM (Words Per Minute)
      const minutes = timeInSeconds / 60;
      const wpm = wordCount / minutes;
    
      // Round the result to the nearest integer
      return Math.round(wpm);
    };
  
    const elementInfo = {
      element_id: elementId,
      element_value: value,
      is_pasted: false,
      wpm: calculateWPM(value, 10), // Assuming time interval of 3 seconds
    };
  
    return elementInfo;
  };
