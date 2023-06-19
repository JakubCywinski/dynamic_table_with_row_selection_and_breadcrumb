import { render, screen, fireEvent } from "@/utils/utils";
import "@testing-library/jest-dom";
import { test, expect } from "vitest";
import { Breadcrumb } from "@/components";

import { MemoryRouter } from "react-router-dom";
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

describe("Breadcrumb", () => {
    test("renders Breadcrumb component", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={["/books/fiction"]}>
                    <BreadcrumbProvider>
                        <Breadcrumb />
                    </BreadcrumbProvider>
                </MemoryRouter>
            </QueryClientProvider>
        );
        expect(screen.getByText(/Home/i)).toBeInTheDocument();
    });

    test("navigates to home on click", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={["/books/fiction"]}>
                    <BreadcrumbProvider>
                        <Breadcrumb />
                    </BreadcrumbProvider>
                </MemoryRouter>
            </QueryClientProvider>
        );
        fireEvent.click(screen.getByText(/Home/i));
        expect(window.location.pathname).toBe("/");
    });
});
