import React from "react";
import TitleBanner from "./hero/TitleBanner";
import ResourceCard from "./hero/ResourceCard";
import CapsuleCard from "./hero/CapsuleCard";

const HeroContent: React.FC = () => {
    return (
        <section className="w-full flex justify-center px-4 pt-16 pb-24 text-slate-100">
            <div className="w-full max-w-6xl flex flex-col items-center">

                {/* Banner + subtítulo */}
                <div className="w-full flex flex-col items-center gap-4 mb-10">
                    <TitleBanner
                        lines={["Foco Educativo 360:", "Atención que Transforma"]}
                    />

                    <p className="max-w-2xl text-center text-lg md:text-xl bg-black/35 px-6 py-3 rounded-2xl shadow-xl">
                        Herramientas neuroeducativas para mejorar la atención en el aula
                    </p>
                </div>

                {/* Título sección recursos */}
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 drop-shadow">
                    Recursos Neuroeducativos Prácticos
                </h2>

                {/* GRID recursos */}
                <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mb-12">
                    <ResourceCard
                        icon="🧠"
                        titleLines={["Estrategias", "Atención"]}
                        description="Técnicas para captar atención"
                    />
                    <ResourceCard
                        icon="🎯"
                        titleLines={["Ejercicios", "de Foco"]}
                        description="Para mejorar concentración"
                    />
                    <ResourceCard
                        icon="⚡"
                        titleLines={["Estímulos", "Multisens."]}
                        description="Visuales, auditivos y kinestésicos"
                    />
                </div>

                {/* Botón principal */}
                <button className="mb-16 rounded-full bg-blue-400 px-10 py-3 text-lg font-bold text-white shadow-xl transition hover:bg-blue-500">
                    Explorar Todos los Recursos
                </button>

                {/* Sección cápsulas */}
                <h2 className="text-xl md:text-2xl font-bold text-center mb-6 drop-shadow">
                    Cápsulas Pedagógicas en Video
                </h2>

                {/* GRID cápsulas */}
                <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 mb-8">
                    <CapsuleCard
                        title="Técnica Pomodoro para el aula"
                        duration="5 min"
                        tagIcon="📍"
                        tagLabel="Atención"
                    />
                    <CapsuleCard
                        title="Estímulos Visuales para Captar Atención"
                        duration="8 min"
                        tagIcon="👁"
                        tagLabel="Visual"
                    />
                </div>

                {/* Botón ver más cápsulas */}
                <button className="rounded-full border border-blue-300 px-8 py-2 text-sm md:text-base font-semibold text-blue-100 bg-blue-400/10 hover:bg-blue-400/20 transition">
                    Ver más cápsulas
                </button>
            </div>
        </section>
    );
};

export default HeroContent;
