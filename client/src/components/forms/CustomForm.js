import { styled } from "@mui/material/styles";

export const FileInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});
