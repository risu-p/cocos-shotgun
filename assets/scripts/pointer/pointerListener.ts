import {
  _decorator,
  Component,
  Node,
  input,
  Input,
  EventMouse,
  Vec3,
  UITransform,
  Animation,
  Prefab,
  instantiate,
  NodeEventType,
  screen,
  view,
  AudioSource,
} from "cc";
const { ccclass, property } = _decorator;

/**
 * 监听鼠标（指针）移动、点击
 */
@ccclass("pointerListener")
export class pointerListener extends Component {
  @property(Prefab)
  explosion: Prefab | null = null;

  /* 爆炸效果，挂在特效层下面（否则会出现在指针图之上） */
  @property(Node)
  effectLayer: Node | null = null;

  /* 指针图 */
  @property(Node)
  pointer: Node | null = null;

  start() {
    this.node.on(NodeEventType.MOUSE_MOVE, this.onMouseMove, this, true); // 捕获阶段
    this.node.on(NodeEventType.MOUSE_UP, this.onMouseUp, this, true);

    // 隐藏鼠标
    let gcs = document.getElementById("GameCanvas");
    gcs && (gcs.style.cursor = "none");
  }

  /* 鼠标移动：指针图跟着动 */
  onMouseMove(event: EventMouse) {
    // 世界坐标系
    const pos = event.getUILocation();
    const uiTransform = this.pointer.getComponent(UITransform);
    // 让法杖的左上角的法球中央跟随鼠标
    const targetPos = new Vec3(
      pos.x + uiTransform.width / 2 - 18,
      pos.y - uiTransform.height / 2 - 8
    );
    this.pointer.setWorldPosition(targetPos);
  }

  /* 鼠标点击：在点击位置给一个效果 */
  onMouseUp(event: EventMouse) {
    const pos = event.getUILocation();
    const targetPos = new Vec3(pos.x, pos.y);

    // 音效
    const audio = this.node.getComponent(AudioSource);
    audio.volume = 0.2;
    audio.play();

    // 创建节点
    const explosionNode = instantiate(this.explosion);
    this.effectLayer.addChild(explosionNode);
    explosionNode.setWorldPosition(targetPos);
  }

  update(deltaTime: number) {}
}
