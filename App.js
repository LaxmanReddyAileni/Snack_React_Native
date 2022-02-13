import React, { PureComponent } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import { fruits } from "./fruits";

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: fruits.data,
      Obj: {},
      activeIndex: 0,
      open: false,
    };
  }

  onPresshandler = (index) => {
    if (this.state.Obj[index] === true) {
      this.setState({ open: false, activeIndex: index });
      let datas = this.state.Obj;
      datas[index] = false;
      this.setState({ Obj: datas });
    } else {
      let data = this.state.Obj;
      data[index] = true;
      this.setState({ Obj: data });
      this.setState({ open: true, activeIndex: index });
    }
  };

  renderFunction = ({ item, index }) => {
    const fruitName = item.name;
    const newFruitName = fruitName.charAt(0).toUpperCase() + fruitName.slice(1);
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.5}
        onPress={() => this.onPresshandler(index)}
      >
        <View>
          <Image
            style={
              this.state.Obj[index] === false ||
              this.state.Obj[index] === undefined
                ? styles.cardImage
                : [styles.cardImage, { height: 300 }]
            }
            source={{
              uri: item.image,
            }}
          />
          <Text style={styles.cardText}>{newFruitName}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    let { items } = this.state;
    if (items.length === 0) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <FlatList
        style={styles.container}
        data={fruits.data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderFunction}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    margin: 30,
    flex: 1,
  },
  cardText: {
    ...Platform.select({
      android: {
        top: -45,
      },
      ios: {
        top: -45,
      },
      default: {
        top: +50,
      },
    }),
    bottom: 0,
    left: 0,
    right: 0,
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 18,
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 15,
  },
  loader: {
    flex: 1,
  },
});
