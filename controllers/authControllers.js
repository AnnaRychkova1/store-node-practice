import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generator from "generate-password";
import { User } from "../models/user.js";
import { createError } from "../helpers/createError.js";

export async function registerUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const foundUser = await User.findOne({ email });

    if (foundUser) {
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

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      throw createError(400, "Email or Password is wrong");
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
      throw createError(400, "Email or Password is wrong");
    }

    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const user = await User.findByIdAndUpdate(
      foundUser._id,
      {
        token,
      },
      { new: true }
    ).select({ password: 0, updatedAt: 0, createdAt: 0 });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function updatePassword(req, res, next) {
  try {
    const { email } = req.body;

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      throw createError(404, "Email is undefined");
    }

    const password = generator.generate({
      length: 10,
      numbers: true,
    });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(foundUser._id, { password: passwordHash });
    
    res.status(200).json(password);
  } catch (error) {
    next(error);
  }
}
