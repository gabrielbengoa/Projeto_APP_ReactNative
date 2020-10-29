import * as React from "react";
import { Text, View } from "../components/Themed";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

import * as SQLite from "expo-sqlite";

export default function DetalheProduto({ route }) {
  const { idproduto } = route.params;
  const [carregado, setCarregado] = React.useState(true);
  const [dados, setDados] = React.useState([]);

  React.useEffect(() => {
    fetch(
      `http://192.168.0.10/Atividade_APP/service/produto/detalheproduto.php?idproduto=${idproduto}`
    )
      .then((response) => response.json())
      .then((produto) => setDados(produto.saida))
      .catch((error) =>
        console.error(`Erro ao tentar carregar o produto ${error}`)
      )
      .finally(() => setCarregado(false));
  }, []);

  return (
    <View>
      {carregado ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={dados}
          renderItem={({ item }) => (
            <View>
              <Image
                source={{ uri: `http://192.168.0.3/projeto/img/${item.foto1}` }}
                style={tela.img}
              />
              <Image
                source={{ uri: `http://192.168.0.3/projeto/img/${item.foto2}` }}
                style={tela.img}
              />
              <Image
                source={{ uri: `http://192.168.0.3/projeto/img/${item.foto3}` }}
                style={tela.img}
              />
              <Image
                source={{ uri: `http://192.168.0.3/projeto/img/${item.foto4}` }}
                style={tela.img}
              />
              <Text>{item.nomeproduto}</Text>
              <Text>{item.descricao}</Text>
              <Text>{item.preco}</Text>

              <TouchableOpacity
                onPress={() => {
                  adicionarAoCarrinho(
                    `${idproduto}`,
                    `${item.nomeproduto}`,
                    `${item.preco}`,
                    `${item.foto1}`
                  );
                }}
                style={tela.link}
              >
                <Text> Adicionar ao Carrinho </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={({ idproduto }, index) => idproduto}
        />
      )}
    </View>
  );
}
const tela = StyleSheet.create({
  img: {
    width: 200,
    height: 180,
    flex: 1,
  },
  link: {
    padding: 10,
  },
});
//Fazer a constante do banco de dados. Vamos chamarde db

const db = SQLite.openDatabase("appvendadb.banco");

function adicionarAoCarrinho(id, nome, preco, foto) {
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists itens(id integer primary key,idproduto int,nomeproduto text, preco text, foto text);"
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "insert into itens(idproduto,nomeproduto,preco,foto)values(?,?,?,?)",
      [id, nome, preco, foto]
    );
    tx.executeSql("select * from itens", [], (_, { rows }) => {
      console.log(JSON.stringify(rows));
    });
  });
}
