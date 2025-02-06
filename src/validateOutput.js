import { validate } from "jtd";
import schema from "./collection-schema.jtd.json";

export function validateFormOutput(data) {
  const errors = validate(schema, data);
  if (errors.length > 0) {
    throw new Error(`Invalid form output: ${JSON.stringify(errors, null, 2)}`);
  }
  return data;
}
