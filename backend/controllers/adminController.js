import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid admin credentials");
  }

  res.json({
    token: generateToken(admin._id),
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email
    }
  });
});

export const getAdminProfile = asyncHandler(async (req, res) => {
  res.json({ admin: req.admin });
});

