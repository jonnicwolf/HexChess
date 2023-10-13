import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.height = `${window.innerHeight}px`;
    canvas.style.width = `${window.innerWidth}px`;

    const ctx = canvas.getContext("2d");
    ctx.scale(2,2);
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    contextRef.current = ctx;
  },[]);

  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX,offsetY);
    setIsDrawing(true);
  }

  const endDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  }

  const draw = ({nativeEvent}) => {
    if (!isDrawing) return;
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  }
  return (
    <Container>
      <h1>Draw anything you want!</h1>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      ></canvas>
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export default App;
