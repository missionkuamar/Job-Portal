import React from "react";
import { Navbar } from "./shared/Navbar";
import { FilterCard } from "./FilterCard";
import { Job } from "./Job";
import { useSelector } from "react-redux";

export const Jobs = () => {
  const { alljobs } = useSelector((store) => store.job || []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-1 max-w-7xl mx-auto mt-5 gap-5 px-2 sm:flex sm:flex-row">
        {/* Filter Sidebar */}
        <div className="w-full sm:w-64 sm:flex flex-shrink-0">
          <FilterCard />
        </div>

        {/* Jobs Grid */}
        <div className="flex-1 h-[88vh] overflow-y-auto">
          {alljobs.length === 0 ? (
            <span className="text-gray-500 text-lg">No jobs found</span>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {alljobs.map((job) => (
                <Job key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
