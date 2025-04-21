'use client'
/*
import React, { useState, useEffect, useRef, useCallback } from 'react';
import clsx from 'clsx';

interface TimelineEvent {
  id: string | number;
  title: string;
  description: string;
  date?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  activationPoint?: number; //Where the bar in the timeline should follow (0.5 = middle)
}

export const Timeline: React.FC<TimelineProps> = ({
  events,
  activationPoint = 0.5, // By default middle
}) => {
  const [activeItems, setActiveItems] = useState<Set<string | number>>(new Set());
  const timelineRef = useRef<HTMLDivElement>(null); //our timeline
  const progressRef = useRef<HTMLDivElement>(null); //our progress bar in our timeline
  const itemRefs = useRef<Map<string | number, HTMLDivElement | null>>(new Map()); //all items (events) in our timeline

  const handleScroll = useCallback(() => {
    if (!timelineRef.current || !progressRef.current) return;

    const timelineRect = timelineRef.current.getBoundingClientRect(); //get timelineinfo as top coord and heigth
    const viewportHeight = window.innerHeight; //heigth of the page

    // Calculate the vertical point in the viewport that triggers activation/progress
    // e.g., 0.5 means the middle of the viewport
    const triggerViewportY = viewportHeight * activationPoint;
    console.log("triggerViewportY: " + triggerViewportY);
    console.log("viewportHeigth: " + viewportHeight);

    // Calculate how far the trigger point is below the timeline's top edge
    // Positive value means the trigger point is within or below the timeline container
    // the differe

    //timelineRect.top = difference between topofviewport and beginning of timeline
    //progressTargetY = progressBar Y in px from the top of timeline (before the timeline is negative)
    const progressTargetY = triggerViewportY - timelineRect.top;
    console.log("progressTargetY: " + progressTargetY);
    console.log("timelineRect.top: " + timelineRect.top);

    // Calculate the actual height for the progress bar
    // It should be at least 0 and at most the timeline's full height
    const timelineScrollHeight = timelineRef.current.scrollHeight;
    
    
    const maxProgressHeight = timelineRef.current.offsetHeight;
    
    //take the progressTargetY in a range between 0 and maxProgress.
    //so the progress bar counld not exceed the end or the beginning
    const calculatedProgressHeight = Math.min(
      Math.max(0, progressTargetY),
      maxProgressHeight
    );

    // Update progress bar
    progressRef.current.style.height = `${calculatedProgressHeight}px`;

    // Determine which items are active
    const newActiveItems = new Set<string | number>();
    itemRefs.current.forEach((itemEl, id) => {
      if (itemEl) {
        // Get the item's top position relative to the timeline container's top
        const itemTopRelativeToTimeline = itemEl.offsetTop;

        // Activate if the bottom of the progress bar has passed the item's top
        if (calculatedProgressHeight >= itemTopRelativeToTimeline) {
          newActiveItems.add(id);
        }
      }
    });

    // Update state only if the set of active items has changed
    setActiveItems((prevActiveItems) => {
      if (
        newActiveItems.size !== prevActiveItems.size ||
        ![...newActiveItems].every((id) => prevActiveItems.has(id))
      ) {
        return newActiveItems;
      }
      return prevActiveItems; // No change, return previous state object
    });

  }, [activationPoint]); // Depend on activationPoint prop

  useEffect(() => {
    // Initial calculation on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Recalculate on resize

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]); // Rerun effect if handleScroll changes

  return (
    <div ref={timelineRef} className="relative mx-auto my-10 w-full max-w-3xl p-5">
      {/* --- Vertical Line Container --- }
      <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gray-300">
        {/* --- Filled Progress Line --- }
        <div
          ref={progressRef}
          className="absolute left-0 top-0 w-full bg-black transition-colors duration-300" // Height set by JS
          style={{ height: '0px' }} // Start with 0 height
        />
      </div>

      {/* --- Timeline Items --- }
      <div className="relative z-10">
        {events.map((event, index) => {
          const position = index % 2 === 0 ? 'left' : 'right';
          const isActive = activeItems.has(event.id);

          return (
            <div
              key={event.id}
              // Store ref for this item's container
              ref={(el) => itemRefs.current.set(event.id, el)}
              className={clsx(
                'relative mb-12 flex items-start', // Use flex for easier alignment
                position === 'left' ? 'justify-start' : 'justify-end'
              )}
            >
              {/* --- Content Container --- }
              <div
                className={clsx(
                  'w-[calc(50%-2rem)] rounded border-2 bg-white p-4 shadow-md transition-all duration-300 ease-in-out',
                  position === 'left' ? 'mr-8 text-right' : 'ml-8 text-left', // Margin pushes away from center
                  isActive
                    ? 'border-black text-black'
                    : 'border-gray-400 text-gray-500'
                )}
              >
                <h3 className="text-lg font-semibold">{event.title}</h3>
                {event.date && (
                  <p className="text-sm italic">{event.date}</p>
                )}
                <p className="mt-1 text-sm">{event.description}</p>
              </div>

              {/* --- Center Dot --- }
              <div
                className={clsx(
                  'absolute top-5 z-20 h-4 w-4 -translate-y-1/2 rounded-full border-2 bg-white transition-colors duration-300 ease-in-out',
                  position === 'left'
                    ? 'right-[calc(50%-0.5rem)]' // Position relative to parent div edge
                    : 'left-[calc(50%-0.5rem)]',
                  isActive ? 'border-black bg-black' : 'border-gray-400' // Fill dot when active
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
*/

