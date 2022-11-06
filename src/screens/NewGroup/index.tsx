import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { ReactNode, useState } from "react";
import * as S from "./styles";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";

export default function NewGroup() {
  const [group, setGroup] = useState("");
  const navigation = useNavigation();

  async function handleNew() {
    await groupCreate(group);
    navigation.navigate("players", { group });
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
        <Input onChangeText={setGroup} placeholder="Nome da Turma" />
        <Button onPress={handleNew} style={{ marginTop: 20 }} title="Criar" />
      </S.Content>
    </S.Container>
  );
}
