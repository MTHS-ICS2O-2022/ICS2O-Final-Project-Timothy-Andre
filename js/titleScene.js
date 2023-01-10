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
    super({ key: "titleScene" });

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
    this.titleSceneBackgroundImage = this.add.sprite(
      0,
      0,
      "titleSceneBackground"
    );
    this.titleSceneBackground.x = 1920 / 2
    this.titleSceneBackground.y = 1080 / 2
  }

  update(time, delta) {
  }
}

export default TitleScene
