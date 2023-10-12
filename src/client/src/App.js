import React, { useState, useEffect, useMemo } from "react";
import "./tailwind.css";
import "./App.css";

function App() {
  const [bookedStatus, setBookedStatus] = useState(null);
  const [justBooked, setJustBooked] = useState(false);

  const shouldShowBookButton = useMemo(() => {
    if (justBooked) {
      return false;
    }

    if (bookedStatus === null) {
      return false;
    }

    if (bookedStatus.isBooked === false) {
      return true;
    }

    return false;
  }, [justBooked, bookedStatus]);

  useEffect(() => {
    fetch("/api/pool-table-booked")
      .then((res) => res.json())
      .then((json) => {
        setBookedStatus(json);
      });
  }, []); // empty 2nd arg - only runs once

  const onBookTable = () => {
    fetch("/api/pool-table-booked", {
      method: "POST",
    })
      .then((res) => res.json())
      .then(() => {
        setJustBooked(true);
      });

    setJustBooked(true);
  };

  const title = useMemo(() => {
    if (justBooked) {
      return `Pool table booked, enj🎱y!`;
    }

    if (bookedStatus === null) {
      return `Checking if pool table is booked...`;
    }

    if (bookedStatus.isBooked === false) {
      return `Pool table is available!`;
    }
    return `Sorry, table is in use - try again in ${
      Math.floor(bookedStatus.timeLeft) + 1
    } minutes!`;
  }, [bookedStatus, justBooked]);

  return (
    <div className="App">
      <section class="bg-white dark:bg-gray-900 h-screen">
        <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 ">
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            {title}
          </h1>
          {/* <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
            fluffy fluff fluff
          </p> */}
          <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <pre>{bookedStatus === null}</pre>
            {shouldShowBookButton && (
              <a
                onClick={onBookTable}
                href="#"
                class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
                Book table 🎱
              </a>
            )}

            {/* <a
              href="#"
              class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Learn more
            </a> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
