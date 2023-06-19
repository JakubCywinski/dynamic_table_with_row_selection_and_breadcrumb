import { Breadcrumb } from "@/components";

export const Header = () => {
    return (
        <header className="flex items-center px-8 py-4">
            <div className="flex items-center">
                <div className="font-bold text-xl text-orange-400">
                    <span>DT:RS:B</span> Library
                </div>
                <div className="ml-8">
                    <Breadcrumb />
                </div>
            </div>
        </header>
    );
};
