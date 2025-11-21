import React from "react";
import { Facebook, Instagram, Youtube, Twitter, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-slate-950/95 text-slate-200 border-t border-slate-800">
            {/* Contenido principal */}
            <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-8 md:flex-row md:items-start md:justify-between">
                {/* Columna izquierda: info del cole */}
                <div className="space-y-3">
                    <div>
                        <p className="text-lg font-semibold text-white">
                            Foco Educativo 360
                        </p>
                        <p className="text-sm text-slate-400">
                            Christian School Nuevo Pacto
                        </p>
                    </div>

                    <div className="mt-2 space-y-1 text-sm text-slate-300">
                        <p>📍 Dirección del colegio</p>
                        <p>📞 Teléfono</p>
                        <p>✉ Email</p>
                    </div>
                </div>

                {/* Columna derecha: redes sociales */}
                <div className="flex flex-col items-start gap-4 md:items-end">
                    <p className="text-sm font-semibold text-slate-100">Síguenos</p>

                    <div className="flex gap-3">
                        <a
                            href="#"
                            aria-label="Facebook"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 shadow-md transition hover:bg-slate-800"
                        >
                            <Facebook className="h-4 w-4 text-blue-500" />
                        </a>
                        <a
                            href="#"
                            aria-label="Instagram"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 shadow-md transition hover:bg-slate-800"
                        >
                            <Instagram className="h-4 w-4 text-pink-500" />
                        </a>
                        <a
                            href="#"
                            aria-label="YouTube"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 shadow-md transition hover:bg-slate-800"
                        >
                            <Youtube className="h-4 w-4 text-red-500" />
                        </a>
                        <a
                            href="#"
                            aria-label="Twitter"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 shadow-md transition hover:bg-slate-800"
                        >
                            <Twitter className="h-4 w-4 text-sky-400" />
                        </a>
                        <a
                            href="#"
                            aria-label="LinkedIn"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 shadow-md transition hover:bg-slate-800"
                        >
                            <Linkedin className="h-4 w-4 text-blue-400" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Línea inferior + texto legal */}
            <div className="border-t border-slate-800/80">
                <p className="mx-auto max-w-6xl px-6 py-3 text-center text-xs text-slate-500">
                    Términos · Privacidad · Cookies — © 2025 Todos los derechos
                    reservados
                </p>
            </div>
        </footer>
    );
};

export default Footer;