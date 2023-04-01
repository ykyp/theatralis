import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '15c0d8bb8ab2d942415a88d7d723902e66c4fd08', queries });
export default client;
  