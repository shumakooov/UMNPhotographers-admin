import { Box, CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <Box
      sx={{
        height: "80vh",
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
