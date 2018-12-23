import React from 'react';
import {
  StyleSheet, Text, View, Image, ScrollView, Dimensions, SafeAreaView, TouchableOpacity
} from 'react-native';
import axios from 'axios';

const origImageSize = {
  width: 240,
  height: 144,
};

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      columnsCount: 3,
      serials: [],
    };
  }

  componentDidMount() {
    axios.get('https://lostfilmapp.naxel.me/serials')
      .then((response) => {
        if (response.data && response.data.serials) {
          console.log(response.data.serials);
          this.setState({ serials: response.data.serials });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.text}>Columns:</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {this.setState({ columnsCount: 2 });}}
        >
          <Text style={[
            styles.text,
            { color: this.state.columnsCount === 2 ? 'red' : 'white' }
          ]}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {this.setState({ columnsCount: 3 });}}
        >
          <Text style={[
            styles.text,
            { color: this.state.columnsCount === 3 ? 'red' : 'white' }
          ]}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {this.setState({ columnsCount: 4 });}}
        >
          <Text style={[
            styles.text,
            { color: this.state.columnsCount === 4 ? 'red' : 'white' }
          ]}>4</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const columns = [];
    let column = 0;
    this.state.serials.forEach((serial) => {
      if (!columns[column]) {
        columns[column] = [];
      }
      columns[column].push(
        <View key={serial.serialId}>
          <Image
            source={{
              uri: 'https://lostfilmapp.naxel.me/images/small_posters/' + serial.serialId +
              '.jpeg'
            }}
            style={{
              width: Dimensions.get('window').width / this.state.columnsCount,
              height: (origImageSize.height / origImageSize.width) *
              Dimensions.get('window').width / this.state.columnsCount,
            }}
          />
        </View>
      );
      if (column >= this.state.columnsCount - 1) {
        column = 0;
      } else {
        column++;
      }
    });

    const allColumns = [];
    for (let i = 0; i < this.state.columnsCount; i++) {
      allColumns.push(<View key={i}>{columns[i]}</View>);
    }
    return (
      <SafeAreaView style={styles.container}>
        {this.renderHeader()}
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {allColumns}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollViewContainer: {
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
  },
  button: {
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
  text: {
    color: 'white'
  }
});
