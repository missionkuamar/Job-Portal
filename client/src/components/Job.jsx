import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

export const Job = ({ job }) => {
  const navigate = useNavigate();
  const jobId = job?._id;
  const postedDate = new Date(job?.createdAt).toLocaleDateString();

  return (
    <div className="p-5 rounded-md shadow-lg bg-white border border-gray-100 hover:shadow-2xl transition-all flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">{postedDate}</p>
        <Button className="rounded-full" variant="outline" size="icon">
          <Bookmark className="w-4 h-4" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 my-4">
        <Avatar className="w-14 h-14 flex-shrink-0">
          <AvatarImage
            src={job?.company?.logo || "https://via.placeholder.com/150"}
            alt={job?.company?.name || "Company Logo"}
            className="object-cover w-full h-full rounded-full"
          />
        </Avatar>
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold text-gray-800">{job?.title}</h3>
          <p className="text-sm text-gray-500">
            {job?.company?.name || "Unknown Company"} • {job?.location || "Remote"}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {job?.description}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-2">
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
          {job?.experienceLevel === 1
            ? "Junior"
            : job?.experienceLevel === 6
            ? "Mid-level"
            : "Senior"}
        </Badge>
        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
          {job?.jobType}
        </Badge>
        <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
          ${job?.salary?.toLocaleString()}
        </Badge>
      </div>

      {/* Buttons */}
      <div className="mt-5 flex flex-col sm:flex-row gap-2">
        <Button
          onClick={() => navigate(`/description/${jobId}`)}
          className="w-full sm:w-1/2 bg-gray-500 text-white hover:bg-gray-700"
        >
          Details
        </Button>
        <Button className="w-full sm:w-1/2 bg-gray-600 text-white hover:bg-gray-700">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

