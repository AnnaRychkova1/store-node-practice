import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { createError } from "../helpers/createError.js";

export async function registerUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const findedUser = await User.findOne({ email });

    if (findedUser) {
      throw createError(409, "This email already used");
    }

    const user = await User.create({ email, password: passwordHash });

    res.status(201).json({
      email: user.email,
      _id: user._id,
    });
  } catch (error) {
    next(error);
  }
}

export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    const findedUser = await User.findOne({ email });

    if (!findedUser) {
      throw createError(400, "Email or Password is wrong");
    }

    const isMatch = await bcrypt.compare(password, findedUser.password);

    if (!isMatch) {
      throw createError(400, "Email or Password is wrong");
    }

    const token = jwt.sign({ id: findedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const user = await User.findByIdAndUpdate(findedUser._id, {
      token,
    }).select({ password: 0, updatedAt: 0, createdAt: 0 });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}
