import { useEffect } from "react";

import * as THREE from "three";
import { GUI } from "dat.gui";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import SceneInit from "./lib/SceneInit";
import DegRadHelper from "./lib/DeragHelper";
function App() {
  useEffect(() => {
    const test = new SceneInit("myThreeJsCanvas");
    test.initialize();
    test.animate();

    // initialize gui
    const gui = new GUI();

    // main group
    const mainGroup = new THREE.Group();
    mainGroup.position.y = 0.5;
    test.scene.add(mainGroup);

    // normal box
    // const bg0 = new THREE.BoxGeometry(1, 1, 1);
    // const bm0 = new THREE.MeshNormalMaterial();
    // const boxMesh0 = new THREE.Mesh(bg0, bm0);
    // test.scene.add(boxMesh0);

    // set up ground
    const groundGeometry = new THREE.BoxGeometry(10, 0.3, 8);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0xfafafa });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.receiveShadow = true;
    groundMesh.position.y = -2;
    mainGroup.add(groundMesh);

    // set up torus for youtube thumbnail
    // const bg1 = new THREE.TorusGeometry(1.5, 0.75, 64, 64);
    // const bm1 = new THREE.MeshNormalMaterial({ color: 0xff0000 });
    // const boxMesh1 = new THREE.Mesh(bg1, bm1);
    // boxMesh1.castShadow = true;
    // boxMesh1.position.y = 1;
    // boxMesh1.position.z = 1;
    // boxMesh1.rotation.x = -Math.PI / 3;
    // mainGroup.add(boxMesh1);

    // set up red box mesh
    const bg1 = new THREE.BoxGeometry(1, 1, 1);
    const bm1 = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const boxMesh1 = new THREE.Mesh(bg1, bm1);
    boxMesh1.castShadow = true;
    boxMesh1.position.x = -1;
    mainGroup.add(boxMesh1);


    // set up blue circle mesh
    const bg3 = new THREE.SphereBufferGeometry(0.5, 24, 50);
    const bm3 = new THREE.MeshStandardMaterial({ color: 0x0000ff });
    const boxMesh3 = new THREE.Mesh(bg3, bm3);
    boxMesh3.castShadow = true;
    boxMesh3.position.x = 1;
    mainGroup.add(boxMesh3);

    //---------------------------------------AMBIENT LIGHT------------------------------------------//
    // set up ambient light
    const al = new THREE.AmbientLight(0xffffff, 0.5);
    mainGroup.add(al);

    // set up ambient light gui
    const alFolder = gui.addFolder("ambient light");
    const alSettings = { color: al.color.getHex() };
    alFolder.add(al, "visible");
    alFolder.add(al, "intensity", 0, 1, 0.1);
    alFolder
      .addColor(alSettings, "color")
      .onChange((value) => al.color.set(value));
    alFolder.open();
    
    //-----------------------------------------HEMISPHERE LIGHT----------------------------------------//
    // set up Hemisphere light
    const skyColor = 0xf0e424;
    const groundColor = 0xf00000;
    const hl = new THREE.HemisphereLight(skyColor, groundColor, 0.5);
    hl.visible=false
    mainGroup.add(hl);

    // set up Hemisphere light gui
    const hlFolder = gui.addFolder("hemisphere light");
    const hlSettings = { color: hl.color.getHex(), visible: false };
    const hlSettings1 = { groundColor: hl.groundColor.getHex() };
    hlFolder.add(hl, "visible");
    hlFolder.add(hl, "intensity", 0, 1, 0.1);
    hlFolder
      .addColor(hlSettings, "color")
      .onChange((value) => hl.color.set(value));
    hlFolder
      .addColor(hlSettings1, "groundColor")
      .onChange((value) => hl.groundColor.set(value));
    hlFolder.open();
    
    //-----------------------------------------DIRECTIONAL LIGHT----------------------------------------//
    // setup directional light + helper
    const dl = new THREE.DirectionalLight(0xffffff, 0.5);
    // use this for YouTube thumbnail
    dl.position.set(0, 2, 2);
    // dl.position.set(0, 2, 0);
    dl.castShadow = true;
    dl.visible = false
    const dlHelper = new THREE.DirectionalLightHelper(dl, 3);
    dlHelper.visible= false
    mainGroup.add(dl,dlHelper);

    // set up directional light gui
    const dlSettings = {
      visible: false,
      color: dl.color.getHex(),
    };
    const dlFolder = gui.addFolder("directional light");
    dlFolder.add(dlSettings, "visible").onChange((value) => {
      dl.visible = value;
      dlHelper.visible = value;
    });
    dlFolder.add(dl, "intensity", 0, 1, 0.25);
    dlFolder.add(dl.position, "y", 1, 4, 0.5);
    dlFolder.add(dl, "castShadow");
    dlFolder
      .addColor(dlSettings, "color")
      .onChange((value) => dl.color.set(value));
    dlFolder.open();
    
    //------------------------------------SPOT LIGHT---------------------------------------------//
    // set up spot light + helper
    const sl = new THREE.SpotLight(0x00ff00, 1, 8, Math.PI / 8, 0);
    sl.position.set(0, 2, 2);
    sl.visible= false
    const slHelper = new THREE.SpotLightHelper(sl);
    slHelper.visible = false
    mainGroup.add(sl, slHelper);

    // set up spot light gui
    const slSettings = {
      visible: false,
    };
    const slFolder = gui.addFolder("spot light");
    slFolder.add(slSettings, "visible").onChange((value) => {
      sl.visible = value;
      slHelper.visible = value;
    });
    slFolder.add(sl, "intensity", 0, 4, 0.5);
    slFolder.add(sl, "angle", Math.PI / 16, Math.PI / 2, Math.PI / 16);
    slFolder.add(sl, "castShadow");
    slFolder.open();

 //----------------------------------------POINT LIGHT-----------------------------------------//
    // set up point light + helper
    const pl = new THREE.PointLight(0xffffff, 1, 8, 2);
    pl.position.set(2, 2, 2);
    pl.visible=false
    const plHelper = new THREE.PointLightHelper(pl, 0.5);
    plHelper.visible=false
    mainGroup.add(pl, plHelper);

    // set up point light gui
    const plSettings = {
      visible: false,
      color: pl.color.getHex(),
    };
    const plFolder = gui.addFolder("point light");
    plFolder.add(plSettings, "visible").onChange((value) => {
      pl.visible = value;
      plHelper.visible = value;
    });
    plFolder.add(pl, "intensity", 0, 2, 0.25);
    plFolder.add(pl.position, "x", -2, 4, 0.5);
    plFolder.add(pl.position, "y", -2, 4, 0.5);
    plFolder.add(pl.position, "z", -2, 4, 0.5);
    plFolder.add(pl, "castShadow");
    plFolder
      .addColor(plSettings, "color")
      .onChange((value) => pl.color.set(value));
    plFolder.open();
    
    //---------------------------------------RECT AREA LIGHT------------------------------------------//
    // set up RectArea light + helper
    const width = 5;
    const height = 3;
    const rl = new THREE.RectAreaLight(0xffffff, 10, width, height);
    rl.position.set(0, 2.5, -2);
    rl.lookAt(0, 0, 0);
    rl.visible=false
    const rlHelper = new RectAreaLightHelper(rl);
    rlHelper.visible=false
    mainGroup.add(rl, rlHelper);

    // set up Rect Area light gui
    const rlSettings = {
      visible: false,
      color: rl.color.getHex(),
    };
    const rlFolder = gui.addFolder("Rect Area light");
    rlFolder.add(rlSettings, "visible").onChange((value) => {
      rl.visible = value;
      rlHelper.visible = value;
    });
    rlFolder.add(rl, "intensity", 0, 10, 0.5);
    rlFolder
      .addColor(rlSettings, "color")
      .onChange((value) => rl.color.set(value));

    rlFolder.add(rl, "width", 1, 20);
    rlFolder.add(rl, "height", 1, 20);
    rlFolder
      .add(
        new DegRadHelper(rl.rotation, "x"),
        "value",
        -180,
        180
      )
      .name("x rotation");
      rlFolder
      .add(
        new DegRadHelper(rl.rotation, "y"),
        "value",
        -180,
        180
      )
      .name("y rotation");
      rlFolder
      .add(
        new DegRadHelper(rl.rotation, "z"),
        "value",
        -180,
        180
      )
      .name("z rotation");
    rlFolder.open();
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
