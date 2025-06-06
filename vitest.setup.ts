import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./tests/mocks";
import { http, HttpResponse } from "msw";

beforeAll(() => {
  server.use(
    http.all("*", ({ request }) => {
      console.error("Unmatched request:", request.method, request.url);
      return HttpResponse.text("Unmatched request", { status: 500 });
    }),
  );
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
