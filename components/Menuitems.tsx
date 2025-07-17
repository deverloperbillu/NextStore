'use client';
import { useState, useEffect } from 'react';
import Startermenuproducts from './productItems/Startermenuproducts';


export default function ScrollSpyMenu() {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll("section");
            let current = "";
            
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute("id") ?? "";
                }
            });
            
            setActiveSection(current);
        };
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav className="sticky top-0 left-0 w-full bg-gray-800 text-white py-3 text-center z-50">
                <a href="#starters" className={activeSection === "starters" ? "text-orange-400 px-4" : "px-4"}>Starters</a>
                <a href="#salads" className={activeSection === "salads" ? "text-orange-400 px-4" : "px-4"}>Salads</a>
                <a href="#burgers" className={activeSection === "burgers" ? "text-orange-400 px-4" : "px-4"}>Burgers</a>
                <a href="#steak_beaf" className={activeSection === "steak_beaf" ? "text-orange-400 px-4" : "px-4"}>Steaks by Kababjees (Beef)</a>
                <a href="#steak_chicken" className={activeSection === "steak_chicken" ? "text-orange-400 px-4" : "px-4"}>Steaks by Kababjees (Chicken)</a>
                <a href="#chinese" className={activeSection === "chinese" ? "text-orange-400 px-4" : "px-4"}>Chinese</a>
                <a href="#barbecue" className={activeSection === "barbecue" ? "text-orange-400 px-4" : "px-4"}>Barbecue</a>
            </nav>

            <section id="starters">
                <Startermenuproducts />
            </section>
            {/* <section id="salads">
                
            </section>
            <section id="burgers">
                
            </section> */}
            {/* <section id="steak_beaf">Contact Section</section> */}
            {/* <section id="steak_chicken">Contact Section</section> */}
            {/* <section id="chinese">Contact Section</section> */}
            {/* <section id="barbecue">Contact Section</section> */}
        </>
    );
}
