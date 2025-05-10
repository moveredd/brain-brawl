'use client';

import React, { useState, useCallback } from 'react';
import Questions from '@/app/api/Questions';
import NewGame from '@/app/api/NewGame';

export default function TriviaGame() {
  const [reloadFlag, setReloadFlag] = useState(0);

  const handleNewGame = useCallback(() => {
    setReloadFlag(flag => flag + 1);
  }, []);

  return (
    <div>
      <NewGame onStartNewGame={handleNewGame} />
      <Questions reloadFlag={reloadFlag} />
    </div>
  );
}
