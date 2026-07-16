/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import * as THREE from "three";

const Project = () => {
  useEffect(() => {
    MiniCanvas(1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [goStop, setGoStop] = useState(true);
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
    const Octahedron1 = new THREE.Mesh(Octahedron1_geometry, Octahedron1_material);
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

    switch (num) {
      case 1:
        MiniCanvas(2);
        break;
      case 2:
        MiniCanvas(3);
        break;
      case 3:
        MiniCanvas(4);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    let carousel = "";
    let startX = "";
    let startScrollLeft = "";
    let mCheck = false;
    const isMobile = () => {
      const user = navigator.userAgent;
      mCheck = false;
      if (user.indexOf("iPhone") > -1 || user.indexOf("Android") > -1) {
        mCheck = true;
      }

      return mCheck;
    };
    isMobile();

    if (mCheck) {
      ///모바일 일 때
      carousel = document.querySelector(".carousel");
      let carousel_scrollWidth = document.querySelector(".carousel").scrollWidth;
      let carousel_clientWidth = document.querySelector(".carousel").clientWidth;
      let carousel_width = carousel_scrollWidth - carousel_clientWidth;

      let isDragging = false;
      const dragStart = (e) => {
        setGoStop(true);
        isDragging = true;
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
      };
      const dragging = (e) => {
        if (!isDragging) return;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
        if (carousel.scrollLeft < 3) {
          document.querySelector("#left1").classList.add("opa5");
        } else if (carousel.scrollLeft > carousel_width - 30) {
          document.querySelector("#right1").classList.add("opa5");
        } else {
          document.querySelector("#left1").classList.remove("opa5");
          document.querySelector("#right1").classList.remove("opa5");
        }
        setGoStop(false);
      };
      const dragStop = (e) => {
        isDragging = false;
      };

      if (isDragging) {
        document.querySelector(".project").classList.add("stop-scrollY");
      } else {
        document.querySelector(".project").classList.remove("stop-scrollY");
      }

      carousel.addEventListener("touchstart", dragStart);
      carousel.addEventListener("touchmove", dragging);
      carousel.addEventListener("touchend", dragStop);
    } else {
      //pc일때
      carousel = document.querySelector(".carousel");
      let carousel_scrollWidth = document.querySelector(".carousel").scrollWidth;
      let carousel_clientWidth = document.querySelector(".carousel").clientWidth;
      let carousel_width = carousel_scrollWidth - carousel_clientWidth;

      let isDragging = false;
      const dragStart = (e) => {
        setGoStop(true);
        isDragging = true;
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
      };
      const dragging = (e) => {
        if (!isDragging) return;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
        if (carousel.scrollLeft < 3) {
          document.querySelector("#left1").classList.add("opa5");
        } else if (carousel.scrollLeft > carousel_width - 30) {
          document.querySelector("#right1").classList.add("opa5");
        } else {
          document.querySelector("#left1").classList.remove("opa5");
          document.querySelector("#right1").classList.remove("opa5");
        }
        setGoStop(false);
      };
      const dragStop = (e) => {
        isDragging = false;
      };
      carousel.addEventListener("mousedown", dragStart);
      carousel.addEventListener("mousemove", dragging);
      carousel.addEventListener("mouseup", dragStop);
      carousel.addEventListener("mouseleave", dragStop);
    }
  }, []);
  useEffect(() => {
    let carousel2 = "";
    let startX = "";
    let startScrollLeft = "";
    let mCheck2 = false;
    const isMobile = () => {
      const user = navigator.userAgent;
      mCheck2 = false;

      if (user.indexOf("iPhone") > -1 || user.indexOf("Android") > -1) {
        mCheck2 = true;
      }

      return mCheck2;
    };
    isMobile();

    if (mCheck2) {
      ///모바일 일 때
      carousel2 = document.querySelector(".carousel2");
      let carousel_scrollWidth = document.querySelector(".carousel2").scrollWidth;
      let carousel_clientWidth = document.querySelector(".carousel2").clientWidth;
      let carousel_width = carousel_scrollWidth - carousel_clientWidth;

      let isDragging = false;
      const dragStart = (e) => {
        setGoStop(true);
        isDragging = true;
        startX = e.pageX;
        startScrollLeft = carousel2.scrollLeft;
      };
      const dragging = (e) => {
        if (!isDragging) return;
        carousel2.scrollLeft = startScrollLeft - (e.pageX - startX);
        if (carousel2.scrollLeft < 3) {
          document.querySelector("#left1").classList.add("opa5");
        } else if (carousel2.scrollLeft > carousel_width - 30) {
          document.querySelector("#right1").classList.add("opa5");
        } else {
          document.querySelector("#left1").classList.remove("opa5");
          document.querySelector("#right1").classList.remove("opa5");
        }
        setGoStop(false);
      };
      const dragStop = (e) => {
        isDragging = false;
      };

      if (isDragging) {
        document.querySelector(".project").classList.add("stop-scrollY");
      } else {
        document.querySelector(".project").classList.remove("stop-scrollY");
      }

      carousel2.addEventListener("touchstart", dragStart);
      carousel2.addEventListener("touchmove", dragging);
      carousel2.addEventListener("touchend", dragStop);
    } else {
      //pc일때
      carousel2 = document.querySelector(".carousel2");
      let carousel_scrollWidth = document.querySelector(".carousel2").scrollWidth;
      let carousel_clientWidth = document.querySelector(".carousel2").clientWidth;
      let carousel_width = carousel_scrollWidth - carousel_clientWidth;

      let isDragging = false;
      const dragStart = (e) => {
        setGoStop(true);
        isDragging = true;
        startX = e.pageX;
        startScrollLeft = carousel2.scrollLeft;
      };
      const dragging = (e) => {
        if (!isDragging) return;
        carousel2.scrollLeft = startScrollLeft - (e.pageX - startX);
        if (carousel2.scrollLeft < 3) {
          document.querySelector("#left2").classList.add("opa5");
        } else if (carousel2.scrollLeft > carousel_width - 30) {
          document.querySelector("#right2").classList.add("opa5");
        } else {
          document.querySelector("#left2").classList.remove("opa5");
          document.querySelector("#right2").classList.remove("opa5");
        }
        setGoStop(false);
      };
      const dragStop = (e) => {
        isDragging = false;
      };
      carousel2.addEventListener("mousedown", dragStart);
      carousel2.addEventListener("mousemove", dragging);
      carousel2.addEventListener("mouseup", dragStop);
      carousel2.addEventListener("mouseleave", dragStop);
    }
  }, []);

  Timer();
  const [tf, setTf] = useState(true);
  function Timer() {
    setTimeout(() => {
      if (tf) setTf(!tf);
    }, 2200);
  }

  //모달state
  const [projectCate, setProjectCate] = useState("COMPANY"); //프로젝트 카테고리
  const [projectTitle, setProjectTitle] = useState("cuckoo(쿠쿠)"); //프로젝트 제목
  const [projectSubTitle, setProjectSubTitle] = useState("UI/UX 개선 사업"); //프로젝트 부제목
  const [projectInfo, setProjectInfo] = useState("2023.05 ~ 2023.07 (3개월) / 프론트엔드 / 모바일화면"); //프로젝트 소개
  const [projectSkill, setProjectSkill] = useState(["Html", "Expression Language Tag", "Jira", "Github"]); //프로젝트 스킬
  const [endNum, setEndNum] = useState(3); //사진갯수
  const [currentNum, setCurrentNum] = useState(1); //현재사진 카운트
  const [photoUrl, setPhotoUrl] = useState("cuckoo-main"); //사진url
  const [content, setContent] = useState(
    <>
      Thymeleaf 태그 사용하여 작업했습니다. <br></br> ui/ux 고도화업무 및 협업 jira, github 이용 <br></br>객체화 및
      타임딜 기능 개발"
    </>
  );
  //화살표 클릭 시 카드 단위 스크롤
  const arrowScroll = (sel, dir, leftId, rightId) => {
    const el = document.querySelector(sel);
    el.scrollBy({ left: dir * 290, behavior: "smooth" });
    setTimeout(() => {
      const maxLeft = el.scrollWidth - el.clientWidth;
      document.getElementById(leftId).classList.toggle("opa5", el.scrollLeft < 3);
      document.getElementById(rightId).classList.toggle("opa5", el.scrollLeft > maxLeft - 30);
    }, 400);
  };

  const cardClick = (e, num) => {
    if (goStop) {
      switch (num) {
        case 11: //쿠쿠
          setProjectCate("COMPANY");
          setProjectTitle("cuckoo(쿠쿠)");
          setProjectSubTitle("UI/UX 개선 사업");
          setProjectInfo("2023.05 ~ 2023.07 (3개월) / FE / 모바일화면");
          setProjectSkill(["Html", "Thymeleaf", "JavaScript", "Jira", "Github"]);
          setEndNum(3);
          setPhotoUrl("cuckoo-main");
          setContent(
            <>
              <p>
                Thymeleaf 태그 사용하는<br></br>ui/ux 고도화 작업 프로젝트 였으며,<br></br>pc화면 mobile화 및 타임딜
                기능 개발,<br></br>
                객체화 작업 등 진행했습니다.<br></br>
                <br></br>협업은 jira, github 이용했습니다.
              </p>
            </>
          );
          break;
        case 12: //마켓컬리
          setProjectCate("COMPANY");
          setProjectTitle("마켓컬리");
          setProjectSubTitle("3p 파트너센터 / 파트너어드민");
          setProjectInfo("2021.07 ~ 2023.06 (23개월) / BE,FE");
          setProjectSkill([
            "Java",
            "SpringBoot",
            "React",
            "JavaScript",
            "MySQL",
            "Kafka",
            "Redis",
            "Github",
            "Slack",
            "Confluence",
            "Datadog",
            "Swagger",
          ]);
          setEndNum(19);
          setPhotoUrl("kurly-main");
          setContent(
            <>
              기획 단계 이후 바로 투입되어<br></br>
              오픈 및 QA, 프로젝트 마무리까지<br></br>
              agile방식으로 진행 했던 프로젝트입니다.<br></br>
              <br></br>
              마켓컬리의 판매자가 이용하는 파트너 센터와<br></br>
              판매자 및 상품을 관리하는 RM, MD 등 <br></br>관리자가 이용하는 파트너 어드민이 있습니다.<br></br>
              <br></br>
              파트너 / 계정 / 상품 / 배송 / <br></br>주문 / 정산 / 대시보드 / 보안상 이력 등의 <br></br>여러 도메인이
              있었고 모든 부분에 참여했습니다.<br></br>
              git과 젠킨스 자동빌드를 사용하였고,<br></br>
              aws서버에 배포 전 리뷰를 받고 진행하는 과정까지 맡았습니다.
              <br></br>
              <br></br>
              초기 view구축이 급한 단계에는 프론트 담당으로<br></br>
              여러 라이브러리로 그리드 위주의 화면을 만들고 <br></br>
              axios이용 rest api방식의 연동을 했습니다.<br></br>
              ssr, csr, seo, component, props, hooks, <br></br>router, life cycle 등의 이해를 동반하며 작업했습니다.
              <br></br>
              <br></br>
              화면이 진행된 후 <br></br>백엔드와 프론트를 같이 담당했습니다.
              <br></br>
              spring boot와 mysql이용하여 api 생성 및 수정 작업<br></br>
              kafka연동 / 계좌인증, 사업자인증 등<br></br>외부 api도 연동하였습니다.<br></br>
              <br></br>
              보수 단계에서는 마켓컬리의 기획자 및<br></br>PM분과 slack으로 소통하며 작업했고,<br></br>
              협업 툴은 jira, confluence, slack, swagger, datadog 등<br></br>
              이용했습니다.
              <br></br>
              <br></br>
              DB테이블과 기획의<br></br>많은 재수정을 경험해서 유익했고,
              <br></br>
              마켓컬리의 많은 판매자 수와<br></br>많은 상품옵션 및 상세이미지 등에 의해서<br></br>
              많은 트래픽, 조회 건 수 등 데이터 무게에 관한<br></br>이슈 경험을 한 것이 가장 유익했습니다.
            </>
          );
          break;
        case 13: //stx
          setProjectCate("COMPANY");
          setProjectTitle("STX");
          setProjectSubTitle("계약직 계약/인사 관리시스템 구축");
          setProjectInfo("2020.10 ~ 2021.06 (9개월) / BE, FE");
          setProjectSkill(["Java", "Spring", "JavaScript", "Github"]);
          setEndNum(1);
          setPhotoUrl("stx-main");
          setContent(
            <>
              인사 시스템과 <br></br>업무 포탈 시스템을 담당 하였습니다.
              <br></br>
              <br></br>
              계약직 근로자의 <br></br>복무, 교육, 급여, 당직,<br></br>총무, 기타 등등을 관리하는 시스템으로<br></br>
              특정 권한으로 들어갈 수 있는<br></br>관리자 페이지에서 따로 관리를 할 수 있습니다.
              <br></br>
              <br></br>사용 중 데이터가 잘못되거나<br></br>시스템 상 오류가 생기면<br></br>
              로그를 보고 이슈를 해결하는<br></br>업무를 주로 하였습니다.
              <br></br>
              <br></br>
              업무포탈은 spring / jsp 기반이며 <br></br>ajax 이용하여 api 연동 하였고<br></br>
              형상관리는 git 을 이용하였습니다.
            </>
          );
          break;
        case 14: //위젯누리
          setProjectCate("COMPANY");
          setProjectTitle("위젯누리");
          setProjectSubTitle("자사 솔루션 프로그램");
          setProjectInfo("2020.06 ~ 2020.09 (4개월) / FE");
          setProjectSkill(["ExtJs", "ChartJs"]);
          setEndNum(7);
          setPhotoUrl("wn-main");
          setContent(
            <>
              ExtJs 이용하여 <br></br>데스크탑 디자인 기반의<br></br>
              자사 솔루션 <br></br>( 화이트리스트, 장비관리시스템 등 )<br></br>
              디자인, 퍼블, 프론트 부분 담당하였고<br></br>
              <br></br>대시보드는 chart라이브러리 이용하였습니다.
            </>
          );
          break;
        case 15: //이지원
          setProjectCate("COMPANY");
          setProjectTitle("이지원");
          setProjectSubTitle("금융권 프로젝트");
          setProjectInfo("2025.12 ~ 2026.06 (7개월) / FE / 프리랜서");
          setProjectSkill(["React", "TypeScript", "JavaScript", "JWT", "Git"]);
          setEndNum(1);
          setPhotoUrl("ejiwon-main");
          setContent(
            <>
              금융권 프로젝트에서<br></br>프론트엔드 업무를 진행했습니다.<br></br>
              <br></br>
              ( 현대차증권 )<br></br>
              금융 업무 시스템 차세대 프로젝트 개발<br></br>
              관리자 전체 및 퇴직연금 상품매매,<br></br>인증서인증 등 담당<br></br>
              2026.02 ~ 2026.06<br></br>
              <br></br>
              ( 하이펀딩 )<br></br>
              주식담보대출 시스템 개발<br></br>
              대출 신청 및 관리, 회원가입,<br></br>로그인, 인증 등 담당<br></br>
              2025.12 ~ 2026.02
            </>
          );
          break;
        case 16: //컨트롤에이
          setProjectCate("COMPANY");
          setProjectTitle("컨트롤에이");
          setProjectSubTitle("배터리여권 통합시스템 어드민");
          setProjectInfo("2025.09 ~ 2025.12 (4개월) / FE / 프리랜서");
          setProjectSkill(["React", "Next.js", "ReactQuery", "RestApi", "SSR", "GitLab", "Vercel"]);
          setEndNum(1);
          setPhotoUrl("controla-main");
          setContent(
            <>
              부산시에서 진행하는<br></br>배터리여권 통합시스템 프로젝트입니다.<br></br>
              <br></br>3개 프로젝트 중 어드민페이지를 담당하여<br></br>
              api연동 및 화면 작업, QA를 진행했습니다.
            </>
          );
          break;
        case 17: //투스카이
          setProjectCate("COMPANY");
          setProjectTitle("투스카이");
          setProjectSubTitle("Snowpeak D2C 쇼핑몰 / 어드민");
          setProjectInfo("2025.05 ~ 2025.08 (4개월) / FE / 프리랜서");
          setProjectSkill(["React", "Next.js"]);
          setEndNum(1);
          setPhotoUrl("twosky-main");
          setContent(
            <>
              Snowpeak 본사 프로젝트로<br></br>
              D2C 쇼핑몰과 어드민페이지를 작업했습니다.<br></br>
              <br></br>api연동 및 화면 작업, QA를 진행했습니다.<br></br>
              <br></br>site :{" "}
              <a href="https://www.snowpeak.co.kr" target="_blank" rel="noreferrer">
                https://www.snowpeak.co.kr
              </a>
            </>
          );
          break;
        case 18: //아레스조이
          setProjectCate("COMPANY");
          setProjectTitle("아레스조이");
          setProjectSubTitle("감정평가 프로그램 고도화");
          setProjectInfo("2025.03 ~ 2025.05 (3개월) / FE / 프리랜서");
          setProjectSkill(["React", "RestApi"]);
          setEndNum(1);
          setPhotoUrl("aresjoy-main");
          setContent(
            <>
              감정사에서 사용하는 프로그램의<br></br>고도화 업무를 진행했습니다.<br></br>
              <br></br>그 중 업무가 가장 많은<br></br>
              "메인리스트" 페이지 기능을 전부 담당하여<br></br>
              <br></br>api연동, 10개의 모달 로직, dataTable,<br></br>
              오른쪽클릭메뉴, pdf다운로드, 인쇄, 엑셀,<br></br>
              단축키 로직 등<br></br>
              하나의 데이터 및 업무관리 기능의<br></br>도메인을 제작했습니다.
            </>
          );
          break;
        case 19: //유케이미디어
          setProjectCate("COMPANY");
          setProjectTitle("유케이미디어");
          setProjectSubTitle("SK에코플랜트 / 자사 몰·앱");
          setProjectInfo("2024.06 ~ 2025.03 (10개월) / FE");
          setProjectSkill(["React", "Next.js", "ReactNative", "Expo"]);
          setEndNum(1);
          setPhotoUrl("ukmedia-main");
          setContent(
            <>
              프로젝트 수행 및<br></br>자사 몰, 자사 앱을 개발했습니다.<br></br>
              <br></br>
              ( SK에코플랜트 )<br></br>
              EPR, LOOP 재활용 순환시스템 '써큘러'<br></br>
              재활용 업자, 공제조합 등에서 사용하는<br></br>B2B 프로젝트<br></br>
              2024.06 ~ 2024.12<br></br>
              <br></br>
              ( 자사 몰 / React )<br></br>
              외국인 근로자가 이용 가능한 몰<br></br>
              <br></br>
              ( 자사 소셜앱 / ReactNative, Expo )<br></br>
              자영업자들의 익명 소셜앱
            </>
          );
          break;
        case 26: //오토트레이딩봇
          setProjectCate("SIDE");
          setProjectTitle("오토트레이딩봇");
          setProjectSubTitle("암호화폐 자동매매 시스템");
          setProjectInfo("사이드 프로젝트 / All");
          setProjectSkill(["TypeScript", "Node.js", "Express", "BybitAPI", "Supabase", "TelegramBot"]);
          setEndNum(1);
          setPhotoUrl("trading-main");
          setContent(
            <>
              Bybit 선물 API를 연동하여<br></br>
              전략 설계부터 검증, 운영까지<br></br>
              직접 구축한 자동매매 봇입니다.<br></br>
              <br></br>
              ( 전략 )<br></br>
              아시아 세션 레인지의 유동성 스윕 실패를<br></br>
              역추세로 잡는 전략을 구현하고,<br></br>
              1시간봉 EMA/ATR 기반 장세 필터로<br></br>
              진입 조건을 제한했습니다.<br></br>
              <br></br>
              ( 백테스트 엔진 )<br></br>
              룩어헤드 방지, 수수료/슬리피지 반영,<br></br>
              승률·기대값(R)·최대낙폭 리포트까지<br></br>
              백테스트 엔진을 직접 설계하여<br></br>
              3년치 실데이터로 전략을 검증했습니다.<br></br>
              <br></br>
              ( 운영 )<br></br>
              고정 % 리스크 모델과 TP1/TP2 분할 익절,<br></br>
              텔레그램 제어/알림 봇, 포지션 스냅샷 등<br></br>
              실계좌 운영을 위한 안전장치를 갖췄습니다.<br></br>
              <br></br>
              감이 아닌 데이터로 전략을 판정하는<br></br>
              시스템을 만드는 것이 목표였던 프로젝트입니다.
            </>
          );
          break;
        case 27: //Vake
          setProjectCate("SIDE");
          setProjectTitle("Vake");
          setProjectSubTitle("브이로그 메이킹 앱 (출시예정)");
          setProjectInfo("개발중 / All / 2026 출시예정");
          setProjectSkill(["ReactNative", "Expo", "TypeScript", "Supabase", "FFmpeg", "EAS"]);
          setEndNum(5);
          setPhotoUrl("vake-main");
          setContent(
            <>
              Vake = Vlog Make<br></br>
              "찍기만 하면 브이로그가 완성되는 앱"을<br></br>
              목표로 개발중인 모바일 앱입니다.<br></br>
              <br></br>
              ( 컨셉 )<br></br>
              기존 편집앱이 "가져오면 알아서 편집"이라면,<br></br>
              Vake는 반대로 스토리를 먼저 설계하고<br></br>
              영상을 채워 넣는 방식입니다.<br></br>
              여행/일상/커플/반려동물 등 유형별로<br></br>
              AI가 스토리 섹션을 추천하고,<br></br>
              촬영일 기준으로 클립을 자동 정리합니다.<br></br>
              <br></br>
              ( 편집기 )<br></br>
              트림, 속도, 크롭, 필터, 자막(STT),<br></br>
              스티커, BGM, 전환, PIP, 비율 변경 등<br></br>
              풀 편집 기능을 직접 구현했으며<br></br>
              릴스/틱톡/쇼츠 규격 Export를 지원합니다.<br></br>
              <br></br>
              ( 기술 구성 )<br></br>
              ReactNative(Expo) + TypeScript 앱,<br></br>
              Supabase 백엔드,<br></br>
              FFmpeg 렌더 서버(얼굴 블러 등),<br></br>
              EAS 빌드/OTA 배포 파이프라인 구성.<br></br>
              <br></br>
              현재 TestFlight 테스트 중이며<br></br>
              2026년 출시 예정입니다.
            </>
          );
          break;
        case 21: //포폴메이킹
          setProjectCate("SIDE");
          setProjectTitle("Portfolio 메이킹");
          setProjectSubTitle("프론트앤드 Portfolio");
          setProjectInfo("제작 기간 (6개월)");
          setProjectSkill([
            "React",
            "ReduxToolkit",
            "JavaScript",
            "ThreeJs",
            "Html",
            "Css",
            "github",
            "GoogleAnalytics",
          ]);
          setEndNum(7);
          setPhotoUrl("pofol-main");
          setContent(
            <>
              프론트엔드 포지션으로의<br></br>
              새로운 시작을 준비하며<br></br>
              포트폴리오를 제작했습니다.<br></br>
              <br></br>
              24년 새로운 디자인트렌드 중<br></br>
              그라디언트와 3d렌더링이 주목받아,<br></br>
              포트폴리오 테마에 그라디언트를 적용하고
              <br></br>threeJs로 3d작업 후 삽입했습니다.
              <br></br>메인에 쓰인 문구에서 처럼<br></br>저의 개화시기를 계획하며
              <br></br>꽃으로 포인트를 잡았으며,
              <br></br>포인트와 어울릴<br></br>은은한 분위기의 진한녹색과
              <br></br>
              장미색을 메인컬러로 사용했습니다.<br></br>
              <br></br>spa로 제작하였고 반응형입니다.<br></br>
              메인페이지는<br></br>처음 방문하여 보시는 분에게<br></br>
              테마와 컨셉이 눈에 바로 담기도록 <br></br>디자인 했습니다.
              <br></br>
              intro페이지에는 3d아이템을<br></br>
              직접 움직여 볼 수 있도록 작업하여<br></br>
              재미를 첨가 했습니다.<br></br>
              edu, work에는 정보 위주의<br></br>
              심플한 화면으로 제작했고<br></br>
              project화면에는 슬라이드와 모달을 제작하여<br></br>
              정보를 담았습니다.<br></br>
              <br></br>
              그외 i18n과 ReduxToolkit을 이용하여<br></br>
              슬라이스로 변수를 관리하고
              <br></br>GoogleAnalytics를 적용하기 위하여<br></br>
              Gtag를 넣어
              <br></br>
              사이트 분석 및 관리 기능을<br></br>
              참고 삼아 적용해봤습니다.<br></br>
              <br></br>git :{" "}
              <a href="https://github.com/qhdep587/pofol" target="_blank" rel="noreferrer">
                https://github.com/qhdep587/pofol
              </a>
            </>
          );
          break;
        case 31: //포켓몬도감
          setProjectCate("SIDE");
          setProjectTitle("포켓몬도감");
          setProjectSubTitle("openApi 사용 프로젝트");
          setProjectInfo("제작 기간 (1개월)");
          setProjectSkill(["React", "ReduxToolkit", "TypeScript", "Html", "Sass", "React-intersection-observer"]);
          setEndNum(4);
          setPhotoUrl("poke-main");
          setContent(
            <>
              포켓몬 openApi 이용하여<br></br>
              포켓몬 도감 구현<br></br>
              <br></br>- 포켓몬api 이용하여 포켓몬도감 구현<br></br>- 포켓몬의 순서에 맞게 나오는 리스트 화면<br></br>-
              포켓몬 번호 검색 기능<br></br>- 포켓몬 상세정보 화면 (포켓몬 정보, 진화단계 등 표시)<br></br>- 무한스크롤
            </>
          );
          break;
        case 32: //map 라이브러리 사용프로젝트
          setProjectCate("SIDE");
          setProjectTitle("openlayers 라이브러리 프로젝트");
          setProjectSubTitle("라이브러리 사용 프로젝트");
          setProjectInfo("제작 기간 (1개월)");
          setProjectSkill(["React", "ReduxToolkit", "Styled-components", "TypeScript", "Html", "Vitest"]);
          setEndNum(2);
          setPhotoUrl("angel-main");
          setContent(
            <>
              Map 라이브러리<br></br>
              openlayers 이용하여<br></br>맵 위에 특정 location 표시 및<br></br>
              레이아웃 구성
            </>
          );
          break;
        case 33: //모바일화면 인터렉션 적용 프로젝트
          setProjectCate("SIDE");
          setProjectTitle("모바일화면 인터렉션 프로젝트");
          setProjectSubTitle("모바일화면 사이드 프로젝트");
          setProjectInfo("제작 기간 (1개월)");
          setProjectSkill(["React", "Redux", "Styled-components", "TypeScript", "Html", "Vitest"]);
          setEndNum(4);
          setPhotoUrl("medi-main");
          setContent(
            <>
              모바일화면 구현 프로젝트<br></br>
              모바일 화면으로 레이아웃 구성<br></br>
              스크롤 자동 이동, 하단 아코디언 박스,<br></br>
              체크리스트 리스트업 및<br></br>
              체크박스,props 관리 등<br></br>
              인터렉션 적용 프로젝트
            </>
          );
          break;
        case 22: //ot.
          setProjectCate("SIDE");
          setProjectTitle("OT.(옷.)");
          setProjectSubTitle("의류 쇼핑몰");
          setProjectInfo("제작 기간 (3개월)");
          setProjectSkill(["Java", "Spring", "jsp", "JavaScript", "JQuery", "Oracle", "Html", "Css", "github"]);
          setEndNum(25);
          setPhotoUrl("ot-main");
          setContent(
            <>
              교육기관에서 팀으로 진행했던 프로젝트입니다.<br></br>
              구성 기획 후 디비설계 진행하였으며<br></br>
              디자인은 블랙업(여성의류 쇼핑몰)을 참고했습니다.<br></br>
              git관리,뷰,디자인,구성,디비설계,메인,상품,리뷰 쪽을 담당. CRUD,게시판,옷 게시물들의 여러
              정렬,리뷰등록,리뷰정렬,신고,출석이벤트,실시간 상담채팅 등 구현
            </>
          );
          break;
        case 23: //alpaka
          setProjectCate("SIDE");
          setProjectTitle("SAVE ALPAKA");
          setProjectSubTitle("알파카 다마고치");
          setProjectInfo("제작 기간 (1개월 반)");
          setProjectSkill(["Java", "jsp", "JavaScript", "JQuery", "Oracle", "Html", "Css"]);
          setEndNum(29);
          setPhotoUrl("alpaka-main");
          setContent(
            <>
              교육기관 프로젝트로 진행했던<br></br>알파카 다마고치 게임입니다.
              <br></br>게임 속 여러 타이머, 디자인, 미니게임들, BGM 등 구현
            </>
          );
          break;
        case 24: //wish
          setProjectCate("SIDE");
          setProjectTitle("WinWin");
          setProjectSubTitle("IT 아웃소싱 플랫폼");
          setProjectInfo("제작 기간 (2개월)");
          setProjectSkill([
            "Java",
            "Spring",
            "jsp",
            "JavaScript",
            "JQuery",
            "Oracle",
            "Html",
            "Css",
            "github",
            "Bootstrap",
          ]);
          setEndNum(27);
          setPhotoUrl("wish-main");
          setContent(
            <>
              교육기관에서 팀으로 진행했던<br></br>WinWin이라는 IT아웃소싱 플랫폼 제작 프로젝트 입니다<br></br>
              기획 진행 후 admin을 맡아 진행하였습니다.<br></br>
              wishcat을 레퍼런스로 두고 작업하였습니다.<br></br>
              회계 테이블, 매출 테이블, 통계, 유인율, 통계보드, 알림기능,
              <br></br>공지사항 등 여러 게시판, 댓글검사, 신고관리,
              <br></br>프로젝트 / 포트폴리오 검수단계, 회원관리, 기업관리 구현
            </>
          );
          break;
        case 25: //todo
          setProjectCate("SIDE");
          setProjectTitle("to do list");
          setProjectSubTitle("할일작성 / 메모");
          setProjectInfo("제작 기간 (1개월)");
          setProjectSkill(["Java", "jsp", "JavaScript", "JQuery", "Html", "Css"]);
          setEndNum(1);
          setPhotoUrl("todo-main");
          setContent(
            <>
              해야 할 일을 편하게 관리할 수 있는 To Do List 입니다.<br></br>
              공지, 날짜설정, 할일작성, 끝난일로보내기,<br></br>
              로컬스토리지(데이터저장) 기능이 있습니다.
            </>
          );
          break;

        default:
          break;
      }
      document.querySelector(".modal-view").style.display = "block";
    }
  };

  return (
    <div className="project">
      <div className="modal-view">
        <div className="modal-view-card">
          {/* 모달 */}
          <div style={{ width: "100%", height: "1.5vh", display: "inline-block" }}>
            <div className="modal-view-card-title">
              <canvas className="mini-canvas-pro" id="mini-canvas3"></canvas>
              <span style={{ color: "ivory", fontSize: 13 }}>{projectCate} </span>
              PROJECT&nbsp;
              <canvas className="mini-canvas-pro" id="mini-canvas4"></canvas>
            </div>
            <button
              className="x-btn"
              onClick={() => {
                document.querySelector(".modal-view-card-cont").scrollTop = 0;
                document.querySelector(".modal-view").style.display = "none";
                setCurrentNum(1);
              }}
            >
              close
            </button>
          </div>
          <hr
            style={{
              display: "block",
              border: "1px solid rgba(14, 101, 72, 0.4)",
            }}
          ></hr>
          <div className="modal-view-card-cont">
            <span className="edu-title">◆</span>
            &nbsp;&nbsp;{projectTitle}&nbsp;&nbsp;
            <span style={{ color: "#1e7c60", fontWeight: 400, fontSize: 13 }}>&nbsp; [&nbsp;</span>
            <span style={{ color: "snow", fontSize: 13 }}>{projectSubTitle}</span>
            <span style={{ color: "#1e7c60", fontWeight: 400, fontSize: 13 }}>&nbsp; ]</span>
            <br></br>
            <br></br>
            <img
              className="modal-view-card-cont-img"
              src={require("../common/project/" + photoUrl + currentNum + ".png")}
              draggable="false"
              alt={{ projectTitle } + "photo" + { currentNum }}
            />
            <div
              style={{
                width: "100%",
                height: "1.5vh",
                display: "inline-block",
              }}
            >
              <button
                className="imgBtn"
                onClick={() => {
                  if (currentNum > 1) setCurrentNum(() => currentNum - 1);
                  else if (currentNum === 1) {
                    setCurrentNum(endNum);
                  }
                }}
              >
                {"<"}
              </button>
              &nbsp;
              <span style={{ position: "relative", top: "-1vh", fontSize: 15 }}>
                &nbsp;{currentNum} / {endNum}&nbsp;
              </span>
              &nbsp;
              <button
                className="imgBtn"
                onClick={() => {
                  if (currentNum < endNum) setCurrentNum(() => currentNum + 1);
                  else if (currentNum === endNum) {
                    setCurrentNum(1);
                  }
                }}
              >
                {">"}
              </button>
            </div>
            <br></br>
            <hr
              style={{
                display: "block",
                border: "1px solid rgba(14, 101, 72, 0.4)",
                width: "50%",
              }}
            ></hr>
            <span style={{ color: "#a2a7a5", fontSize: "0.8em" }}>{projectInfo}</span>
            <br></br>
            <div className="modal-view-card-cont-skill">
              <span style={{ color: "#1e7c60", fontWeight: 400, fontSize: 13 }}>&nbsp;[&nbsp;</span>
              <span>
                {projectSkill.map((item, idx) => {
                  if (idx + 1 === projectSkill.length) {
                    return <span key={idx}>{item}</span>;
                  } else if (idx + 1 === 5 || idx + 1 === 10) {
                    return (
                      <span key={idx}>
                        {item}
                        <span
                          style={{
                            color: "#1e7c60",
                            fontWeight: 400,
                            fontSize: 13,
                          }}
                        >
                          &nbsp;&nbsp;/&nbsp;&nbsp;
                        </span>
                        <br></br>
                      </span>
                    );
                  } else {
                    return (
                      <span key={idx}>
                        {item}
                        <span
                          style={{
                            color: "#1e7c60",
                            fontWeight: 400,
                            fontSize: 13,
                          }}
                        >
                          &nbsp;&nbsp;/&nbsp;&nbsp;
                        </span>
                      </span>
                    );
                  }
                })}
              </span>
              <span style={{ color: "#1e7c60", fontWeight: 400, fontSize: 13 }}>&nbsp;]</span>
            </div>
            <br></br>
            <div className="cont-box">{content}</div>
            <br></br>
          </div>
        </div>
      </div>
      {/* 여까지 모달*/}

      <div className="project-contents">
        <div className="project-contents-COMPANY">
          <div style={{ position: "absolute" }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;COMPANY
            <canvas className="mini-canvas-pro" id="mini-canvas"></canvas>
          </div>
          <div className="wrapper">
            <i id="left1" className="i1 opa5" onClick={() => arrowScroll(".carousel", -1, "left1", "right1")}>
              <img className="angle-bracket" src={require("../common/card/lc.png")} alt="l-angle-bracket" />
            </i>
            <div className="alim-move-pro" style={{ display: tf ? "" : "none" }}>
              <img className="alim-move-pro" src={require("../common/image/pointer.png")} alt="pointer_img" />
            </div>
            <ul className="carousel">
              <li
                className="card-pro"
                style={{
                  marginLeft: "16px",
                }}
                onClick={(e) => {
                  cardClick(e, 15);
                }}
              >
                <div className="img">
                  <img src={require("../common/project/ejiwon-main1.png")} draggable="false" alt="ejiwon-img" />
                </div>
                <h3>이지원</h3>
                <span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
                  <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
                    <span className="f15" style={{ display: "inline-block" }}>
                      <div className="text-btn">role</div>&nbsp;&nbsp;
                    </span>
                    FE
                  </span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
                </span>
                <span>2025.12 ~ 2026.06 (7개월)</span>
              </li>
              <li
                className="card-pro"
                onClick={(e) => {
                  cardClick(e, 16);
                }}
              >
                <div className="img">
                  <img src={require("../common/project/controla-main1.png")} draggable="false" alt="controla-img" />
                </div>
                <h3>컨트롤에이</h3>
                <span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
                  <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
                    <span className="f15" style={{ display: "inline-block" }}>
                      <div className="text-btn">role</div>&nbsp;&nbsp;
                    </span>
                    FE
                  </span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
                </span>
                <span>2025.09 ~ 2025.12 (4개월)</span>
              </li>
              <li
                className="card-pro"
                onClick={(e) => {
                  cardClick(e, 17);
                }}
              >
                <div className="img">
                  <img src={require("../common/project/twosky-main1.png")} draggable="false" alt="twosky-img" />
                </div>
                <h3>투스카이</h3>
                <span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
                  <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
                    <span className="f15" style={{ display: "inline-block" }}>
                      <div className="text-btn">role</div>&nbsp;&nbsp;
                    </span>
                    FE
                  </span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
                </span>
                <span>2025.05 ~ 2025.08 (4개월)</span>
              </li>
              <li
                className="card-pro"
                onClick={(e) => {
                  cardClick(e, 18);
                }}
              >
                <div className="img">
                  <img src={require("../common/project/aresjoy-main1.png")} draggable="false" alt="aresjoy-img" />
                </div>
                <h3>아레스조이</h3>
                <span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
                  <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
                    <span className="f15" style={{ display: "inline-block" }}>
                      <div className="text-btn">role</div>&nbsp;&nbsp;
                    </span>
                    FE
                  </span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
                </span>
                <span>2025.03 ~ 2025.05 (3개월)</span>
              </li>
              <li
                className="card-pro"
                onClick={(e) => {
                  cardClick(e, 19);
                }}
              >
                <div className="img">
                  <img src={require("../common/project/ukmedia-main1.png")} draggable="false" alt="ukmedia-img" />
                </div>
                <h3>유케이미디어</h3>
                <span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
                  <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
                    <span className="f15" style={{ display: "inline-block" }}>
                      <div className="text-btn">role</div>&nbsp;&nbsp;
                    </span>
                    FE
                  </span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
                </span>
                <span>2024.06 ~ 2025.03 (10개월)</span>
              </li>
              <li
                className="card-pro"
                onClick={(e) => {
                  cardClick(e, 11);
                }}
              >
                <div className="img">
                  <img src={require("../common/project/cuckoo-main1.png")} draggable="false" alt="1" />
                </div>
                <h3>쿠쿠</h3>
                <span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
                  <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
                    <span className="f15" style={{ display: "inline-block" }}>
                      <div className="text-btn">role</div>&nbsp;&nbsp;
                    </span>
                    FE
                  </span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
                </span>
                <span>2023.05 ~ 2023.07 (3개월)</span>
              </li>
              <li
                className="card-pro"
                onClick={(e) => {
                  cardClick(e, 12);
                }}
              >
                <div className="img">
                  <img src={require("../common/project/kurly-main1.png")} draggable="false" alt="2" />
                </div>
                <h3>마켓컬리</h3>
                <span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
                  <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
                    <span className="f15" style={{ display: "inline-block" }}>
                      <div className="text-btn">role</div>&nbsp;&nbsp;
                    </span>
                    BE, FE
                  </span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
                </span>
                <span>2021.07 ~ 2023.06 (23개월)</span>
              </li>
              <li
                className="card-pro"
                onClick={(e) => {
                  cardClick(e, 13);
                }}
              >
                <div className="img">
                  <img src={require("../common/project/stx-main1.png")} draggable="false" alt="stx-img" />
                </div>
                <h3>STX</h3>
                <span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
                  <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
                    <span className="f15" style={{ display: "inline-block" }}>
                      <div className="text-btn">role</div>&nbsp;&nbsp;
                    </span>
                    BE, FE
                  </span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
                </span>
                <span>2020.10 ~ 2021.06 (9개월)</span>
              </li>
              <li
                className="card-pro"
                onClick={(e) => {
                  cardClick(e, 14);
                }}
              >
                <div className="img">
                  <img src={require("../common/project/wn-main6.png")} draggable="false" alt="5" />
                </div>
                <h3>위젯누리</h3>
                <span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
                  <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
                    <span className="f15" style={{ display: "inline-block" }}>
                      <div className="text-btn">role</div>&nbsp;&nbsp;
                    </span>
                    FE
                  </span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
                </span>
                <span>2020.06 ~ 2020.09 (4개월)</span>
              </li>
            </ul>
            <i id="right1" className="i1" onClick={() => arrowScroll(".carousel", 1, "left1", "right1")}>
              <img
                className="angle-bracket"
                src={require("../common/card/rc.png")}
                draggable="false"
                alt="r-angle-bracket"
              />
            </i>
          </div>
        </div>
        <div className="project-contents-SIDE">
          <div style={{ position: "absolute" }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SIDE
            <canvas className="mini-canvas-pro" id="mini-canvas2"></canvas>
          </div>
          <div className="wrapper">
            <i id="left2" className="i2 opa5" onClick={() => arrowScroll(".carousel2", -1, "left2", "right2")}>
              <img
                className="angle-bracket2"
                src={require("../common/card/lc.png")}
                draggable="false"
                alt="l-angle-bracket"
              />
            </i>
            <ul className="carousel2">
              <li
                className="card-pro"
                onClick={(e) => {
                  cardClick(e, 27);
                }}
                style={{
                  marginLeft: "16px",
                }}
              >
                <div className="img">
                  <img src={require("../common/project/vake-main1.png")} draggable="false" alt="vake-img" />
                </div>
                <h3>Vake</h3>
                <span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
                  <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
                    <span className="f15" style={{ display: "inline-block" }}>
                      <div className="text-btn">role</div>&nbsp;&nbsp;
                    </span>
                    All
                  </span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
                </span>
                <span>개발중 / 출시예정</span>
              </li>
              <li
                className="card-pro"
                onClick={(e) => {
                  cardClick(e, 26);
                }}
                style={{
                  marginLeft: "16px",
                }}
              >
                <div className="img">
                  <img src={require("../common/project/trading-main1.png")} draggable="false" alt="trading-img" />
                </div>
                <h3>오토트레이딩봇</h3>
                <span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
                  <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
                    <span className="f15" style={{ display: "inline-block" }}>
                      <div className="text-btn">role</div>&nbsp;&nbsp;
                    </span>
                    All
                  </span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
                </span>
                <span>AI 자동매매 / 사이드 프로젝트</span>
              </li>
              <li
                className="card-pro"
                onClick={(e) => {
                  cardClick(e, 21);
                }}
                style={{
                  marginLeft: "16px",
                }}
              >
                <div className="img">
                  <img src={require("../common/project/pofol-main1.png")} draggable="false" alt="1" />
                </div>
                <h3>Portfolio 메이킹</h3>
                <span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
                  <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
                    <span className="f15" style={{ display: "inline-block" }}>
                      <div className="text-btn">role</div>&nbsp;&nbsp;
                    </span>
                    All
                  </span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
                </span>
                <span>제작기간 (6개월) / 포트폴리오</span>
              </li>
              <li
                className="card-pro"
                onClick={(e) => {
                  cardClick(e, 33);
                }}
                style={{
                  marginLeft: "16px",
                }}
              >
                <div className="img">
                  <img src={require("../common/project/medi-main1.png")} draggable="false" alt="1" />
                </div>
                <h3>모바일화면 인터렉션 프로젝트</h3>
                <span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
                  <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
                    <span className="f15" style={{ display: "inline-block" }}>
                      <div className="text-btn">role</div>&nbsp;&nbsp;
                    </span>
                    All
                  </span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
                </span>
                <span>제작기간 (1개월) / 사이드 프로젝트</span>
              </li>
              <li
                className="card-pro"
                onClick={(e) => {
                  cardClick(e, 32);
                }}
                style={{
                  marginLeft: "16px",
                }}
              >
                <div className="img">
                  <img src={require("../common/project/angel-main1.png")} draggable="false" alt="1" />
                </div>
                <h3>openlayers 라이브러리 프로젝트</h3>
                <span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
                  <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
                    <span className="f15" style={{ display: "inline-block" }}>
                      <div className="text-btn">role</div>&nbsp;&nbsp;
                    </span>
                    All
                  </span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
                </span>
                <span>제작기간 (1개월) / 사이드 프로젝트</span>
              </li>
              <li
                className="card-pro"
                onClick={(e) => {
                  cardClick(e, 31);
                }}
                style={{
                  marginLeft: "16px",
                }}
              >
                <div className="img">
                  <img src={require("../common/project/poke-main1.png")} draggable="false" alt="1" />
                </div>
                <h3>포켓몬도감</h3>
                <span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
                  <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
                    <span className="f15" style={{ display: "inline-block" }}>
                      <div className="text-btn">role</div>&nbsp;&nbsp;
                    </span>
                    All
                  </span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
                </span>
                <span>제작기간 (1개월) / 사이드 프로젝트</span>
              </li>
              <li
                className="card-pro"
                onClick={(e) => {
                  cardClick(e, 22);
                }}
              >
                <div className="img">
                  <img src={require("../common/project/ot-main1.png")} draggable="false" alt="2" />
                </div>
                <h3>OT. (옷.)</h3>
                <span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
                  <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
                    <span className="f15" style={{ display: "inline-block" }}>
                      <div className="text-btn">role</div>&nbsp;&nbsp;
                    </span>
                    All
                  </span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
                </span>
                <span>제작기간 (3개월) / 의류쇼핑몰</span>
              </li>
              <li
                className="card-pro"
                onClick={(e) => {
                  cardClick(e, 23);
                }}
              >
                <div className="img">
                  <img src={require("../common/project/alpaka-main1.png")} draggable="false" alt="3" />
                </div>
                <h3>알파카 살리기</h3>
                <span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
                  <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
                    <span className="f15" style={{ display: "inline-block" }}>
                      <div className="text-btn">role</div>&nbsp;&nbsp;
                    </span>
                    All
                  </span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
                </span>
                <span>제작기간 (1개월 반) / 게임</span>
              </li>
              <li
                className="card-pro"
                onClick={(e) => {
                  cardClick(e, 24);
                }}
              >
                <div className="img">
                  <img src={require("../common/project/wish-main1.png")} draggable="false" alt="4" />
                </div>
                <h3>WinWin</h3>
                <span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
                  <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
                    <span className="f15" style={{ display: "inline-block" }}>
                      <div className="text-btn">role</div>&nbsp;&nbsp;
                    </span>
                    All
                  </span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
                </span>
                <span>제작기간 (2개월) / IT아웃소싱 플랫폼</span>
              </li>
              <li
                className="card-pro"
                onClick={(e) => {
                  cardClick(e, 25);
                }}
              >
                <div className="img">
                  <img src={require("../common/project/todo-main1.png")} draggable="false" alt="5" />
                </div>
                <h3>to do list</h3>
                <span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}>[ </span>
                  <span className="f15" style={{ color: "ivory", fontWeight: 500 }}>
                    <span className="f15" style={{ display: "inline-block" }}>
                      <div className="text-btn">role</div>&nbsp;&nbsp;
                    </span>
                    All
                  </span>
                  <span style={{ color: "#1e7c60", fontWeight: 600 }}> ]</span>
                </span>
                <span>제작기간 (1개월) / to do list</span>
              </li>
              {/* <li
                className="card-pro"
                onClick={(e) => {
                  cardClick(e, 26);
                }}
              >
                <div className="img">
                  <img
                    src={require("../common/card/6.jpg")}
                    draggable="false"
                    alt="6"
                  />
                </div>
                <h3>6번사진</h3>
                <span>ㅁㄴㅇㅁㄴㅇ</span>
                <span>ㅁㄴㅇㅁㄴㅇ</span>
              </li> */}
            </ul>
            <i id="right2" className="i2" onClick={() => arrowScroll(".carousel2", 1, "left2", "right2")}>
              <img className="angle-bracket2" src={require("../common/card/rc.png")} alt="r-angle-bracket" />
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
