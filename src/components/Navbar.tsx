import React from "react";
import logo from "../assets/logo.webp";

const Navbar: React.FC = () => {
    return (
        <header
            style={{
                width: "100%",
                padding: "12px 48px",
                background: "rgba(88, 80, 78, 0.25)",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxSizing: "border-box",
                fontFamily:
                    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            }}
        >
            {/* IZQUIERDA: SOLO EL LOGO */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <img
                    src={logo}
                    alt="Foco Educativo 360"
                    style={{
                        height: "58px",
                        width: "auto",
                        display: "block",
                        border: "none",
                        borderRadius: "0px",
                        padding: "0px",
                        background: "transparent",
                    }}
                />
            </div>

            {/* DERECHA: Links + botón */}
            <nav
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "32px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "32px",
                    }}
                >
                    <a
                        href="#buscar"
                        style={{
                            textDecoration: "none",
                            color: "#60a5fa",
                            fontSize: "0.95rem",
                            fontWeight: 500,
                        }}
                    >
                        Buscar
                    </a>

                    <a
                        href="#docentes"
                        style={{
                            textDecoration: "none",
                            color: "#60a5fa",
                            fontSize: "0.95rem",
                            fontWeight: 500,
                        }}
                    >
                        Docentes
                    </a>

                    <a
                        href="#estudiantes"
                        style={{
                            textDecoration: "none",
                            color: "#60a5fa",
                            fontSize: "0.95rem",
                            fontWeight: 500,
                        }}
                    >
                        Estudiantes
                    </a>

                    <a
                        href="#recursos"
                        style={{
                            textDecoration: "none",
                            color: "#60a5fa",
                            fontSize: "0.95rem",
                            fontWeight: 500,
                        }}
                    >
                        Recursos
                    </a>

                    <a
                        href="#capsulas"
                        style={{
                            textDecoration: "none",
                            color: "#60a5fa",
                            fontSize: "0.95rem",
                            fontWeight: 500,
                        }}
                    >
                        Cápsulas pedagógicas
                    </a>
                </div>

                <button
                    style={{
                        border: "none",
                        outline: "none",
                        background: "#60a5fa",
                        color: "#ffffff",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        padding: "8px 24px",
                        borderRadius: "10px",
                        cursor: "pointer",
                    }}
                >
                    INICIAR
                </button>
            </nav>
        </header>
    );
};

export default Navbar;
