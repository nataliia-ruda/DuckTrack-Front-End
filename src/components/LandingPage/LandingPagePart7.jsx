import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const faqs = [
  {
    question: "Is DuckTrack free to use?",
    answer:
      "Yes! DuckTrack is completely free to use — you can create an account and start tracking your job applications right away.",
  },
  {
    question: "Do I need to install anything to use DuckTrack?",
    answer:
      "No installation required. DuckTrack runs entirely in your browser, so you can access your applications from any device with an internet connection.",
  },
  {
    question: "Can I edit or delete an application after adding it?",
    answer:
      "Absolutely. You can update the status, edit any details, or delete an application from your table at any time with a single click.",
  },
  {
    question: "Will I get reminders for my interviews?",
    answer:
      "Yes, once you log an interview with its date and time, DuckTrack will send you timely email reminders so you never miss it.",
  },
  {
    question: "Is my data private and secure?",
    answer:
      "Your data is only visible to you. We never share your application details with third parties, and your account is protected by your own login credentials.",
  },
  {
    question: "Can I track statistics about my job search?",
    answer:
      "Yes! The Analytics page gives you an overview of your applications, response rates, and interview progress so you can track your job hunt over time.",
  },
];

const LandingPagePart7 = ({ faqSectionRef }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      ref={faqSectionRef}
      sx={{
        width: "100%",
        pt: { xs: 3, md: 8 },
        pb: { xs: 6, md: 12 },
        px: { xs: 2, md: 6 },
        boxSizing: "border-box",
        bgcolor: "#f9f9f9",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          fontSize: { xs: 28, md: 50 },
          textAlign: "center",
          mb: { xs: 2, md: 6 },
          py: { xs: 2, md: 1 },
          color: "#001A42",
        }}
      >
        Frequently Asked Questions
      </Typography>

      <Box
        sx={{
          maxWidth: "900px",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: { xs: 1.5, md: 2 },
        }}
      >
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
            disableGutters
            elevation={0}
            sx={{
              bgcolor: "#ffffff",
              borderRadius: "12px !important",
              border: "1px solid rgba(0, 26, 66, 0.1)",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
              overflow: "hidden",
              "&:before": {
                display: "none",
              },
              "&.Mui-expanded": {
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#001A42" }} />}
              sx={{
                px: { xs: 2, md: 3 },
                py: { xs: 0.5, md: 1 },
                flexDirection: "row-reverse",
                gap: { xs: 1.5, md: 2 },
                "& .MuiAccordionSummary-content": {
                  my: 1.5,
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "0.9rem", md: "1.1rem" },
                  color: "#001A42",
                }}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                px: { xs: 2, md: 3 },
                pb: { xs: 2, md: 3 },
                pt: 0,
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "0.8rem", md: "1rem" },
                  color: "#4F6073",
                }}
              >
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default LandingPagePart7;
