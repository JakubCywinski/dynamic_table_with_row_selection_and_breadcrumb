/// <reference types="vitest/globals" />
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import { server } from "./server";

beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    server.close();
});
