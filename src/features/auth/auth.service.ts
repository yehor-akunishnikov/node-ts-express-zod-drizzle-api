import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import {userService} from "@user-feature";

import {LoginDto, RegisterDto} from "./auth.schema";

export const register = async (registerDto: RegisterDto): Promise<void> => {
  const password = await bcrypt.hash(registerDto.password, 10);

  await userService.addOne({...registerDto, password});
};

export const login = async (loginDto: LoginDto) => {
  const user = await userService.findOne({email: loginDto.email});

  if (!user) {
    return {success: false, error: "Invalid credentials"};
  }

  const isCorrectPassword = await bcrypt.compare(loginDto.password, user.password);

  if (!isCorrectPassword) {
    return {success: false, error: "Invalid credentials"};
  }

  return {
    success: true,
    token: jwt.sign({id: user.id}, process.env.JWT_SECRET!, {expiresIn: "1d"})
  };
};
