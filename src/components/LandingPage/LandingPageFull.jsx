import LandingPagePart1 from "./LandingPagePart1.jsx";
import LandingPagePart2 from "./LandingPagePart2.jsx";
import LandingPagePart3 from "./LandingPagePart3.jsx";
import LandingPagePart4 from "./LandingPagePart4.jsx";
import LandingPagePart5 from "./LandingPagePart5.jsx";
import LandingPagePart6 from "./LandingPagePart6.jsx";
import Box from "@mui/material/Box";
import { useRef } from "react";

const LandingPageFull = () => {
  const featuresPartRef = useRef(null);

  const scrollToFeatures = () => {
    featuresPartRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const instructionsPartRef = useRef(null);

  const scrollToInstructions = () => {
    instructionsPartRef.current?.scrollIntoView({ behavior: "smooth" });
  }; 

  const contactPartRef = useRef(null);

  const scrollToContact = () => {
    contactPartRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <LandingPagePart1
        onFeaturesClick={scrollToFeatures}
        onInstructionsClick={scrollToInstructions}
        onContactClick = {scrollToContact}
      />
      <LandingPagePart2 featuresSectionRef={featuresPartRef} />
      <LandingPagePart3 instructionsSectionRef={instructionsPartRef} />
      <LandingPagePart4 />
      <LandingPagePart5 />
      <LandingPagePart6 contactSectionRef = {contactPartRef}/>
    </Box>
  );
};

export default LandingPageFull;
