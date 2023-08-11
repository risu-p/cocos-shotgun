import {
  _decorator,
  AudioSource,
  Button,
  Component,
  Node,
  Sprite,
  SpriteFrame,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("BgmBtn")
export class BgmBtn extends Component {
  @property(AudioSource)
  bgm: AudioSource = null;
  @property(SpriteFrame)
  playBtn: SpriteFrame = null; // 播放中 按钮图片
  @property(SpriteFrame)
  muteBtn: SpriteFrame = null; // 未播放 按钮图片

  isPlay: boolean = false;

  start() {}

  // 点击按钮，切换bgm
  toggleBtn() {
    const btn = this.node.getComponent(Button);

    if (this.isPlay) {
      // 当前正在播放，则暂停
      this.bgm.pause();
      btn.normalSprite = this.muteBtn;
    } else {
      this.bgm.play();
      btn.normalSprite = this.playBtn;
    }

    this.isPlay = !this.isPlay;
  }

  update(deltaTime: number) {}
}
