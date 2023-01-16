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
    createFood () {
      const foodXLocation = Math.floor(Math.random() * 1920) + 1
      const foodYLocation = Math.floor(Math.random() * 1080) + 1
      const food = this.physics.add.sprite(foodXLocation, foodYLocation, 'food')
      this.foodGroup.add(food)
    }
    constructor() {
      super({ key: "gameScene" })

      this.background = null
      this.darcy = null
      this.score = 0
      this.scoreText = null
      this.scoreTextStyle = { font: "65px Arial", fill: "#ffffff", align: "center" }
      }
  
    init(data) {
      this.cameras.main.setBackgroundColor("#ffffff")
    }
  
    preload() {
      console.log("Game Scene")

      //images
      this.load.image("earth", "./assets/earth.jpg")
      this.load.image("darcy", "./assets/darcy.jpg")
      this.load.image("food", "./assets/notSally.png")

      this.load.audio("nom", "./assets/darcynom.mp3")
    }
  
    create(data) {
      this.background = this.add.image(0, 0, "eath").setScale(5.0)
      this.background.setOrigin(0, 0)

      this.darcy = this.physics.add.sprite(1920 / 2, 1080 - 100, "darcy")
      .setScale(0.25)

      this.foodGroup = this.add.group()
      .setScale(0.25)
      this.createFood()
      

      this.scoreText = this.add.text(10, 10, "Score: " + this.score.toString(), this.scoreTextStyle)

      this.physics.add.collider(this.darcy, this.foodGroup, function (darcyCollide, foodCollide) {
        foodCollide.destroy()
        this.score = this.score + 1
        this.scoreText.setText("Score: " + this.score.toString())
        this.createFood ()
        this.sound.play("nom")
      }.bind(this))
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