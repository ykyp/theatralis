import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'https://content.tinajs.io/1.4/content/de22fc98-b2e9-4a98-88ab-db440eef3dc1/github/main', token: '15c0d8bb8ab2d942415a88d7d723902e66c4fd08', queries });
export default client;
  