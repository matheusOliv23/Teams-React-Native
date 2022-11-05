import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import * as S from "./styles";

export default function Players() {
  return (
    <S.Container>
      <Header showBackButton />
      <Highlight
        title="Nome da Turma"
        subtitle="Adicione as pessoas e separe os times"
      />
      <S.Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
      </S.Form>
      <Filter title="Turma A" />
    </S.Container>
  );
}
