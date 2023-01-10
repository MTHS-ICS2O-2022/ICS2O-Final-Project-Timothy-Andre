/* global Phaser */

// Copyright (c) 2022 TMAD All rights reserved
//
//Created by: Timothy Manwell
//Created on: Jan 2023
//This is the Phaser3 game configuration file

import SplashScene from "./splashScene.js"
import TitleScene from "./titleScene.js"

const splashScene = new SplashScene()
const titleScene = new TitleScene()

//*game scene */
const config = {
  type: Phaser.Auto,
  width: 1920,
  height: 1080,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  // set background colour
  backgroundColor: 0x5f6e7a,
  scale: {
    mode: Phaser.Scale.FIT,
    // place in the middle of the page
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

const game = new Phaser.Game(config)

//load scenes
//NOTE: remember any "key" is global and CAN NOT be reused
game.scene.add("splashScene", splashScene)
game.scene.add("titleScene", titleScene)

//start title
game.scene.start("splashScene")