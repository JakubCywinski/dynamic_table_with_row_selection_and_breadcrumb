import { render, screen, fireEvent } from "@/utils/utils";
import "@testing-library/jest-dom";
import { test, expect } from "vitest";
import { Categories } from "@/components";

import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BreadcrumbProvider } from "@/contexts/BreadcrumbContext";

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

describe("Categories", () => {
    test("renders Categories component", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <BreadcrumbProvider>
                        <Categories />
                    </BreadcrumbProvider>
                </BrowserRouter>
            </QueryClientProvider>
        );
        expect(screen.getByText(/fiction/i)).toBeInTheDocument();
        expect(screen.getByText(/entertainment/i)).toBeInTheDocument();
        expect(screen.getByText(/general/i)).toBeInTheDocument();
    });

    test("navigates to category on click", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <BreadcrumbProvider>
                        <Categories />
                    </BreadcrumbProvider>
                </BrowserRouter>
            </QueryClientProvider>
        );
        fireEvent.click(screen.getByText(/fiction/i));
        expect(window.location.pathname).toBe("/books/fiction");
    });
});
