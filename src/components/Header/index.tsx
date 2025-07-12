import logoImg from "@/assets/Logo.png";

import { Container, LogoContainer, LogoImg } from "./styles";

export default function Header() {
  return (
    <Container>
      <LogoContainer>
        <LogoImg src={logoImg} alt="Logo Be Talent" />
      </LogoContainer>
    </Container>
  );
}
