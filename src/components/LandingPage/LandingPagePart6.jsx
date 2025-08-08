import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { gsap } from "gsap";
import { useRef, useEffect } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

const LandingPagePart6 = ({ contactSectionRef }) => {
  const imgSrc = "/duck1.png";

  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    const totalWidth = slider.scrollWidth / 2;

    const animation = gsap.fromTo(
      slider,
      { x: -totalWidth },
      {
        x: 0,
        duration: 80,
        ease: "linear",
        repeat: -1,
      }
    );

    return () => {
      animation.kill();
    };
  }, []);
  return (
    <>
      <Box
        ref={containerRef}
        sx={{
          overflow: "hidden",
          width: "100%",
          position: "relative",
          backgroundColor: "#f9f9f9",
          background: "blur",
          height: "auto",
        }}
      >
        <Box
          ref={sliderRef}
          sx={{
            backgroundImage: `linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.6) 0%,
          rgba(255, 255, 255, 0.6) 60%,
          rgba(214, 236, 255, 0.6) 70%,
          rgba(153, 204, 255, 0.6) 80%,
          rgba(77, 166, 255, 0.6) 90%,
          rgba(26, 95, 180, 0.6) 100%
        )`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            display: "flex",
            gap: { xs: 4, md: 8 },
            width: "max-content",
          }}
        >
          {[...Array(2)].flatMap((_, groupIndex) =>
            [...Array(40)].map((_, i) => (
              <Box
                component="img"
                key={`${groupIndex}-${i}`}
                src={imgSrc}
                alt={`scrolling-duck-${groupIndex}-${i}`}
                sx={{
                  width: { xs: "8vw", md: "4vw" },
                  flexShrink: 0,
                }}
              />
            ))
          )}
        </Box>
      </Box>
      <Box
        ref={contactSectionRef}
        sx={{
          width: "100%",
          height: "auto",
          bgcolor: "rgba(26, 95, 180, 0.6) ",
          pt: { xs: 2, md: 3 },
          pb: 1,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#f9f9f9",
            fontWeight: "800",
            mb: 1,
            fontSize: { xs: "1rem", md: "1.5rem" },
          }}
        >
          Do you have questions or suggestions?
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#f9f9f9",
            mb: 2,
            fontSize: { xs: "0.7rem", md: "1rem" },
            px: 2,
          }}
        >
          We'd love to hear from you! Reach out to us anytime with feedback,
          questions, or ideas for improving DuckTrack.
        </Typography>

        <Box sx={{ mb: 1.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: { xs: "0.8rem", md: "1rem" },
            }}
          >
            <EmailIcon
              sx={{
                color: "#f9f9f9",
                fontSize: { xs: "1.1rem", md: "1.4rem" },
              }}
            />
            <Link
              href="mailto:support@ducktrack.com"
              style={{ color: "#f9f9f9", textDecoration: "underline" }}
            >
              support@ducktrack.com
            </Link>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PhoneIcon
              sx={{
                color: "#f9f9f9",
                fontSize: { xs: "1.1rem", md: "1.4rem" },
              }}
            />
            <Typography
              variant="body1"
              sx={{
                color: "#f9f9f9",
                mt: 1,
                fontSize: { xs: "0.7rem", md: "1rem" },
              }}
            >
              +491234567890
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "block",
            color: "#f9f9f9",
            justifySelf: "flex-end",
            fontSize: { xs: "0.5rem", md: "0.8rem" },
          }}
        >
          © {new Date().getFullYear()} DuckTrack. All rights reserved.
        </Typography>
      </Box>
    </>
  );
};

export default LandingPagePart6;
