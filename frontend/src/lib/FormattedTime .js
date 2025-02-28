import React from 'react';
import { format } from 'date-fns';


const FormattedTime = ({ timestamp }) => {
  if (!timestamp) return null;

  const formattedTime = format(new Date(timestamp), 'yyyy, MMMM dd');


  return <span>{formattedTime}</span>;
};

export default FormattedTime;