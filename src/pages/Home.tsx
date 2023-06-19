import { Categories } from "@/components";

export const Home = () => {
    return (
        <section className="w-full h-[60vh] px-8 flex flex-col justify-center">
            <div className="text-center flex items-center flex-col">
                <h1 className="text-4xl font-bold max-w-xl">
                    Dynamic Table with Row Selection and Breadcrumb
                </h1>
                <p className=" mt-4">Try it now by choosing book category!</p>
            </div>
            <div>
                <Categories />
            </div>
        </section>
    );
};
