import { expect, it, describe } from "vitest";
import { GuestApi, AuthApi } from "../../api";
import { HttpClient } from "../../utils";
import { getOpenApiExample } from "../../../tests/openapi";

describe("GuestApi", () => {
  const http = new HttpClient({ apiKey: "test-key" });
  const auth = new AuthApi(http);
  const guestApi = new GuestApi(http);
  it("should get rated movies for a guest session", async () => {
    const example = getOpenApiExample(
      "/3/guest_session/{guest_session_id}/rated/movies",
      "get",
      "200",
    );

    const session = await auth.createGuestSession();
    const response = await guestApi.ratedMovies(session.guest_session_id);
    expect(response).toEqual(example);
  });

  it("should get rated tvs for a guest session", async () => {
    const example = getOpenApiExample(
      "/3/guest_session/{guest_session_id}/rated/tv",
      "get",
      "200",
    );

    const session = await auth.createGuestSession();
    const response = await guestApi.ratedTvs(session.guest_session_id);
    expect(response).toEqual(example);
  });

  it("should get rated tv episodes for a guest session", async () => {
    const example = getOpenApiExample(
      "/3/guest_session/{guest_session_id}/rated/tv/episodes",
      "get",
      "200",
    );

    const session = await auth.createGuestSession();
    const response = await guestApi.ratedTvEposides(session.guest_session_id);
    expect(response).toEqual(example);
  });
});
