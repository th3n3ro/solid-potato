import { SceneObject } from ".";

export interface Renderer<Output = void> {
  render(sceneObject: SceneObject): Output;
}
