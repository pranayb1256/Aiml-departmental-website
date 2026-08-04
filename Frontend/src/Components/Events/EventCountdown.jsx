import React, { useState, useEffect } from "react";
import { Timer, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

export default function EventCountdown({ eventName, targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const timerComponents = Object.keys(timeLeft).map((interval, idx) => (
    <div key={idx} className="flex flex-col items-center mx-2 sm:mx-4">
      <div className="bg-white text-blue-600 font-bold text-3xl sm:text-4xl md:text-5xl w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center rounded-xl shadow-lg border border-gray-100">
        {timeLeft[interval].toString().padStart(2, "0")}
      </div>
      <span className="text-sm font-medium text-gray-600 mt-2 uppercase tracking-wide">
        {interval}
      </span>
    </div>
  ));

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-blue-50/50 rounded-3xl p-8 md:p-12 border border-blue-100 shadow-sm max-w-4xl mx-auto my-12"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4 text-blue-600">
          <Timer className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
          {eventName}
        </h2>
        <div className="flex items-center justify-center gap-2 mt-4 text-gray-600">
          <CalendarDays className="w-5 h-5" />
          <span className="font-medium text-lg">
            {new Date(targetDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
      
      <div className="flex justify-center items-center">
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </div>
    </motion.div>
  );
}
