
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer"; // Augments the scene with the debug methods
import "@babylonjs/inspector"; // Injects a local ES6 version of the inspector to prevent automatically relying on the none compatible version

import Scene from "./3dScene";
// import Gateway from "../logic/GatewayLogic";
// import LobbyState, { LobbyStates } from "../logic/LobbyStateLogic";
// import EventManager from "../utilities/EventManager";

//export default class Lobby extends React.Component {
  /* constructor(props) {
    super();

    this.sceneLoadedHandler = props.sceneLoaded;
    this.lobbyState$ = undefined;
    this.data$ = undefined;
    this.scene = undefined;
    this.hlLayer = undefined;
    this.camera = undefined;
    this.materials = [];
  } */

/*   componentWillUnmount() {
    // unsubscribe from all observables
    if (this.lobbyState$) this.lobbyState$.unsubscribe();
    if (this.data$) this.data$.unsubscribe();
  } */

 /*  _updateSequin = (sequinInfo, region) => {
    const sequin = this.scene.getMeshByName(sequinInfo.name);
    sequin.isPickable = true;
    sequin.metadata = {
      id: sequinInfo.id,
      name: sequinInfo.name,
      region: region,
    };
    this.hlLayer.addMesh(sequin, BABYLON.Color3.Blue()); // Any color
  }; */

/*   _animateCamera = (trackName, speed = 1, reverse = false) => {
    const track = this.scene.getMeshByName(trackName);
    const keysLength = track.animations[0]._keys.length;
    const start = 0;
    const end = track.animations[0]._keys[keysLength - 1].frame;
    const startFrame = reverse ? end : start;
    const endFrame = reverse ? start : end;
    this.camera.parent = track;
    this.camera.fov = 0.5200; // fill more of camera frame with trees camera.fov = 0.5200;
    return this.scene
      .beginAnimation(track, startFrame, endFrame, false, speed)
      .waitAsync();
  }; */

/*   _handleClickMain = () => {
    const scene = this.scene;
    let pickResult = scene.pick(scene.pointerX, scene.pointerY);

    if (pickResult.hit) {
      console.log("picked mesh: " + pickResult.pickedMesh.name);
      let region = Gateway.getRegionFromMesh(pickResult.pickedMesh.name);
      if (region) {
        LobbyState.toRegionSelected(region);
      }
    }
  }; */

/*   _handleMouseMoveMain = () => {
    this.hlLayer.removeAllMeshes();

    let pickResult = this.scene.pick(this.scene.pointerX, this.scene.pointerY);

    if (pickResult.hit) {
      const r = Gateway.getRegionFromMesh(pickResult.pickedMesh.name);
      if (r) {
        r.meshes.forEach((m) =>
          this.hlLayer.addMesh(m, BABYLON.Color3.Green())
        );
      }
    }
  }; */

/*   _handleClickRegion = () => {
    const scene = this.scene;
    const region = LobbyState.current.newState.data.name;
    let pickResult = scene.pick(scene.pointerX, scene.pointerY);

    if (pickResult.hit) {
      const mesh = pickResult.pickedMesh;
      console.log("picked mesh: " + mesh);
      // make sure a sequin was picked and the sequin is in the current region
      if (mesh.name.indexOf("sequin") === -1 || mesh.name.indexOf(region) === -1)
        return;

      LobbyState.toSequinView(mesh.metadata);
    }
  }; */

/* 
  _handleStateChange = async (oldState, newState) => {
    if (oldState) this._cleanUpOldState(oldState);
    if (newState) await this._setUpNewState(oldState, newState);
  }; */

