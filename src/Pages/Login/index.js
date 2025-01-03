import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import getFresnelMat from "../../Config/getFreshnelMat";
import getStarfield from "../../Config/getStarfield";
import { Link } from "react-router-dom";

function Login() {
  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000a0b);
    const canvas = document.querySelector("canvas");

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.8,
      1000
    );
    camera.position.z = 5;
    camera.position.y = 7;

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.02;
    controls.enableZoom = true;
    controls.update();

    // Earth setup
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = (-23.4 * Math.PI) / 180;
    earthGroup.position.y = 4; // Geser Bumi ke atas layar
    scene.add(earthGroup);

    const detail = 12;
    const geometry = new THREE.IcosahedronGeometry(1, detail);

    // Earth materials
    const material = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(
        process.env.PUBLIC_URL + "/Assets/00_earthmap1k.jpg"
      ),
      specularMap: new THREE.TextureLoader().load(
        process.env.PUBLIC_URL + "/Assets/02_earthspec1k.jpg"
      ),
      bumpMap: new THREE.TextureLoader().load(
        process.env.PUBLIC_URL + "/Assets/01_earthbump1k.jpg"
      ),
      bumpScale: 0.04,
    });

    const earthMesh = new THREE.Mesh(geometry, material);
    earthGroup.add(earthMesh);

    // Clouds
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(
        process.env.PUBLIC_URL + "/Assets/04_earthcloudmap.jpg"
      ),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      alphaMap: new THREE.TextureLoader().load(
        process.env.PUBLIC_URL + "/Assets/05_earthcloudmaptrans.jpg"
      ),
    });

    const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
    cloudsMesh.scale.setScalar(1.003);
    earthGroup.add(cloudsMesh);

    const loader = new THREE.TextureLoader();

    const lightsMat = new THREE.MeshBasicMaterial({
      map: loader.load(process.env.PUBLIC_URL + "/Assets/04_earthlights1k.jpg"),
      blending: THREE.AdditiveBlending,
    });
    const lightsMesh = new THREE.Mesh(geometry, lightsMat);
    earthGroup.add(lightsMesh);

    // Glow effect
    const fresnelMat = getFresnelMat();
    const glowMesh = new THREE.Mesh(geometry, fresnelMat);
    glowMesh.scale.setScalar(1.01);
    earthGroup.add(glowMesh);

    // Stars
    const stars = getStarfield({ numStars: 2000 });
    scene.add(stars);

    // Lighting
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(-2, 0.5, 1.5);
    scene.add(sunLight);

    console.log(process.env.PUBLIC_URL + "/Assets/human_with_box.png");

    function resize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      requestAnimationFrame(animate);
      earthMesh.rotation.y += 0.001;
      cloudsMesh.rotation.y += 0.0014;
      glowMesh.rotation.y += 0.0002;
      stars.rotation.y -= 0.002;
      controls.update();
      renderer.render(scene, camera);
    }

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div className="relative z-[100]">
      <canvas className="absolute top-0 left-0 w-full h-full" />
      <div className="w-full flex flex-col items-center h-screen absolute justify-center pointer-events-none">
        <div className="container mx-auto px-[20px] flex flex-col justify-around p-4 absolute w-[280px] h-[360px] sm:w-[450px] sm:py-[20px] sm:px-[30px] py-[10px] px-[20px] backdrop-blur-sm shadow-md shadow-blue-300 bg-white/30 rounded-xl pointer-events-auto">
          <div>
            <h2 className="text-3xl font-bold text-white/80 mb-10">LOGIN</h2>
            <img
              className="absolute right-[-40px] scale-x-[-1] top-[-120px] w-80 pointer-events-none"
              src={`${process.env.PUBLIC_URL}/Assets/human_with_box.png`}
              alt="Human carrying a box"
            />
          </div>
          <div>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="text"
                placeholder=""
                className="peer h-full w-full rounded-md border transition-all duration-300 border-blue-gray-200 border-t-transparent backdrop-blur-md bg-white/0 px-3 py-3 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-300 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-300 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-300 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white">
                <p className="font-bold sm:font-extrabold text-black-100">
                  Npk
                </p>
              </label>
            </div>
            <div className="relative h-11 w-full min-w-[200px] mt-8">
              <input
                type="password"
                placeholder=""
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent backdrop-blur-md bg-white/0 px-3 py-3 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-300 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-300 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-300 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white">
                <p className="font-bold sm:font-extrabold text-black-100">
                  Password
                </p>
              </label>
            </div>
          </div>
          <Link
            to={"/dashboard"}
            className="p-2 mt-4 bg-blue-400 text-center font-bold text-white rounded-md scale-100 hover:scale-110 transition-all duration-300 w-full"
          >
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
