import jwt from "jsonwebtoken";
import { createError } from "../helpers/createError.js";
import { User } from "../models/user.js";

export async function authenticate(req, res, next) {
  try {
    const { authorization = "" } = req.headers;

    const [bearer, token] = authorization.split(" ", 2);
    if (bearer !== "Bearer") {
      throw createError(401, "Not authorization");
    }
    if (!token) {
      throw createError(401, "Not authorization");
    }
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(id);

    if (!user || token !== user.token) {
      throw createError(401, "Not authorization");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}
