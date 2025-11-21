import React from "react";

interface TitleBannerProps {
    lines: string[];
}

const TitleBanner: React.FC<TitleBannerProps> = ({ lines }) => {
    return (
        <div className="mx-auto max-w-3xl rounded-3xl bg-black/45 px-10 py-6 shadow-2xl backdrop-blur-sm">
            <h1 className="text-center text-3xl md:text-4xl font-semibold text-white leading-tight">
                {lines.map((line, idx) => (
                    <span key={idx} className="block">
                        {line}
                    </span>
                ))}
            </h1>
        </div>
    );
};

export default TitleBanner;
