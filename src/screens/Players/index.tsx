import { ButtonIcon } from "@components/ButtonIcon";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import * as S from "./styles";

export default function Players() {
  return (
    <S.Container>
      <Header showBackButton />
      <Highlight
        title="Nome da Turma"
        subtitle="Adicione as pessoas e separe os times"
      />
      <ButtonIcon icon="add" />
    </S.Container>
  );
}
