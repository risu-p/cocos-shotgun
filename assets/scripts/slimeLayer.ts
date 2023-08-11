import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("slimeLayer")
export class slimeLayer extends Component {
  @property(Node)
  gameManager: Node = null;

  start() {
    this.node.on("slime-die", this.onSlimeDie);
  }

  onSlimeDie() {
    console.log("接受");
    const gameManager = this.gameManager.getComponent("script");
    gameManager.addScore();
  }

  update(deltaTime: number) {}
}
