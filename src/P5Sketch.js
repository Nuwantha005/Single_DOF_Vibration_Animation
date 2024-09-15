import React, { useRef, useEffect } from "react";
import p5 from "p5";

const P5Sketch = ({ size, color, inputs, restBtnStat, setResetBtnStat }) => {
  const sketchRef = useRef();
  const inputRef = useRef(inputs);

  useEffect(() => {
    // Update the speed reference when speed prop changes
    inputRef.current = inputs;
  }, [inputs]);
  let m = 15,
    c = 5,
    k = 160; // system properties
  let x0 = 1,
    x0dot = 5; // initial conditions
  useEffect(() => {
    const sketch = (p) => {
      let X = 0;
      let x = 0;
      let t = 0;
      let steptime = 0.01;

      let xLocs = [];
      p.setup = () => {
        p.createCanvas(
          sketchRef.current.offsetWidth,
          (sketchRef.current.offsetWidth * 2) / 3
        );
      };

      p.windowResized = () => {
        // Resize the canvas when the window size changes
        p.resizeCanvas(
          sketchRef.current.offsetWidth,
          (sketchRef.current.offsetWidth * 2) / 3
        );
      };

      p.draw = () => {
        updateStatus();
        p.background(243, 244, 246);
        p.strokeWeight(15);
        p.stroke("black");
        p.line(0, p.height, p.width, p.height);

        p.strokeWeight(3);
        p.line(10, p.height / 3, p.width / 2, p.height / 3);
        p.line(10, 30, 10, p.height / 1.5 - 30);

        p.noFill();
        p.stroke(0, 0, 255);
        p.beginShape();
        for (let i = 0; i < xLocs.length; i++) {
          p.vertex(
            10 + 50 * steptime * i,
            p.height / 6 + p.map(xLocs[i], -X, X, p.height / 3, 0)
          );
        }
        p.endShape();
        p.stroke(0);
        p.fill("green");
        // Draw an ellipse with size controlled by the slider
        p.rect(
          p.width * (7 / 10),
          p.map(x, -X, X, p.height / 3, 0),
          p.height / 3,
          p.height / 3
        );

        // Style the next points.
        p.stroke("black");
        p.strokeWeight(10);

        p.point(
          p.width * (7 / 10) + p.height / 6,
          p.map(x, -X, X, p.height / 3, 0) + p.height / 6
        );

        p.point(
          10 + 50 * steptime * xLocs.length,
          p.map(x, -X, X, p.height / 3, 0) + p.height / 6
        );

        p.stroke("green");
        p.strokeWeight(2);
        p.line(
          p.width * (7 / 10) + p.height / 6,
          p.map(x, -X, X, p.height / 3, 0) + p.height / 6,
          10 + 50 * steptime * xLocs.length,
          p.map(x, -X, X, p.height / 3, 0) + p.height / 6
        );

        t += steptime;
        if (t > p.width * 0.01) {
          xLocs.shift();
        }
      };

      function updateStatus() {
        if (restBtnStat) {
          t = 0;
          xLocs = [];
          setResetBtnStat();
          m = parseFloat(inputRef.current.m);
          c = parseFloat(inputRef.current.c);
          k = parseFloat(inputRef.current.k);
          x0 = parseFloat(inputRef.current.x0); // Initial displacement
          x0dot = parseFloat(inputRef.current.x0dot); // Initial velocity

          console.log(c);
        }
        console.log(c);
        let omega_n = Math.sqrt(k / m);
        let cc = 2 * Math.sqrt(m * k);
        let beta = c / cc;

        if (beta < 1) {
          let omega_d = Math.sqrt(1 - beta * beta) * omega_n;
          let shi = Math.atan2(x0 * omega_d, x0dot + beta * omega_n * x0);
          X = x0 / Math.sin(shi);
          let env = X * Math.exp(-beta * omega_n * t);

          x = env * Math.sin(omega_d * t + shi);
          xLocs.push(x);
        }
      }
    };

    const myP5 = new p5(sketch, sketchRef.current);
    //sketchRef.current = p;

    return () => {
      myP5.remove(); // Clean up on component unmount
    };
  }, [restBtnStat]);

  return <div ref={sketchRef} className="p5-container w-full h-full" />;
};

export default P5Sketch;
