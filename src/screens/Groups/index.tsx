import { Button } from "@components/Button";
import { EmptyList } from "@components/EmptyList";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { useState, useCallback } from "react";
import { FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as S from "./styles";
import { groupsGetAll } from "@storage/group/groupsGetAll";
import { Loading } from "@components/Loading";

export default function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate("new");
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group });
  }
  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  const renderItem = ({ item }: { item: string }) => {
    return <GroupCard onPress={() => handleOpenGroup(item)} title={item} />;
  };
  return (
    <S.Container>
      <Header />
      <Highlight title="Teams" subtitle="Jogue com sua turma" />
      {isLoading ? (
        <Loading />
      ) : (
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
      )}

      <Button onPress={handleNewGroup} title="Criar nova turma" />
    </S.Container>
  );
}
