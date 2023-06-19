import { FC } from "react";
import { useGetBooks } from "@/hooks/useGetBooks";

interface BookDetailProps {
    author: string;
}

export const BookDetail: FC<BookDetailProps> = ({ author }) => {
    const { data, isLoading, isError } = useGetBooks([`inauthor:${author}`]);

    if (isLoading) {
        return (
            <tbody>
                <tr aria-colspan={3}>
                    <td>Loading books...</td>
                </tr>
            </tbody>
        );
    }

    if (isError || !data) {
        return (
            <tbody>
                <tr aria-colspan={3}>
                    <td>Error occurred while fetching books.</td>
                </tr>
            </tbody>
        );
    }

    const books = data[`inauthor:${author}`]?.items || [];

    return (
        <tbody className="table-fixed w-full">
            {books.map((book, idx) => {
                const otherAuthors = book.volumeInfo.authors?.filter(
                    (a) => a !== author
                );

                return (
                    <tr
                        key={book.id}
                        className="p-4 border-b-2 border-slate-400/50"
                    >
                        <td className="py-4 px-8 flex gap-4 flex-wrap">
                            {book.volumeInfo.imageLinks ? (
                                <img
                                    className="min-h-[200px] rounded-md"
                                    src={
                                        book.volumeInfo.imageLinks
                                            ?.smallThumbnail
                                    }
                                    alt={book.volumeInfo.title}
                                />
                            ) : null}
                            <span className="block">
                                <p className="font-bold text-xl max-w-md">
                                    {idx + 1}. {book.volumeInfo.title}
                                </p>
                                {otherAuthors?.length > 0 ? (
                                    <p className="text-slate-600">
                                        {otherAuthors.join(", ")}
                                    </p>
                                ) : (
                                    <p>-</p>
                                )}
                            </span>
                        </td>
                        <td className="py-4 px-8">
                            <p className="mb-4 max-w-3xl">
                                {book.volumeInfo.description}
                            </p>
                            <a
                                href={book.volumeInfo.canonicalVolumeLink}
                                target="_blank"
                                className=" truncate max-w-full text-blue-600 hover:text-blue-800 py-2 px-4 rounded-md bg-slate-400/20 hover:bg-slate-400/50 inline-block"
                            >
                                More informations
                            </a>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    );
};
