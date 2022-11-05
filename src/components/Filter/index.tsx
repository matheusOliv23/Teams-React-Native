import { TouchableOpacityProps } from "react-native";
import * as S from "./styles";
import { FilterStyleProps } from "./styles";

type Props = TouchableOpacityProps &
  FilterStyleProps & {
    title: string;
    isActive?: boolean;
  };

export function Filter({ title, isActive = false, ...rest }: Props) {
  return (
    <S.Container {...rest} isActive={isActive}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}
