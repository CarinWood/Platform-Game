import Phaser from 'phaser';

class Hero extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
    super(scene, x, y, 'hero-run-sheet', 0);


    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setCollideWorldBounds(true);
    this.body.setSize(12,40);
    this.body.setOffset(12, 23);
    this.anims.play('hero-running');
    }
}

export default Hero;