import React from "react";
import clsx from "clsx";
import { Cpu, Network, Settings, Code, Globe } from "lucide-react";

const EventCard = ({ event, isActive, text_aligned, height }) => {
    const formatTimelineDate = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
      
        const formatter = new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
        });
      
        const sameDay = startDate.toDateString() === endDate.toDateString();
      
        return sameDay
          ? formatter.format(startDate)
          : `${formatter.format(startDate)} - ${formatter.format(endDate)}`;
      };
      
    return (
        <div
            className={clsx(
                "h-full w-full bg-gray-100 rounded-2xl p-3 md:p-4 transition-all duration-300 mt-3 mb-3",
                isActive
                    ? "border-black text-black"
                    : "border-gray-300 text-gray-400",
                text_aligned
            )}
        >
            <h3 className="font-semibold text-xs md:text-lg">{event.title}</h3>
            <p className="lg:text-sm md:text-sm text-xs text-gray-400">
                {formatTimelineDate(event.startDate, event.endDate)}
            </p>
            <p className={clsx("mt-1 text-xs", height < 130 ? "hidden" : "block")}>{event.description}</p>
        </div>
  );
}

export default EventCard;