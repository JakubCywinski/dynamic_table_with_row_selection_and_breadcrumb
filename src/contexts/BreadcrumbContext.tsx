import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

interface BreadcrumbContextValue {
    path: string[];
    setPath: (path: string[]) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextValue | undefined>(
    undefined
);

interface BreadcrumbProviderProps {
    children: ReactNode;
}

export const BreadcrumbProvider: React.FC<BreadcrumbProviderProps> = ({
    children,
}) => {
    const [path, setPath] = useState<string[]>(() => {
        const savedPath = localStorage.getItem("breadcrumbPath");
        return savedPath ? JSON.parse(savedPath) : [];
    });

    useEffect(() => {
        localStorage.setItem("breadcrumbPath", JSON.stringify(path));
    }, [path]);

    return (
        <BreadcrumbContext.Provider value={{ path, setPath }}>
            {children}
        </BreadcrumbContext.Provider>
    );
};

export const useBreadcrumb = (): BreadcrumbContextValue => {
    const context = useContext(BreadcrumbContext);
    if (!context) {
        throw new Error(
            "useBreadcrumb must be used within a BreadcrumbProvider"
        );
    }
    return context;
};