/*   _cleanUpOldState = (oldState) => {
    switch (oldState.type) {
      case LobbyStates.main:
      case LobbyStates.regionEntered:
        EventManager.removeAllListeners(window, "click");
        EventManager.removeAllListeners(window, "mousemove");
        break;

      default:
        break;
    }
  }; */

 /*  _setUpNewState = async (oldState, newState) => {
    switch (newState.type) {
      case LobbyStates.intro:
        await this._animateCamera("introToWorldEmpty_2", 2.6);
        LobbyState.toMainView();
        break;

      case LobbyStates.main:
        if (this.data$) this.data$.unsubscribe();

        if (oldState.type === LobbyStates.regionEntered) {
          const region = oldState.data;
          await this._animateCamera(region.trackName, 2, true);
        }
        EventManager.addListener(window, "click", this._handleClickMain);
        EventManager.addListener(
          window,
          "mousemove",
          this._handleMouseMoveMain
        );
        break;

      case LobbyStates.regionSelected:
        this.hlLayer.removeAllMeshes();
        let regionSelected = newState.data;
        if (oldState.type === LobbyStates.main) {
          await this._animateCamera(regionSelected.trackName, 2);
        }
        LobbyState.toRegionEntered(regionSelected);
        break;

      case LobbyStates.regionEntered:
        let regionEntered = newState.data;
        this.data$ = Gateway.getRegion(regionEntered.name).stream.subscribe(
          (sequins) => {
            sequins.forEach((seq) => {
              this._updateSequin(seq, regionEntered);
            });
          }
        );
        setTimeout(
          () =>
            EventManager.addListener(window, "click", this._handleClickRegion),
          200
        ); // slight pause prevents the sequin info modal from immediately popping back open
        break;

      case LobbyStates.sequin:
        if (this.data$) this.data$.unsubscribe();
        break;

      case LobbyStates.sequinLink:
        let regionLinked = newState.data.region;
        await this._animateCamera(regionLinked.trackName, 2);
        LobbyState.toSequinView(newState.data);
        break;

      default:
        break;
    }
  }; */
  

 // onSceneReady = async (e) => {
    let that = this;
    const { scene } = e;
    this.scene = scene;

    // maybe use DeviceOrientationCamera so that tilting works on devices?
    this.camera = new BABYLON.UniversalCamera(
      "mainCamera",
      new BABYLON.Vector3(0, 0, 0),
      scene
  //  );

// 1 * Math.PI / 3, Math.PI / 2.5, 100, BABYLON.Vector3.Zero(),

/* 
    // PT-710 / provide User camera movement with limited horizional Angle and Zoom
    var camerasBorderFunction = function () {
      let alpha = -Math.PI / 2;
      let beta = Math.PI / 2;
      console.log("----  this.camera.beta ----" + beta);
      if (this.camera.beta < 0.1) this.camera.beta = 0.1; //Angle; // 0.1
      else if (this.camera.beta > (Math.PI / 2) * 0.9) this.camera.beta = (Math.PI / 2) * 0.9;   //Zoom
      if (this.camera.radius > 150) this.camera.radius = 150;
      if (this.camera.radius < 30) this.camera.radius = 30;
    };
    scene.registerBeforeRender(camerasBorderFunction);
    this.camera.attachControl(this.canvas, true);

 */

// ----  light1 = new BABYLON.HemisphericLight("light1",new BABYLON.Vector3(0, 1, 0),scene));
// --    light1.intensity = 1.8;

// ----      var defaultPipeline = new BABYLON.DefaultRenderingPipeline(
// ----        "default",
// ----        true,
// ----        scene,
// ----        [this.camera]
    );

    var curve = new BABYLON.ColorCurves();
    curve.globalHue = 200;
    curve.globalDensity = 80;
    curve.globalSaturation = 80;
    curve.highlightsHue = 240; // 20;
    curve.highlightsDensity = 100; // 80;
    curve.highlightsSaturation = 100; // -80;
    curve.shadowsHue = 2;
    curve.shadowsDensity = 80;
    curve.shadowsSaturation = 40;
    defaultPipeline.imageProcessing.colorCurves = curve;
    defaultPipeline.depthOfField.focalLength = 150;
    // sequin Bloom
    defaultPipeline.bloomEnabled = true;
    defaultPipeline.bloomThreshold = 0.8;
    defaultPipeline.bloomWeight = 0.3;
    defaultPipeline.bloomKernel = 64;
    defaultPipeline.bloomScale = 0.5;
    defaultPipeline.imageProcessingEnabled = true;

    const skybox = BABYLON.Mesh.CreateBox("skyBox", 600.0, scene); // 1500.0
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    // WORKS with out below line
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
      "/textures/skybox/TropicalSunnyDay",
      scene
    );
    skyboxMaterial.reflectionTexture.coordinatesMode =
      BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    skybox.position.y = -30.0;
    skybox.isPickable = false;
    // --- original skyBox -------------------------------------------------------------------------------------------------------
    // let hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("/textures/environment/environment.dds",scene);
    // let hdrBox = scene.createDefaultSkybox(hdrTexture, true, 10000);
    // hdrBox.isPickable = false;
    // var hdrRotation = 180; // in degrees
    // hdrTexture.rotationY = BABYLON.Tools.ToRadians(hdrRotation);
    // --- original skyBox -------------------------------------------------------------------------------------------------------
   // --let hdrTexture = new BABYLON.HDRCubeTexture("/textures/firework.hdr", scene, 128, false, true, false, true);
    let hdrTexture =   new BABYLON.HDRCubeTexture("/textures/environment/firework3.hdr", scene, 128, false, true, false, true);
  //  let hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("/textures/environment/studio.env", scene);
    //scene.createDefaultSkybox(new BABYLON.CubeTexture("textures/environment.env", scene),false,100,0,false);
    let hdrBox = scene.createDefaultSkybox(hdrTexture, true, 10000);
    
    hdrBox.isPickable = false;
  //  var hdrRotation = -60; // in degrees //-50
  //  hdrTexture.rotationY = BABYLON.Tools.ToRadians(hdrRotation);


    this.hlLayer = new BABYLON.HighlightLayer("hl1", scene);
    // Exclude Mesh from roll over
    this.hlLayer.addExcludedMesh(skybox);

    // PLEASE ADJUST AS NEEDED //
    // Description: Sets any mesh with 'sequin' in the mesh name to be pickable
    // init state for setSequinsPickable();
    //   this.hasCompletedSequinPickableInitRun = false;
    // Call once all the meshes are loaded > setSequinsPickable(hasCompletedSequinPickableInitRun)
    /*     this.setSequinsPickable = function (hasCompletedSequinPickableInitRun) {
            if (hasCompletedSequinPickableInitRun == false) {
                for (var i = 0; i < scene.meshes.length; i++) {
                    var mesh = scene.meshes[i];
                    var re = /sequin/gi;
                    var str = mesh.name;
                    if (str.search(re) == -1) {
                       // console.log("Does not contain sequin");
                    } else {
                        if (mesh.isPickable == false) {
                           // console.log("Sequin named " + str + " is pickable " + mesh.isPickable);
                           // console.log(" ---- setting pickable ----");
                            mesh.isPickable = true;
                        }
                    }
                }
            }
            return hasCompletedSequinPickableInitRun = true;
        } */
    // PLEASE ADJUST AS NEEDED //

    BABYLON.SceneLoader.ShowLoadingScreen = false;

    await Promise.all([
      BABYLON.SceneLoader.AppendAsync(
        "/models/",
        "setNoSequin_1a.babylon",
        scene
      ),
      BABYLON.SceneLoader.AppendAsync(
        "/models/",
        "sequinOnlyNonPick29_l.babylon",
        scene
      ),
      BABYLON.SceneLoader.AppendAsync(
        "/models/",
        "sequinCameraIntro_1.babylon",
        scene
      ),
      BABYLON.SceneLoader.AppendAsync(
        "/models/",
        "sequinCameraRegion1.babylon",
        scene
      ),
      BABYLON.SceneLoader.AppendAsync(
        "/models/",
        "sequinCameraRegion2.babylon",
        scene
      ),
      BABYLON.SceneLoader.AppendAsync(
        "/models/",
        "sequinCameraRegion3.babylon",
        scene
      ),
      BABYLON.SceneLoader.AppendAsync(
        "/models/",
        "sequinCameraRegion4.babylon",
        scene
      ),
      BABYLON.SceneLoader.AppendAsync(
        "/models/",
        "cloud001.babylon",
        scene
        // cloud mesh and animation of 'Curve.001'(cloud001) Action
      ), 
    ]);

   /*  // preload region tree meshes
    Gateway.allRegions().forEach((r) => {
      r.treeNames.forEach((n) => {
        r.meshes.push(scene.getMeshByName(n));
      });
    });
 */
    /* if (this.sceneLoadedHandler) this.sceneLoadedHandler();

    this.lobbyState$ = LobbyState.stream.subscribe(
      async ({ oldState, newState }) => {
        await this._handleStateChange(oldState, newState);
      }
    );
 */
    // var createReflectionProbes = function () {
    let probe = new BABYLON.ReflectionProbe("main", 512, scene);
    //  slower ? >   probe.refreshRate = BABYLON.RenderTargetTexture.REFRESHRATE_RENDER_ONEVERYFRAME;
    probe.renderList.push(hdrBox); // probe.renderList.push(skybox);
    //}

    this.camera.onViewMatrixChangedObservable.add(function () {
      if (that.camera) {
        // console.log("rotation: " + that.camera.rotation.x + ", " + that.camera.rotation.y + ", " + that.camera.rotation.z);
        // console.log("position: " + that.camera.position.x + ", " + that.camera.position.y + ", " + that.camera.position.z);
      } else {
        console.log("no camera!");
      }
    });

    // scene.debugLayer.show();
    // not sure where the code for rthe debugLayer is, but needs below line
    // var nodeMaterial = new BABYLON.NodeMaterial("node material", scene, { emitComments: true });
    // debug GUI needs above line otherwise Inspector window hides when mesh selected.
 // };

  onSceneRender = (e) => { };

  renderScene() ;{
    return (
      <Scene
        antialias={true}
        onSceneReady={this.onSceneReady}
        onRender={this.onSceneRender}
        canvasId="lobbyCanvas"
        className="lobby-canvas"
      />
    );
  }

  render() ;{
    return <div className="lobby-container">{this.renderScene()}</div>;
  }
//}
