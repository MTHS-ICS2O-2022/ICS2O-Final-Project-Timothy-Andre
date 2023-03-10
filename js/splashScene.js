/* global Phaser*/

// Copyright (c) 2023 TMAD All rights reserved
//
//Created by: Timothy Manwell and Andre Deveau
//Created on: Jan 2023
//This is the Splash Scene

/**
 * This class is the splash scene
 */
class SplashScene extends Phaser.Scene {
    /**
     * This method is the constructor
     */
    constructor() {
      super({ key: "splashScene" });
  
      this.splashSceneBackgroundImage = null
    }
  
    init(data) {
      this.cameras.main.setBackgroundColor("#ffffff")
    }
  
    preload() {
      console.log("Splash Scene")
      this.load.image("splashSceneBackground", "./assets/splashSceneImage.png")
      this.load.audio("song", "./assets/badpiggiesphonk.mp3")
    }
  
    create(data) {
      this.splashSceneBackgroundImage = this.add.sprite(
        0,
        0,
        "splashSceneBackground"
      );
      this.splashSceneBackgroundImage.x = 1920 / 2
      this.splashSceneBackgroundImage.y = 1080 / 2
      this.sound.play("song")
    }
  
    update(time, delta) {
      if (time > 3000) {
        this.scene.switch("titleScene")
      }
    }
  }
  
  export default SplashScene
  