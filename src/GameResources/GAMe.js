 import Phaser from 'phaser';
import { GameField } from './Scenes/GameField';
import { Prelaod } from './Scenes/Preload';
import { SinglePlayerGameField } from './Scenes/SinglePLayerGameField';
import { Restart } from './Scenes/Restart';
import { StartScene } from './Scenes/StartScene';

 const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }, input: {
    activePointers: 3 // 1 default + however many extra simultaneous touches you need
  },
        scene: [Prelaod,StartScene,SinglePlayerGameField,Restart,GameField],
        
        
        physics: {
            default: 'arcade',
            arcade: {
            debug:true,
          
               
            }
        }
    };
    //check it

    export default config;
