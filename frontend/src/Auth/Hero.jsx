import React, { useState, useEffect } from 'react';

export default function Hero() {
    const [text, setText] = useState('');
    const [showCursor, setShowCursor] = useState(true); // Estado para alternar la visibilidad del cursor
    const phrases = ["Welcome back! Please enter your details"];
    let index = 0;
    let isDeleting = false;

    useEffect(() => {
        const typeWriter = () => {
            const currentPhrase = phrases[index];
            let speed = 2000; // Velocidad de escritura por defecto

            if (isDeleting) {
                setText((prevText) => prevText.substring(0, prevText.length - 1));
                speed = 2000; // Velocidad de borrado
            } else {
                setText((prevText) => {
                    if (prevText === currentPhrase) {
                        isDeleting = true;
                        return prevText;
                    }
                    return currentPhrase.substring(0, prevText.length + 1);
                });
                speed = 2000; // Velocidad de escritura
            }
            setTimeout(typeWriter, speed); // Velocidad de escritura/borrado
        };

        setTimeout(typeWriter, 2000); // Tiempo de espera inicial antes de empezar a escribir el texto

        // Alterna la visibilidad del cursor cada medio segundo
        const toggleCursor = () => {
            setShowCursor((prev) => !prev);
            setTimeout(toggleCursor, 50);
        };

        toggleCursor(); // Inicia el efecto del cursor
    }, [text]); // Se vuelve a ejecutar cuando cambia el estado 'text'

    const height = "h-[calc(100vh-8rem)]";
    return (
        <section className={`mt-4 flex flex-col items-center justify-center px-4 text-white md:mx-10 ${height}`} id="inicio">
            <video autoPlay loop muted className="absolute h-full w-full rounded-3xl object-cover">
                <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4"/>
                Tu navegador no soporta el elemento video
            </video>
            <div className="flex flex-col gap-3"/>
            <h1 className="text-center text 4x1 font-bold mix-blend-difference md:text-8xl">WELCOME</h1>
            <p className="text-center text-base font-medium mix-blend-difference md:text-xl">
                {text}
                {showCursor && <span className="animate-blink">|</span>} {/* Muestra el cursor intermitente */}
            </p>
        </section>
    );
}
