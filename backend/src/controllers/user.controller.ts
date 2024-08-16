import { createUser, getUserByEmail } from "../repositories/user.repository";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { BadRequestError } from "../utils/errors";
import bcrypt from "bcrypt";
import { cookieOptions, generateJWTToken } from "../utils/helpers";
import { selectUserDto, SelectUserDto } from "../dto/user.dto";

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await getUserByEmail(email);

  if (userExists) {
    throw new BadRequestError("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const response = await createUser({
    username,
    email,
    password: hashedPassword,
  });

  return res
    .status(201)
    .json(successResponse(response, "User created successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    throw new BadRequestError("User not found");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new BadRequestError("Invalid password");
  }

  const returnUser = selectUserDto.parse(user);

  const token = await generateJWTToken({
    id: user.id,
    username: user.username,
  });

  return res
    .status(200)
    .cookie("token", token, cookieOptions)
    .json(successResponse({ user: returnUser, token }, "Login successful"));
});

export const logoutUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .clearCookie("token", cookieOptions)
    .json(successResponse({}, "Logout successful"));
});

export const getUser = asyncHandler(async (req, res) => {
  return res.status(200).json(successResponse(req.user));
});
