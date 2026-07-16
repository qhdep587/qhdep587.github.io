import React, { useEffect } from "react";
import * as THREE from "three";

const Work = () => {
  useEffect(() => {
    MiniCanvas(1);
    MiniCanvas(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function MiniCanvas(num) {
    //장면
    const scene = new THREE.Scene();

    //카메라
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 50;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 0.95);

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

    const rose_geometry = new THREE.TorusKnotGeometry(5.8, 0.1, 100, 20, 12, 1);
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

  return (
    <div className="work">
      <div className="titleBox">
        <canvas className="mini-canvas-edu" id="mini-canvas"></canvas>
        <span>WORK</span>
        <canvas className="mini-canvas-edu" id="mini-canvas2"></canvas>
      </div>
      <br></br>
      <ul className="edu-text-box">
        <span className="edu-title">◆</span>&nbsp;&nbsp;
        <span className="f20">핵심역량</span>
        <li style={{ fontSize: "10px" }}>&nbsp;</li>
        <li className="list-item f17">
          &nbsp;&nbsp;- 많은 트래픽, 데이터 무게에 관한 이슈 경험
        </li>
        <li className="list-item f17">
          &nbsp;&nbsp;- kafka연동 / 계좌인증, 사업자인증 등
        </li>
        <li className="list-item f17">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;외부 api 연동 경험
        </li>
        <li className="list-item f17">
          &nbsp;&nbsp;- rest api방식의 api생성 및 프론트 연동 경험
        </li>
        <li className="list-item f17">&nbsp;&nbsp;- react 주요 기술 이해</li>
        <li className="list-item f17">&nbsp;&nbsp;- agile경험</li>
        <li className="list-item f17">
          &nbsp;&nbsp;- Next.js(SSR) / TypeScript 프로젝트 경험
        </li>
        <li className="list-item f17">
          &nbsp;&nbsp;- JWT 인증 / AWS, Vercel 배포 경험
        </li>
        <li className="list-item f17">&nbsp;&nbsp;- AI 활용 개발 능숙</li>
        <li style={{ fontSize: "10px" }}>&nbsp;</li>
      </ul>
      <ul className="edu-text-box">
        <span className="edu-title">◆</span>&nbsp;&nbsp;
        <span className="f20">경력</span>&nbsp;&nbsp;
        <span className="f15" style={{ color: "#1e7c60", fontWeight: 600 }}>
          ( 총 5년 2개월 )
        </span>
        <li style={{ fontSize: "10px" }}>&nbsp;</li>
        {/* 이지원 */}
        <li className="list-item">
          &nbsp;&nbsp;<strong>이지원</strong>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
          <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
            <span className="f15" style={{ display: "inline-block" }}>
              <div className="text-btn">role</div>&nbsp;&nbsp;
            </span>
            프론트엔드 / 프리랜서
          </span>
          <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;2025.12 ~ 2026.06
          </span>
          &nbsp;&nbsp;&nbsp;
        </li>
        <li className="list-item" style={{ height: "10px" }} />
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span style={{ color: "#1e7c60", fontWeight: 600 }}>
            &nbsp;&nbsp;&nbsp;&gt;&gt;&nbsp;&nbsp;&nbsp;
          </span>
          <div className="text-btn" style={{ background: "#0e646e" }}>
            React
          </div>
          &nbsp;
          <div className="text-btn" style={{ background: "#226e0b" }}>
            TypeScript
          </div>
          &nbsp;
          <div className="text-btn" style={{ background: "#660c0c" }}>
            JWT
          </div>
          &nbsp;
          <div className="text-btn" style={{ background: "#849908" }}>
            Git
          </div>
          &nbsp;
        </li>
        <li className="list-item" style={{ height: "10px" }} />
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;담당업무&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;금융권
            프로젝트 프론트엔드 개발
          </span>
        </li>
        <li className="list-item" style={{ height: "10px" }} />
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;프로젝트&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;-{" "}
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> ( </span>
            현대차증권
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> )</span> 금융
            업무 시스템 차세대 프로젝트 개발
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;관리자 전체 및 퇴직연금 상품매매,
            인증서인증 등
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;2026.02 ~ 2026.06
          </span>
          &nbsp;&nbsp;&nbsp;
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;-{" "}
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> ( </span>
            하이펀딩
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> )</span>{" "}
            주식담보대출 시스템 개발
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;대출 신청 및 관리, 회원가입, 로그인,
            인증 등
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;2025.12 ~ 2026.02
          </span>
          &nbsp;&nbsp;&nbsp;
        </li>
        <li className="list-item">&nbsp;</li>
        <li className="list-item" style={{ height: "10px" }} />
        <li className="list-item" style={{ height: "10px" }} />
        {/* 컨트롤에이 */}
        <li className="list-item">
          &nbsp;&nbsp;<strong>컨트롤에이</strong>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
          <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
            <span className="f15" style={{ display: "inline-block" }}>
              <div className="text-btn">role</div>&nbsp;&nbsp;
            </span>
            프론트엔드 / 프리랜서
          </span>
          <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;2025.09 ~ 2025.12
          </span>
          &nbsp;&nbsp;&nbsp;
        </li>
        <li className="list-item" style={{ height: "10px" }} />
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span style={{ color: "#1e7c60", fontWeight: 600 }}>
            &nbsp;&nbsp;&nbsp;&gt;&gt;&nbsp;&nbsp;&nbsp;
          </span>
          <div className="text-btn" style={{ background: "#0e646e" }}>
            React
          </div>
          &nbsp;
          <div className="text-btn" style={{ background: "#82097e" }}>
            Next.js
          </div>
          &nbsp;
          <div className="text-btn" style={{ background: "#635506" }}>
            ReactQuery
          </div>
          &nbsp;
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          &nbsp;&nbsp;&nbsp;
          <div className="text-btn" style={{ background: "#580663" }}>
            GitLab
          </div>
          &nbsp;
          <div className="text-btn" style={{ background: "#960f47" }}>
            Vercel
          </div>
          &nbsp;
          <div className="text-btn" style={{ background: "#139492" }}>
            SSR
          </div>
          &nbsp;
        </li>
        <li className="list-item" style={{ height: "10px" }} />
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;담당업무&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;부산시
            배터리여권 통합시스템
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> ( </span>3개
            프로젝트 중 어드민페이지 담당
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> )</span>
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;api연동 및 화면 작업, QA
          </span>
        </li>
        <li className="list-item">&nbsp;</li>
        <li className="list-item" style={{ height: "10px" }} />
        <li className="list-item" style={{ height: "10px" }} />
        {/* 투스카이 */}
        <li className="list-item">
          &nbsp;&nbsp;<strong>투스카이</strong>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
          <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
            <span className="f15" style={{ display: "inline-block" }}>
              <div className="text-btn">role</div>&nbsp;&nbsp;
            </span>
            프론트엔드 / 프리랜서
          </span>
          <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;2025.05 ~ 2025.08
          </span>
          &nbsp;&nbsp;&nbsp;
        </li>
        <li className="list-item" style={{ height: "10px" }} />
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span style={{ color: "#1e7c60", fontWeight: 600 }}>
            &nbsp;&nbsp;&nbsp;&gt;&gt;&nbsp;&nbsp;&nbsp;
          </span>
          <div className="text-btn" style={{ background: "#0e646e" }}>
            React
          </div>
          &nbsp;
          <div className="text-btn" style={{ background: "#82097e" }}>
            Next.js
          </div>
          &nbsp;
        </li>
        <li className="list-item" style={{ height: "10px" }} />
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;담당업무&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;Snowpeak
            본사 프로젝트
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> ( </span>
            D2C 쇼핑몰, 어드민페이지
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> )</span>
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;api연동 및 화면 작업, QA
          </span>
        </li>
        <li className="list-item">&nbsp;</li>
        <li className="list-item" style={{ height: "10px" }} />
        <li className="list-item" style={{ height: "10px" }} />
        {/* 아레스조이 */}
        <li className="list-item">
          &nbsp;&nbsp;<strong>아레스조이</strong>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
          <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
            <span className="f15" style={{ display: "inline-block" }}>
              <div className="text-btn">role</div>&nbsp;&nbsp;
            </span>
            프론트엔드 / 프리랜서
          </span>
          <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;2025.03 ~ 2025.05
          </span>
          &nbsp;&nbsp;&nbsp;
        </li>
        <li className="list-item" style={{ height: "10px" }} />
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span style={{ color: "#1e7c60", fontWeight: 600 }}>
            &nbsp;&nbsp;&nbsp;&gt;&gt;&nbsp;&nbsp;&nbsp;
          </span>
          <div className="text-btn" style={{ background: "#0e646e" }}>
            React
          </div>
          &nbsp;
        </li>
        <li className="list-item" style={{ height: "10px" }} />
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;담당업무&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;감정평가사
            업무용 프로그램 고도화
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;업무가 가장 많은 "메인리스트" 페이지 기능 전부
            담당
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;api연동, 10개의 모달 로직, dataTable, 우클릭메뉴,
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;pdf다운로드, 인쇄, 엑셀, 단축키 로직 등
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;하나의 데이터 및 업무관리 기능의 도메인 제작
          </span>
        </li>
        <li className="list-item">&nbsp;</li>
        <li className="list-item" style={{ height: "10px" }} />
        <li className="list-item" style={{ height: "10px" }} />
        {/* 유케이미디어 */}
        <li className="list-item">
          &nbsp;&nbsp;<strong>유케이미디어</strong>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
          <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
            <span className="f15" style={{ display: "inline-block" }}>
              <div className="text-btn">role</div>&nbsp;&nbsp;
            </span>
            프론트엔드 / 서비스사업팀 연구원
          </span>
          <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;2024.06 ~ 2025.03
          </span>
          &nbsp;&nbsp;&nbsp;
        </li>
        <li className="list-item" style={{ height: "10px" }} />
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span style={{ color: "#1e7c60", fontWeight: 600 }}>
            &nbsp;&nbsp;&nbsp;&gt;&gt;&nbsp;&nbsp;&nbsp;
          </span>
          <div className="text-btn" style={{ background: "#0e646e" }}>
            React
          </div>
          &nbsp;
          <div className="text-btn" style={{ background: "#82097e" }}>
            Next.js
          </div>
          &nbsp;
          <div className="text-btn" style={{ background: "#635506" }}>
            ReactNative
          </div>
          &nbsp;
        </li>
        <li className="list-item" style={{ height: "10px" }} />
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;담당업무&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;프로젝트
            수행 및 자사 몰, 자사 앱 개발
          </span>
        </li>
        <li className="list-item" style={{ height: "10px" }} />
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;프로젝트&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;-{" "}
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> ( </span>
            SK에코플랜트
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> )</span> EPR,
            LOOP 재활용 순환시스템 써큘러
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;재활용 업자, 공제조합 등이 사용하는
            B2B 프로젝트
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;2024.06 ~ 2024.12
          </span>
          &nbsp;&nbsp;&nbsp;
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;-{" "}
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> ( </span>
            자사 몰<span style={{ color: "#1e7c60", fontWeight: 600 }}> )</span>{" "}
            외국인 근로자 이용 가능한 몰
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;-{" "}
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> ( </span>
            자사 소셜앱
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> )</span>{" "}
            자영업자 익명 소셜앱 / ReactNative(Expo)
          </span>
        </li>
        <li className="list-item">&nbsp;</li>
        <li className="list-item" style={{ height: "10px" }} />
        <li className="list-item" style={{ height: "10px" }} />
        {/* 시드아이티 */}
        <li className="list-item">
          &nbsp;&nbsp;<strong>시드아이티</strong>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
          <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
            <span className="f15" style={{ display: "inline-block" }}>
              <div className="text-btn">role</div>&nbsp;&nbsp;
            </span>
            프론트엔드 / 백엔드
          </span>
          <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;2020.10 ~ 2023.07
          </span>
          &nbsp;&nbsp;&nbsp;
        </li>
        <li className="list-item" style={{ height: "10px" }} />
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span style={{ color: "#1e7c60", fontWeight: 600 }}>
            &nbsp;&nbsp;&nbsp;&gt;&gt;&nbsp;&nbsp;&nbsp;
          </span>
          <div className="text-btn" style={{ background: "#82097e" }}>
            Java
          </div>
          &nbsp;
          <div className="text-btn" style={{ background: "#635506" }}>
            SpringBoot
          </div>
          &nbsp;
          <div className="text-btn" style={{ background: "#0e646e" }}>
            React
          </div>
          &nbsp;
          <div className="text-btn" style={{ background: "rgb(30 145 30)" }}>
            Thymeleaf
          </div>
          &nbsp;
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          &nbsp;&nbsp;&nbsp;
          <div className="text-btn" style={{ background: "#226e0b" }}>
            JavaScript
          </div>
          &nbsp;
          <div className="text-btn" style={{ background: "#660c0c" }}>
            MySQL
          </div>
          &nbsp;
          <div className="text-btn" style={{ background: "#580663" }}>
            Kafka
          </div>
          &nbsp;
          <div className="text-btn" style={{ background: "#849908" }}>
            Git
          </div>
          &nbsp;
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          &nbsp;&nbsp;&nbsp;
          <div className="text-btn" style={{ background: "#960f47" }}>
            Slack
          </div>
          &nbsp;
          <div className="text-btn" style={{ background: "#139492" }}>
            Jira
          </div>
          &nbsp;
          <div className="text-btn" style={{ background: "#9c8610" }}>
            confluence
          </div>
          &nbsp;
          <div className="text-btn" style={{ background: "#0e5202" }}>
            swagger
          </div>
          &nbsp;
        </li>
        <li className="list-item" style={{ height: "10px" }} />
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;담당업무&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;개발지원
          </span>
        </li>
        <li className="list-item" style={{ height: "10px" }} />
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;프로젝트&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;-{" "}
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> ( </span>
            쿠쿠
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> )</span> 쿠쿠
            UI/UX 개선 사업
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;2023.05 ~ 2023.07
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> ( </span>3 개월
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> )</span>
          </span>
          &nbsp;&nbsp;&nbsp;
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;-{" "}
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> ( </span>
            마켓컬리
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> )</span> 3p
            파트너센터 / 파트너어드민
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;2021.07 ~ 2023.06
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> ( </span>1년
            11개월
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> )</span>
          </span>
          &nbsp;&nbsp;&nbsp;
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;-{" "}
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> ( </span>
            STX<span style={{ color: "#1e7c60", fontWeight: 600 }}>
              {" "}
              )
            </span>{" "}
            계약직 계약/인사 관리시스템 구축
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;2020.10 ~ 2021.06
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> ( </span>9 개월
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> )</span>
          </span>
          &nbsp;&nbsp;&nbsp;
        </li>
        <li className="list-item">&nbsp;</li>
        <li className="list-item" style={{ height: "10px" }} />
        <li className="list-item" style={{ height: "10px" }} />
        <li className="list-item">
          &nbsp;&nbsp;<strong>위젯누리</strong>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
          <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
            <span className="f15" style={{ display: "inline-block" }}>
              <div className="text-btn">role</div>&nbsp;&nbsp;
            </span>
            퍼블리시 / 프론트엔드
          </span>
          <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;2020.07 ~ 2020.10&nbsp;&nbsp;&nbsp;
          </span>
        </li>
        <li className="list-item" style={{ height: "10px" }} />
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span style={{ color: "#1e7c60", fontWeight: 600 }}>
            &nbsp;&nbsp;&nbsp;&gt;&gt;&nbsp;&nbsp;&nbsp;
          </span>
          <div className="text-btn" style={{ background: "#82097e" }}>
            HTML5
          </div>
          &nbsp;
          <div className="text-btn" style={{ background: "#635506" }}>
            CSS3
          </div>
          &nbsp;
          <div className="text-btn" style={{ background: "#0e646e" }}>
            JavaScript
          </div>
          &nbsp;
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          &nbsp;&nbsp;&nbsp;
          <div className="text-btn" style={{ background: "#226e0b" }}>
            JQuery
          </div>
          &nbsp;
          <div className="text-btn" style={{ background: "#660c0c" }}>
            ExtJS
          </div>
          &nbsp;
          <div className="text-btn" style={{ background: "#580663" }}>
            PhotoShop
          </div>
          &nbsp;
        </li>
        <li className="list-item" style={{ height: "10px" }} />
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;담당업무&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;extJs이용하여
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;데스크탑 디자인 기반의 솔루션
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> ( </span>
            백신,장비관리 등
            <span style={{ color: "#1e7c60", fontWeight: 600 }}> )</span>
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;퍼블, 프론트작업
          </span>
        </li>
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <span className="f15" style={{ display: "inline-block" }}>
            &nbsp;&nbsp;&nbsp;chart라이브러리 이용하여 대시보드 작업
          </span>
        </li>
        {/* <li className="list-item" style={{ height: "10px" }} />
        <li
          className="list-item list-item-sub"
          style={{ position: "relative", Left: "4.2%" }}
        >
          <Link
            className="link"
            to="/project"
            onClick={(e) => linkFn(e.target, 4)}
          >
            &nbsp;&nbsp;&nbsp;project &gt;&gt;&nbsp;&nbsp;&nbsp;
          </Link>
        </li> */}
        <li>&nbsp;</li>
        <li>&nbsp;</li>
      </ul>
    </div>
  );
};

export default Work;
