import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { gsap } from "gsap";

const LOGO_TEXT = "uckTrack";

const AnimatedLogo = () => {
  const containerRef = useRef(null);
  const charsContainerRef = useRef(null);

  useEffect(() => {
    const chars = charsContainerRef.current.querySelectorAll(".char");

    // Start each letter tipped back and below the baseline, like a flap lying flat
    gsap.set(chars, {
      opacity: 0,
      y: 80,
      rotationX: -100,
      scale: 0.4,
      transformOrigin: "50% 100%",
    });

    const tl = gsap.timeline();

    // Logo image comes in first, same as before
    tl.fromTo(
      containerRef.current,
      { x: -300, rotation: -360, opacity: 0 },
      { x: 0, rotation: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
    );

    // Letters pop/flip up into place one after another, with a slight overshoot
    tl.to(
      chars,
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.9,
        ease: "back.out(1.8)",
        stagger: 0.05,
      },
      "-=0.7"
    );
  }, []);

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Typography
        variant="h1"
        sx={{ display: "flex", color: "#001A42", fontWeight: 800, fontSize: { xs: 45, md: 70 } }}
      >
        <span ref={containerRef} style={{ display: "inline-block", marginRight: "0.05em" }}>
          <img src="/d_logo.png" alt="Logo" style={{ height: "0.85em", verticalAlign: "baseline" }} />
        </span>
        <span ref={charsContainerRef} style={{ display: "inline-block", perspective: "600px" }}>
          {LOGO_TEXT.split("").map((char, i) => (
            <span key={i} className="char" style={{ display: "inline-block" }}>
              {char}
            </span>
          ))}
        </span>
      </Typography>
    </Box>
  );
};

export default AnimatedLogo;