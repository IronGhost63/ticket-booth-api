import * as dotenv from "dotenv";
import { StringValue } from 'ms';

dotenv.config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'default_secret_key',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'default_refresh_secret_key',
  secretExpires: process.env.JWT_SECRET_EXPIRES as StringValue || '1h',
  refreshSecretExpires: process.env.JWT_REFRESH_SECRET_EXPIRES as StringValue || '7d',
}
