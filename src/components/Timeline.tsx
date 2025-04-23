'use client'
import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo,
} from "react";
import clsx from "clsx";
import EventCard from "@/components/EventCard"

const getEventHeight = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffInMs = end.getTime() - start.getTime();
  const diffInDays = Math.max(diffInMs / (1000 * 60 * 60 * 24), 1); // avoid 0
  const pixelsPerDay = 1.5; // tweak this as needed
  return Math.max(100, diffInDays * pixelsPerDay); // min height 60px
};

const getOffsetTop = (startDate: string, baseDate: string): number => {
  const start = new Date(startDate);
  const base = new Date(baseDate);
  const diffInMs = start.getTime() - base.getTime();
  const diffInDays = Math.max(diffInMs / (1000 * 60 * 60 * 24), 0); // avoid negative
  const pixelsPerDay = 1.5;
  return diffInDays * pixelsPerDay;
};




// Define the structure for each timeline event
// IMPORTANT: Added 'date' as required for sorting. Adjust if needed.
interface TimelineEvent {
  id: string | number;
  title: string;
  description: string;
  startDate: string; // Required for chronological sorting (e.g., 'YYYY-MM-DD' or ISO string)
  endDate: string;
}


// Define the props accepted by the Timeline component
interface TimelineProps {
  schoolEvents: TimelineEvent[]; // Events for the left side
  workEvents: TimelineEvent[]; // Events for the right side
  activationPoint?: number; // Optional: Viewport activation percentage
}

export const Timeline: React.FC<TimelineProps> = ({schoolEvents,workEvents,activationPoint = 0.5,}) =>
{
  const [activeItems, setActiveItems] = useState<Set<string | number>>(
    new Set()
  );
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string | number, HTMLDivElement | null>>(
    new Map()
  );

  const firstDate = useMemo(() => {
    const allDates = [...schoolEvents, ...workEvents].map(e => new Date(e.startDate).getTime());
    return new Date(Math.min(...allDates));
  }, [schoolEvents, workEvents]);

  const timelineHeight = useMemo(() => {
    const latestDate = Math.max(
      ...[...schoolEvents, ...workEvents].map((e) => new Date(e.endDate).getTime())
    );
    return getOffsetTop(new Date(latestDate).toISOString(), firstDate.toISOString()) + 100;
  }, [firstDate, schoolEvents, workEvents]);
  
  const handleScroll = useCallback(() => {
    if (!timelineRef.current || !progressRef.current) return;

    const timelineRect = timelineRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const triggerViewportY = viewportHeight * activationPoint;
    const progressTargetY = triggerViewportY - timelineRect.top;
    const maxProgressHeight = timelineRef.current.offsetHeight;
    const calculatedProgressHeight = Math.min(
      Math.max(0, progressTargetY),
      maxProgressHeight
    );

    progressRef.current.style.height = `${calculatedProgressHeight}px`;

    const newActiveItems = new Set<string | number>();
    // Iterate through the combined list's refs
    itemRefs.current.forEach((itemEl, id) => {
      if (itemEl) {
        const itemTopRelativeToTimeline = itemEl.offsetTop;
        if (calculatedProgressHeight >= itemTopRelativeToTimeline) {
          newActiveItems.add(id);
        }
      }
    });

    setActiveItems((prevActiveItems) => {
      if (
        newActiveItems.size !== prevActiveItems.size ||
        ![...newActiveItems].every((id) => prevActiveItems.has(id))
      ) {
        return newActiveItems;
      }
      return prevActiveItems;
    });
  }, [activationPoint]); // Dependency remains activationPoint

  // --- Effect Hook (Unchanged) ---
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);
  
  return (
    <div
      ref={timelineRef}
      className="relative mx-auto my-10 w-full max-w-5xl px-2"
    >
      {/* Center vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gray-300 z-0">
        <div
          ref={progressRef}
          className="absolute left-0 top-0 w-full bg-black transition-all duration-50"
          style={{ height: "0px" }}
        />
      </div>
  
      {/* Two Columns */}
      <div className="relative z-10 grid grid-cols-2">
        {/* Left: School */}
          <div className="relative translate-x-2" style={{ height: timelineHeight }}>
            {schoolEvents.map((event) => {
              const top = getOffsetTop(event.startDate, firstDate.toISOString());
              const height = getEventHeight(event.startDate, event.endDate);
              const isActive = activeItems.has(event.id);
              return (
                <div
                  key={event.id}
                  ref={(el) => {
                    if (el) itemRefs.current.set(event.id, el);
                    else itemRefs.current.delete(event.id);
                  }}
                  style={{ top, height }}
                  className="absolute w-full flex flex-col items-end pr-6"
                >
                  {/* Dot */}
                  <div
                    className={clsx(
                      "absolute right-0 -ml-50 top-2 z-20 h-4 w-4 rounded-full border-2 bg-white transition-colors duration-300",
                      isActive ? "border-black bg-black" : "border-gray-400"
                    )}
                  />
                  {/* Box */}
                  <EventCard event={event} isActive={isActive} text_aligned="text-left" height={height}></EventCard>

              </div>
              );
            })}
          </div>

          {/* Right: Work */}
          <div className="relative -translate-x-2" style={{ height: timelineHeight }}>
            {workEvents.map((event) => {
              const top = getOffsetTop(event.startDate, firstDate.toISOString());
              const height = getEventHeight(event.startDate, event.endDate);
              const isActive = activeItems.has(event.id);
              return (
                <div
                  key={event.id}
                  ref={(el) => {
                    if (el) itemRefs.current.set(event.id, el);
                    else itemRefs.current.delete(event.id);
                  }}
                  style={{ top, height }}
                  className="absolute w-full flex flex-col items-start pl-6"
                >
                  {/* Dot */}
                  <div
                    className={clsx(
                      "absolute left-0 top-2 z-20 h-4 w-4 rounded-full border-2 bg-white transition-colors duration-300",
                      isActive ? "border-black bg-black" : "border-gray-400"
                    )}
                  />
                  {/* Box */}
                  <EventCard event={event} isActive={isActive} text_aligned="text-left" height={height}></EventCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
