import { setupServer } from "msw/node";
import { openApiHandlers } from "./handlers";
import { http, HttpResponse } from "msw";

export const server = setupServer(...openApiHandlers);
