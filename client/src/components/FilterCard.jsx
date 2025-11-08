import React from "react";
import { Checkbox } from "./ui/checkbox"; // ✅ Use your own checkbox component if you have one
import { Label } from "./ui/label";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0–40k", "40k–1L", "1L–3L", "3L+"],
  },
];

export const FilterCard = () => {
  return (
    <aside className="w-full md:w-64 bg-white border border-gray-100 rounded-lg shadow-sm p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>

      <div className="space-y-6">
        {filterData.map((section, index) => (
          <div key={index}>
            <h3 className="text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">
              {section.filterType}
            </h3>
            <div className="flex flex-col gap-2">
              {section.array.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Checkbox id={`${section.filterType}-${idx}`} />
                  <Label
                    htmlFor={`${section.filterType}-${idx}`}
                    className="text-sm text-gray-700 cursor-pointer hover:text-blue-600"
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-between gap-2">
        <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto">
          Apply
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-600 border rounded-md hover:bg-gray-50 w-full sm:w-auto">
          Clear
        </button>
      </div>
    </aside>
  );
};
