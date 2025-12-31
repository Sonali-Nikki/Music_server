export const isAdmin = (req, res, next) => {
  const adminEmails = ["admin@gmail.com"]; // change later

  if (!adminEmails.includes(req.user.email)) {
    return res.status(403).json({ message: "Admin access only" });
  }

  next();
};
