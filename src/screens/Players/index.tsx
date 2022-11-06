import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { EmptyList } from "@components/EmptyList";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { PlayerCard } from "@components/PlayerCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { playerAddbyGroup } from "@storage/player/playerAddByGroup";
import { getPlayersByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { AppError } from "@utils/AppError";
import React, { useEffect, useState, useRef } from "react";
import { Alert, FlatList, TextInput } from "react-native";

import * as S from "./styles";

type RouteParams = {
  group: string;
};

export default function Players() {
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const route = useRoute();
  const { group } = route.params as RouteParams;
  const navigation = useNavigation();

  const newPlayerNameInfoRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert("Nova pessoa", "Informe o nome da pessoa ");
    }
    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddbyGroup(newPlayer, group);
      newPlayerNameInfoRef.current?.blur();
      setNewPlayerName("");
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message);
      } else {
        console.log(error);
        Alert.alert("Nova pessoa", "Não foi possível adicionar uma pessoa");
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await getPlayersByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert("Pessoas", "Não foi possivel carregar as pessoas desse time");
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert("Remover pessoa", "Não foi possivel remover essa pessoa");
    }
  }

  async function groupDelete() {
    try {
      await groupRemoveByName(group);
      navigation.navigate("groups");
    } catch (error) {
      Alert.alert("Remover grupo", "Não foi possível remover o grupo");
    }
  }
  async function handleGroupRemove() {
    Alert.alert("Remover", `Deseja remover o grupo ${group}?`, [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => groupDelete() },
    ]);
  }
  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  const renderItem = ({ item }: { item: string }) => {
    return (
      <Filter
        isActive={item === team}
        onPress={() => setTeam(item)}
        title={item}
      />
    );
  };
  return (
    <S.Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="Adicione as pessoas e separe os times"
      />
      <S.Form>
        <Input
          inputRef={newPlayerNameInfoRef}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon onPress={handleAddPlayer} icon="add" />
      </S.Form>
      <S.HeaderList>
        <FlatList
          data={["Time A", "Time B", "Time C"]}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          horizontal
        />
        <S.PlayersNumber>{players.length}</S.PlayersNumber>
      </S.HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            onRemove={() => handleRemovePlayer(item.name)}
            name={item.name}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyList message="Não há pessoas nessa lista" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />
      <Button
        onPress={handleGroupRemove}
        title="Remover Turma"
        type="SECONDARY"
      />
    </S.Container>
  );
}
