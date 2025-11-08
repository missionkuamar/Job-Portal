import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Briefcase, Calendar, Building2, CheckCircle } from "lucide-react";

export const AppliedJobTable = () => {
  const jobs = [
    { date: "2025-10-21", role: "Frontend Developer", company: "Google", status: "Selected" },
    { date: "2025-09-12", role: "UI/UX Designer", company: "Microsoft", status: "Pending" },
    { date: "2025-07-30", role: "Backend Engineer", company: "Amazon", status: "Rejected" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Selected":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-blue-600" />
        Applied Jobs
      </h2>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" /> Date
            </TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job, index) => (
            <TableRow key={index}>
              <TableCell>{job.date}</TableCell>
              <TableCell>{job.role}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(job.status)} flex items-center gap-1`}>
                  <CheckCircle className="w-3 h-3" /> {job.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
