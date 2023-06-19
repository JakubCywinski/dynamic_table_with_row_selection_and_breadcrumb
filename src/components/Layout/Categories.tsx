import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { Link } from "react-router-dom";

export const Categories = () => {
    const { setPath } = useBreadcrumb();

    const categories = [
        "fiction",
        "entertainment",
        "general",
        "health",
        "science",
        "sports",
        "technology",
    ];

    return (
        <div className="w-full flex justify-center mt-4">
            <div className="flex items-center justify-center p-1 flex-wrap gap-2 bg-slate-200/50 rounded-4xl">
                {categories.map((category) => (
                    <Link
                        key={category}
                        to={`/books/${category}`}
                        onClick={() => {
                            setPath([category]);
                        }}
                        className="transition-all rounded-4xl hover:bg-orange-200 cursor-pointer"
                    >
                        <p className="p-4 capitalize">{category}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};
