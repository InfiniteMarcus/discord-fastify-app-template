import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z
    .string()
    .refine(
      (port) => parseInt(port) > 0 && parseInt(port) < 65536,
      'Invalid port number',
    )
    .nonempty(),
  DISCORD_APPLICATION_ID: z.string().nonempty(),
  DISCORD_APPLICATION_PUBLIC_KEY: z.string().nonempty(),
  DISCORD_APPLICATION_TOKEN: z.string().nonempty(),
});

type Env = z.infer<typeof envSchema>;

const ENV: Env = envSchema.parse(process.env);
export default ENV;
