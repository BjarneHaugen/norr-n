'use client';

import { useState } from 'react';
import Card from "./components/card";
import RandomCard from "./components/randomCard";

export default function Home() {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  return (
    <div className="">
      <main className="">
        <Card revealed={revealed} setRevealed={setRevealed} />

        <div id="newCard">
          <div id="newCardLine"></div>
          <h2> Dra guden til riktig plass</h2>
          <div id="newCardContent">
            <RandomCard revealed={revealed} />
          </div>
        </div>
      </main>
    </div>
  );
}
