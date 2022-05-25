import { Text, View, Button } from 'react-native';
import { useState } from 'react';

export default function Contador(props) {
  const [contador, setContador] = useState(props.init ? props.init : 0);
  const sube = () => setContador(contador + 1)
  
  return (
    <View style={{ alignItems: 'center'}}>
      <Text>{contador}</Text>
      <View style={{ flexDirection: 'row'}}>
        <Button title='-' onPress={() => setContador(contador - 1)} />
        <Button title='+' onPress={sube} />
      </View>
    </View>
  );
}
