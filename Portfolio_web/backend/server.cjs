const path = require("path");
const express = require("express");
const cors = require("cors");
const { subtle } = require("crypto");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "image")));

const projects = [
  {
    id: "1",
    title: "YOLOv5 실시간 객체 감지 시스템",
    subtitle: "On-device AI를 활용한 보행자 안전 보호 시스템", 
    SpecProblem: "전동 킥보드 사용률 증가로 보행자 사고가 6년간 22배 증가하였고, 특히 1-20대의 사고율이 가장 높았다. 반면 사회적 안전망은 제대로 구축되어 있지 않았기 때문에 보행자들을 보호하기 위한 프로그램을 개발하게되었다.",
    mission: "2000장의 이미지를 라벨링하여 만든 데이터 셋을 다양하게 증강시키며 mAP 기준 가장 적합한 데이터 증강법을 적용하였고, 킥보드가 주행하면서 인식이 가능하도록 개발하였다.",
    procedure: "다양한 환경에서의 데이터 증강 실험을 통한 모델 강건성 확보 및 최적화",
    thumbnail: "/images/jetsonNano.png",
    categories: ["AI/CV", "Robotics"],
    problem: "실내 자율주행 시 장애물 회피 효율성 극대화",
    role: "(팀장) AI 모델 설계 및 Jetson Nano 최적화 전략 수립",
    tech: ["YOLOv5", "PyTorch", "Jetson Nano", "TensorRT"],
    result: "- 커스텀 데이터셋 2,000장 구축 - mAP 0.89 달성 - 30fps 구현 - 적합한 데이터 증강법에 대한 논문 투고  (MDPI)",
    metrics: "- mAP 0.89 / 30fps 추론",
    link: "https://github.com/vkie39/Tickie_YOLOv5_Accuracy.git",
    featured: true,
  },
  {
    id: "2",
    title: "VR 크레인 교육 시뮬레이터",
    subtitle: "가상 현실 기반의 안전한 항만 크레인 조종 교육 솔루션",
    SpecProblem: "스마트 항만의 시장이 12조원을 바라보며 비약적인 발전을 하고 있다. 하지만 항만  크레인은, 조수간만의 차와 날씨 때문에 자동화가 아닌 원격조종 방식이 적용되는데, 새로운 조종방식을 학습할 수 있는 공간의 한계로 인해 전문가들이 부족한 상황이다. ",
    mission: "시공간 제약 없는 고정밀 VR 원격 조종 훈련 프로그램 개발",
    procedure: "물리 엔진 기반의 리얼한 핸드 트래킹 인터랙션 구현 및 사용자 경험 최적화",
    thumbnail: "/images/harborGuard.png", 
    categories: ["VR", "Team Lead"],
    problem: "고위험 항만 작업 교육의 안전 사고 리스크 및 비용 문제 해결",
    role: "(팀장) 기획 및 프로젝트 매니징, 항만 환경 구현",
    tech: ["Unity", "Oculus SDK", "C#"],
    result: "- 90% 이상 환경 재현 - 핸드트래킹 기반 교육 모듈 완성 - 논문 투고(KIPS) - 캡스톤 디자인 대상 수상",
    metrics: "90%이상 환경 재현 - 논문 투고(KIPS) ",
    link: "https://github.com/vkie39/ict_harbor.git",
    featured: true,
  },
  {
    id: "3",
    title: "사진동네: 위치 기반 공유 플랫폼",
    subtitle: "전문가와 입문자를 잇는 실시간 위치 기반 사진 거래 커뮤니티",
    SpecProblem: "스톡 이미지 시장은 50억 달러를 넘어가는 거대 시장이지만, 대다수의 사이트는 작위적이고 선정적인 이미지로 인해 재방문율이 낮아지고, 사진 커뮤니티 역시 불편한 구조의 ui와 고인물 맞춤형 웹사이트로 인해 체류율이 낮아지고 있다. ",
    mission: "사진 거래와 커뮤니티가 결합된 통합형 소통 플랫폼 구축, 1:1 매칭을 통한 맞춤형 이미지 거래 가능",
    procedure: "Google Maps API 연동 및 Firebase 기반의 실시간 데이터 동기화 구현",
    thumbnail: "/images/SajinDongnae.png",
    categories: ["Mobile", "Team Lead"],
    problem: "특정 장소의 실시간 경험 중심 커뮤니티 니즈 충족",
    role: "(팀장) 서비스 기획 - 로그인/회원가입, 마이페이지, 관리자 페이지 구현 및 시스템 개발",
    tech: ["Flutter", "Firebase", "Google Maps API", "FCM"],
    result: "위치 기반 인터랙션 MVP 95% 구현, - 스마트 프로젝트 경진대회 장려상 수상",
    metrics: "스마트 프로젝트 경진대회 장려상 수상",
    link: "https://github.com/vkie39/Analog_PhotoApp.git",
    featured: true,
  },
  {
    id: "4",
    title: "ROS2 자율주행 로봇 제어",
    subtitle: "AI 기반 지능형 PID 제어를 통한 로봇 주행 안정성 향상",
    SpecProblem: "환경 변화에 취약한 기존 고정 게인 PID 제어기의 성능 한계",
    mission: "시계열 센서 데이터를 활용한 실시간 최적 PID 게인 예측 및 적용",
    procedure: "패턴 인식 알고리즘 설계 및 ROS2 노드 통신을 통한 제어 로직 검증",
    thumbnail: "/images/motor_control.png",
    categories: ["Robotics", "AI/CV"],
    problem: "제조 현장 내 실시간 불량 감지 및 자동 분류 시스템 부재 해결",
    role: "ROS2 노드 통신 설계 및 알고리즘 검증",
    tech: ["ROS2", "LiDAR", "SLAM", "Python", "Nav2"],
    result: "PID 제어기 보정을 통해 목표 도달 시간 4.19% 단축 및 주행 안정성 대폭 향상",
    metrics: "IAE 67.95% 감소",
    link: "https://github.com/vkie39/TRANSFORMER-LSTM-CNN-correctionPID.git",
  },
  {
    id: "5",
    title: "미래형 스마트팜 환경 제어",
    subtitle: "AI 생육 예측과 VR 시각화가 결합된 차세대 스마트팜 관리 시스템",
    SpecProblem: "복잡한 스마트팜 데이터의 가시성 부족 및 초보 관리자의 운영 어려움",
    mission: "농작물 성장 단계 자동 측정 알고리즘 및 게임형 체험 VR 개발",
    procedure: "센서 데이터 분석 모델 구축 및 VR 환경과의 실시간 데이터 연동 통합",
    thumbnail: "/images/tomatoFarm.png",
    categories: ["AI/CV", "VR"],
    problem: "데이터 기반 농작물 관리 자동화 및 가상 체험 니즈",
    role: "데이터 분석 기반 제어 로직 기획",
    tech: ["Python", "AI Model", "Unity", "IoT Sensors"],
    result: "센서 데이터 기반 생육 예측 모델과 이를 시각화한 VR 체험 프로그램 통합 구현",
    metrics: "예측 기반 자동제어 로직",
    link: "https://github.com/vkie39/tomatoGrowth.git",
  },
  {
    id: "6",
    title: "앱 개발 인턴",
    subtitle: " ",
    SpecProblem: " ",
    mission: " ",
    procedure: " ",
    thumbnail: " ",
    categories: ["kotlin", "native"],
    problem: " ",
    role: " ",
    tech: [""],
    result: " ",
    metrics: " ",
    link: "",
  }
];

