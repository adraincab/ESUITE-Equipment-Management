import { AuthService, Roles } from "@/auth/auth.service";
import {
  Controller,
  FileInterceptor,
  Get,
  HttpStatus,
  Injectable,
  Logger,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import * as fs from "fs";

@Injectable()
@Controller("database")
export class DatabaseController {
  private readonly logger = new Logger(DatabaseController.name);

  @Get()
  @Roles("Admin")
  @UseGuards(AuthService)
  async getDatabase(@Res() res) {
    this.logger.log("Getting database file");
    return res.download("./EsuiteDev.db", "Database.db", () => {
      return;
    });
  }

  @Post()
  @Roles("Admin")
  @UseGuards(AuthService)
  @UseInterceptors(FileInterceptor("database"))
  async restoreDatabase(@UploadedFile() database, @Res() res) {
    if (database === undefined || database === null) {
      this.logger.log("Database file is null or undefined");
      return res.status(HttpStatus.BAD_REQUEST).send();
    }

    this.logger.log("Saving database to disk");

    fs.writeFile("EsuiteDev.db", database.buffer, () => {
      return;
    });

    this.logger.log("Saved database to disk successfully");
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
