import { Config } from "@/entity/config";
import { User } from "@/entity/user";
import { Bcrypt } from "@/helpers/bcrypt";
import { ValidationPipe } from "@/pipes/validation.pipe";
import { CreateTokenRequest } from "@/types/requests";
import {
  Body,
  Controller,
  HttpStatus,
  Injectable,
  Logger,
  Post,
  Res,
  UsePipes,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { sign } from "jsonwebtoken";
import { Repository } from "typeorm";

@Injectable()
@Controller("token")
export class AuthController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>,
  ) {}

  private readonly logger = new Logger(AuthController.name);

  @Post()
  @UsePipes(new ValidationPipe())
  async createToken(@Body() req: CreateTokenRequest, @Res() res) {
    this.logger.log("Attempting to create token for user " + req.username);
    let user = null;

    try {
      user = await this.userRepository
        .createQueryBuilder("row")
        .select("row.username")
        .addSelect("row.password")
        .addSelect("row.accessLevel")
        .where("row.username = :username", { username: req.username })
        .getOne();
    } catch {
      return res.status(HttpStatus.UNAUTHORIZED).send();
    }

    if (user === undefined) {
      return res.status(HttpStatus.UNAUTHORIZED).send();
    }

    if (!(await Bcrypt.compare(req.password, user.password))) {
      this.logger.log("Failed to validate user " + req.username);
      return res.status(HttpStatus.UNAUTHORIZED).send();
    }

    const expireDate = new Date();
    expireDate.setTime(new Date().getTime() + 60 * 60 * 24 * 14);

    const token = sign(
      {
        username: user.username,
        accessLevel: user.accessLevel,
        expiresAt: expireDate,
      },
      "24dc1870-4e73-4e05-bfb5-726cc22f10b3",
    );

    return res.status(HttpStatus.OK).send(token);
  }

  @Post("/guest")
  @UsePipes(new ValidationPipe())
  async createGuestToken(@Res() res) {
    const guestUsername = "guest" + Date.now();

    const guestAllowed = await this.configRepository.findOne({
      key: "guest_login",
    });

    const guestAccess = await this.configRepository.findOne({
      key: "guest_access",
    });

    if (guestAllowed.value === "false") {
      this.logger.log("Guest Login not Allowed");
      return res.status(HttpStatus.UNAUTHORIZED).send();
    }

    const expireDate = new Date();
    expireDate.setTime(new Date().getTime() + 60 * 60 * 24 * 14);

    const user = {
      username: guestUsername,
      accessLevel: guestAccess.value,
    };

    const token = sign(
      {
        username: guestUsername,
        accessLevel: guestAccess.value,
        expiresAt: expireDate,
      },
      "24dc1870-4e73-4e05-bfb5-726cc22f10b3",
    );

    res.status(HttpStatus.OK).send({ user, accessToken: token });
  }
}
