import { useEffect, useRef, useState } from 'react'
import Phaser from 'phaser';
import './App.css'
import config from './GameResources/GAMe';
import GamePlay from './GameResources/GamePLay';




function App() {
    const gameRef = useRef(null);
     useEffect(() => {
    const game = new Phaser.Game(config);
    gameRef.current=game

    return () => {
      game.destroy(true);
        gameRef.current = null;
    };
  }, []);

  return (
   <div >
  
      
    </div>
  )
}

export default App
