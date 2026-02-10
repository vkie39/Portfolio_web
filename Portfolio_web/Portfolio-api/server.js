const path = require("path");

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());            // React에서 호출 가능하게
app.use(express.json());    // POST JSON 받을 때 필요

app.use("/images", express.static(path.join(__dirname, "image")));

const projects = [
  {
    id: "1",
    title: "YOLOv5 실시간 객체 감지 시스템",
    thumbnail: "http://localhost:4000/images/jetsonNano.png",
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
    thumbnail: "http://localhost:4000/images/harborGuard.png", 
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
      thumbnail: "http://localhost:4000/images/SajinDongnae.png",
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
      thumbnail: "http://localhost:4000/images/motor_control.png",
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
      thumbnail: "http://localhost:4000/images/tomatoFarm.png",
      categories: ["AI/CV", "VR"],
      problem: "데이터 기반 농작물 관리 자동화 및 가상 체험 니즈",
      role: "데이터 분석 기반 제어 로직 기획",
      tech: ["Python", "AI Model", "Unity", "IoT Sensors"],
      result: "센서 데이터 기반 생육 예측 모델과 이를 시각화한 VR 체험 프로그램 통합 구현",
      metrics: "예측 기반 자동제어 로직",
      link: "https://github.com/vkie39/tomatoGrowth.git",
    }

];

app.get("/api/projects", (req, res) => {
  res.json(projects);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API server running: http://localhost:${PORT}`);
});
