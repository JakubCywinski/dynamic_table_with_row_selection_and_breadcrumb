import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetBooks } from "../hooks/useGetBooks";
import { BooksTable, Preloader } from "@/components";

type BookParams = {
    category: string;
};

export const Books: FC = () => {
    const { category } = useParams<BookParams>();

    if (!category) {
        return <div>Category not found</div>;
    }

    const { data, isLoading, isError } = useGetBooks([category]);

    if (isLoading) {
        return <Preloader />;
    }

    if (isError || !data) {
        return <div>Error occurred while fetching books.</div>;
    }

    const books = data[category]?.items || [];

    return <BooksTable books={books} />;
};
