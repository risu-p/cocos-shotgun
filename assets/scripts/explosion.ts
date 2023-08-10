import { _decorator, Animation, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("explosion")
export class explosion extends Component {
  start() {
    const anime = this.node.getComponent(Animation);
    anime.on(Animation.EventType.FINISHED, this.onAnimeEnd, this);
  }

  onAnimeEnd() {
    this.node.destroy();
  }

  update(deltaTime: number) {}
}
