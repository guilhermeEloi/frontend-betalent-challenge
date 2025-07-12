import { IconButton, InputAdornment, TextField } from "@mui/material";
import type { InputProps } from "./types";

import SearchIcon from "@mui/icons-material/Search";

const Input = ({
  label,
  name,
  value,
  onChange,
  required,
  variant,
  disabled,
  type = "text",
  searchbar = false,
  onSearchClick,
}: InputProps) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      variant={variant}
      margin="normal"
      disabled={disabled}
      type={type}
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#ffffff",
          borderRadius: "8px",
        },
      }}
      InputProps={{
        endAdornment: searchbar ? (
          <InputAdornment position="end">
            <IconButton edge="end" onClick={onSearchClick}>
              <SearchIcon fontSize="large" style={{ color: "#F0F0F0" }} />
            </IconButton>
          </InputAdornment>
        ) : undefined,
      }}
    />
  );
};

export default Input;
