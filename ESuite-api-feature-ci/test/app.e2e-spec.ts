import { AppModule } from "@/app.module";
import { Test, TestingModule } from "@nestjs/testing";
import * as dotenv from "dotenv";
import * as HttpStatus from "http-status-codes";
import * as request from "supertest";
import { getConnection } from "typeorm";

describe("AppController (e2e)", () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    dotenv.config();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await getConnection().dropDatabase();
    await getConnection().synchronize();
    await getConnection().runMigrations();
    await app.close();
  });

  it("/api/user (GET)", () => {
    return request(app.getHttpServer())
      .get("/user")
      .expect(HttpStatus.FORBIDDEN);
  });

  it("/api/user (GET)", () => {
    return request(app.getHttpServer())
      .get("/user/me")
      .expect(HttpStatus.FORBIDDEN);
  });

  it("/api/user/me (GET) Unauthenticated", () => {
    return request(app.getHttpServer())
      .get("/user/me")
      .set({ Authorization: "this is a invalid auth token" })
      .expect(HttpStatus.FORBIDDEN);
  });

  it("/api/token (POST)", async () => {
    const res = await request(app.getHttpServer())
      .post("/token")
      .send({ username: "admin", password: "password" })
      .expect(HttpStatus.OK);

    expect(typeof res.text).toBe("string");
  });

  it("/api/token (POST) Unauthorized: Incorrect Name", async () => {
    return await request(app.getHttpServer())
      .post("/token")
      .send({ username: "adminnnn", password: "password" })
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it("/api/token (POST) Bad Request: No Password", async () => {
    return await request(app.getHttpServer())
      .post("/token")
      .send({ username: "admin", password: "" })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it("/api/token (POST) Bad Request: No Name or Password", async () => {
    return await request(app.getHttpServer())
      .post("/token")
      .send({ username: "", password: "" })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it("/api/token (POST) Bad Request: No Name", async () => {
    return await request(app.getHttpServer())
      .post("/token")
      .send({ username: "", password: "password" })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it("/api/token (POST) Incorrect Username", async () => {
    return await request(app.getHttpServer())
      .post("/token")
      .send({ username: "adminnn", password: "password" })
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it("/api/token (POST) Null password", async () => {
    return await request(app.getHttpServer())
      .post("/token")
      .send({ username: "admin", password: null })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it("/api/token (POST) Undefined Password", async () => {
    return await request(app.getHttpServer())
      .post("/token")
      .send({ username: "admin" })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it("/api/token (POST) Undefined Name", async () => {
    return await request(app.getHttpServer())
      .post("/token")
      .send({ password: "password" })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it("/api/user/me (GET) Authenticated", async () => {
    let res = await request(app.getHttpServer())
      .post("/token")
      .send({ username: "admin", password: "password" })
      .expect(HttpStatus.OK);

    expect(typeof res.text).toBe("string");

    res = await request(app.getHttpServer())
      .get("/user/me")
      .set({ Authorization: res.text })
      .expect(HttpStatus.OK);

    expect(typeof res.body.username).toBe("string");
    expect(typeof res.body.accessLevel).toBe("string");

    expect(res.body.username).toBe("admin");
    expect(res.body.accessLevel).toBe("Admin");
  });

  it("/api/user (POST) Authenticated Create A User: Regular", async () => {
    let res = await request(app.getHttpServer())
      .post("/token")
      .send({ username: "admin", password: "password" })
      .expect(HttpStatus.OK);

    expect(typeof res.text).toBe("string");

    res = await request(app.getHttpServer())
      .post("/user")
      .set({ Authorization: res.text })
      .send({ username: "test1", password: "password", accessLevel: "Regular" })
      .expect(HttpStatus.CREATED);
  });

  it("/api/user (POST) Authenticated Create A User: Admin", async () => {
    let res = await request(app.getHttpServer())
      .post("/token")
      .send({ username: "admin", password: "password" })
      .expect(HttpStatus.OK);

    expect(typeof res.text).toBe("string");

    res = await request(app.getHttpServer())
      .post("/user")
      .set({ Authorization: res.text })
      .send({ username: "test1", password: "password", accessLevel: "Admin" })
      .expect(HttpStatus.CREATED);
  });

  it("/api/user (POST) Failed Create An Admin: No Admin Priviledges", async () => {
    let res = await request(app.getHttpServer())
      .post("/token")
      .send({ username: "reguser", password: "password" })
      .expect(HttpStatus.OK);

    expect(typeof res.text).toBe("string");

    res = await request(app.getHttpServer())
      .post("/user")
      .set({ Authorization: res.text })
      .send({ username: "test1", password: "password", accessLevel: "Admin" })
      .expect(HttpStatus.FORBIDDEN);
  });

  /// Bad Request for creation tests

  it("/api/user (POST) Failed To Create A Bad User: No Password", async () => {
    let res = await request(app.getHttpServer())
      .post("/token")
      .send({ username: "admin", password: "password" })
      .expect(HttpStatus.OK);

    expect(typeof res.text).toBe("string");

    res = await request(app.getHttpServer())
      .post("/user")
      .set({ Authorization: res.text })
      .send({ username: "test1", password: "", accessLevel: "Regular" })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it("/api/user (POST) Failed To Create A Bad User: No Name Or Password", async () => {
    let res = await request(app.getHttpServer())
      .post("/token")
      .send({ username: "admin", password: "password" })
      .expect(HttpStatus.OK);

    expect(typeof res.text).toBe("string");

    res = await request(app.getHttpServer())
      .post("/user")
      .set({ Authorization: res.text })
      .send({ username: "", password: "", accessLevel: "Regular" })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it("/api/user (POST) Failed To Create A Bad User: No Username", async () => {
    let res = await request(app.getHttpServer())
      .post("/token")
      .send({ username: "admin", password: "password" })
      .expect(HttpStatus.OK);

    expect(typeof res.text).toBe("string");

    res = await request(app.getHttpServer())
      .post("/user")
      .set({ Authorization: res.text })
      .send({ username: "", password: "password", accessLevel: "Regular" })
      .expect(HttpStatus.BAD_REQUEST);
  });
});
