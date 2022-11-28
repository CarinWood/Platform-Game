import Phaser from 'phaser';

class Hero extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
    super(scene, x, y, 'hero-run-sheet', 0);


    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setCollideWorldBounds(true);
    this.body.setSize(12,40);
    this.body.setOffset(12, 23); 
    this.gameOver = false
    

    this.body.setMaxVelocity(350, 400);
    this.body.setDrag(750, 0);

    this.keys = scene.cursors;

    }

    kill() {
        this.anims.play('hero-dead')
        this.gameOver = true
        this.body.setVelocityY(-400);

    }


    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if(this.gameOver) {
            return;
        }
       

        if(this.keys.left.isDown) {
            this.anims.play('hero-running', true);
            this.body.setAccelerationX(-1000)
            this.setFlipX(true);
            this.body.offset.x = 8;
        } else if (this.keys.right.isDown) {
            this.anims.play('hero-running', true);
            this.body.setAccelerationX(1000);
            this.setFlipX(false);
            this.body.offset.x = 12;
        } else {
            this.anims.stop('hero-running', true)
            this.anims.play('hero-idle', true);
            this.body.setAccelerationX(0);
        }

        if(this.body.onFloor()) {
            this.canDoubleJump = false;
        }

        if(this.body.velocity.y > 0) {
            this.isJumping = false;
        }

        const didPressJump = Phaser.Input.Keyboard.JustDown(this.keys.up);

        if(didPressJump) {
            if(this.body.onFloor()) {
                this.isJumping = true;
                this.canDoubleJump = true
                this.body.setVelocityY(-400);
            } else if (this.canDoubleJump) {
                this.canDoubleJump = false;
                this.body.setVelocityY(-300);
            }
            
        } 

        if(!this.keys.up.isDown && this.body.velocity.y < -150 && this.isJumping) {
            this.body.setVelocityY(-150);
        }
        
    }
}

export default Hero;