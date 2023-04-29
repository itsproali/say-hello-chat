import "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiURL } from "../utils/config";

const baseQuery = fetchBaseQuery({ apiURL });

const apiBase = createApi({
  baseQuery,
  reducerPath: "api",
  endpoints: () => ({}),
});

export default apiBase;
