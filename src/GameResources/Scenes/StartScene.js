import { Scene } from "phaser";

export class StartScene extends Scene {
    constructor() {
        super("StartScene");
    }

    create() {
        const X = this.scale.width / 2;
        const Y = this.scale.height / 2;

     
        const particles = this.add.particles(0, 0, 'shuriken', {
            x: { min: 0, max: this.scale.width },
            y: 0,
            lifespan: 4000,
            speedY: { min: 100, max: 250 },
            speedX: { min: -50, max: 50 },
            scale: { start: 0.2, end: 0.05 },
            quantity: 1,
            blendMode: 'ADD',
            alpha: { start: 0.6, end: 0 }
        });

        const titleText = this.add.text(X, Y - 100, 'NINJA TOWN', {
            fontSize: '64px',
            fontFamily: 'Impact, Arial Black, sans-serif',
            fill: '#e74c3c', // Ninja Red
            stroke: '#000000',
            strokeThickness: 8,
            shadow: { offsetX: 3, offsetY: 3, color: '#2c3e50', blur: 5, fill: true }
        }).setOrigin(0.5);

        // Subtitle Decor
        this.add.text(X, Y - 45, '— STEALTH SHADOWS —', {
            fontSize: '18px',
            fontFamily: 'Courier New, monospace',
            fill: '#f1c40f', // Gold Accent
            letterSpacing: 4
        }).setOrigin(0.5);

   
        const menuNinja = this.add.image(X, Y + 60, 'ninja')
            .setScale(4)
            .setAlpha(0.9);

        this.tweens.add({
            targets: menuNinja,
            y: Y + 45,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        const isMobile = this.scale.width <= 880;
        const promptString = isMobile ? '💥 TAP SCREEN TO ENTER 💥' : '⚔️ PRESS ENTER TO START ⚔️';

        const startPrompt = this.add.text(X, this.scale.height - 100, promptString, {
            fontSize: '24px',
            fontFamily: 'Arial, sans-serif',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        
        this.tweens.add({
            targets: startPrompt,
            alpha: 0.3,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Quad.easeInOut'
        });

       
        this.input.keyboard.once('keydown-ENTER', () => {
            this.transitionToGame();
        });

      
        this.input.once('pointerdown', () => {
            this.transitionToGame();
        });
    }

    transitionToGame() {
        this.cameras.main.fade(500, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start("SinglePlayerGameField");
        });
    }
}
