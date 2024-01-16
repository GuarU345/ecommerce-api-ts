import { prisma } from "../libs/prisma";
import { CustomError } from "../middlewares/custom/errors";
import { UserBody } from "../types/interfaces";
import { STATUS_CODES } from "../utils/constants";

export class UserService {
  async signup(body: UserBody) {
    const { username, email, password } = body;
    try {
      const create = await prisma.user.create({
        data: {
          username,
          email,
          password,
        },
      });
      return create;
    } catch (error) {
      console.error(error);
      throw new CustomError(
        "Error al intentar registrar el usuario",
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getUserById(id: string) {
    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      throw new CustomError(
        "Error al tratar de encontrar el usuario",
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }
}
