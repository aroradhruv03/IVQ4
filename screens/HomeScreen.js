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
  Dimensions
} from 'react-native';
import {WebBrowser} from 'expo';
import {createStackNavigator, createAppNavigator} from 'react-navigation';
import {MonoText} from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Welcome'
  };

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      errorText: ''
    };
  }

  render() {
    let {userName, password, errorText} = this.state;

    return (

      <View style={styles.container}>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>
          <Text style={styles.getStartedText}>Please Enter Details</Text>
          <Text/>
          <View style={styles.textCenter}>
            <View style={styles.textContainer}>
              <TextInput placeholder={"User Name"} textContentType="username" value={userName}
                         onChangeText={(text) => this.setState({userName: text, errorText: ''})}
                         borderBottomColor={"black"}/>
            </View>
            <View style={styles.textContainer}>
              <TextInput placeholder={"Password"} secureTextEntry={true} textContentType="password"
                         value={password}
                         onChangeText={(text) => this.setState({password: text, errorText: ''})}/>
            </View>
            <View style={styles.welcomeContainer}>
              <Text style={styles.getStartedText,styles.textError}>{errorText}</Text>
            </View>
            <View style={styles.welcomeContainer}>
              <Button
                onPress={this.onPressSubmit}
                title="Submit"
                color="blue"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  onPressSubmit = () => {
    const {navigate} = this.props.navigation;
    let {userName, password} = this.state;
    // let regex = /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!userName || userName.trim().length === 0)
      this.setState({errorText: "Please fill the user details"});
    else if (!password || password.trim().length === 0)
      this.setState({errorText: "Please enter a password"});
    else if (password.trim().length <= 8)
      this.setState({errorText: "Please enter a password equal to or more than 9 characters"});
    else if (!/(?=.*[A-Z])(?=.*[@$!%*#?&])/.test(password))
      this.setState({errorText: "Passwords must contain 1 uppercase and 1 special character"});
    else


      navigate('List', {name: 'Jane'})
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // top: 65,
    // width: DEVICE_WIDTH,
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // textAlign: 'center',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  textError: {
    color: 'red',
  },
  textCenter: {
    alignItems: 'center',
  },
  textContainer: {
    width: DEVICE_WIDTH / 2,
    height: 20,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 30,
    borderBottomColor: '#000',
    borderRadius: 4,
    // borderWidth: 0.5,
    color: "black"
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});