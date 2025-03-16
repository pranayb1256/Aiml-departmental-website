import AdminAction from "../models/admin.models";

const logAdminAction = async (req, res, next) => {
  try {
    const adminId = req.admin?.id; // Assuming admin is authenticated via JWT
    if (!adminId) return next();

    const action = `${req.method} ${req.originalUrl}`;
    await AdminAction.create({ admin: adminId, action });

    next();
  } catch (err) {
    console.error("Error logging admin action:", err);
    next();
  }
};

export default logAdminAction;
