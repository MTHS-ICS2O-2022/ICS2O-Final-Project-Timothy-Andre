/* global Phaser*/

// Copyright (c) 2023 TMAD All rights reserved
//
//Created by: Timothy Manwell
//Created on: Jan 2023
//This is the Title Scene

/**
 * This class is the title scene
 */
class TitleScene extends Phaser.Scene {
    /**
     * This method is the constructor
     */
    constructor() {
      super({ key: "titleScene" })
      this.titleSceneBackgroundImage = null
    }
  
    init(data) {
      this.cameras.main.setBackgroundColor("#ffffff")
    }
  
    preload() {
      console.log("Title Scene")
      this.load.image("titleSceneBackground", "./assets/title.png")
    }
  
    create(data) {
      this.titleSceneBackgroundImage = this.add
        .sprite(0, 0, "titleSceneBackground")
        .setScale(2.75)
    }
  
    update(time, delta) {
      if (time > 6000) {
        this.scene.switch("menuScene")
      }
    }
  }
  export default TitleScene
  