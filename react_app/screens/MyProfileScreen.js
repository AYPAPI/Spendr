import React, { Component } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Avatar, Icon, Button} from 'react-native-elements';
import { getMaker, getBacker, getUser, updateIsMaker } from '../router/api.js';

//Method for logging out.
import { onSignOut } from '../auth.js';

import { lightGrey,
    backerBlue,
    makerPurple,
    checkGreen,
    noRed,
    moneyGreen,
    materialsOrange,
    knowledgePurple,
    manpowerRed,
    backGroundWhite } from '../assets/styles/colors.js';

import { headerIconSize } from '../assets/styles/size.js';

import FlipCard from 'react-native-flip-card'

var profilePhoto = require('../assets/images/shuttle-01.jpg');
var globalIsMaker = false

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const globalIsMaker = false

const styles = {
  headerIcon: {
    color: lightGrey,
    margin: 15,
    fontSize: headerIconSize,
  },
  makerIcon: {
      color: makerPurple,
      margin: 15,
      fontSize: headerIconSize,
  },
  backerIcon: {
      color: backerBlue,
      margin: 15,
      fontSize: headerIconSize,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: backGroundWhite,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 10,
    flex: 1,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    },
  iconStyle: {
    marginLeft: 2,
    marginRight: 2,
  },
  textContainer:{
    flexDirection: 'column',
    alignItems: 'center',
  },
  makerTitle: {
      fontSize: 20,
      marginTop: 5,
      color: makerPurple,
      fontFamily: 'gotham-rounded',
  },
  backerTitle: {
      fontSize: 20,
      marginTop: 5,
      color: backerBlue,
      fontFamily: 'gotham-rounded',
  },
  subTitleStyle: {
    fontSize: 16,
    fontFamily: 'gotham-rounded',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  buttonContainerStyle: {
      marginBottom: 20,
  },
  buttonStyle: {
      width: window.width - 100,
  },
  buttonText: {
      fontFamily: 'gotham-rounded',
      fontSize: 16,
  },
};

class MyProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      makerBacker: {},
      isMaker: false,
      editText: "Edit Backer Profile",
      buttonColor: backerBlue,
      switchText: "Switch to Maker",
      userProfile: {}
    }
  }
    toggleIsMaker() {
        if(this.state.isMaker){
            this.setState({'isMaker': false}); //Update our screen state.
            this.setState({'buttonColor': backerBlue}); //Update our screen state.
            this.setState({'editText': "Edit Backer Profile"}); //Update our screen state.
            this.setState({'switchText': "Switch to Maker"}); //Update our screen state.
            globalIsMaker = false //Update for nav options.
            console.log(this.state.makerBacker)
            updateIsMaker(false, this.state.email) //Update in our database
        }
        else{
            this.setState({'isMaker': true});
            globalIsMaker = true //Update for nav options.
            this.setState({'buttonColor': makerPurple}); //Update our screen state.
            this.setState({'editText': "Edit Maker Profile"}); //Update our screen state.
            this.setState({'switchText': "Switch to Backer"}); //Update our screen state.
            console.log(this.state.makerBacker)
            updateIsMaker(true, this.state.email)
        }
    }
    setProfileState() {
      const {email} = this.props.navigation.state.params

      if(this.state.isMaker) {
        getMaker(email)
        .then((data) => {
          this.setState({
            "makerBacker": data,
          })
        });
      } else {
        getBacker(email)
        .then((data) => {
          this.setState({
            "makerBacker": data,
          })
        });
      }
    }

  static navigationOptions = ({ navigation }) => {
      const { user } = navigation.state.params;
      const { name, email } = navigation.state.params;

      return {
          headerLeft: (
                <Icon
                    name='face'
                    type='material-community'
                    iconStyle={[styles.backerIcon, globalIsMaker && styles.makerIcon]}
                    />
              ),
            headerTitle: (
                <Icon
                    name='lightbulb-outline'
                    type='material-community'
                    iconStyle={styles.headerIcon}
                    onPress={ () => navigation.navigate("Explore", {name: name, email: email, isMaker: globalIsMaker}) }
                    />
            ),
            headerRight: (
                <Icon
                    name='message-text-outline'
                    type='material-community'
                    iconStyle={styles.headerIcon}
                    onPress={ () => navigation.navigate("Matches", {name: name, email: email, isMaker: globalIsMaker}) }
                    />
            ),
      };
};

  componentDidMount() {
    const { name, email, isMaker} = this.props.navigation.state.params
    globalIsMaker = isMaker
    this.setState({"isMaker": isMaker})

    if(isMaker) {
      this.setState({"buttonColor": makerPurple})
    } else {
      this.setState({"buttonColor": backerBlue})
    }

    //Get user for shortbio and name.
    getUser(email)
    .then((data) => {
      this.setState({
        "userProfile": data,
      })
    });
    //Set Maker/Backer profile using this.state.makerBacker as dependency.
    this.setProfileState()
  }

  render() {

    const { navigate } = this.props.navigation;
    const { name, email } = this.props.navigation.state.params;
    const isMaker = globalIsMaker
    console.log("inside my Profile " + email)
    const currProfile = this.state.makerBacker;

      return (
            <View style={styles.container}>
                      <View style={styles.avatarContainer}>
                          <Avatar
                              rounded
                              width={window.width - 55}
                              height={window.width - 55}
                              activeOpacity={0.7}
                              source={profilePhoto}
                              onPress={()=>navigate('UserProfile',
                              {userName: name, userEmail: email, userIsMaker: isMaker, name:name, email: email, isMaker: isMaker, shortbio:
                                this.state.userProfile.shortbio, longbio:
                                this.state.makerBacker.longbio})}
                              />
                      </View>

                      <View style={styles.iconsContainer}>
                          <Icon iconStyle={styles.iconStyle}
                              name='circle-o'
                              type='font-awesome'
                              color={moneyGreen}
                              size={15}
                              onPress={() => alert("Money")} />
                          <Icon iconStyle={styles.iconStyle}
                              name='circle-o'
                              type='font-awesome'
                              color={materialsOrange}
                              size={15}
                              onPress={() => alert("Materials")} />
                          <Icon iconStyle={styles.iconStyle}
                              name='circle-o'
                              type='font-awesome'
                              color={knowledgePurple}
                              size={15}
                              onPress={() => alert("Knowledge")} />
                          <Icon iconStyle={styles.iconStyle}
                              name='circle-o'
                              type='font-awesome'
                              color={manpowerRed}
                              size={15}
                              onPress={() => alert("Manpower")} />
                          <Icon iconStyle={styles.iconStyle}
                              name='circle-o'
                              type='font-awesome'
                              color={backerBlue}
                              size={15}
                              onPress={() => alert("Collaboration")} />
                      </View>

                    <View style={styles.textContainer}>
                      <Text style={[styles.backerTitle, this.state.isMaker && styles.makerTitle]}>
                          {this.state.userProfile.shortbio}
                      </Text>
                      <Text style={styles.subTitleStyle}>
                          {name}
                      </Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                          style={styles.buttonStyle}
                          containerViewStyle={styles.buttonContainerStyle}
                          textStyle={styles.buttonText}
                          borderRadius={10}
                          activeOpacity={0.5}
                          backgroundColor={this.state.buttonColor}
                          icon={{name: 'settings', type: 'MaterialIcons'}}
                          title= 'Edit Account Settings'
                          onPress={()=> navigate('Settings', {name: name, email: email, isMaker: this.state.isMaker})}
                        />

                        <Button
                          style={styles.buttonStyle}
                          containerViewStyle={styles.buttonContainerStyle}
                          textStyle={styles.buttonText}
                          borderRadius={10}
                          activeOpacity={0.5}
                          backgroundColor={this.state.buttonColor}
                          icon={{name: 'edit', type: 'MaterialCommunityIcons' }}
                          title={this.state.editText}
                          onPress={()=> navigate('Edit',{ name: name, email: email, isMaker: this.state.isMaker}) }
                        />

                        <Button
                          style={styles.buttonStyle}
                          containerViewStyle={styles.buttonContainerStyle}
                          textStyle={styles.buttonText}
                          borderRadius={10}
                          activeOpacity={0.5}
                          backgroundColor={this.state.buttonColor}
                          icon={{name: 'replay', type: 'MaterialCommunityIcons'}}
                          title={this.state.switchText}
                          onPress={()=> this.toggleIsMaker()}
                        />
                    </View>
            </View>

      );
  }
}

export default MyProfileScreen;
