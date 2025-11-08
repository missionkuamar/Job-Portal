import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constant.js";
import { setUser } from "@/redux/authSlice";

export const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      console.error(error);
    }
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo Section */}
        <Link to="/">
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#f83002]">Portal</span>
          </h1>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-5">
          <ul className="flex font-medium items-center gap-6">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/job">Jobs</Link></li>
            <li><Link to="/browse">Browse</Link></li>
          </ul>

          {/* Conditional Rendering */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="w-10 h-10 rounded-full cursor-pointer border border-gray-200">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt={user?.fullname}
                    className="rounded-full object-cover"
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-56 p-4">
                <div className="flex items-center gap-3 border-b pb-3 mb-3">
                  <Avatar className="w-10 h-10 rounded-full">
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      }
                      alt={user?.fullname}
                      className="rounded-full object-cover"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold capitalize">
                      {user?.fullname || "User"}
                    </h4>
                    <p className="text-sm text-gray-500 truncate max-w-[140px]">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link to="/profile">
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-start gap-2"
                    >
                      <User2 size={18} />
                      <span>View Profile</span>
                    </Button>
                  </Link>

                  <Button
                    variant="ghost"
                    onClick={logoutHandler}
                    className="w-full flex items-center justify-start gap-2 text-red-500 hover:text-red-600"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};
