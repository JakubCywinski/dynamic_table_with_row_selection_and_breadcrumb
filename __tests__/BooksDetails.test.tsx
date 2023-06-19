import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { BooksDetails } from "@/pages";
import { useGetBooks } from "@/hooks/useGetBooks";
import { vi } from "vitest";

vi.mock("@/hooks/useGetBooks");
const queryClient = new QueryClient();

describe("BooksDetails", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    test("renders loading state", () => {
        (useGetBooks as jest.Mock).mockReturnValue({ isLoading: true });
        const author = "Homer";
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/books/${author}`]}>
                    <Routes>
                        <Route
                            path="/books/:author"
                            element={<BooksDetails />}
                        />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test("renders error state", () => {
        (useGetBooks as jest.Mock).mockReturnValue({ isError: true });
        const author = "Homer";
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/books/${author}`]}>
                    <Routes>
                        <Route
                            path="/books/:author"
                            element={<BooksDetails />}
                        />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );
        expect(
            screen.getByText(/Error occurred while fetching books./i)
        ).toBeInTheDocument();
    });
});
