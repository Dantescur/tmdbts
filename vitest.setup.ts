import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./tests/mocks";

beforeAll(() =>
  server.listen({
    onUnhandledRequest: (request) => {
      console.error("MSW Unhandled request:", request.method, request.url);
      // throw new Error(`Unhandled ${request.method} request to ${request.url}`);
    },
  }),
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
