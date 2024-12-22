import * as PIXI from "pixi.js-legacy";
import shuffle from "lodash/shuffle";
const srcs = shuffle(["/img1.jpg", "/img2.jpeg", "/img3.jpeg", "/img4.png"]);

const rnd = (base: number) => base * Math.random();

const broke = (container: PIXI.Container) => {
  container.setTransform(container.position.x, container.position.y, rnd(1.2), rnd(1.2), rnd(360), rnd(1.2), rnd(1.2), rnd(250), rnd(250));
};

const img = (assets: typeof PIXI.Assets) => {
  const src = srcs.pop()!;
  const sprite = new PIXI.Sprite(assets.get(src));
  broke(sprite);
  return sprite;
};

export const getContent = (assets: typeof PIXI.Assets) => {
  const mainContainer = new PIXI.Container();
  const subContainer = new PIXI.Container();
  const subSubContainer = new PIXI.Container();
  const g1 = new PIXI.Graphics();
  const g2 = new PIXI.Graphics();
  const g3 = new PIXI.Graphics();
  const g4 = new PIXI.Graphics();
  const g5 = new PIXI.Graphics();
  const g6 = new PIXI.Graphics();

  g1.beginFill("#ff0000").drawEllipse(rnd(512), rnd(512), rnd(100), rnd(100)).endFill();
  g2.beginFill("#0000ff").drawRect(rnd(512), rnd(512), rnd(100), rnd(100)).endFill();
  g3.lineStyle(100, "#f0ffff", 1).moveTo(rnd(512), rnd(512)).lineTo(rnd(512), rnd(512));
  g4.lineStyle(30, "#f0ff00", 1).moveTo(rnd(512), rnd(512)).lineTo(rnd(512), rnd(512));
  g5.beginFill("#ff0000").drawCircle(rnd(512), rnd(512), rnd(100)).endFill();
  g6.beginFill("#ff0000").drawRoundedRect(rnd(512), rnd(512), rnd(100), rnd(100), rnd(20)).endFill();
  subSubContainer.addChild(g5, g6, img(assets));
  subContainer.addChild(subSubContainer);
  subContainer.addChild(g3, g4);
  mainContainer.addChild(subContainer, g1, g2, img(assets));
  mainContainer.position.set(250, 250);

  broke(subContainer);
  broke(subSubContainer);
  return mainContainer;
};
