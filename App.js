import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import {
  PublisherBanner,
} from 'expo-ads-admob';

const screenHeight = Math.round(Dimensions.get('window').height);

export default class App extends React.Component {
  
  static navigationOptions = {
    title: '로또번호 생성기',
  };

  bannerError = () => {
    console.log('banner ad not loading')
  }

  bannerAdReceived = () => {
    console.log('banner ad received')
  }

  constructor(props){
    super(props);
    this.state = {numbers:this.generate()};
  }


  onPressButton(){
    this.setState({numbers:this.generate()});    
  }

  sortNumber(a, b) {
    return a - b;
  }
  
  

  // 로또번호 생성
  // 1~45까지 숫자가 들어간 배열에서 임의의 숫자 6개를 추출한 후 문자열로 리턴.
  generate(){
    var nums = [];

    for(var i=1; i<=45; i++)
      nums.push(i);
    
    // var retStr = '';
    var lottoNum = [];

    for(i=0; i<6; i++){
      var idx = Math.floor(Math.random()*nums.length);

      if(lottoNum.indexOf(nums[idx]) === -1){
        lottoNum.push(nums[idx])
      }else{
        i--;
      }
    }

    lottoNum.sort(this.sortNumber);
    var lotto = ''

    lottoNum.map(arr => {
      lotto += arr + " "
    })
    
    return lotto;
  }

  render() {
    return (
      <View style = {{backgroundColor : '#C8B6DA'}}>
        <View style={styles.container}>
            <Text style={{color:'white', marginBottom:20, fontSize:30, fontWeight:'bold'}}>{this.state.numbers}</Text>
            <View>
              <TouchableOpacity style = {styles.button} onPress={() => this.onPressButton()}>
                <Text style = {styles.text}>1등 당첨번호 추첨</Text>
              </TouchableOpacity>    
          </View>
        </View>

        <View style = {styles.ad}>
          <PublisherBanner
                bannerSize="banner"
                adUnitID="ca-app-pub-4762525031363209/2139236467" // Test ID, Replace with your-admob-unit-id
                onDidFailToReceiveAdWithError={this.bannerError}
                onAdViewDidReceiveAd = {this.bannerAdReceived} 
          />
        </View>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  text : {
    fontSize : 20,
    color : 'white',

  },
  ad : {
    justifyContent : 'center',
    alignItems : 'center',
    // alignSelf : 'flex-end'
  },
  button : {
    justifyContent : 'center',
    alignItems : 'center',
    width : 180,
    height : 50,
    borderWidth : 3,
    borderColor : "white",
    borderRadius : 10,
    color : '#C8B6DA'
    // backgroundColor : '#C8B6DA'
  },
  container: {
    // flex: 1,
    height : screenHeight-50,
    backgroundColor: '#C8B6DA',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

