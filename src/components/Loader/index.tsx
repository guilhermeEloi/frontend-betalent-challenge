import { CircularProgress, Box } from "@mui/material";

export default function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 4,
      }}
    >
      <CircularProgress style={{ color: "#0500FF" }} />
    </Box>
  );
}
