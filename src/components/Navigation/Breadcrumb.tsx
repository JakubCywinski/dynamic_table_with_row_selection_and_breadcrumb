import { FC } from "react";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { Link as RouterLink } from "react-router-dom";
import { PrevButton } from "@/components";
import { useNavigate } from "react-router-dom";

export const Breadcrumb: FC = () => {
    const { path, setPath } = useBreadcrumb();
    const navigate = useNavigate();

    return (
        <div
            aria-label="breadcrumb"
            className="flex items-center justify-center gap-4"
        >
            <PrevButton setPath={setPath} path={path} />
            <div className="flex items-center justify-center flex-wrap">
                {path[0] ? (
                    <RouterLink
                        to="/"
                        className="text-sm hover:underline"
                        onClick={() => setPath([])}
                    >
                        Home
                    </RouterLink>
                ) : (
                    <p className="font-bold">Home</p>
                )}
                {path.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-center text-sm capitalize"
                    >
                        {path[0] && <span className="font-bold mx-2">/</span>}

                        {path.length !== index + 1 ? (
                            <RouterLink
                                to={`books/${item}`}
                                className="hover:underline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPath(path.slice(0, index + 1));
                                    navigate(`books/${item}`);
                                }}
                            >
                                {item}
                            </RouterLink>
                        ) : (
                            <p className="font-bold ">{item}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
