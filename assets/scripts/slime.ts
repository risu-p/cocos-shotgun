import {
  _decorator,
  Animation,
  AnimationState,
  Component,
  Input,
  input,
  Node,
  NodeEventType,
  Vec3,
  screen,
  view,
  Event,
} from "cc";
const { ccclass, property } = _decorator;

enum SLIME_DIRECTION {
  LEFT = "left",
  RIGHT = "right",
}

@ccclass("slime")
export class slime extends Component {
  anime: Animation = null;

  /* 状态 */
  dead: boolean = false;

  initPos: Vec3 = null; // 随机初始化位置
  speed: number = null; // 随机速度
  moveDirection: SLIME_DIRECTION = null; // 移动方向

  /**
   * 节点生成时
   */
  onLoad() {
    const designSize = view.getDesignResolutionSize(); // 设计尺寸（即画布尺寸）

    const moreX = Math.floor(Math.random() * 40) + 10; // 在屏幕外生成，故该值代表超出屏幕的x
    this.moveDirection =
      Math.random() < 0.5 ? SLIME_DIRECTION.LEFT : SLIME_DIRECTION.RIGHT; // 移动方向（即在屏幕左侧or右侧）
    let x = -moreX; // 往右移动（说明初始在左侧）
    if (this.moveDirection == SLIME_DIRECTION.LEFT) {
      // 往左移动（说明初始在右侧）
      x = moreX + designSize.width;
    }
    let y = Math.floor(Math.random() * designSize.height * 0.6); // 只在高度60%的区域生成
    y += designSize.height * 0.1; // 抬高一点，底部10%不生产

    this.initPos = new Vec3(x, y, 0); // 初始化位置
    this.node.setWorldPosition(this.initPos);
    this.speed = Math.floor(Math.random() * 40) + 10; // 速度：2~12
  }

  start() {
    this.anime = this.node.getComponent(Animation);
    this.node.on(NodeEventType.MOUSE_UP, this.onClick, this);
    this.anime.on(Animation.EventType.FINISHED, this.onAnimeEnd, this);
  }

  /* 命中：切换成死亡动画 */
  onClick() {
    if (this.dead == false) {
      this.dead = true;
      this.anime.crossFade("slime-die");
      this.node.dispatchEvent(new Event("slime-die", true));
    }
  }

  /* 动画结束 */
  onAnimeEnd(type, state) {
    if (state.name === "slime-die") {
      this.node.destroy();
    }
  }

  /* 更新（1/60s） */
  update(deltaTime: number) {
    // 刷新位置
    const distanceX = deltaTime * this.speed;
    const pos = this.node.getWorldPosition();
    let nextX = pos.x - distanceX; // 往左移动
    if (this.moveDirection == SLIME_DIRECTION.RIGHT) {
      // 往右移动
      nextX = pos.x + distanceX;
    }

    // 更新位置
    this.node.setWorldPosition(new Vec3(nextX, pos.y, pos.z));
  }
}
