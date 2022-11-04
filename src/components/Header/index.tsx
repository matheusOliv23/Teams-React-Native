import * as S from "./styles";

import logo from "@assets/logo.png";

export function Header() {
  return (
    <S.Container>
      <S.Logo source={logo} />
    </S.Container>
  );
}
