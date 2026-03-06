'use client';

import React, { useState, useMemo } from "react";
import gods from "../gods.json";

interface RandomCardProps {
    revealed: Record<string, boolean>;
}

const RandomCard = ({ revealed }: RandomCardProps) => {
    const availableGodsPool = useMemo(() => gods.filter(g => !revealed[String(g.id)]), [revealed]);
    const [currentGod, setCurrentGod] = useState(() => {
        return availableGodsPool.length > 0 ? availableGodsPool[Math.floor(Math.random() * availableGodsPool.length)] : gods[0];
    });

    const randomize = () => {
        let remaining = availableGodsPool.filter(g => g.id !== currentGod.id);
        
        if (remaining.length === 0) {
            remaining = availableGodsPool.length > 0 ? [...availableGodsPool] : [...gods];
        }
        
        if (remaining.length > 0) {
            const randomIndex = Math.floor(Math.random() * remaining.length);
            const newGod = remaining[randomIndex];
            setCurrentGod(newGod);
        }
    };

    function dragStartHandler(event: React.DragEvent<HTMLDivElement>) {
        event.dataTransfer.setData("application/json", JSON.stringify(currentGod));
    }


    return (
        <>
            <article key={currentGod.id} id={String(currentGod.id)} className="card" draggable onDragStart={dragStartHandler}>
                <img src={currentGod.image} alt={currentGod.name} draggable={false} />
                <h3>{currentGod.name}</h3>
                <p>{currentGod.description}</p>
            </article>
            <div>
                <button onClick={randomize}>Ny gud</button>
                <p>guder igjen: {availableGodsPool.length} / {gods.length}</p>
            </div>
        </>
    );
};

export default RandomCard;