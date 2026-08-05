import Phaser from "phaser";
export const  takeDamage=(scene,amount)=> {
  scene.health = Phaser.Math.Clamp(scene.health - amount, 0, scene.maxHealth);
  const pct = scene.health / scene.maxHealth;

  scene.healthBarFg.width = scene.barWidth * pct;

  // color shifts green -> yellow -> red as health drops
  if (pct > 0.5) scene.healthBarFg.fillColor = 0x00ff00;
  else if (pct > 0.25) scene.healthBarFg.fillColor = 0xffff00;
  else scene.healthBarFg.fillColor = 0xff0000;

  if (scene.health <= 0) scene.destroy();
}