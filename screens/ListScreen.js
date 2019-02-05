import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
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
import HomeScreen from "./HomeScreen";

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
  {
    id: 5,
    text: "Example 5"
  },
  {
    id: 6,
    text: "Example 6"
  },
  {
    id: 7,
    text: "Example 7"
  },
  {
    id: 8,
    text: "Example 8"
  },
];

export default class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'List',
    headerTitle: "Lists",
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#000"
      />
    ),
    headerLeft: (
      <Button
        onPress={() => {
          try {
            /** Should take to back screen, Somehow not working, maybe the props is not passed properly
             const {navigate} = this.props.navigation;
             navigate('HomeScreen')
             */
            alert('In an ideal world this should take you to the previous screen, but I\'m not working!');
          }
          catch (e) {
            console.error(e.message);
          }
        }}
        title="Back"
        color="#05e1ff"
      />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedRow: null
    }
  }

  /** Was trying to render list in react way before using loop, but swipe didnt work so tried usng FlatList with icons */

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
      <ScrollView>
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
      </ScrollView>
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

/** tried to create a Navigator stack for back button, but it didn't work yet **/

// const RootStack = createStackNavigator(
//   {
//     Home: {
//       screen: HomeScreen,
//     },
//     ListScreen: {
//       screen: ListScreen,
//     },
//   },
//   {
//     initialRouteName: 'Home',
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: '#f4511e',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     },
//   }
// );
//
// const AppContainer = createAppContainer(RootStack);
//
// class App extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }