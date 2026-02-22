import createClient from "openapi-fetch";

import { paths } from "@/shared/api/schema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) throw new Error("NEXT_PUBLIC_API_BASE_URL is missing");

export const openapiClient = createClient<paths>({ baseUrl: API_BASE_URL });
