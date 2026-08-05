import { Scene } from "phaser";

export class Restart extends Scene {
    constructor() {
        super("Restart");
    }

    init(data) {
        this.finalscore = data.score || 0;
    }

    create() {
        let X = this.scale.width / 2;
        let Y = this.scale.height / 2;

        // 1. Render display texts centered nicely
        this.add.text(X, Y + 40, `Your score is ${this.finalscore}`, { fontSize: '24px', fill: '#fff' })
            .setOrigin(0.5);

        const promptText = this.add.text(X, Y - 20, 'Press SPACE to Restart', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5);

        // 2. Listen for PC keyboard spacebar
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start("SinglePlayerGameField");
        });

        // 3. Mobile handling: Check screen width ONCE inside create, not in update!
        if (this.scale.width <= 880) {
            // Update text to tell mobile users what to do
            promptText.setText('Tap Key to Restart');

            // Place the mobile restart image button at the bottom center
            const spaceBtn = this.add.image(X, Y + 120, "space")
                .setInteractive()
                .setScale(3);

            // Listen for the correct touch/click event ('pointerdown')
            spaceBtn.once("pointerdown", () => {
                this.scene.start("SinglePlayerGameField");
            });
        }
    }

    // Left empty completely because we handled the layout in create()
    update() { }
}
