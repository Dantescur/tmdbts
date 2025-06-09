import spec from "../api.specs.json";
import { fromOpenApi } from "@mswjs/source/open-api";
import { OpenAPIV3 } from "openapi-types";

export const openApiHandlers = await fromOpenApi(spec as OpenAPIV3.Document);
