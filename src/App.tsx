import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components";
import { Home, Books, BooksDetails } from "@/pages";

export const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books/:category" element={<Books />} />
                <Route path="/books/:author" element={<BooksDetails />} />
            </Routes>
        </Layout>
    );
};
