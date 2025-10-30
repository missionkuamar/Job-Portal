import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String, // Changed from Number to String
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: { 
        type: String, 
        enum: ['student', 'recruiter'], // Fixed typo ("recruter" to "recruiter")
        required: true,
    },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String },
        resumeOriginalName: { type: String }, // Fixed typo ("resumeOrifinalName" to "resumeOriginalName")
        company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
        profilePicture: { // Renamed this field to avoid confusion
            type: String,
            default: "",
        }
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
