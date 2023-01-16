/* global Phaser*/

// Copyright (c) 2022 Timothy Manwell All rights reserved
//
//Created by: Timothy Manwell
//Created on: Jan 2023
//This is the Game Scene

/**
 * This class is the game scene
 */
class GameScene extends Phaser.Scene {
    /**
     * This method is the constructor
     */
    constructor() {
      super({ key: "gameScene" })

      this.background = null
      this.darcy = null
      }
  
    init(data) {
      this.cameras.main.setBackgroundColor("#ffffff")
    }
  
    preload() {
      console.log("Game Scene")

      //images
      this.load.image("tableCloth", "./assets/tableCloth.jpg")
      this.load.image("darcy", "./assets/darcy.jpg")
    }
  
    create(data) {
      this.background = this.add.image(0, 0, "tableCloth").setScale(3.0)
      this.background.setOrigin(0, 0)

      this.darcy = this.physics.add.sprite(1920 / 2, 1080 - 100, "darcy")
      .setScale(0.14)
    }
  
    update(time, delta) {
      const keyLeftObj = this.input.keyboard.addKey("LEFT")
      const keyRightObj = this.input.keyboard.addKey("RIGHT")
      const keyUpObj = this.input.keyboard.addKey("UP")
      const keyDownObj = this.input.keyboard.addKey("DOWN")
  
      
      if (keyLeftObj.isDown === true) {
        this.darcy.x -= 15
        if (this.darcy.x < 0) {
          this.darcy.x = 0
        }
      }
      if (keyRightObj.isDown === true) {
        this.darcy.x += 15
        if (this.darcy.x > 1920) {
          this.darcy.x = 1920
        }
      }
      if (keyUpObj.isDown === true) {
        this.darcy.y -= 15
        if (this.darcy.y < 0) {
          this.darcy.y = 0
        }
      }
      if (keyDownObj.isDown === true) {
        this.darcy.y += 15
        if (this.darcy.y > 1080) {
          this.darcy.y = 1080
        }
      }
    }
}
export default GameScene