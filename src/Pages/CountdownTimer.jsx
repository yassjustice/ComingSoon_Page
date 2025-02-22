import { useState, useEffect } from "react";

export default function Countdown() {
  const initialTime = 720 * 60 * 60 * 1000; // 720 hours in milliseconds
  const isDev = import.meta.env.MODE === 'development'; // Check if in development mode

  // Retrieve the end time from local storage or calculate it if it doesn't exist
  const getEndTime = () => {
    if (isDev) {
      return Date.now() + initialTime; // For development, always start from initial time
    }
    const storedEndTime = localStorage.getItem("endTime");
    if (storedEndTime) {
      return parseInt(storedEndTime, 10); // Return the stored end time
    } else {
      const endTime = Date.now() + initialTime; // Calculate end time based on initial time
      localStorage.setItem("endTime", endTime); // Store the end time in local storage
      return endTime;
    }
  };

  const endTime = getEndTime();

  const calculateTimeLeft = () => {
    const now = Date.now();
    const difference = endTime - now;

    if (difference <= 0) return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

    const totalSeconds = Math.floor(difference / 1000);
    const months = Math.floor(totalSeconds / (60 * 60 * 24 * 30)); // Approximation: 30 days per month
    const days = Math.floor((totalSeconds % (60 * 60 * 24 * 30)) / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    return { months, days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-900 text-white p-4">
      <h1 className="text-5xl font-bold mb-6">Coming Soon</h1>
      <div className="text-3xl mb-4">
        {timeLeft.hours + timeLeft.days * 24 + timeLeft.months * 30 * 24} Hours Remaining
      </div>
      <div className="text-2xl bg-gray-800 px-6 py-3 rounded-lg shadow-lg">
        {timeLeft.months}m : {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
      </div>
    </div>
  );
}
