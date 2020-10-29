import * as React from "react";
import { Text, View } from "../components/Themed";
import { StyleSheet } from "react-native";
import * as SQLite from "expo-sqlite";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const db = SQLite.openDatabase("appvendadb.banco");

export default function Perfil() {
  const [perfil, setPerfil] = React.useState([]);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from perfil", [], (_, { rows: { _array } }) => {
        setPerfil(_array);
      });
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text>Veja o seu perfil</Text>

      {perfil.map(
        ({
          id,
          idusuario,
          nomeusuario,
          foto,
          nomecliente,
          cpf,
          sexo,
          email,
          telefone,
          tipo,
          logradouro,
          numero,
          complemento,
          bairro,
          cep,
          logado,
        }) => (
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: `http://192.168.0.10/Atividade_APP/img/${foto}` }}
              style={tela.img}
            />
            <Text>Usuário:{nomeusuario}</Text>
            <Text>Nome:{nomecliente}</Text>
            <Text>CPF:{cpf}</Text>
            <Text>Sexo:{sexo}</Text>
            <Text>E-Mail:{email}</Text>
            <Text>Telefone:{telefone}</Text>
            <Text>Tipo:{tipo}</Text>
            <Text>Logradouro:{logradouro}</Text>
            <Text>Número:{numero}</Text>
            <Text>Complemento:{complemento}</Text>
            <Text>Bairro:{bairro}</Text>
            <Text>CEP:{cep}</Text>

            <TouchableOpacity>
              <Text>Atualizar Perfil</Text>
            </TouchableOpacity>
          </View>
        )
      )}

      <TouchableOpacity>
        <Text>Sair do aplicativo</Text>
      </TouchableOpacity>
    </View>
  );
}
const tela = StyleSheet.create({
  img: {
    width: 200,
    height: 180,
    flex: 1,
    resizeMode: "contain",
  },
  link: {
    padding: 10,
  },
});
