import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// Utility function for error responses
const handleError = (res, error, customMessage = "Internal server error") => {
    console.error(error);
    return res.status(500).json({
        message: customMessage,
        success: false
    });
};

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        
        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required.",
                success: false
            });
        }

        // Check if job exists and user hasn't already applied
        const [existingApplication, job] = await Promise.all([
            Application.findOne({ job: jobId, applicant: userId }),
            Job.findById(jobId)
        ]);

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Create application and update job in parallel
        const [newApplication] = await Promise.all([
            Application.create({
                job: jobId,
                applicant: userId,
            }),
            Job.findByIdAndUpdate(jobId, {
                $push: { applications: newApplication._id }
            })
        ]);

        return res.status(201).json({
            message: "Job applied successfully.",
            applicationId: newApplication._id,
            success: true
        });
    } catch (error) {
        return handleError(res, error, "Failed to apply for job");
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                populate: {
                    path: 'company'
                }
            });

        if (applications.length === 0) {
            return res.status(404).json({
                message: "No applications found",
                success: false
            });
        }

        return res.status(200).json({
            applications,
            count: applications.length,
            success: true
        });
    } catch (error) {
        return handleError(res, error, "Failed to fetch applications");
    }
};

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            populate: {
                path: 'applicant',
                select: 'fullname email profile' // Only select necessary fields
            }
        });

        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            });
        }

        return res.status(200).json({
            job,
            applicantsCount: job.applications.length,
            success: true
        });
    } catch (error) {
        return handleError(res, error, "Failed to fetch applicants");
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        
        const validStatuses = ['pending', 'accepted', 'rejected'];
        
        if (!status || !validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({
                message: 'Valid status is required (pending, accepted, rejected)',
                success: false
            });
        }

        const application = await Application.findByIdAndUpdate(
            applicationId,
            { status: status.toLowerCase() },
            { new: true, runValidators: true }
        );

        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Status updated successfully.",
            application,
            success: true
        });
    } catch (error) {
        return handleError(res, error, "Failed to update status");
    }
};