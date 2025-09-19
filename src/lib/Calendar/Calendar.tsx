import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";


const Calendar = () => {

  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 7)); // August 2025
  const [selectedDates, setSelectedDates] = useState<number[]>([9, 10, 11]);
  
    // Calendar functions
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDayOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();


  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const toggleDateSelection = (day: number) => {
    setSelectedDates((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      } else {
        return [...prev, day].sort((a, b) => a - b);
      }
    });
  };

  // Generate calendar days
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Previous month's trailing days
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDates.includes(day);
      days.push(
        <button
          key={day}
          onClick={() => toggleDateSelection(day)}
          className={`w-8 h-8 text-sm font-medium rounded transition-all ${
            isSelected
              ? "bg-black text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-2 sm:p-4">    
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <button
          onClick={prevMonth}
          className="p-1.5 sm:p-2 hover:bg-gray-200 rounded-lg"
        >
          <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
        </button>
        <h3 className="font-semibold text-black text-sm sm:text-base">
          {monthNames[currentMonth.getMonth()]}{" "}
          {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={nextMonth}
          className="p-1.5 sm:p-2 hover:bg-gray-200 rounded-lg"
        >
          <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
          (day) => (
            <div
              key={day}
              className="text-center text-[10px] sm:text-sm font-medium text-gray-600 py-1.5 sm:py-2"
            >
              {day}
            </div>
          )
        )}
      </div>

      <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
    </div>
  )
}

export default Calendar