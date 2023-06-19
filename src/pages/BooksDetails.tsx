import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetBooks } from "../hooks/useGetBooks";
import { BooksTable } from "@/components";
import { Preloader } from "@/components";

type BookParams = {
    author: string;
};

export const BooksDetails: FC = () => {
    const { author } = useParams<BookParams>();

    if (!author) {
        return <div>author not found</div>;
    }

    const { data, isLoading, isError } = useGetBooks([author]);

    if (isLoading) {
        return <Preloader />;
    }

    if (isError || !data) {
        return <div>Error occurred while fetching books.</div>;
    }

    const books = data[author]?.items || [];

    return <BooksTable books={books} />;
};
