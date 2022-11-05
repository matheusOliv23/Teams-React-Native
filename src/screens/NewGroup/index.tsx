import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { ReactNode } from "react";
import * as S from "./styles";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";

interface NewGroupProps {
  children: ReactNode;
}

export default function NewGroup() {
  const navigation = useNavigation();
  function handleNew() {
    navigation.navigate("players", { group: "Estudos" });
  }
  return (
    <S.Container>
      <Header showBackButton />
      <S.Content>
        <S.Icon />
        <Highlight
          title="Nova turma"
          subtitle="Crie a turma para add pessoas"
        />
        <Input placeholder="Nome da Turma" />
        <Button onPress={handleNew} style={{ marginTop: 20 }} title="Criar" />
      </S.Content>
    </S.Container>
  );
}
