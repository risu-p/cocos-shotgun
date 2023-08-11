import {
  _decorator,
  Canvas,
  Component,
  instantiate,
  Label,
  Node,
  Prefab,
} from "cc";
const { ccclass, property } = _decorator;

enum GAME_STATE {
  INIT = "init",
  PLAY = "play",
  END = "end",
}

// 一局时长
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
  /* 画布（为了监听子元素史莱姆抛出的事件） */
  @property(Canvas)
  canvas: Canvas = null;
  /* 菜单节点 */
  @property(Node)
  menu: Node = null;

  // 游戏状态
  gameState: GAME_STATE = GAME_STATE.INIT;
  // 游戏进行了多长时间（难度越来越大）
  gameTime: number = 0;
  gameScore: number = 0; // 得分

  start() {
    this.init(); // 进入游戏菜单
    this.canvas.node.on("slime-die", this.addScore, this);
  }

  /* 初始化菜单 */
  init() {
    this.gameState = GAME_STATE.INIT;
  }

  /* 开始游戏 */
  play() {
    this.gameState = GAME_STATE.PLAY;
    // 隐藏菜单
    this.menu.active = false;

    // 重置游戏状态
    this.gameTime = 0;
    this.gameScore = 0;

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
    this.gameScore += 1;
    this.score.string = this.gameScore.toString();
  }

  update(deltaTime: number) {
    if (this.gameState == GAME_STATE.PLAY) {
      // 进行中，累积时间
      this.gameTime += deltaTime;
      this.time.string = Math.max(
        0,
        Math.ceil(TOTAL_TIME - this.gameTime)
      ).toString();
    }
  }
}
