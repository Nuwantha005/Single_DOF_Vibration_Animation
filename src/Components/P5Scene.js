import React, { useRef, useEffect } from "react";
import p5 from "p5";

const P5Sketch = ({
  inputs,
  restBtnStat,
  setResetBtnStat,
  pauseBtnStat,
  speed,
  mouseUpVal,
  mouseDownVal,
  setMouseUpStat,
}) => {
  const sketchRef = useRef();
  const inputRef = useRef(inputs);
  const pauseRef = useRef(pauseBtnStat);
  const speedRef = useRef(speed);
  const mouseUpRef = useRef(mouseUpVal);
  const mouseDownRef = useRef(mouseDownVal);

  useEffect(() => {
    mouseUpRef.current = mouseUpVal;
  }, [mouseUpVal]);

  useEffect(() => {
    mouseDownRef.current = mouseDownVal;
  }, [mouseDownVal]);

  useEffect(() => {
    // Update the speed reference when speed prop changes
    inputRef.current = inputs;
  }, [inputs]);

  useEffect(() => {
    pauseRef.current = pauseBtnStat;
  }, [pauseBtnStat]);

  useEffect(() => {
    speedRef.current = speed;
    steptime = speed;
  }, [speed]);

  let steptime = 1 / 60;

  useEffect(() => {
    const sketch = (p) => {
      // let m = inputRef.current.m,
      //   c = inputRef.current.c,
      //   k = inputRef.current.k; // system properties
      // let x0 = inputRef.current.x0,
      //   x0dot = inputRef.current.x0dot; // initial conditions

      let m = 15,
        c = 5,
        k = 160;
      let x0 = 1,
        x0dot = 5;
      let X = 0;
      let x = 0;
      let t = 0;

      let xPoints = [];
      let newXPoints = [];
      p.setup = () => {
        p.createCanvas(
          sketchRef.current.offsetWidth,
          sketchRef.current.offsetHeight
        );
      };

      p.windowResized = () => {
        // Resize the canvas when the window size changes
        p.resizeCanvas(
          sketchRef.current.offsetWidth,
          sketchRef.current.offsetHeight
        );
      };

      p.draw = () => {
        x = xPoints[p.floor(xPoints.length / 2)];
        let xlineLoc = p.height / 3;
        let XRange = p.height / 10;
        let rectSize = p.height / 3;
        let rectXLoc = p.width * (7 / 10) + p.height / 6;
        let scaledX = p.map(x, -X, X, XRange, -XRange);
        let XMax = p.map(X, -X, X, -XRange, XRange);

        p.background(243, 244, 246);
        drawAxes(xlineLoc, 10);

        if (mouseDownRef.current) {
          newXPoints = [];
          let newX = 0,
            newXMax = 0;
          m = parseFloat(inputRef.current.m);
          c = parseFloat(inputRef.current.c);
          k = parseFloat(inputRef.current.k);
          x0 = parseFloat(inputRef.current.x0); // Initial displacement
          x0dot = parseFloat(inputRef.current.x0dot); // Initial velocity
          let omega_n = Math.sqrt(k / m);
          let cc = 2 * Math.sqrt(m * k);
          let beta = c / cc;

          if (beta < 1) {
            let omega_d = Math.sqrt(1 - beta * beta) * omega_n;
            let shi = Math.atan2(x0 * omega_d, x0dot + beta * omega_n * x0);
            newX = x0 / Math.sin(shi);
            newXMax = p.map(newX, -newX, newX, -XRange, XRange);

            let startIndex = p.floor(p.width / (50 * 4 * steptime));
            let t0 = t - startIndex * steptime;
            for (let i = 0; i < xPoints.length; i++) {
              let env = X * Math.exp(-beta * omega_n * (t0 + i * steptime));
              x = env * Math.sin(omega_d * (t0 + i * steptime) + shi);
              newXPoints.push(x);
            }
          }
          X = newX;
          XMax = newXMax;
          x = newXPoints[p.floor(newXPoints.length / 2)];
          scaledX = p.map(x, -X, X, XRange, -XRange);

          p.stroke("red");
          p.strokeWeight(2);
          p.beginShape();
          p.noFill();
          for (let id = 0; id < newXPoints.length; id++) {
            p.vertex(
              10 + 50 * steptime * id,
              xlineLoc + p.map(newXPoints[id], -newX, newX, XRange, -XRange)
            );
          }
          p.endShape();

          //Move With
        }
        if (mouseUpRef.current) {
          setMouseUpStat();
          xPoints = [...newXPoints];
        }
        //let startIndex = p.floor(p.width / (50 * 4 * steptime));
        p.noFill();
        p.stroke(0, 0, 255);
        p.strokeWeight(3);
        p.beginShape();
        for (let i = 0; i < xPoints.length; i++) {
          p.vertex(
            10 + 50 * steptime * i,
            xlineLoc + p.map(xPoints[i], -X, X, XRange, -XRange)
          );
        }
        p.endShape();
        // p.beginShape();
        // for (let i = startIndex - 1; i < xPoints.length; i++) {
        //   p.vertex(
        //     10 + 50 * steptime * i,
        //     xlineLoc + p.map(xPoints[i], -X, X, XRange, -XRange)
        //   );
        // }
        // p.endShape();
        if (!pauseRef.current) {
          updateStatus();
          t += steptime;
          if (t > p.width / (50 * 2)) {
            xPoints.shift();
          }
        }

        p.stroke(0);
        p.fill("red");
        // Draw an ellipse with size controlled by the slider
        p.rectMode(p.CENTER);
        p.rect(rectXLoc, xlineLoc + scaledX, rectSize, rectSize);

        let spanDist = 40;
        let offsetHeight = 60;
        // Drawing Spring
        p.strokeWeight(3);
        p.stroke("black");
        drawSpring(
          rectXLoc - spanDist,
          p.height - offsetHeight,
          rectXLoc - spanDist,
          scaledX + xlineLoc + rectSize / 2 + offsetHeight
        );

        p.line(
          rectXLoc - spanDist,
          p.height,
          rectXLoc - spanDist,
          p.height - offsetHeight
        );
        p.line(
          rectXLoc - spanDist,
          scaledX + xlineLoc + rectSize / 2 + offsetHeight,
          rectXLoc - spanDist,
          scaledX + xlineLoc + rectSize / 2
        );

        p.fill("black");
        p.stroke("black");
        p.strokeWeight(1);
        p.textSize(20);
        p.text("Time: " + t.toFixed(2), 30, 30);
        //Drawing Damper
        drawDamper(
          rectXLoc,
          spanDist,
          offsetHeight,
          rectSize,
          scaledX,
          xlineLoc,
          XMax
        );

        // Style the next points.
        p.stroke("black");
        p.strokeWeight(10);

        p.point(rectXLoc, xlineLoc + scaledX);

        p.point(10 + (50 * steptime * xPoints.length) / 2, xlineLoc + scaledX);

        p.stroke(0, 0, 0, 50);
        p.strokeWeight(2);
        p.line(
          rectXLoc,
          xlineLoc + scaledX,
          10 + (50 * steptime * xPoints.length) / 2,
          xlineLoc + scaledX
        );
      };

      function updateStatus() {
        m = parseFloat(inputRef.current.m);
        c = parseFloat(inputRef.current.c);
        k = parseFloat(inputRef.current.k);
        x0 = parseFloat(inputRef.current.x0); // Initial displacement
        x0dot = parseFloat(inputRef.current.x0dot); // Initial velocity
        if (restBtnStat) {
          t = 0;
          xPoints = [];
          setResetBtnStat();
        }
        let omega_n = Math.sqrt(k / m);
        let cc = 2 * Math.sqrt(m * k);
        let beta = c / cc;
        let startIndex = p.floor(p.width / (50 * 4 * steptime));
        if (beta < 1) {
          let omega_d = Math.sqrt(1 - beta * beta) * omega_n;
          let shi = Math.atan2(x0 * omega_d, x0dot + beta * omega_n * x0);
          X = x0 / Math.sin(shi);
          let env = X * Math.exp(-beta * omega_n * t);
          x = env * Math.sin(omega_d * (t + steptime * startIndex) + shi);
          xPoints.push(x);
        }
      }

      function drawDamper(
        rectXLoc,
        spanDist,
        offsetHeight,
        rectSize,
        scaledX,
        xlineLoc,
        XMax
      ) {
        p.strokeWeight(3);
        p.line(
          rectXLoc + spanDist,
          p.height,
          rectXLoc + spanDist,
          p.height - offsetHeight
        );
        p.line(
          rectXLoc + spanDist - 25,
          p.height - offsetHeight,
          rectXLoc + spanDist - 25,
          xlineLoc * 1.9
        );
        p.line(
          rectXLoc + spanDist + 25,
          p.height - offsetHeight,
          rectXLoc + spanDist + 25,
          xlineLoc * 1.9
        );
        p.line(
          rectXLoc + spanDist - 25,
          p.height - offsetHeight,
          rectXLoc + spanDist + 25,
          p.height - offsetHeight
        );
        p.line(
          rectXLoc + spanDist,
          scaledX + xlineLoc + rectSize / 2,
          rectXLoc + spanDist,
          scaledX + xlineLoc + rectSize / 2 + 3 * XMax - 10
        );

        p.line(
          rectXLoc + spanDist - 20,
          scaledX + xlineLoc + rectSize / 2 + 3 * XMax - 10,
          rectXLoc + spanDist + 20,
          scaledX + xlineLoc + rectSize / 2 + 3 * XMax - 10
        );
        p.fill(0, 0, 255, p.map(x, -X, X, 0, 255));
        p.rectMode(p.CORNERS);
        p.rect(
          rectXLoc + spanDist - 25,
          p.height - offsetHeight,
          rectXLoc + spanDist + 25,
          scaledX + xlineLoc + rectSize / 2 + 3 * XMax - 10
        );
      }

      function drawAxes(xlineLoc, yLineLoc) {
        p.strokeWeight(15);
        p.stroke("black");
        p.line(0, p.height, p.width, p.height);

        p.strokeWeight(3);
        p.line(yLineLoc, xlineLoc, p.width / 2, xlineLoc);
        p.line(yLineLoc, 30, yLineLoc, p.height / 1.5 - 30);
      }

      function drawSpring(sBtmx, sBtmy, sTopx, sTopy) {
        let numCoils = 10;
        let sprHeight = sTopy - sBtmy;
        let radius = 25;
        let numPoints = 300;

        let theta = makeArr(
          Math.PI / 2,
          numCoils * 2 * Math.PI + Math.PI / 2,
          numPoints
        );
        let zSpr = makeArr(0, sprHeight, numPoints);
        let xSpr = [];
        for (let index = 0; index < numPoints; index++) {
          xSpr.push(radius * Math.cos(theta[index]));
        }

        p.beginShape();
        p.noFill();
        for (let i = 0; i < numPoints; i++) {
          p.vertex(sBtmx + xSpr[i], sBtmy + zSpr[i]);
        }
        p.endShape();
      }
    };

    function makeArr(startValue, stopValue, cardinality) {
      var arr = [];
      var step = (stopValue - startValue) / (cardinality - 1);
      for (var i = 0; i < cardinality; i++) {
        arr.push(startValue + step * i);
      }
      return arr;
    }

    const myP5 = new p5(sketch, sketchRef.current);
    //sketchRef.current = p;

    return () => {
      myP5.remove(); // Clean up on component unmount
    };
  }, [restBtnStat, speed]);

  return <div ref={sketchRef} className="p5-container w-full h-full" />;
};

export default P5Sketch;
