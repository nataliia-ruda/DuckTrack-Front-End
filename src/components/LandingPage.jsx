import React, { useEffect, useRef } from "react";
import Grid from "@mui/material/Grid2";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import SigninForm from "./SigninForm.jsx";
import Box from "@mui/material/Box";

gsap.registerPlugin(MotionPathPlugin);

const LandingPage = () => {
  const svgRef = useRef(null);
  const tl = useRef(null);

  useEffect(() => {
    const numCircles = 7;
    const svg = svgRef.current;
    const ns = "http://www.w3.org/2000/svg";

    tl.current = gsap.timeline({ id: "path followers" });

    
    const circleData = [
      {
        text: "LinkedIn",
        color: "#2767B2",
        textColor: "#F8F8F8",
        fontWeight: "700",
        fontSize: "16",
        radius: 50,
      },
      {
        text: "XING",
        color: "#00796B",
        textColor: "#F1FD01",
        fontWeight: "700",
        fontSize: "16",
        radius: 50,
      },
      {
        text: "Indeed",
        color: "#003A9B",
        textColor: "#FFFFFF",
        fontWeight: "700",
        fontSize: "16",
        radius: 50,
      },
      {
        text: "StepStone",
        color: " hsla(182, 47%, 74%, 1)",
        textColor: "#00217A",
        fontWeight: "800",
        fontSize: "16",
        radius: 50,
      },
      {
        text: "Monster",
        color: "#7A4EC0",
        textColor: "#F8F8F8",
        fontWeight: "700",
        fontSize: "16",
        radius: 50,
      },
      {
        text: "Jobware",
        color: "#FF5D02",
        textColor: "black",
        fontWeight: "700",
        fontSize: "16",
        radius: 50,
      },
      {
        text: "Arbeitsagentur",
        color: "#EC252C",
        textColor: "#FFFFFF",
        fontSize: "14",
        radius: 50,
      },
    ];

    for (let i = 0; i < numCircles; i++) {
      let newCircle = document.createElementNS(ns, "circle");
      let newText = document.createElementNS(ns, "text");

      
      const { text, color, radius, textColor, fontWeight, fontSize } = circleData[i];

     
      newCircle.setAttributeNS(null, "cx", 300);
      newCircle.setAttributeNS(null, "cy", 300); 
      newCircle.setAttributeNS(null, "r", radius);
      /* newCircle.setAttributeNS(null, "stroke", "white");
      newCircle.setAttributeNS(null, "stroke-width", 3); */

      
      newText.setAttributeNS(null, "x", 300); 
      newText.setAttributeNS(null, "y", 300); 
      newText.setAttributeNS(null, "fill", textColor);
      newText.setAttributeNS(null, "font-size", fontSize);
      newText.setAttributeNS(null, "text-anchor", "middle");
      newText.setAttributeNS(null, "font-weight", fontWeight);
      newText.textContent = text; 

      svg.appendChild(newCircle);
      svg.appendChild(newText);

      let start = i / numCircles; 

      gsap.set(newCircle, {
        fill: color, 
      });

      
      tl.current.to(
        [newCircle, newText],
        {
          motionPath: {
            path: ".myPath",
            align: ".myPath",
            alignOrigin: [0.5, 0.5],
            start: start,
            end: start + 1,
          },
          ease: "none",
          duration: 10, 
          repeat: -1,
        },
        0
      );
    }
  }, []);

  return (
    <Grid
      container
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Left Section */}
      <Grid
        xs={12}
        md={6}
        sx={{
          width: {
            xs: "100%",
            sm: "70%",
            md: "50%",
            lg: "50%",
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            width: "70%",
            height: "auto",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            padding: 5,
            backgroundColor: "#fff",
          }}
        >
          <SigninForm />
        </Box>
      </Grid>

      {/* Right Section*/}
      <Grid
        xs={12}
        md={6}
        sx={{
          width: {
            xs: "100%",
            sm: "70%",
            md: "50%",
            lg: "50%",
          },
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFC107",
        }}
      >
        <svg
          ref={svgRef}
          width="600"
          height="600" 
          viewBox="0 0 600 600"
          xmlns="http://www.w3.org/2000/svg"
        >
         
          <path
            className="myPath"
            d="M 300,50 A 250,250 0 1,1 299,50 Z" 
            fill="none"
            stroke="transparent"
          />

          
          <image
            href="/LoginImg.png"
            x="150" 
            y="150" 
            width="300"
            height="300"
            style={{ borderRadius: "50%" }}
          />
        </svg>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
