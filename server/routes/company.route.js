import express from "express";

import isAuthenticated from "../middleware/isAuthented.js";
import { getCompany, getCompanyById, registercompany, updateCompany } from "../controllers/company.model.js";

const router = express.Router();

router.route('/register').post(isAuthenticated, registercompany);
router.route('/get').post(isAuthenticated, getCompany)
router.route('/get/:id').get(isAuthenticated, getCompanyById);
router.route('/update/:id').post(isAuthenticated,updateCompany);

export default router