import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { BookDetail } from "@/components";
import { useGetBooks } from "@/hooks/useGetBooks";
import { vi } from "vitest";

vi.mock("@/hooks/useGetBooks");

const queryClient = new QueryClient();

describe("BookDetail", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    test("renders loading state", () => {
        (useGetBooks as jest.Mock).mockReturnValue({ isLoading: true });
        const author = "Homer";
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/books/${author}`]}>
                    <BookDetail author={author} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(screen.getByText(/Loading books.../i)).toBeInTheDocument();
    });

    test("renders error state", () => {
        (useGetBooks as jest.Mock).mockReturnValue({ isError: true });
        const author = "Homer";
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/books/${author}`]}>
                    <BookDetail author={author} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(
            screen.getByText(/Error occurred while fetching books./i)
        ).toBeInTheDocument();
    });

    test("renders book details correctly", () => {
        const author = "Homer";
        const bookData = {
            "inauthor:Homer": {
                kind: "books#volumes",
                items: [
                    {
                        id: "1",
                        volumeInfo: {
                            title: "Odyseja",
                            authors: ["Homer"],
                            description: "An ancient Greek epic poem...",
                            canonicalVolumeLink: "http://example.com",
                            imageLinks: {
                                smallThumbnail: "http://example.com/image.jpg",
                            },
                        },
                    },
                ],
            },
        };
        (useGetBooks as jest.Mock).mockReturnValue({
            data: bookData,
            isSuccess: true,
        });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/books/${author}`]}>
                    <BookDetail author={author} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(screen.getByText(/Odyseja/i)).toBeInTheDocument();
        expect(screen.getByText(/More information/i)).toBeInTheDocument();
        expect(
            screen.getByText(/An ancient Greek epic poem.../i)
        ).toBeInTheDocument();
    });
});
