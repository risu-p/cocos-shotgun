import {
  _decorator,
  Canvas,
  Component,
  instantiate,
  Label,
  Node,
  Prefab,
} from "cc";
import { slime } from "./slime";
const { ccclass, property } = _decorator;

enum GAME_STATE {
  INIT = "init",
  PLAY = "play",
  END = "end",
}

// 30s一局
const TOTAL_TIME = 60;

@ccclass("gameManager")
export class gameManager extends Component {
  /* 史莱姆 */
  @property(Prefab)
  slime: Prefab = null;
  /* 挂载史莱姆的节点 */
  @property(Node)
  slimeLayer: Node = null;
  /* 得分节点 */
  @property(Label)
  score: Label = null;
  /* 倒计时节点 */
  @property(Label)
  time: Label = null;
  /* 倒计时节点 */
  @property(Canvas)
  canvas: Canvas = null;

  // 游戏状态
  gameState: GAME_STATE = GAME_STATE.INIT;
  // 游戏进行了多长时间（难度越来越大）
  gameTime: number = 0;
  gameScore: number = 0; // 得分

  start() {
    // 目前还没有开始前的UI菜单，直接开始游戏
    this.play();
    this.canvas.node.on("slime-die", this.addScore, this);
  }

  /* 开始游戏 */
  play() {
    this.gameState = GAME_STATE.PLAY;

    // 不断生成史莱姆
    this.schedule(function () {
      // 一次生成多少只（随时间变多）
      const count = Math.min(Math.max(1, this.gameTime / 10), 5);

      for (let i = 0; i < count; i++) {
        this.generateSlime();
      }
    }, 1);
  }

  /* 生成史莱姆 */
  generateSlime() {
    const slimeNode = instantiate(this.slime);
    this.slimeLayer.addChild(slimeNode);
  }

  /* 更新得分（外部调用） */
  addScore() {
    console.log("加分");
    this.gameScore += 1;
    this.score.string = this.gameScore.toString();
  }

  update(deltaTime: number) {
    if (this.gameState == GAME_STATE.PLAY) {
      // 进行中，累r积时间
      this.gameTime += deltaTime;
      this.time.string = Math.max(
        0,
        Math.ceil(TOTAL_TIME - this.gameTime)
      ).toString();
    }
  }
}
