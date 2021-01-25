import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Divider, Typography } from "@material-ui/core";
import React from "react";

const theme = createMuiTheme();

theme.typography.h3 = {
  display: "block",
  fontSize: "1.2rem",
  fontFamily: "Fredoka One",
  color: "#4C5D73",
  margin: "0 auto",
  paddingTop: "0.5rem",
  marginBottom: "0.5rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
    textAlign: "center",
  },
  [theme.breakpoints.up("md")]: {
    textAlign: "center",
    fontSize: "2rem",
  },
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    fontSize: "1.8rem",
  },
};

export default function PageHeader({ titleText }) {
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h3">{titleText}</Typography>
      <Divider style={{ margin: "1.2rem 0" }} />
    </ThemeProvider>
  );
}
