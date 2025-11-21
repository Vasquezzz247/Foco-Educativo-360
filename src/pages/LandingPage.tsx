import React from "react";
import Navbar from "../components/Navbar";
import HeroContent from "../components/HeroContent";
import Footer from "../components/layout/Footer";
import backImage from "../assets/backimage3.webp";

const LandingPage: React.FC = () => {
    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                backgroundImage: `url(${backImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Navbar />
            <HeroContent />
            <Footer />
        </div>
    );
};

export default LandingPage;