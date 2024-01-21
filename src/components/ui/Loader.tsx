import { Box, CircularProgress } from "@mui/material";

export default function Loader({ fullPage = true }) {
  return (
    <Box
      sx={{
        height: fullPage ? "80vh" : "100%",
        display: {
          xs: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
}
