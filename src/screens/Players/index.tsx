import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { PlayerCard } from "@components/PlayerCard";
import React, { useState } from "react";
import { FlatList } from "react-native";
import * as S from "./styles";

export default function Players() {
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState(["Matheus", "Carlos"]);

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
        title="Nome da Turma"
        subtitle="Adicione as pessoas e separe os times"
      />
      <S.Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
      </S.Form>
      <S.HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          horizontal
        />
        <S.PlayersNumber>{players.length}</S.PlayersNumber>
      </S.HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          return <PlayerCard onRemove={() => {}} name={item} />;
        }}
      />
    </S.Container>
  );
}
