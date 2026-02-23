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
2. API Server should be up and running on port 3000

This project uses SQLite. Database file will automatically be created under `./db` directory
