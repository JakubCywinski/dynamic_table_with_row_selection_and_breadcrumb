export const Preloader = () => {
    return (
        <div className="h-screen w-screen flex-col flex items-center justify-center relative">
            <div className="pre-squares">
                <span className="pre-square"></span>
                <span className="pre-square"></span>
                <span className="pre-square"></span>
                <span className="pre-square"></span>
            </div>
            <div className="leading-4 mt-10">Loading...</div>
        </div>
    );
};
