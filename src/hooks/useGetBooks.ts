import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { booksAPI } from "../services/api";

interface VolumeInfo {
    title: string;
    authors: string[];
    description: string;
    canonicalVolumeLink: string;
    imageLinks: {
        smallThumbnail: string;
    };
    // add other fields as needed
}

interface Book {
    id: string;
    volumeInfo: VolumeInfo;
}

interface BooksResponse {
    kind: string;
    items: Book[];
}

interface MultipleBooksResponse {
    [query: string]: BooksResponse;
}

const getBooks = async ({
    queryKey,
}: {
    queryKey: string[];
}): Promise<MultipleBooksResponse> => {
    const searchTerms = queryKey[0].split(",");
    const fetchPromises = searchTerms.map((term) => {
        const isAuthorQuery = term.startsWith("inauthor:");
        const params = isAuthorQuery ? { q: term } : { q: `subject:${term}` };
        return booksAPI.get<BooksResponse>("/volumes", { params });
    });
    const results = await Promise.all(fetchPromises);

    const response: MultipleBooksResponse = {};
    searchTerms.forEach((term, index) => {
        response[term] = results[index].data;
    });

    return response;
};

export const useGetBooks = (
    searchTerms: string[] = [],
    options?: UseQueryOptions<
        MultipleBooksResponse,
        Error,
        MultipleBooksResponse,
        [string]
    >
) => {
    const queryKey: [string] = [searchTerms.join(",")];
    return useQuery(
        queryKey,
        ({ queryKey: [keys] }) => getBooks({ queryKey: keys.split(",") }),
        options
    );
};
