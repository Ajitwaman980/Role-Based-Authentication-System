// import { NextFunction } from "express";

// export const verifyAdmin = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.cookies.user;

//   if (!token) {
//     res.status(403).json({ message: "Access Denied, No Token Provided" });
//     return;
//   }

//   try {
//     const decoded = jwt.verify(token, "jwtsecret");
//     const user = await UserDataSchema.findById(req.user.id);

//     if (!user || user.role !== "admin") {
//       res.status(403).json({ message: "Access Denied, Not Admin" });
//       return;
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to authenticate token" });
//     return;
//   }
// };
