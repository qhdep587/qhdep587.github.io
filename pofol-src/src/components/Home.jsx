import React, { useEffect } from "react";
import TypeIt from "typeit-react";
import * as THREE from "three";

const Home = () => {
  useEffect(() => {
    MyCanvas();
  }, []);
  function MyCanvas() {
    //장면
    const scene = new THREE.Scene();

    //카메라
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 50;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 15);

    //렌더러
    const canvas = document.querySelector("#canvas");
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    //도형
    const Octahedron1_geometry = new THREE.OctahedronGeometry(1.3, 0);
    const Octahedron1_material = new THREE.MeshPhongMaterial({
      color: "#9c8402",
    });
    const Octahedron1 = new THREE.Mesh(
      Octahedron1_geometry,
      Octahedron1_material
    );
    scene.add(Octahedron1);

    const Octahedron2_geometry = new THREE.OctahedronGeometry(1.3, 0);
    const Octahedron2_material = new THREE.MeshPhongMaterial({
      color: "#9c8402",
    });
    const Octahedron2 = new THREE.Mesh(
      Octahedron2_geometry,
      Octahedron2_material
    );
    scene.add(Octahedron2);

    const Octahedron3_geometry = new THREE.OctahedronGeometry(1.3, 0);
    const Octahedron3_material = new THREE.MeshPhongMaterial({
      color: "#9c8402",
    });
    const Octahedron3 = new THREE.Mesh(
      Octahedron3_geometry,
      Octahedron3_material
    );
    scene.add(Octahedron3);

    const Octahedron4_geometry = new THREE.OctahedronGeometry(1.3, 0);
    const Octahedron4_material = new THREE.MeshPhongMaterial({
      color: "#9c8402",
    });
    const Octahedron4 = new THREE.Mesh(
      Octahedron4_geometry,
      Octahedron4_material
    );
    scene.add(Octahedron4);

    const leaf_geometry = new THREE.CapsuleGeometry(4, 9, 1, 2);
    const leaf_material = new THREE.MeshStandardMaterial({
      color: "rgb(0, 64, 0)",
    });
    const leaf = new THREE.Mesh(leaf_geometry, leaf_material);
    leaf.position.set(6, 6, -8);
    leaf.rotation.set(1.2, 0.2, -0.7);
    scene.add(leaf);
    const rose_geometry = new THREE.TorusKnotGeometry(
      5.8,
      0.35,
      100,
      20,
      12,
      1
    );
    const rose_material = new THREE.MeshLambertMaterial({ color: "#9b0707" });
    const rose = new THREE.Mesh(rose_geometry, rose_material);
    scene.add(rose);

    //빛
    const ambientLight = new THREE.AmbientLight("#c0c0c0", 0.5);
    const directionalLight = new THREE.DirectionalLight("ivory", 0.35);
    directionalLight.position.set(-2, 4, 3);
    scene.add(ambientLight);
    scene.add(directionalLight);

    function render(time) {
      time *= 0.0005; // 회전 속도
      //회전
      rose.rotation.z -= 0.005;
      Octahedron1.rotation.z = time * 4;
      Octahedron1.rotation.x = time * 4;
      Octahedron1.rotation.y = time * 4;
      Octahedron2.rotation.z = time;
      Octahedron2.rotation.x = time;
      Octahedron2.rotation.y = time;
      Octahedron3.rotation.z = time * 2;
      Octahedron3.rotation.x = time * 2;
      Octahedron3.rotation.y = time * 2;
      Octahedron4.rotation.z = time * 3;
      Octahedron4.rotation.x = time * 3;
      Octahedron4.rotation.y = time * 3;

      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      requestAnimationFrame(render);
    }
    render();

    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }
  }

  return (
    <div className="home">
      <div className="home-item1">
        <div className="home-app">
          <TypeIt
            style={{
              color: "ivory",
              paddingTop: "5px",
              height: "100%",
            }}
            options={{ startDelay: 900, speed: 100, loop: true }}
            getBeforeInit={(instance) => {
              instance
                .type(
                  '<span class="red"> @</span><span class="green">}-----</span> '
                )
                .pause(1500)
                .delete(9)
                .pause(1500)
                .type(
                  "Every <span class='text-rose'>flower</span> blooms in it's <text class='text-bold'>own time. </span>"
                )
                .pause(1100)
                .delete(38, {
                  delay: 1000,
                })
                .pause(700)
                .type('모든 <span class="text-rose">꽃은</span> , ')
                .pause(700)
                .type(
                  '&nbsp; 각자의 <span class="text-bold">시기에</span> 피어난다. '
                )
                .pause(1500)
                .delete(2)
                .pause(100)
                .delete(2)
                .pause(100)
                .delete(35)
                .pause(500)
                .type("반갑습니다.&nbsp;&nbsp;", {
                  delay: 100,
                })
                .pause(300)
                .type("Developer&nbsp;&nbsp;", {
                  delay: 100,
                })
                .pause(300)
                .move(-12)
                .type('&nbsp;<span class="text-bold">Front-end</span>&nbsp;')
                .pause(300)
                .move(12)
                .type("dle", { delay: 190 })
                .delete(3, { delay: 200 })
                .type('<span class="text-rose">이대윤</span>입니다. ', {
                  delay: 100,
                })
                .pause(1000);

              return instance;
            }}
          ></TypeIt>
        </div>
      </div>
      <div className="home-item2">
        <canvas className="canvas-item" id="canvas"></canvas>
      </div>
      <div className="home-item3">© 2026 DaeYun Lee. All Rights Reserved.</div>
    </div>
  );
};

export default Home;
