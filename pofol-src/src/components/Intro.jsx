import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Intro = () => {
  useEffect(() => {
    MyCanvas1();
    MyCanvas2();
    MiniCanvas(1);
    MiniCanvas(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function MyCanvas1() {
    //장면
    const scene = new THREE.Scene();

    //카메라
    const fov = 50;
    const aspect = 2;
    const near = 1;
    const far = 4000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 100);

    //렌더러
    const canvas = document.querySelector("#intro-canvas1");
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    const roomBox = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1, 128, 128),
      new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 1.0 },
        },
        vertexShader: `
        varying vec3 vEC;
        uniform float time;

        float iqhash(float n) {
          return fract(sin(n) * 43758.5453);
        }

        float noise(vec3 x) {
          vec3 p = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);
          float n = p.x + p.y * 57.0 + 113.0 * p.z;
          return mix(mix(mix(iqhash(n), iqhash(n + 1.0), f.x),
                     mix(iqhash(n + 57.0), iqhash(n + 58.0), f.x), f.y),
                     mix(mix(iqhash(n + 113.0), iqhash(n + 114.0), f.x),
                     mix(iqhash(n + 170.0), iqhash(n + 171.0), f.x), f.y), f.z);
        }

        float xmb_noise2(vec3 x) {
          return cos(x.z * 4.0) * cos(x.z + time / 10.0 + x.x);
        }

        void main() {
          vec4 pos = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          vec3 v = vec3(pos.x, 0.0, pos.y);
          vec3 v2 = v;
          vec3 v3 = v;

          v.y = xmb_noise2(v2) / 8.0;

          v3.x -= time / 5.0;
          v3.x /= 4.0;

          v3.z -= time / 10.0;
          v3.y -= time / 100.0;

          v.z -= noise(v3 * 7.0) / 15.0;
          v.y -= noise(v3 * 7.0) / 15.0 + cos(v.x * 2.0 - time / 2.0) / 5.0 - 0.3;

          vEC = v;
          gl_Position = vec4(v, 1.0);
        }
      `,
        fragmentShader: `
        uniform float time;
        varying vec3 vEC;

        void main()
        {
           const vec3 up = vec3(0.0, 0.0, 1.0);
           vec3 x = dFdx(vEC);
           vec3 y = dFdy(vEC);
           vec3 normal = normalize(cross(x, y));
           float c = 1.0 - dot(normal, up);
           c = (1.0 - cos(c * c)) / 3.0;
           gl_FragColor = vec4(1.0, 1.0, 1.0, c * 1.5);
        }
      `,
        extensions: {
          derivatives: true,
          fragDepth: false,
          drawBuffers: false,
          shaderTextureLOD: false,
        },
        side: THREE.DoubleSide,
        transparent: true,
        depthTest: false,
      })
    );

    scene.add(roomBox);

    const resizeRendererToDisplaySize = () => {
      const container = renderer.domElement;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(devicePixelRatio);

      roomBox.scale.set(camera.aspect * 1.55, 0.75, 1);
    };

    window.addEventListener("resize", resizeRendererToDisplaySize);
    window.removeEventListener("resize", resizeRendererToDisplaySize);
    const animate = () => {
      roomBox.material.uniforms.time.value += 0.01;

      renderer.render(scene, camera);
      requestAnimationFrame(() => animate());
    };

    function render(time) {
      time *= 0.0005; // 회전 속도

      renderer.dispose();
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
      if (resizeRendererToDisplaySize()) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      requestAnimationFrame(render);
    }
    render();

    window.cancelAnimationFrame(animate());
  }

  function MyCanvas2() {
    //장면
    const scene = new THREE.Scene();

    //카메라
    const fov = 75;
    const aspect = 2;
    const near = 0.01;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 5);

    //렌더러
    const canvas = document.querySelector("#intro-canvas2");
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    //벽 텍스처
    const texture1 = new THREE.TextureLoader().load(
      require("../common/image/rose.jpg")
    );
    const texture2 = new THREE.TextureLoader().load(
      require("../common/image/res.jpg")
      // require("../common/card/danny-main2.jpg")
    );
    const texture2_pic = new THREE.TextureLoader().load(
      require("../common/image/resItem.png")
      // require("../common/card/danny-main1.png")
    );
    const blackCarpet = new THREE.TextureLoader().load(
      require("../common/image/blackCarpet.jpg")
    );

    //마우스컨트롤
    const controll = new OrbitControls(camera, renderer.domElement);
    controll.enableDamping = true;
    if (window.innerWidth < 1000 && window.innerWidth >= 768) {
      controll.minDistance = 30;
    } else if (window.innerWidth < 768 && window.innerWidth >= 660) {
      controll.minDistance = 30;
    } else if (window.innerWidth < 660) {
      controll.minDistance = 38;
    } else if (window.innerWidth < 500) {
      controll.minDistance = 15;
    } else {
      controll.minDistance = 36;
    }
    controll.maxDistance = 1000;
    controll.enableZoom = false;
    controll.update();

    //큰액자 사진
    const pic_geometry = new THREE.BoxGeometry(20, 32);
    const pic_material = new THREE.MeshLambertMaterial({
      map: texture1,
      transparent: true,
      opacity: 0.8,
    });
    const pic = new THREE.Mesh(pic_geometry, pic_material);
    pic.position.set(-5.5, 0, -1.2);
    pic.rotation.set(-0.1, 0, 0.3);
    scene.add(pic);

    //큰사진프레임
    const pic_geometry3 = new THREE.BoxGeometry(23, 35);
    const pic_material3 = [
      new THREE.MeshBasicMaterial({
        map: blackCarpet,
      }),
      new THREE.MeshBasicMaterial({
        map: blackCarpet,
      }),
      new THREE.MeshBasicMaterial({
        map: blackCarpet,
      }),
      new THREE.MeshBasicMaterial({
        map: blackCarpet,
      }),
      new THREE.MeshBasicMaterial({
        map: blackCarpet,
      }),
      new THREE.MeshBasicMaterial({
        map: blackCarpet,
      }),
    ];
    pic_material3.side = THREE.BackSide;
    const pic3 = new THREE.Mesh(pic_geometry3, pic_material3);
    pic3.position.set(-5.5, 0, -1.3);
    pic3.rotation.set(-0.1, 0, 0.3);
    scene.add(pic3);

    //작은액자 사진
    const pic_geometry2 = new THREE.BoxGeometry(18, 18, 0.5);
    const pic_material2 = [
      new THREE.MeshBasicMaterial({
        map: blackCarpet,
      }),
      new THREE.MeshBasicMaterial({
        map: blackCarpet,
      }),
      new THREE.MeshBasicMaterial({
        map: blackCarpet,
      }),
      new THREE.MeshBasicMaterial({
        map: blackCarpet,
      }),
      new THREE.MeshLambertMaterial({
        map: texture2,
        transparent: true,
        opacity: 0.9,
      }),
      new THREE.MeshBasicMaterial({
        map: blackCarpet,
      }),
    ];
    const pic2 = new THREE.Mesh(pic_geometry2, pic_material2);
    pic2.position.set(4, -2, 2.3);
    pic2.rotation.set(0, 0, 0);
    scene.add(pic2);
    //작은액자 사진2
    const pic_geometry2_pic = new THREE.PlaneGeometry(17.8, 17.8);
    // const pic_geometry2_pic = new THREE.PlaneGeometry(5.3, 16);
    const pic_material2_pic = new THREE.MeshLambertMaterial({
      map: texture2_pic,
      transparent: true,
      opacity: 1,
      alphaToCoverage: false,
    });
    const pic2_pic = new THREE.Mesh(pic_geometry2_pic, pic_material2_pic);
    pic2_pic.position.set(4.4, -2.59, 5);
    // pic2_pic.position.set(4.4, -3.55, 5);
    pic2_pic.rotation.set(0, 0, 0);
    scene.add(pic2_pic);

    //작은사진프레임
    const pic_geometry2_1 = new THREE.BoxGeometry(21, 21, 0.5);
    const pic_material2_1 = [
      new THREE.MeshBasicMaterial({
        map: blackCarpet,
      }),
      new THREE.MeshBasicMaterial({
        map: blackCarpet,
      }),
      new THREE.MeshBasicMaterial({
        map: blackCarpet,
      }),
      new THREE.MeshBasicMaterial({
        map: blackCarpet,
      }),
      new THREE.MeshBasicMaterial({
        map: blackCarpet,
      }),
      new THREE.MeshBasicMaterial({
        map: blackCarpet,
      }),
    ];
    const pic2_1 = new THREE.Mesh(pic_geometry2_1, pic_material2_1);
    pic2_1.position.set(4, -2, 2.2);
    pic2_1.rotation.set(0, 0, 0);
    scene.add(pic2_1);

    //액자 틀 효과
    //중앙1
    const fr_geometry = new THREE.BoxGeometry(0.3, 4, 0.3);
    const fr_material = new THREE.MeshLambertMaterial({
      color: "rgb(197, 220, 205)",
      transparent: true,
      opacity: 0.7,
    });
    const fr = new THREE.Mesh(fr_geometry, fr_material);
    fr.position.set(4, -2, 6.2);
    fr.rotation.set(0, 0, 0);
    scene.add(fr);
    //중앙2
    const fr_geometry2 = new THREE.BoxGeometry(4, 0.3, 0.3);
    const fr_material2 = new THREE.MeshLambertMaterial({
      color: "rgb(197, 220, 205)",
      transparent: true,
      opacity: 0.7,
    });
    const fr2 = new THREE.Mesh(fr_geometry2, fr_material2);
    fr2.position.set(4, -2, 6.2);
    fr2.rotation.set(0, 0, 0);
    scene.add(fr2);
    //좌상틀1
    const fr_geometry3 = new THREE.BoxGeometry(0.5, 4, 0.5);
    const fr_material3 = new THREE.MeshLambertMaterial({
      color: "rgb(197, 220, 205)",
      transparent: true,
      opacity: 0.7,
    });
    const fr3 = new THREE.Mesh(fr_geometry3, fr_material3);
    fr3.position.set(-5.9, 6.12, 3.7);
    fr3.rotation.set(0, 0, 0);
    scene.add(fr3);
    //좌상틀2
    const fr_geometry4 = new THREE.BoxGeometry(4, 0.5, 0.5);
    const fr_material4 = new THREE.MeshLambertMaterial({
      color: "rgb(197, 220, 205)",
      transparent: true,
      opacity: 0.7,
    });
    const fr4 = new THREE.Mesh(fr_geometry4, fr_material4);
    fr4.position.set(-4.16, 7.87, 3.7);
    fr4.rotation.set(0, 0, 0);
    scene.add(fr4);
    //좌하틀1
    const fr_geometry9 = new THREE.BoxGeometry(0.5, 4, 0.5);
    const fr_material9 = new THREE.MeshLambertMaterial({
      color: "rgb(197, 220, 205)",
      transparent: true,
      opacity: 0.7,
    });
    const fr9 = new THREE.Mesh(fr_geometry9, fr_material9);
    fr9.position.set(-5.9, -9.86, 3.7);
    fr9.rotation.set(0, 0, 0);
    scene.add(fr9);
    //좌하틀2
    const fr_geometry10 = new THREE.BoxGeometry(4, 0.5, 0.5);
    const fr_material10 = new THREE.MeshLambertMaterial({
      color: "rgb(197, 220, 205)",
      transparent: true,
      opacity: 0.7,
    });
    const fr10 = new THREE.Mesh(fr_geometry10, fr_material10);
    fr10.position.set(-4.16, -11.63, 3.7);
    fr10.rotation.set(0, 0, 0);
    scene.add(fr10);

    //우상틀1
    const fr_geometry5 = new THREE.BoxGeometry(0.5, 4, 0.5);
    const fr_material5 = new THREE.MeshLambertMaterial({
      color: "rgb(197, 220, 205)",
      transparent: true,
      opacity: 0.7,
    });
    const fr5 = new THREE.Mesh(fr_geometry5, fr_material5);
    fr5.position.set(13.6, 6.12, 3.7);
    fr5.rotation.set(0, 0, 0);
    scene.add(fr5);
    //우상틀2
    const fr_geometry6 = new THREE.BoxGeometry(4, 0.5, 0.5);
    const fr_material6 = new THREE.MeshLambertMaterial({
      color: "rgb(197, 220, 205)",
      transparent: true,
      opacity: 0.7,
    });
    const fr6 = new THREE.Mesh(fr_geometry6, fr_material6);
    fr6.position.set(11.855, 7.87, 3.7);
    fr6.rotation.set(0, 0, 0);
    scene.add(fr6);

    //우하틀1
    const fr_geometry7 = new THREE.BoxGeometry(0.5, 4, 0.5);
    const fr_material7 = new THREE.MeshLambertMaterial({
      color: "rgb(197, 220, 205)",
      transparent: true,
      opacity: 0.7,
    });
    fr_material7.side = THREE.BackSide;
    const fr7 = new THREE.Mesh(fr_geometry7, fr_material7);
    fr7.position.set(13.6, -9.86, 3.7);
    fr7.rotation.set(0, 0, 0);
    scene.add(fr7);
    //우하틀2
    const fr_geometry8 = new THREE.BoxGeometry(4, 0.5, 0.5);
    const fr_material8 = new THREE.MeshLambertMaterial({
      color: "rgb(197, 220, 205)",
      transparent: true,
      opacity: 0.7,
    });
    const fr8 = new THREE.Mesh(fr_geometry8, fr_material8);
    fr8.position.set(11.855, -11.63, 3.7);
    fr8.rotation.set(0, 0, 0);
    scene.add(fr8);

    //빛
    const ambientLight = new THREE.AmbientLight("white", 0.85);
    const directionalLight = new THREE.DirectionalLight("green", 0.1);
    const directionalLight2 = new THREE.DirectionalLight("#750f0f", 0.3);
    directionalLight.position.set(0, 0, 4);
    directionalLight2.position.set(0, 0, 4);
    scene.add(ambientLight);
    scene.add(directionalLight);
    scene.add(directionalLight2);

    function render(time) {
      //회전
      camera.lookAt(0, 0, 0);
      camera.rotation.y -= 0.005;

      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
      if (resizeRendererToDisplaySize()) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      requestAnimationFrame(render);
    }
    render();

    function resizeRendererToDisplaySize() {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    window.addEventListener("resize", resizeRendererToDisplaySize);
    resizeRendererToDisplaySize();
  }

  function MiniCanvas(num) {
    //장면
    const scene = new THREE.Scene();

    //카메라
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 50;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 1);

    //렌더러
    let canvas;
    if (num === 1) {
      canvas = document.querySelector("#mini-canvas");
    } else {
      canvas = document.querySelector("#mini-canvas" + num);
    }
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    //도형
    const Octahedron1_geometry = new THREE.OctahedronGeometry(0.3, 0);
    const Octahedron1_material = new THREE.MeshNormalMaterial({});
    const Octahedron1 = new THREE.Mesh(
      Octahedron1_geometry,
      Octahedron1_material
    );
    scene.add(Octahedron1);
    Octahedron1.position.set(0, 0, 0);

    const rose_geometry = new THREE.TorusKnotGeometry(8, 0.1, 100, 20, 12, 1);
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

  Timer();
  const [tf, setTf] = useState(true);
  function Timer() {
    setTimeout(() => {
      if (tf) setTf(!tf);
    }, 2200);
  }

  return (
    <div className="intro">
      <div className="intro-item">
        <div className="alim-move" style={{ display: tf ? "" : "none" }}>
          <img
            className="alim-move"
            src={require("../common/image/pointer.png")}
            alt="pointer_img"
          />
        </div>
        <canvas className="intro-canvas-item1" id="intro-canvas1"></canvas>
        <canvas className="intro-canvas-item2" id="intro-canvas2"></canvas>
      </div>
      <div className="intro-item">
        <div className="intro-title">
          <canvas className="mini-canvas" id="mini-canvas"></canvas>
          <span>INTRO</span>
          <canvas className="mini-canvas" id="mini-canvas2"></canvas>
        </div>
        <br />
        <br />
        <div className="intro-text-box">
          저는 눈에 바로 들어오는 것을 좋아하여
          <br />
          <span className="text-bold fsfw">Front-end</span>
          &nbsp;Developer에 <br />
          초점을 맞추게 되었습니다.
          <br />
          <br />
          항상 <span className="text-rose fsfw">사용자</span> 입장에서 생각하고,
          <br />
          지루하지 않은 화면과
          <br />
          최적의 편리함을 추구하는 자세로
          <br />
          개발에 임하고 있습니다.
          <br />
          <br />
          방문해주셔서&nbsp;감사합니다.
        </div>
      </div>
    </div>
  );
};

export default Intro;
