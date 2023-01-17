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
    
    createTimer () {
      var me = this
      me.startTime = new Date()
      me.totalTime = 15000
      me.timeElapsed = 0
      me.createTimer()
      me.gameTimer = game.time.events.loop(100, function(){
        me.updateTimer()
      })
        me.timeLabel = me.game.add.text(me.game.world.centerX, 100, "00:00", {font: "65px Arial", fill: "#fff"})
        me.timeLabel.anchor.setTo(0.5, 0)
        me.timeLabel.align = 'center'
        var currentTime = new Date()
        var timeDifference = me.startTime.getTime() - currentTime.getTime()
        //Time elapsed in seconds
        me.timeElapsed = Math.abs(timeDifference / 1000)
        //Time remaining in seconds
        var timeRemaining = me.totalTime - me.timeElapsed
        //Convert seconds into minutes and seconds
        var minutes = Math.floor(timeRemaining / 60)
        var seconds = Math.floor(timeRemaining) - (60 * minutes)
        //Display minutes, add a 0 to the start if less than 10
        var result = (minutes < 10) ? "0" + minutes : minutes;
        //Display seconds, add a 0 to the start if less than 10
        result += (seconds < 10) ? ":0" + seconds : ":" + seconds;
        me.timeLabel.text = result
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
      this.load.image("food", "./assets/notSally.png")

      this.load.audio("nom", "./assets/darcynom.mp3")
    }
  
    create(data) {
      this.background = this.add.image(0, 0, "earth").setScale(5.0)
      this.background.setOrigin(0, 0)

      this.darcy = this.physics.add.sprite(1920 / 2, 1080 - 100, "darcy")
      .setScale(0.25)

      this.foodGroup = this.add.group()
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