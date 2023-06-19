import { render, screen, fireEvent } from "@/utils/utils";
import "@testing-library/jest-dom";
import { test, expect, vi } from "vitest";
import { PrevButton } from "@/components";

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

describe("PrevButton", () => {
    test("renders PrevButton component", () => {
        const mockSetPath = vi.fn();
        const mockPath = ["fiction"];
        render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <BreadcrumbProvider>
                        <PrevButton setPath={mockSetPath} path={mockPath} />
                    </BreadcrumbProvider>
                </BrowserRouter>
            </QueryClientProvider>
        );
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    test("calls setPath on click", () => {
        const mockSetPath = vi.fn();
        const mockPath = ["fiction"];
        render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <BreadcrumbProvider>
                        <PrevButton setPath={mockSetPath} path={mockPath} />
                    </BreadcrumbProvider>
                </BrowserRouter>
            </QueryClientProvider>
        );
        fireEvent.click(screen.getByRole("button"));
        expect(mockSetPath).toHaveBeenCalled();
    });
});
