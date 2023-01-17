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
      .setScale(0.10)
      this.foodGroup.add(food)
    }
    createHazard () {
      const hazardXLocation = Math.floor(Math.random() * 1920) + 1
      const hazardYLocation = Math.floor(Math.random() * 1080) + 1
      const hazard = this.physics.add.sprite(hazardXLocation, hazardYLocation, 'hazard')
      .setScale(0.01)
      this.hazardGroup.add(hazard)
    }
    constructor() {
      super({ key: "gameScene" })

      this.background = null
      this.darcy = null
      this.score = 0
      this.scoreText = null
      this.scoreTextStyle = { font: "65px Arial", fill: "#ffffff", align: "center" }
      this.gameOverTextStyle = { font: "65px Arial", fill: "#ff0000", align: "center" }
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
      this.load.image("hazard", "./assets/hazard.png")
      this.load.image("end", "./assets/end.jpg")

      this.load.audio("nom", "./assets/darcynom.mp3")
    }
  
    create(data) {
      this.background = this.add.image(0, 0, "earth").setScale(5.0)
      this.background.setOrigin(0, 0)

      this.darcy = this.physics.add.sprite(1920 / 2, 1080 - 100, "darcy")
      .setScale(0.25)

      this.foodGroup = this.add.group()
      this.createFood()
      
      this.hazardGroup = this.add.group()
      this.createHazard()

      this.scoreText = this.add.text(10, 10, "Score: " + this.score.toString(), this.scoreTextStyle)

      this.physics.add.collider(this.darcy, this.foodGroup, function (darcyCollide, foodCollide) {
        foodCollide.destroy()
        this.createHazard ()
        this.score = this.score + 1
        this.scoreText.setText("Score: " + this.score.toString())
        this.createFood ()
        this.sound.play("nom")
      }.bind(this))

      this.physics.add.collider(this.darcy, this.hazardGroup, function (darcyCollide, hazardCollide) {
        this.physics.pause()
        hazardCollide.destroy()
        darcyCollide.destroy()
        this.add.image(0, 0, "end").setScale(1.0)
        this.gameOverText = this.add.text(1920 / 2, 1080 / 2, "Game Over!\nClick to play again.", this.gameOverTextStyle).setOrigin(0.5)
        this.gameOverText.setInteractive({ useHandCursor: true })
        this.gameOverText.on("pointerdown", () => this.scene.start("gameScene"))
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