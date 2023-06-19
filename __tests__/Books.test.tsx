import { render, screen } from "@/utils/utils";
import "@testing-library/jest-dom";
import { Books } from "@/pages";
import { it, describe, vi } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BreadcrumbProvider } from "@/contexts/BreadcrumbContext";
import { useGetBooks } from "@/hooks/useGetBooks";

vi.mock("@/hooks/useGetBooks");

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: 5 * 60 * 1000,
        },
    },
});

describe("Books", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders loading state", async () => {
        (useGetBooks as jest.Mock).mockReturnValue({ isLoading: true });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={["/books/fiction"]}>
                    <BreadcrumbProvider>
                        <Routes>
                            <Route
                                path="/books/:category"
                                element={<Books />}
                            />
                        </Routes>
                    </BreadcrumbProvider>
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });

    it("renders error state", () => {
        (useGetBooks as jest.Mock).mockReturnValue({ isError: true });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={["/books/fiction"]}>
                    <BreadcrumbProvider>
                        <Routes>
                            <Route
                                path="/books/:category"
                                element={<Books />}
                            />
                        </Routes>
                    </BreadcrumbProvider>
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
});