import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo,
  } from "react";
  import clsx from "clsx";
  
  // Define the structure for each timeline event
  // IMPORTANT: Added 'date' as required for sorting. Adjust if needed.
  interface TimelineEvent {
    id: string | number;
    title: string;
    description: string;
    date: string; // Required for chronological sorting (e.g., 'YYYY-MM-DD' or ISO string)
  }
  
  // Define a type for the combined event with its origin type
  type CombinedEvent = TimelineEvent & { type: "school" | "work" };
  
  // Define the props accepted by the Timeline component
  interface TimelineProps {
    schoolEvents: TimelineEvent[]; // Events for the left side
    workEvents: TimelineEvent[]; // Events for the right side
    activationPoint?: number; // Optional: Viewport activation percentage
  }
  
  export const Timeline: React.FC<TimelineProps> = ({
    schoolEvents,
    workEvents,
    activationPoint = 0.5,
  }) => {
    const [activeItems, setActiveItems] = useState<Set<string | number>>(
      new Set()
    );
    const timelineRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<Map<string | number, HTMLDivElement | null>>(
      new Map()
    );
  
    // --- Combine and Sort Events ---
    // useMemo ensures this expensive operation only runs when input arrays change.
    const combinedAndSortedEvents = useMemo(() => {
      // Add a 'type' property to each event to know its origin
      const typedSchoolEvents: CombinedEvent[] = schoolEvents.map((event) => ({
        ...event,
        type: "school",
      }));
      const typedWorkEvents: CombinedEvent[] = workEvents.map((event) => ({
        ...event,
        type: "work",
      }));
  
      // Combine the two lists
      const allEvents = [...typedSchoolEvents, ...typedWorkEvents];
  
      // Sort the combined list chronologically by date
      // Make sure your date format is consistently comparable (e.g., 'YYYY-MM-DD' or ISO strings)
      // Using new Date().getTime() is generally robust for valid date strings.
      allEvents.sort((a, b) => {
        try {
          // Prioritize events with valid dates
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
  
          if (isNaN(dateA) && isNaN(dateB)) return 0; // Both dates invalid, keep order
          if (isNaN(dateA)) return 1; // Place events without valid date (a) later
          if (isNaN(dateB)) return -1; // Place events without valid date (b) later
  
          return dateA - dateB; // Sort by timestamp
        } catch (e) {
          console.error("Error parsing dates for sorting:", a.date, b.date, e);
          return 0; // Keep original order if parsing fails
        }
      });
  
      return allEvents;
    }, [schoolEvents, workEvents]); // Recalculate if schoolEvents or workEvents change
  
    // --- Scroll Handler (Mostly Unchanged) ---
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
  
    // --- JSX Rendering ---
    return (
      <div
        ref={timelineRef}
        className="relative mx-auto my-10 w-full max-w-3xl p-5"
      >
        {/* Vertical Line Container */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gray-300">
          {/* Filled Progress Line */}
          <div
            ref={progressRef}
            className="absolute left-0 top-0 w-full bg-black transition-colors duration-300"
            style={{ height: "0px" }}
          />
        </div>
  
        {/* Timeline Items Container */}
        <div className="relative z-10">
          {/* Map over the COMBINED and SORTED events */}
          {combinedAndSortedEvents.map((event) => {
            // Determine position based on the 'type' property added during merge
            const position = event.type === "school" ? "left" : "right";
            // Check active state (unchanged)
            const isActive = activeItems.has(event.id);
  
            return (
              // Item Row Container Div (key, ref setup unchanged)
              <div
                key={event.id}
                ref={(el) => {
                    if (el) {
                      itemRefs.current.set(event.id, el);
                    } else {
                      itemRefs.current.delete(event.id); // Clean up if the element is removed
                    }
                  }}
                //ref={(el) => itemRefs.current.set(event.id, el)}
                className={clsx(
                  "relative mb-12 flex items-start",
                  // Alignment still based on 'position'
                  position === "left" ? "justify-start" : "justify-end"
                )}
              >
                {/* Item Content Box */}
                <div
                  className={clsx(
                    "w-[calc(50%-2rem)] rounded border-2 bg-white p-4 shadow-md transition-all duration-300 ease-in-out",
                    // Positioning margin and text alignment based on 'position'
                    position === "left" ? "mr-8 text-right" : "ml-8 text-left",
                    // Styling based on 'isActive' (unchanged)
                    isActive
                      ? "border-black text-black"
                      : "border-gray-400 text-gray-500"
                  )}
                >
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  {/* Display date (now required) */}
                  <p className="text-sm italic">{event.date}</p>
                  <p className="mt-1 text-sm">{event.description}</p>
                </div>
  
                {/* Center Dot */}
                <div
                  className={clsx(
                    "absolute top-5 z-20 h-4 w-4 -translate-y-1/2 rounded-full border-2 bg-white transition-colors duration-300 ease-in-out",
                    // Positioning based on 'position' (unchanged logic, relies on calculated position)
                    position === "left"
                      ? "right-[calc(50%-0.5rem)]"
                      : "left-[calc(50%-0.5rem)]",
                    // Styling based on 'isActive' (unchanged)
                    isActive ? "border-black bg-black" : "border-gray-400"
                  )}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  