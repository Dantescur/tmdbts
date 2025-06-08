import { setupServer } from "msw/node";
import { openApiHandlers } from "./handlers";
import { beforeAll, afterEach, afterAll } from "vitest";

export const server = setupServer(...openApiHandlers);

// Start server before all tests
// beforeAll(() => {
//   server.listen({
//     onUnhandledRequest: (request) => {
//       console.error("MSW Unhandled request:", request.method, request.url);
//       // FIXME: Unhandled requests throw errors to fail tests fast, but this can mask
//       // subtle handler mismatches (e.g., /account/:id). Consider logging warnings during
//       // debugging to allow catch-all handlers to capture mismatches.
//       throw new Error(`Unhandled ${request.method} request to ${request.url}`);
//     },
//   });
// });
//
// // Reset handlers after each test to prevent interference
// afterEach(() => {
//   server.resetHandlers();
// });
//
// // Close server after all tests
// afterAll(() => {
//   server.close();
// });
