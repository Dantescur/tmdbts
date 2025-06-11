import { setupServer } from "msw/node";
import { openApiHandlers } from "./handlers";

export const server = setupServer(...openApiHandlers);
