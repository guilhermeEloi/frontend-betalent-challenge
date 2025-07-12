export interface InputProps {
  label: string;
  name: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  variant: "filled" | "outlined" | "standard";
  disabled?: boolean;
  type?: string;
  searchbar?: boolean;
  onSearchClick?: () => void;
}
