import { createError } from "../helpers/createError.js";

export function authenticate(req, res, next) {
  try {
    const { authorization = "" } = req.headers;

    const [bearer, token] = authorization.split(" ", 2);
    if (bearer !== "Bearer") {
      throw createError(401, "No authorization");
    }
    if (!token) {
      throw createError(401, "No authorization");
    }
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (error) {
    next(error);
  }
}
