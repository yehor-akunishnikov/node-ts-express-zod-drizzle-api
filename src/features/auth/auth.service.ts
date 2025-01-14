import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import {userService} from "@user-feature";

import {LoginDTO, RegisterDTO} from "./auth.schema";

export const register = async (registerDTO: RegisterDTO): Promise<void> => {
  const password = await bcrypt.hash(registerDTO.password, 10);

  await userService.addOne({...registerDTO, password});
};

export const login = async (loginDTO: LoginDTO) => {
  const user = await userService.findOne({email: loginDTO.email});

  if (!user) {
    return {success: false, error: "Invalid credentials"};
  }

  const isCorrectPassword = await bcrypt.compare(loginDTO.password, user.password);

  if (!isCorrectPassword) {
    return {success: false, error: "Invalid credentials"};
  }

  return {
    success: true,
    token: jwt.sign({id: user.id}, process.env.JWT_SECRET!, {expiresIn: "1d"})
  };
};
