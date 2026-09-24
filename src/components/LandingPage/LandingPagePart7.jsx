import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const faqs = [
  {
    question: "Is DuckTrack free?",
    answer:
      "Yes, completely free. Create an account and start tracking your applications right away. No trial period, no credit card.",
  },
  {
    question: "Is there a limit to how many applications I can track?",
    answer:
      "No. Add as many applications as you need, whether you're sending five a month or fifty a week.",
  },
  {
    question: "How do I log an interview?",
    answer:
      "There are two ways. Click the + button in the Interviews section of your dashboard, or simply change an application's status to \"Interviewing\" and the interview form will open automatically.",
  },
  {
    question: "Will I get a reminder before my interview?",
    answer:
      "Yes. Once you've logged an interview, DuckTrack emails you a reminder 24 hours before it starts, so you have time to prepare.",
  },
  {
    question: "What is Auto-Ghosting Mode?",
    answer:
      "Sometimes companies simply never reply. With Auto-Ghosting Mode turned on, any application that stays in \"Applied\" with no updates for 3 weeks is automatically marked as \"Ghosted\", which keeps your list tidy and your statistics honest. You can switch it on or off at any time in your profile settings.",
  },
  {
    question: "Who can see my data?",
    answer:
      "Only you. Your applications are linked to your personal account and aren't visible to anyone else. We don't sell or share your data, and you stay in control of it: you can delete it whenever you like.",
  },
  {
    question: "Can I delete my account?",
    answer:
      "Yes. Go to your profile settings in the dashboard and choose to delete your account. This permanently removes your account and all the applications stored in it, and it can't be undone.",
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
