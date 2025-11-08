import React, { useState } from "react";
import { Navbar } from "./shared/Navbar";
import { Badge } from "./ui/badge";
import { AppliedJobTable } from "./AppliedJobTable";
import {
  User,
  Mail,
  Phone,
  Edit3,
  FileText,
  MapPin,
  Briefcase,
} from "lucide-react";
import { UpdateProfileDialog } from "./UpdateProfileDialog";
import { useSelector } from "react-redux";

export const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const hasResume = Boolean(user?.profile?.resume);
  const hasPhoto = Boolean(user?.profile?.profilePhoto);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Profile Header */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {hasPhoto ? (
              <img
                src={user.profile.profilePhoto}
                alt={user.fullname}
                className="w-20 h-20 rounded-full object-cover border border-gray-300"
              />
            ) : (
              <div className="bg-blue-100 p-4 rounded-full">
                <User className="w-10 h-10 text-blue-600" />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {user?.fullname}
              </h2>
              <p className="text-gray-500">{user?.profile?.bio || "No bio added yet."}</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
          >
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        {/* Profile Details */}
        <div className="grid md:grid-cols-2 gap-6 text-gray-700 mb-6">
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-500" />
            {user?.email}
          </p>
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-500" />
            +91 {user?.phoneNumber}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            Bangalore, India
          </p>
          <p className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-gray-500" />
            {user?.role}
          </p>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-800 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map(
                (skill, index) =>
                  skill.trim() && (
                    <Badge key={index} className="bg-blue-100 text-blue-700">
                      {skill.trim()}
                    </Badge>
                  )
              )
            ) : (
              <span className="text-sm text-gray-500">No skills added</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div>
          <h3 className="font-medium text-gray-800 mb-2">Resume</h3>
          {hasResume ? (
            <a
              href={user.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <FileText className="w-4 h-4" />
              {user.profile.resumeOriginalName || "View Resume"}
            </a>
          ) : (
            <span className="text-sm text-gray-500">No resume uploaded</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
        <AppliedJobTable />
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};
