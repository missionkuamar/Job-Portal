import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // optional (you can replace with a normal button)
import { Input } from "@/components/ui/input";   // optional if you use shadcn inputs
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../shared/Navbar";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
export const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
const { loading } = useSelector(store => store.auth);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const navigate = useNavigate();
 const handleSubmit = async (e) => {
  e.preventDefault();
  dispatch(setLoading(true));

  try {
    console.log("Login data:", formData);

    const res = await axios.post(`${USER_API_END_POINT}/login`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // include cookies
    });

    const data = res.data;

    if (data.success) {
      // ✅ Save user in Redux or localStorage
      dispatch(setUser(data.user)); // <-- optional if using Redux

      toast.success(data.message || "Login successful!");
      navigate("/"); // redirect to home/dashboard
    } else {
      toast.error(data.message || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    toast.error(error?.response?.data?.message || "Something went wrong");
  } finally {
    dispatch(setLoading(false));
  }
};

    return (
        <>
            <div>
                <div>
                    <Navbar />
                </div>
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                    <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
                        <h2 className="text-2xl font-bold text-center mb-2">
                            Welcome Back 👋
                        </h2>
                        <p className="text-gray-500 text-center mb-6">
                            Please login to your account
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                    className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                            <div>
                                <Label className="mb-1 block">Register as</Label>
                                <RadioGroup
                                    value={formData.role ?? ""}
                                    onValueChange={(value) =>
                                        setFormData({ ...formData, role: value })
                                    }
                                    className="flex gap-4"
                                >
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="student" id="student" />
                                        <Label htmlFor="student">Student</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="recruiter" id="recruiter" />
                                        <Label htmlFor="recruiter">Recruiter</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="flex items-center justify-between">
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-indigo-600 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
   {
              loading ? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin" /></Button> : <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
            Login
            </Button>
            }
            

                            <p className="text-center text-sm text-gray-500">
                                Don’t have an account?{" "}
                                <Link to="/register" className="text-indigo-600 hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};


