import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { gsap } from "gsap";

const AnimatedLogo = () => {
  const lettersRef = useRef([]);

  useEffect(() => {
    /*  Logo image  */
    gsap.fromTo(
      lettersRef.current[0],
      {
        x: -500,
        rotation: -720,
        opacity: 0,
      },
      {
        x: 0,
        rotation: 0,
        opacity: 1,
        duration: 2.5,
        ease: "power2.out",
      }
    );

    /*  Letter U */

    const uTimeline = gsap.timeline({ delay: 0.3 });
    uTimeline.fromTo(
      lettersRef.current[1],
      {
        rotationX: 0,
        opacity: 0,
        scale: 1.5,
      },
      {
        rotationX: 360, 
        opacity: 1,
        scale: 1.2,
        duration: 1.5, 
        ease: "expo.out",
      }
    );
    uTimeline.to(lettersRef.current[1], {
      rotationX: 0,
      scale: 1,
      duration: 1.2,
      ease: "elastic.out(1, 0.4)",
    });

    /* Letter C */
    gsap.fromTo(
      lettersRef.current[2],
      {
        x: -300,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 2,
        ease: "power3.out",
        delay: 0.8,
      }
    );

    /* Letter K */
    gsap.fromTo(
      lettersRef.current[3],
      {
        y: 200,
        scale: 2,
        rotation: -180,
        opacity: 0,
      },
      {
        y: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 2,
        ease: "elastic.out(1, 0.5)",
        delay: 1.0,
      }
    );

    /* Letter T */
    gsap.fromTo(
      lettersRef.current[4],
      {
        y: -150,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "power3.out",
        delay: 1.2,
      }
    );

    /* Letter R */
    gsap.fromTo(
      lettersRef.current[5],
      {
        y: -150,
        rotation: 90,
        opacity: 0,
      },
      {
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 2,
        ease: "back.out(1.7)",
        delay: 1.4,
      }
    );

    /* Letter A */
    gsap.fromTo(
      lettersRef.current[6],
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "back.out(2)",
        delay: 1.6,
      }
    );

    /* Letter C second one */
    gsap.fromTo(
      lettersRef.current[7],
      {
        y: 200,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "back.out(1.7)",
        delay: 1.8,
      }
    );

    /* Letter K last one */
    gsap.fromTo(
      lettersRef.current[8],
      {
        x: -200,
        rotation: -360,
        opacity: 0,
      },
      {
        x: 0,
        rotation: 0,
        opacity: 1,
        duration: 2,
        ease: "power4.out",
        delay: 2.0,
      }
    );
  }, []);

  
  const text = "uckTrack";

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          display: "flex",
          color: "#001A42",
          fontWeight: 800,
          justifyContent: "center",
          alignItems: "center",
          fontSize: {xs: 45, md:70},
        }}
      >
        <span
          ref={(el) => (lettersRef.current[0] = el)}
          style={{
            display: "inline-block",
            transformOrigin: "center center",
            marginRight: "0em", 
          }}
        >
          <img
            src="/d_logo.png"
            alt="Logo"
            style={{
              height :"0.85em",
              verticalAlign: "baseline",
            }}
          />
        </span>

        {/* The rest of the letters moving */}
        {text.split("").map((letter, index) => (
          <span
            key={index}
            ref={(el) => (lettersRef.current[index + 1] = el)}
            style={{
              display: "inline-block",
              transformOrigin: "center center",
              marginRight: letter === " " ? "0.3em" : "0.05em",
              perspective: "1000px",
            }}
          >
            {letter}
          </span>
        ))}
      </Typography>
    </Box>
  );
};

export default AnimatedLogo;
