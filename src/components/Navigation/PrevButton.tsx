import React from "react";
import { useNavigate } from "react-router-dom";
import { BiArrowFromRight } from "react-icons/bi";

interface PrevButtonProps {
    setPath: (path: string[]) => void;
    path: string[];
}

export const PrevButton: React.FC<PrevButtonProps> = ({ setPath, path }) => {
    const navigate = useNavigate();

    const handlePrevClick = () => {
        if (path.length > 1) {
            // Remove the last breadcrumb and navigate to the new last breadcrumb
            const newPath = path.slice(0, -1);
            setPath(newPath);
            navigate(`books/${newPath[newPath.length - 1]}`);
        } else if (path.length === 1) {
            // If there's only one breadcrumb, navigate to the home page
            setPath([]);
            navigate("/");
        }
    };

    return (
        <button
            onClick={handlePrevClick}
            disabled={path.length === 0}
            className="transition bg-slate-400/20 p-2 rounded-md disabled:bg-slate-400/20 disabled:text-slate-400/70 disabled:cursor-not-allowed hover:text-orange-400"
        >
            <BiArrowFromRight size={20} />
        </button>
    );
};
