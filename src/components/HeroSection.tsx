import React from "react";
import backImage from "../assets/backimage3.webp";

const HeroSection: React.FC = () => {
    return (
        <section
            style={{
                width: "100%",
                height: "100vh",
                backgroundImage: `url(${backImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "relative",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.15)",
                    backdropFilter: "blur(1px)",
                }}
            ></div>
            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                }}
            >
            </div>
        </section>
    );
};

export default HeroSection;
