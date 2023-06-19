import { Header, Footer } from "@/components";

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
};
