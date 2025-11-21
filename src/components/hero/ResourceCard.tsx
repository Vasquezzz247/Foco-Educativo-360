import React from "react";

interface ResourceCardProps {
    icon: string;
    titleLines: string[];
    description: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
    icon,
    titleLines,
    description,
}) => {
    return (
        <div className="w-full max-w-sm rounded-3xl bg-white/95 px-6 py-6 shadow-2xl flex flex-col items-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-pink-50 text-2xl">
                {icon}
            </div>

            <h3 className="mb-1 text-base md:text-lg font-semibold text-slate-900 leading-snug">
                {titleLines.map((line, idx) => (
                    <span key={idx} className="block">
                        {line}
                    </span>
                ))}
            </h3>

            <p className="text-sm md:text-[0.95rem] text-slate-500">
                {description}
            </p>
        </div>
    );
};

export default ResourceCard;
