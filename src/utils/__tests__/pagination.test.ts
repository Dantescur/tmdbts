import { describe, expect, expectTypeOf, it } from "vitest";
import { createPaginatedType } from "../../types";

interface Dummy {
  id: number;
  name: string;
}

describe("createPaginatedType", () => {
  it("should return an empty object casted to PaginatedResponse", () => {
    const paginated = createPaginatedType<Dummy>();

    expectTypeOf(createPaginatedType).toBeFunction();
    expect(paginated).toEqual({});
  });
});
