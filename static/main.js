import { loadGLTF } from "./libs/loader.js";
import { mockWithVideo } from './libs/camera-mock.js';
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {
    const imageTargets = [
      { src: '/static/assets/targets/facultad_de_ciencias_letras.mind', model: '/static/assets/models/scientist/scene.gltf', scale: { x: 0.1, y: 0.1, z: 0.1 } },
      { src: '/static/assets/targets/target_uni.mind', model: '/static/assets/models/model2/scene.gltf', scale: { x: 0.9, y: 0.9, z: 0.9 } }
    ];

    for (let target of imageTargets) {
      const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: target.src,
      });
      const { renderer, scene, camera } = mindarThree;

      const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
      scene.add(light);

      const model = await loadGLTF(target.model);

      model.scene.scale.set(target.scale.x, target.scale.y, target.scale.z);
      model.scene.position.set(0, 0, 0);

      const anchor = mindarThree.addAnchor(0);
      anchor.group.add(model.scene);

      await mindarThree.start();
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
    }
  }
  start();
});