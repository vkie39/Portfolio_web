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
    subtitle: "전동 킥보드 사용률이 증가하면서 보행자 사고역시 증가하고 있으며, 이는 거동이 불편한 보행자에게 특히 치명적입니다. 이를 해결하기 위해 On-device방식으로 상황을 인식해서 모터 제어 및 위험 경고를 하도록 개발하였고, 이 과정에서 어떻게 하면 효과적인 데이터 증강이 가능한지 실험하였습니다.",
    thumbnail: "/images/jetsonNano.png",
    categories: ["AI/CV", "Robotics"],
    problem: "실내 자율주행 시 장애물 회피 효율성 극대화",
    role: "AI 모델 설계 및 Jetson Nano 최적화 전략 수립",
    tech: ["YOLOv5", "PyTorch", "Jetson Nano", "TensorRT"],
    result: "커스텀 데이터셋 2,000장 구축 및 mAP 0.89 달성. 30fps 구현",
    metrics: "mAP 0.89 / 30fps 추론",
    link: "https://github.com/vkie39/Tickie_YOLOv5_Accuracy.git",
    featured: true,
  },
  {
    id: "2",
    title: "VR 크레인 교육 시뮬레이터",
    subtitle: "항만의 자동화가 진행되면서 크레인 원격 조종사들의 인력이 부족해지고 있습니다. 기존 훈련은 학원에 가야만 실습이 가능했으며, 일반인들은 항만을 경험할 기회가 부족합니다. 이를 해결하고자 VR을 통해 항만 크레인 원격조종 프로그램을 개발하였습니다.",
    thumbnail: "/images/harborGuard.png", 
    categories: ["VR", "Team Lead"],
    problem: "고위험 항만 작업 교육의 안전 사고 리스크 및 비용 문제 해결",
    role: "기획 리드 및 Hand Tracking 인터랙션 설계",
    tech: ["Unity", "Oculus SDK", "C#", "Physics Engine"],
    result: "95% 이상 환경 재현 + 핸드트래킹 기반 교육 모듈 완성",
    metrics: "캡스톤 디자인 대상",
    link: "https://github.com/vkie39/ict_harbor.git",
    featured: true,
  },
  {
    id: "3",
    title: "사진동네: 위치 기반 공유 플랫폼",
    subtitle: "스톡 이미지 시장의 성장과는 반비례하게 기존 사진 판매·커뮤니티 서비스의 사용자 참여도는 지속적으로 감소하고 있습니다. 가장 큰 원인은 전문가 중심의 높은 진입 장벽과 비효율적인 서비스의 구조라고 판단하였고, 이를 해소하기 위해 사진 거래, 사진 의뢰, 커뮤니티, 실시간 소통이 하나의 흐름으로 연결되는 구조로 앱을 개발하였습니다.",
    thumbnail: "/images/SajinDongnae.png",
    categories: ["Mobile", "Team Lead"],
    problem: "특정 장소의 실시간 경험 중심 커뮤니티 니즈 충족",
    role: "서비스 기획 및 풀스택 개발 총괄",
    tech: ["Flutter", "Firebase", "Google Maps API", "FCM"],
    result: "위치 기반 인터랙션 MVP 구현 및 스마트 프로젝트 경진대회 수상으로 기획력 증명",
    metrics: "경진대회 수상작",
    link: "https://github.com/vkie39/Analog_PhotoApp.git",
    featured: true,
  },
  {
    id: "4",
    title: "ROS2 자율주행 로봇 제어",
    subtitle: "기존 PID 제어기는 경사, 질량, 속도 등 환경이 변화하면 고정 게인으로는 최적 성능을 유지하기 어렵습니다. 이를 해결하기 위해 이동 로봇이 처한 상황의 패턴을 인식하고, 시계열 센서 데이터 패턴을 기반으로 Kp, Ki, Kd를 예측하므로 지능형 PID 값 제어 방식을 구현하였습니다. ",
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
    subtitle: "스마트팜에서 키우는 농작물을 카메라를 통해 확인하고, 스마트팜의 환경을 실시간으로 확인하는 웹사이트를 개발하였습니다. 또한 농작물의 성장 단계를 측정하는 모델과 재배 시기를 예측하는 알고리즘을 개발하였습니다. 해당 프로그램을 Coex에서 전시하고, 일반인들이 스마트팜의 환경을 쉽게 이해할 수 있도록 게임형 VR프로그램을 개발하였습니다. ",
    thumbnail: "/images/tomatoFarm.png",
    categories: ["AI/CV", "VR"],
    problem: "데이터 기반 농작물 관리 자동화 및 가상 체험 니즈",
    role: "데이터 분석 기반 제어 로직 기획",
    tech: ["Python", "AI Model", "Unity", "IoT Sensors"],
    result: "센서 데이터 기반 생육 예측 모델과 이를 시각화한 VR 체험 프로그램 통합 구현",
    metrics: "예측 기반 자동제어 로직",
    link: "https://github.com/vkie39/tomatoGrowth.git",
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
    answer: '저의 장점은 책임감과 끝까지 해결하려는 집요함입니다. [사진동네] 앱 개발 중, FIrebase 보안 규칙 문제로 관리자 권한이 정상적으로 부여되지 않는 오류가 발생했습니다.\n 단순 권한 설정 문제가 아니라 인증, Firestore Role, 사용자 Role 구조가 복합적으로 얽혀있었고, 모든 권한을 열어도 해결되지 않았습니다. 레포지토리를 새로 구성하는 방법도 고려했지만, 기존 DB와 인증 로직을 처음부터 다시 설계해야 했기에 로그를 추적하며 규칙 구조를 재정리했고, 관리자 권한 로직을 정상화하였습니다. 이 과정에서, 저는 혼자 모든 일을 해결하려는 경향이 있다는 점을 알았습니다. 현재는 작업 상황을 공유하고, 문제가 발생하면 먼저 팀원들의 의견을 수렴하는 방식으로 협업하고 있습니다. 이를 통해 개발 속도와 결과물의 완성도도 함께 높일 수 있음을 경험했습니다. '
  },
  {
    question: '가장 기억에 남는 경험은?',
    answer: '토마토의 성장 단계를 인식하는 모델을 개발하며 어려움을 겪었습니다. YOLO 기반 모델을 학습시키고, 라벨링 방식을 변경하고, 클래스를 단순화하고, 데이터 증강과 fine-tuning을 반복했지만 성장 단계를 안정적으로 구분하지 못했습니다.\n그래서 문제를 재정의하며 다른 방향으로 문제를 알아보기 시작했고, 실시간 카메라 화면을 RGB에서 색상 대비가 뚜렸한 LAB로 변환한 뒤 빨간색, 초록색 픽셀 비율을 활용해 문제를 해결하였습니다. 그 결과, 정확도 향상과 성장 주기 세분화가 가능했습니다. \n 이 과정에서 친구와 학교에서 일주일간 숙식하며 많이 힘들었던 기억과 여러 논문을 찾아보며 해결방법을 찾았던 기억이 굉장히 강렬하여 절대 잊지 못할 것 같습니다. '
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
