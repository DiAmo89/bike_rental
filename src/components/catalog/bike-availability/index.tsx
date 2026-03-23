"use client";

import { useState, useEffect } from "react";
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isWithinInterval, 
  parseISO,
  isBefore,
  startOfDay,
  isSameDay
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ApiBooking {
  startDate: string;
  endDate: string;
}

interface FormattedBooking {
  from: Date;
  to: Date;
}

export default function BikeAvailability({ bikeId }: { bikeId: string }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookings, setBookings] = useState<FormattedBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const today = startOfDay(new Date());

  useEffect(() => {
    fetch(`/api/bikes/${bikeId}/bookings`)
      .then(res => res.json())
      .then((data: ApiBooking[]) => {
        const formatted = data.map((b) => ({
          from: parseISO(b.startDate),
          to: parseISO(b.endDate)
        }));
        setBookings(formatted);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [bikeId]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const isBooked = (day: Date) => {
    return bookings.some(b => isWithinInterval(day, { start: b.from, end: b.to }));
  };

  // Проверка: можно ли листать назад?
  const canGoBack = !isSameMonth(currentMonth, new Date()) && !isBefore(currentMonth, new Date());

  if (isLoading) return <div className="h-[300px] w-[280px] animate-pulse bg-gray-50 rounded-[2rem] mx-auto border" />;

  return (
    <div className="bg-white border border-gray-100 rounded-[2rem] p-5 shadow-sm w-[280px] mx-auto select-none">
      <div className="flex justify-between items-center mb-6 px-1">
        <h5 className="text-[11px] font-black uppercase tracking-widest text-gray-800">
          {format(currentMonth, "MMMM yyyy")}
        </h5>
        <div className="flex gap-2">
          <button 
            type="button"
            disabled={!canGoBack} // Блокируем кнопку
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className={`p-1 rounded-md transition-colors ${canGoBack ? "hover:bg-gray-100 text-gray-800" : "text-gray-200 cursor-not-allowed"}`}
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            type="button"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors text-gray-800"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
          <div key={d} className="text-[9px] font-black text-gray-400 text-center uppercase">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {calendarDays.map((day, idx) => {
          const booked = isBooked(day);
          const currentM = isSameMonth(day, monthStart);
          const isPast = isBefore(day, today); // Проверка на прошлое
          const isToday = isSameDay(day, today);
          
          return (
            <div key={idx} className="flex flex-col items-center justify-center h-5 relative">
              <span className={`
                text-[11px] font-bold transition-colors
                ${!currentM || isPast ? "text-gray-200" : "text-gray-800"}
                ${booked && currentM ? "!text-red-600 font-black" : ""}
                ${isToday && currentM ? "bg-gray-100 w-7 h-7 flex items-center justify-center rounded-full" : ""}
              `}>
                {format(day, "d")}
              </span>
              
            </div>
          );
        })}
      </div>

      <div className="mt-0 flex items-center justify-center gap-5 border-t border-gray-50 pt-4">
        <div className="flex items-center gap-1.5 text-[9px] font-black uppercase text-gray-400">
          <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
          Reserved
        </div>
        <div className="flex items-center gap-1.5 text-[9px] font-black uppercase text-gray-400">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
          Free
        </div>
      </div>
    </div>
  );
}