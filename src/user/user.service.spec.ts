import * as fs from 'node:fs/promises';
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { hash } from 'bcrypt';
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { CreateUserDto } from "src/user/dto/create-user.dto";

describe('User Service Unit Spec', () => {
  let userService: UserService;
  let moduleRef: TestingModule;

  const source = 'test/mock.db';
  const destination = 'test/mock-user.db';

  beforeAll(async () => {
    await fs.copyFile(source, destination);
  });

  afterAll(async () => {
    await fs.unlink(destination)
  });

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: './test/mock-user.db',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UserService],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
  })

  describe('List All Users', () => {
    it('Should return array of users', async () => {
      const users = await userService.listUsers();

      expect(users.every(user => user instanceof User)).toBeTruthy();
    });
  });

  describe('Create new user', () => {
    it('Should create new user when payload is complete', async () => {
      const user = new CreateUserDto();
      const rand = Math.random() * 1000;

      user.name = 'John Doe';
      user.email = `john-${rand}@doe.com`;
      user.password = await hash( `${rand}-hello`, 10);

      expect(await userService.createUser(user)).toEqual(
        expect.objectContaining({
          name: user.name,
          email: user.email
        })
      );
    });
  });

  describe('Retrieve a user by ID', () => {
    it('Should successfully retrieve user ID:1', async () => {
      expect(await userService.getUserById(1)).toEqual(
        expect.objectContaining({
          id: 1,
          email: 'jay@jirayu.in.th'
        })
      );
    });
  });

  describe('Retrieve a user by email', () => {
    it('Should successfully retrieve user email: jay@jirayu.in.th', async () => {
      expect(await userService.getUserByEmail('jay@jirayu.in.th')).toEqual(
        expect.objectContaining({
          id: 1
        })
      );
    });
  });

  describe('Verify user', () => {
    it('Should return a user when email and password are match', async () => {
      expect(await userService.verifyUserPassword('jay@jirayu.in.th', 'mypassword')).toEqual(
        expect.objectContaining({
          id: 1
        })
      )
    })
  });
});
