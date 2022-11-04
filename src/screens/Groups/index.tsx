import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import * as S from "./styles";

export default function Groups() {
  return (
    <S.Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com sua turma" />
    </S.Container>
  );
}
