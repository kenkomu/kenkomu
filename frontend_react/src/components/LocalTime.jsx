import React, { useEffect, useState } from 'react';
import profile from '../constants/profile';

const formatTime = () =>
  new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: profile.timeZone }).format(new Date());

// Current time where I am, refreshed every 20 seconds
const LocalTime = () => {
  const [time, setTime] = useState(formatTime);
  useEffect(() => {
    const id = setInterval(() => setTime(formatTime()), 20000);
    return () => clearInterval(id);
  }, []);
  return <time>{time} {profile.timeZoneLabel}</time>;
};

export default LocalTime;
