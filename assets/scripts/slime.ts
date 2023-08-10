import {
  _decorator,
  Animation,
  AnimationState,
  Component,
  Input,
  input,
  Node,
  NodeEventType,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("slime")
export class slime extends Component {
  anime: Animation = null;

  /* 状态 */
  dead: boolean = false;

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
    }
  }

  /* 动画结束 */
  onAnimeEnd(type, state) {
    if (state.name === "slime-die") {
      this.node.destroy();
    }
  }

  update(deltaTime: number) {}
}
