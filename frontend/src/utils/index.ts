import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

export const isFetchBaseQueryError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
): error is FetchBaseQueryError => "status" in error;
