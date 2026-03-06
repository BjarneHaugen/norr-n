'use client';

import React from "react";
import gods from "../gods.json";

interface CardProps {
    revealed: Record<string, boolean>;
    setRevealed: (state: Record<string, boolean>) => void;
}

const Card = ({ revealed, setRevealed }: CardProps) => {

    function dropHandler(event: React.DragEvent<HTMLElement>) {
        event.preventDefault();
        const godData = event.dataTransfer.getData("application/json");
        const god = JSON.parse(godData);
        const targetId = event.currentTarget.id;
        console.log(`Dropped god ${god.id} on target ${targetId}`);

        const targetGod = gods.find(g => String(g.id) === targetId);
        if (targetGod && targetGod.id === god.id) {
            setRevealed({ ...revealed, [targetId]: true });
        }
    }

    return (
        <div>
            {gods.map((god) => (
                <article key={god.id} id={String(god.id)} className="card" onDrop={dropHandler} onDragOver={(e) => e.preventDefault()}>
                    {revealed[String(god.id)] && (
                        <>
                            <h3>{god.name}</h3>
                            <img src={god.image} alt={god.name} />
                            <p>{god.description}</p>

                            {god.relatives?.length > 0 && (
                                <div>
                                    {god.relatives.map((rel: any) => {
                                        const target = gods.find((g: any) => String(g.id) === String(rel.id));
                                        return (
                                            <a
                                                key={rel.id}
                                                href={`#${rel.id}`}
                                                title={target ? `View ${target.name}` : `View ${rel.id}`}
                                                aria-label={target ? `View ${target.name}` : `View related card`}
                                            >
                                            </a>
                                        );
                                    })}
                                </div>
                            )}

                            <a href={god.link} target="_blank" rel="noopener noreferrer">
                                Les mer
                            </a>
                        </>
                    )}
                </article>
            ))}
        </div>
    );
};

export default Card;