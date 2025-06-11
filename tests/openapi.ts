import { paths } from "../src/types";
import specs from "../api.specs.json";

// Define a type for OpenAPI operations with a responses property
type Operation = {
  responses: {
    [status: string]: {
      content?: {
        "application/json"?: {
          examples?: {
            [key: string]: { value: any };
          };
        };
      };
    };
  };
};

export function getOpenApiExample<
  TPath extends keyof paths,
  TMethod extends keyof paths[TPath],
  TStatus extends string,
>(
  path: TPath,
  method: TMethod,
  status: TStatus,
  exampleKey: string = "Result",
): any {
  // Cast to Operation to ensure responses exists
  const operation = specs.paths[path as string][method as string] as Operation;

  if (!operation || !operation.responses) {
    throw new Error(
      `No responses found for ${String(method).toUpperCase()} ${String(path)}`,
    );
  }

  const response = operation.responses[status];
  const example =
    response?.content?.["application/json"]?.examples?.[exampleKey]?.value;

  if (!example) {
    throw new Error(
      `Missing OpenAPI example at ${String(method).toUpperCase()} ${String(path)} → ${status} "${exampleKey}"`,
    );
  }

  return typeof example === "string" ? JSON.parse(example) : example;
}
