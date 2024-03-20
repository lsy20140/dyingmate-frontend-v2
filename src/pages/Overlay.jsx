import { useProgress } from "@react-three/drei";
import styled from "styled-components";
import '../styles/overlay.css'
import { useEffect } from "react";
import { usePlay } from "contexts/Play";

export const Overlay = () => {
  const { progress } = useProgress();
  const { play, setPlay, hasScroll } = usePlay();

  useEffect(() => {
    setPlay(true)
  },[])

  return (
    <div
      className={`overlay ${play ? "overlay--disable" : ""}
    ${hasScroll ? "overlay--scrolled" : ""}`}
    >
      <div
        className={`loader ${progress === 100 ? "loader--disappear" : ""}`}
      />
      {progress === 100 && (
        <div className={`intro ${play ? "intro--disappear" : ""}`}>
          <div className="intro__scroll">
            <GuideText>스크롤을 통해 앞뒤로 이동해보세요</GuideText>
          </div>
        </div>
      )}      
    </div>
  );
};

// styled-components
const GuideText = styled.div`
  width: 45%;
  padding: 1.1rem 11.6rem;
  font-size: 1.25rem;
  color: white;
  background: linear-gradient(237deg, rgba(0, 0, 0, 0.2) -23.03%, rgba(0, 0, 0, 0.05) 119.63%);
  outline: 2px solid white; 
  border-radius: 2rem;  
  backdrop-filter: blur(60px);
  box-sizing: border-box;
`