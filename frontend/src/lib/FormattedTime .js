import React from 'react';
import { format } from 'date-fns';

const FormattedTime = ({ timestamp }) => {
  if (!timestamp) return null;

  const formattedTime = format(new Date(timestamp), 'h:mm a'); 

  return <span>{formattedTime}</span>;
};

export default FormattedTime;