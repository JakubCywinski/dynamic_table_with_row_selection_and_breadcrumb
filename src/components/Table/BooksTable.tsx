import { FC, useState } from "react";
import { BookDetail } from "@/components";
import { useNavigate } from "react-router-dom";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";

interface Book {
    id: string;
    volumeInfo: {
        title: string;
        authors: string[];
        description: string;
        canonicalVolumeLink: string;
    };
}

interface BooksTableProps {
    books: Book[];
}

export const BooksTable: FC<BooksTableProps> = ({ books }) => {
    const { path, setPath } = useBreadcrumb();
    const [, setSelectedBook] = useState<Book | null>(null);
    const navigate = useNavigate();

    const handleRowClick = (book: Book) => {
        setSelectedBook(book);
        setPath([...path, book.volumeInfo.authors[0]]);
        navigate(`/books/${book.volumeInfo.authors[0]}`);
    };

    return (
        <div className="mb-20">
            <table className="table-fixed w-full">
                <thead className="bg-slate-300/30">
                    {path.length < 2 ? (
                        <tr>
                            <th>Title</th>
                            <th>Authors</th>
                        </tr>
                    ) : (
                        <tr>
                            <th>Other books by {path[1]}</th>
                            <th>Informations about book</th>
                        </tr>
                    )}
                </thead>

                {path.length < 2 ? (
                    <tbody className="table-fixed w-full">
                        {books.map((book, idx) => (
                            <tr
                                key={book.id}
                                className="w-full transition cursor-pointer hover:bg-slate-400/50 hover:font-bold p-4 border-b-2 border-slate-400/50"
                                onClick={() => handleRowClick(book)}
                            >
                                <td className="py-4 px-8 ">
                                    {idx + 1}. {book.volumeInfo.title}
                                </td>
                                <td className="py-4 px-8 border-l-2 border-slate-400/20">
                                    {book.volumeInfo.authors
                                        ? book.volumeInfo.authors.join(", ")
                                        : "No authors listed"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <BookDetail author={path[1]} />
                )}
            </table>
        </div>
    );
};
