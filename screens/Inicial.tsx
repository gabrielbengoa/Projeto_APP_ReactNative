import * as React from "react";
import { Text, View } from "../components/Themed";
import { Image, StyleSheet, ActivityIndicator, Button } from "react-native";
import {
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native-gesture-handler";
import NumberFormat from "react-number-format";
import { createStackNavigator } from "@react-navigation/stack";
import DetalheProduto from "./DetalheProduto";

const Stack = createStackNavigator();

export default function Inicial() {
  return (
    <Stack.Navigator initialRouteName="Produtos">
      <Stack.Screen name="Produtos" component={Produtos} />
      <Stack.Screen name="DetalheProduto" component={DetalheProduto} />
    </Stack.Navigator>
  );
}

function Produtos({ navigation }) {
  const [carregado, setCarregado] = React.useState(true);
  const [dados, setDados] = React.useState([]);

  //Carregar a api com os dados do banco de dados.
  //Executar a consulta listartelainicial

  React.useEffect(() => {
    fetch("http://192.168.0.10/Atividade_APP/service/produto/listartelainicial.php")
      .then((response) => response.json())
      .then((produtos) => setDados(produtos.saida))
      .catch((error) => console.error(error))
      .finally(() => setCarregado(false));
  }, []);

  return (
    <View>
      <ScrollView>
        <Image
          source={require("../assets/images/produtos.png")}
          style={tela.imagem}
        />

        {carregado ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={dados}
            renderItem={({ item }) => (
              <View>
                <Image
                  source={{
                    uri: `http://192.168.0.3/projeto/img/${item.foto}`,
                  }}
                  style={tela.img}
                />
                <Text style={tela.nome}>{item.nomeproduto}</Text>

                <NumberFormat
                  value={item.preco}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"R$"}
                  renderText={(valor) => <Text>{valor}</Text>}
                />

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("DetalheProduto", {
                      idproduto: `${item.idproduto}`,
                    });
                  }}
                >
                  <Text style={tela.link}> Saiba mais </Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={({ idproduto }, index) => idproduto}
          />
        )}
      </ScrollView>
    </View>
  );
}

const tela = StyleSheet.create({
  imagem: {},
  img: {
    width: 100,
    height: 100,
    flex: 1,
    resizeMode: "contain",
  },
  link: {
    padding: 10,
  },
});
