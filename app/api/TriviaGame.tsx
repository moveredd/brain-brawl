'use client';

import React, { useState, useCallback } from 'react';
import Questions from '@/app/api/Questions';
import NewGame from '@/app/api/NewGame';

export default function TriviaGame() {
  const [reloadFlag, setReloadFlag] = useState(0);
  const [gameStarted, setGameStarted]=useState(false)

  const handleNewGame = useCallback(() => {
    setReloadFlag(flag => flag + 1);
    setGameStarted(true)
  }, []);

  return (
    <div>
      <NewGame/>
    </div>
  );
}
