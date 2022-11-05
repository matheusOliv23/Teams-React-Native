import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { ReactNode } from "react";
import * as S from "./styles";

interface NewGroupProps {
  children: ReactNode;
}

export default function NewGroup() {
  return (
    <S.Container>
      <Header showBackButton />
      <S.Content>
        <S.Icon />
        <Highlight
          title="Nova turma"
          subtitle="Crie a turma para add pessoas"
        />
        <Button title="Criar" />
      </S.Content>
    </S.Container>
  );
}
