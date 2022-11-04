import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import * as S from "./styles";

export default function Groups() {
  return (
    <S.Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com sua turma" />
      <GroupCard title="Turma de estudos" />
    </S.Container>
  );
}
