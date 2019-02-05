import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  Dimensions, FlatList
} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import Swipeout from 'react-native-swipeout';

const initialArr = [
  {
    id: 1,
    text: "Example 1"
  },
  {
    id: 2,
    text: "Example 2"
  },
  {
    id: 3,
    text: "Example 3"
  },
  {
    id: 4,
    text: "Example 4"
  },
];

export default class ListScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'List',
  // };

  constructor(props) {
    super(props);
    this.state = {
      selectedRow: null
    }
  }

  // renderList () {
  //     return initialArr.map((item) => {
  //         return (
  //             <View style={{ flexDirection: 'row' }} key={item.id}>
  //               <View style={styles.optionIconContainer}>
  //                   <Image
  //                       source={require('./../assets/images/robot-prod.png')}
  //                       resizeMode="contain"
  //                       fadeDuration={0}
  //                       style={{ width: 20, height: 20, marginTop: 1 }}
  //                   />
  //                   <View style={styles.optionTextContainer}>
  //                       <Text style={styles.optionText}>
  //                           {item.text}
  //                       </Text>
  //                   </View>
  //               </View>
  //             </View>
  //         );
  //     });
  // }

  flatListItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }


  render() {

    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {
        if (this.state.selectedRow != null) {
          this.state({selectedRow: null});
        }
      },
      onOpen: (secId, rowId, direction) => {
        if (this.state.selectedRow != null)
          this.state({selectedRow: this.props.item.key});
      },
      right: [
        {
          onPress: () => {

          },
          text: 'Delete', type: 'delete'
        }
      ],
      rowId: this.props.index
    };


    return (

      <View style={styles.MainContainer}>
        <Swipeout {...swipeSettings} ></Swipeout>
        <FlatList
          data={initialArr}
          ItemSeparatorComponent={this.flatListItemSeparator}
          renderItem={({item}) =>
            <View style={{flex: 1, flexDirection: 'row'}} index={item.id}>
              <Image source={require('./../assets/images/robot-prod.png')} style={styles.imageView}/>
              <Text style={styles.textView}>{item.text}</Text>
            </View>
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 5,
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
  },
  imageView: {
    width: '50%',
    height: 50,
    margin: 7,
    borderRadius: 7
  },
  textView: {
    width: '50%',
    textAlignVertical: 'center',
    padding: 10,
    color: '#000'
  }
});
