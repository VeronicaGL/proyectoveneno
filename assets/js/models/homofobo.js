class Homofobo {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y - FLOOR_POSITION;
    this.width = 85;
    this.height = 130;
    this.vx = -3;
    this.life = 1;

    this.vaccines = [];
    this.animationTick = 0;

    this.image = new Image();
    this.image.src = "/assets/images/characters/homofobo/movement.png";
    this.image.verticalFrames = 1;
    this.image.verticalFrameIndex = 0;
    this.image.horizontalFrames = 2;
    this.image.horizontalFrameIndex = 0;
    this.image.onload = () => {
      this.image.isReady = true;
      this.image.frameWidth = Math.floor(this.image.width / this.image.horizontalFrames);
      this.image.frameHeight = Math.floor(this.image.height / this.image.verticalFrames);
    }
  }
    
  move() {
    this.x += this.vx;

    this.vaccines.forEach((vaccine) => {
      vaccine.move();
    });

  }

  collisionVaccinePlayer(player) {
    return this.vaccines.some((vaccine) => {
      const colX = vaccine.x + vaccine.width -25 >= player.x && vaccine.x < player.x + player.width;
      const colY = vaccine.y + vaccine.height -10 >= player.y && vaccine.y < player.y + player.height;

      if (colX && colY) {
        vaccine.hasImpact();
      }

      return colX && colY;
    })

}
  
  shoot() {
    const newVaccine = new Vaccine(this.ctx, this.x + this.width, this.y + this.height / 2);
    this.vaccines.push(newVaccine);
  }

  isShooting() {
    return this.vaccine.length > 0
  }

  clearVaccines() {
    this.vaccines = this.vaccines.filter(vaccine => vaccine.isVisible() && !vaccine.impact)
  }
 

  draw() {
    if (this.image.isReady) {
      this.ctx.drawImage(
        this.image,
        this.image.horizontalFrameIndex * this.image.frameWidth,
        this.image.verticalFrameIndex * this.image.frameHeight,
        this.image.frameWidth,
        this.image.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    this.animate();
    this.vaccines.forEach((vaccine) => {
      vaccine.draw();
    });
  }

  loseLife() {
    this.life -= 1;
  }

  isAlive() {
    return this.life > 0;
  }

  animate() {
    this.animationTick++;

    if (this.animationTick > 30) {
      this.animationTick = 0;
      this.image.horizontalFrameIndex++;

      if (this.image.horizontalFrameIndex > this.image.horizontalFrames - 1) {
        this.image.horizontalFrameIndex = 0;
      }
    }

    this.vaccines.forEach((vaccine) => {
      vaccine.move();
    });
  }

  isVisible() {
    return this.x + this.width > 0;
  }
}