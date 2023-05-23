import { CorsOptions } from "cors";

import { ALLOWED_ORIGINS } from "../constants";


const allowedOriginsArray = ALLOWED_ORIGINS?.split(',');

console.log('allowedOriginsArray', allowedOriginsArray);
export const corsOptions: CorsOptions = {
  origin: allowedOriginsArray,
  credentials: true,
}