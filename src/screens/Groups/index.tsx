import { Button } from "@components/Button";
import { EmptyList } from "@components/EmptyList";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { useState } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as S from "./styles";

export default function Groups() {
  const [groups, setGroups] = useState([]);

  const navigation = useNavigation();
  const renderItem = ({ item }: { item: string }) => {
    return <GroupCard title={item} />;
  };

  function handleNewGroup() {
    navigation.navigate("new");
  }
  return (
    <S.Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com sua turma" />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <EmptyList message="Cadastre a primeira turma" />
        )}
        showsVerticalScrollIndicator={false}
      />
      <Button onPress={handleNewGroup} title="Criar nova turma" />
    </S.Container>
  );
}
