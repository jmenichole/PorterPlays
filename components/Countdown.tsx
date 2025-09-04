import React, { useState, useEffect, useCallback } from 'react';

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = +targetDate - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex justify-center items-center gap-2 md:gap-4">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <div className="text-3xl md:text-5xl font-extrabold p-3 md:p-4 bg-slate-900 rounded-lg min-w-[50px] md:min-w-[80px] text-center">
            {formatNumber(value)}
          </div>
          <span className="text-xs md:text-sm uppercase text-slate-400 mt-2">{unit}</span>
        </div>
      ))}
    </div>
  );
};

export { Countdown };