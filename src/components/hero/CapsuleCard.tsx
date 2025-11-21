import React from "react";

interface CapsuleCardProps {
    title: string;
    duration: string;
    tagIcon: string;
    tagLabel: string;
}

const CapsuleCard: React.FC<CapsuleCardProps> = ({
    title,
    duration,
    tagIcon,
    tagLabel,
}) => {
    return (
        <article className="w-full rounded-3xl bg-sky-50/95 shadow-2xl overflow-hidden">
            {/* Header con ícono */}
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md">
                    <span className="text-sky-500 text-2xl">▶</span>
                </div>
            </div>

            {/* Contenido */}
            <div className="px-6 pb-4">
                <h3 className="mb-2 text-base md:text-lg font-semibold text-slate-900">
                    {title}
                </h3>

                <div className="flex items-center gap-4 text-xs md:text-sm text-slate-600">
                    <span>⏱ {duration}</span>
                    <span className="flex items-center gap-1">
                        <span>{tagIcon}</span>
                        <span>{tagLabel}</span>
                    </span>
                </div>
            </div>
        </article>
    );
};

export default CapsuleCard;
