// Admin posts a new job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        // Validate all required fields
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.", // Typo: "Something"
                success: false
            })
        };
        
        // Create new job
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","), // Convert comma-separated string to array
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        // Missing error response
    }
}

// Get all jobs for students with search functionality
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        // Search in title or description
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
        // Missing error response
    }
}

// Get specific job by ID
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.", // Typo: "Job"
                success: false
            })
        };
        
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
        // Missing error response
    }
}

// Get jobs posted by admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
        // Missing error response
    }
}