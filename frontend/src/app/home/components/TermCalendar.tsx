'use client';

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";

interface CalendarEvent {
  title: string;
  start: string;
  end?: string;
}

interface Props {
  events: CalendarEvent[];
}

const TermCalendar = ({ events }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(typeof window !== "undefined" && window.innerWidth < 768);
  }, []);

  return (
    <div className="w-full lg:ml-8 mt-4">
      <h3 className="text-center lg:text-left text-xl font-bold text-[#5b5b5b] mt-10">
        Calendario Semanal
      </h3>
      <div className="bg-white mt-6 p-4 rounded-lg border-0 shadow-sm">
        <div className="text-gray-500 text-sm">
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridWeek"
            height="auto"
            allDaySlot={false}
            slotMinTime="06:00:00"
            slotMaxTime="23:59:59"
            headerToolbar={{
              left: "title",
              center: "",
              right: isMobile ? "prev,next" : "prev,today,next",
            }}
            events={events}
          />
        </div>
      </div>
    </div>
  );
};

export default TermCalendar;
