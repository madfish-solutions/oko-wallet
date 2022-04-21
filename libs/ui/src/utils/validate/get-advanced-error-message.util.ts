import { FieldErrors } from "react-hook-form";

export function getAdvancedErrorMessage<T>(
  formError: FieldErrors<T> | undefined
): string | undefined {
  if (formError) {
    // @ts-ignore
    return formError.message;
  }
  return undefined;
}
