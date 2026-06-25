import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";

const createUserIntoDb = async (payload: any) => {
  const { name, email, password, profilePhoto } = payload;
  const existUser = await prisma.user.findUnique({
    where: { email: email },
  });
  if (existUser) {
    throw new Error("User already exist");
  }

  const hashPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );
  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
      profile: {
        create: {
          profilePhoto,
        },
      },
    },
  });

  // await prisma.profile.create({
  //   data: {
  //     userId: createdUser.id,
  //     profilePhoto,
  //   },
  // });

  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  return user;
};

const getProfileFromDb = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });
  return user;
};

export const userService = {
  createUserIntoDb,
  getProfileFromDb,
};
