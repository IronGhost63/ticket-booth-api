# Ticket Booth API

### Requirement
- NodeJS 20

### Setup
1. Copy `.env.example` to `.env`
2. Update neccessary value. Run following command to generate hashed key
```bash
openssl rand -base64 32
```
3. Run following command
```bash
npm install
```

### Compile and run
1. Run following command to run server
```bash
npm run build
npm run start:prod
```
2. API Server should be up and running on http://localhost:3000

This project uses SQLite. Database file will automatically be created under `./db` directory

### Admin
By default, any registered user will have `user` role which have limited capabilities. You will need to manually update database, or update code in order to create admin user

#### Edit database manually
1. Use SQLite client such as [Beekeeper Studio](https://www.beekeeperstudio.io/get) to open `./db/ticket-booth.db`
2. Browse to `user` table (By right click and select "View Data" in Beekeeper Studio)
3. Edit `roles` column, change from `user` to `admin`
4. Hit `Apply` button at bottom-right.

### Edit Code
You will need to revert changes once admin user is created.
1. Open `./src/user/user.service.ts`
2. Look into `createUser()` method, around line 29
3. Change from `insertUser.roles = Role.USER;` to `insertUser.roles = Role.ADMIN`
4. Save the file and rebuild project again