// About Q&A data
const aboutQA = [
  {
    question: '어떤 개발자인가요?"',
    answer: '저는 기술 스킬을 시스템에 녹이는 사람입니다. Yolo 모델을 학습시켜 Jetson 실환경에 적용해보고, StyleGAN모델을 파인 튜닝하고, LSTM-NN모델을 PID에 적용시키고, firebase로 회원가입 기능을 구현하고, Node.js와 React로 웹사이트를 만들어 배포까지 경험했습니다. \n 이 과정에서 기술 스택을 내 프로젝트에 가장 적합하게 구현하는 방법을 고민하였고, 기술을 나열하는 사람이 아니라, 목적에 맞게 기술을 선택하고 구조화하는 개발자가 되었습니다.'
  },
  {
    question: '기술적 강점은 무엇인가요?',
    answer: '저의 기술적 강점은 풀 사이클 개발 경험이 있다는 점입니다. 기능 기획, 데이터 구조 설계, AI 모델 적용, 인증 시스템 구현, 웹 서비스 제작, 실제 배포까지 직접 경험했습니다. \n 그 과정에서 Flutter, Dart, NoSQL, React, Node.js, Firebase 등 앱 개발 스택을 실전에서 활용하는 방법도 얻었습니다. 저는 아이디어를 제안하고, 이를 실행 가능한 제품으로 만드는 강점을 가지고 있습니다. '
  },
  {
    question: '협업 스타일은 어떤가요?',
    answer: '저는 주로 팀을 리드하는 역할을 했습니다.\n 프로젝트 시작 시, 서비스 흐름, 데이터 구조 등을 시각화해서 팀원들과 공유하였고, 팀원이 맡은 일을 매니징하며 최종 연결과 통합은 제가 담당하였습니다.\n에러가 나면 로그를 함께 보고, 원인 분석을 함께 분석하며 팀 전체의 이해도를 올리기 위해 노력했습니다. 일정이 밀릴 때는 팀원의 직업 난이도를 조정하거나 일정을 현실화하는 역할도 맡았습니다. 이를 통해 갈등을 최소화하면서 최선의 결과물이 나올 수 있도록 팀장으로써 최선을 다했습니다.'
  },
  {
    question: '강점과 약점은?',
    answer: '저의 장점은 책임감과 끝까지 해결하려는 집요함입니다. [사진동네] 앱 개발 중, FIrebase 보안 규칙 문제로 관리자 권한이 정상적으로 부여되지 않는 오류가 발생했습니다.\n 단순 권한 설정 문제가 아니라 인증, Firestore Role, 사용자 Role 구조가 복합적으로 얽혀있었고, 모든 권한을 열어도 해결되지 않았습니다.\n레포지토리를 새로 구성하는 방법도 고려했지만, 기존 DB와 인증 로직을 처음부터 다시 설계해야 했기에 로그를 추적하며 규칙 구조를 재정리했고, 관리자 권한 로직을 정상화하였습니다. 이 과정에서, 저는 혼자 모든 일을 해결하려는 경향이 있다는 점을 알았습니다. 현재는 작업 상황을 공유하고, 문제가 발생하면 먼저 팀원들의 의견을 수렴하는 방식으로 협업하고 있습니다. 이를 통해 개발 속도와 결과물의 완성도도 함께 높일 수 있음을 경험했습니다. '
  },
  {
    question: '가장 기억에 남는 경험은?',
    answer: '토마토의 성장 단계를 인식하는 모델을 개발하며 어려움을 겪었습니다. YOLO 기반 모델을 학습시키고, 라벨링 방식을 변경하고, 클래스를 단순화하고, 데이터 증강과 fine-tuning을 반복했지만 성장 단계를 안정적으로 구분하지 못했습니다.\n그래서 문제를 재정의하며 다른 방향으로 문제를 알아보기 시작했고, 실시간 카메라 화면을 RGB에서 색상 대비가 뚜렸한 LAB로 변환한 뒤 빨간색, 초록색 픽셀 비율을 활용해 문제를 해결하였습니다.\n그 결과, 정확도 향상과 성장 주기 세분화가 가능했습니다. \n 이 과정에서 친구와 학교에서 일주일간 숙식하며 많이 힘들었던 기억과 여러 논문을 찾아보며 해결방법을 찾았던 기억이 굉장히 강렬하여 절대 잊지 못할 것 같습니다. '
  },
  {
    question: '앞으로의 계획 및 포부',
    answer: '만 21세의 나이로 1년에 7개가 넘는 대회 참가, \n 4장의 논문 투고, 3번의 수상을 경험했습니다. \n기획부터 구현까지 모든 단계를 경험한 만큼, 새로운 도전에서도 책임감 있게 성과를 만들어내겠습니다.'
  }
];

app.get("/api/projects", (req, res) => {
  res.json(projects);
});

app.get("/api/about", (req, res) => {
  res.json(aboutQA);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API server running: ${PORT}`));
