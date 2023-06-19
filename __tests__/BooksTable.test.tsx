import { render, screen } from "@/utils/utils";
import "@testing-library/jest-dom";
import { test, expect } from "vitest";
import { BooksTable } from "@/components";

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

describe("BooksTable", () => {
    const mockBooks = [
        {
            id: "1",
            volumeInfo: {
                title: "Test Book 1",
                authors: ["Author 1"],
                description: "Test Description 1",
                canonicalVolumeLink: "http://example.com/book1",
            },
        },
        {
            id: "2",
            volumeInfo: {
                title: "Test Book 2",
                authors: ["Author 2"],
                description: "Test Description 2",
                canonicalVolumeLink: "http://example.com/book2",
            },
        },
    ];

    test("renders books correctly", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={["/books/fiction"]}>
                    <BreadcrumbProvider>
                        <BooksTable books={mockBooks} />
                    </BreadcrumbProvider>
                </MemoryRouter>
            </QueryClientProvider>
        );
        expect(screen.getByText(/Test Book 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Author 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Test Book 2/i)).toBeInTheDocument();
        expect(screen.getByText(/Author 2/i)).toBeInTheDocument();
    });
});
