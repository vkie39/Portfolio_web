const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "image")));

const projects = [
  {
    id: "1",
    title: "YOLOv5 실시간 객체 감지 시스템",
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
    question: '기술의 가치를 논리로 설계한다는 것은?',
    answer: '데이터로 문제를 정의하고 기술로 해결책을 제안하는 것을 의미합니다. YOLOv5 기반 실시간 객체 인식 최적화, Firebase 데이터 모델링 및 확장성 설계 등을 통해 문제의 본질을 파악하고 최적의 기술 스택으로 해결해왔습니다.'
  },
  {
    question: '리더십과 협업 경험',
    answer: '울산항만공사 협업 VR 프로젝트의 팀장으로서 전체 시스템 설계와 기획을 총괄했습니다. 개발자와 기획자 사이의 간극을 줄이기 위해 기술적 한계를 먼저 이해하고, 이를 보완할 수 있는 인터랙션 전략을 수립하여 캡스톤 디자인 대상이라는 결과를 이끌어냈습니다.'
  },
  {
    question: '기술 스택과 전문성',
    answer: 'AI/CV 분야에서는 YOLOv5, PyTorch, TensorRT를 활용한 객체 인식 시스템을 개발했습니다. VR/AR에서는 Unity와 Oculus SDK로 Hand Tracking 인터랙션을 구현했고, Mobile 개발에서는 Flutter와 Firebase를 활용한 위치 기반 서비스를 제작했습니다.'
  },
  {
    question: '대표 프로젝트 성과',
    answer: 'YOLOv5 객체 감지 시스템에서 mAP 0.89 달성, VR 크레인 교육 시뮬레이터는 캡스톤 디자인 대상 수상, 사진동네 플랫폼은 경진대회 수상, ROS2 자율주행 로봇은 IAE 67.95% 감소라는 성과를 달성했습니다.'
  },
  {
    question: '문제 해결 방법론',
    answer: '문제를 데이터로 정의하고, 기술적 제약을 먼저 파악한 뒤, 최적의 솔루션을 설계하는 방식으로 접근합니다. 예를 들어 Jetson Nano의 제한된 리소스를 고려해 YOLOv5를 TensorRT로 최적화하여 30fps를 달성했습니다.'
  },
  {
    question: '지원 동기 및 포부',
    answer: '만 21세의 나이로 1년에 7개가 넘는 대회 참가, 4장의 논문 투고, 3번의 수상을 경험했습니다. 기획부터 구현까지 모든 단계를 경험한 만큼, 새로운 도전에서도 책임감 있게 성과를 만들어내겠습니다.'
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
