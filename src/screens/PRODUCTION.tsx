import React, { Component } from 'react';
import { View, Text,StyleSheet,CheckBox, TouchableOpacity ,Image,Dimensions,TextInput } from 'react-native';

import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { appColors } from '~/theme';

class PRODUCTION extends Component {

  constructor(props) {
    super(props);
    this.state = {

      backgroundColorstyle:'#F2F2F2',


        //radioBtnsData: ['Cutting', 'Prinitng', 'Embrodery','Sweing','Ironing','Finising'], 
        
        radioBtnsData: [
          { name: "Cutting", id: "001" },
          { name: "Prinitng", id: "002" },
          { name: "Embrodery", id: "003" },
          { name: "Sweing", id: "004" },
          { name: "Ironing", id: "005" },
          { name: "Finising", id: "006" },
        ],  
        checked: 0,
        depatcheckedid:'',
        errorflag:{},
       // lineData : ['Line 1', 'Line 2', 'Line 3'],
    lineData:[ {name:"Line 1", id:"L001"},{name:"Line 2", id:"L002"},{name:"Line 3", id:"L003"},{name:"Line 14", id:"L014"}],
        linechecked:0,
        linecheckedid:'',

      //  styleData : ['Style 1', 'Style 2', 'Style 3'],
        
        
      styleData : [
 
      { name: "style 1", color: "RED", type: "Full shirt", buyer:"H&M" , styleid:'S001'},
      { name: "style 2", color: "WHITE", type: "Full shirt", buyer:"H&M" ,styleid:'S002'},
      { name: "style 3", color: "BLACK", type: "Full shirt", buyer:"H&M" ,styleid:'S003'},
    ],
        
        stylechecked:0,
        stylecheckedid:'',

        sizeData:[
          { name: "Large", code: "XL" },
          { name: "Small", code: "S" },
          { name: "Medium", code: "M" },

        ],
        sizechecked:0,
        sizecheckedid: '',

        altrQnty:0,
        rjctQnty:0,
        goodQnty:0,
        totalQnty: 0,




    }
}

  static navigationOptions = {
    header: null
  };

  defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center'
    }
  };

  onNextStep = () => {
    console.log('called next step');
   // console.log(""+{errorflag});
    

    
  };

  onPaymentStepComplete = () => {
    alert('Payment step completed!');
  };

  onPrevStep = () => {
    console.log('called previous step');
  };

  onSubmitSteps = () => {
    console.log('called on submit step.');
    var totalQnty = this.state.totalQnty;
    var goodQnty = Number(this.state?.goodQnty);
    var altrQnty = Number(this.state.altrQnty);
    var rejectQnty =  Number(this.state.rejectQnty);

    var checkedDept = this.state.depatcheckedid;

    console.info ('Total: '+Number(totalQnty)+''+checkedDept)


  };

  onQntyInput = (text:any) => {
    console.log('Quantity inputed.' +{text});
    //this.setState.goodQnty=text;
  };

 

  render() {

  
    const progressStepsStyle = {
      activeStepIconBorderColor: 'tomato',
      activeLabelColor: '#686868',
      activeStepNumColor: 'white',
      activeStepIconColor: '#686868',
      completedStepIconColor: 'tomato',
      completedProgressBarColor: 'tomato',
      completedCheckColor: '#FFF'
    };
    const buttonstyle = {
      //393939
        paddingStart: 10,
        paddingEnd:10,
      
        borderWidth:1,
        borderColor:appColors.lightBlue,
        backgroundColor:'white',
        borderRadius:5,
        elevation:5

    };
    const nextbtntextstyle = {
        color: appColors.lightBlue, //393939
     

    };
    const prevbtntextstyle = {
      color: appColors.grey3, //393939
   

  };

    const submitbtnstyle={

      paddingStart: 10,
      paddingEnd: 10,
      borderRadius:5,
      borderWidth:1,
      borderColor: 'tomato'
    };
    

    return (
        <>
      <View style={{ flex: 1, marginTop: 5, padding:5, backgroundColor:'#f2f2f2' }}>
        <ProgressSteps {...progressStepsStyle}>
          <ProgressStep
            label="Department"
            onNext={this.onNextStep}
            onPrevious={this.onPrevStep}
            scrollViewProps={this.defaultScrollViewProps}
        
            nextBtnTextStyle={nextbtntextstyle}
           
            previousBtnTextStyle ={prevbtntextstyle}

            nextBtnStyle={buttonstyle}
           // errors={this.state.errorflag}

          >
            <View style={styles.bodycontainer}>
              <Text style={styles.sceneHeading}>Select Department</Text>

                {this.state.radioBtnsData?.map((data, key) => {
                return (
                <View key={key}>
                {this.state.checked == key ?
                <TouchableOpacity style={styles.btn}>
                <Image style={styles.img} source={require('~/assets/radio_selected.png')}/>
                <Text>{data.name}</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>{this.setState({checked: key, errorflag:'false',depatcheckedid:data.id })}} 
                style={styles.btn}>
                <Image style={styles.img} source={require('~/assets/radio_unselect.png')}/>
                <Text>{data.name}</Text>
                </TouchableOpacity>
                }
                </View>
                )
                })}




            </View>
          </ProgressStep>
          <ProgressStep
            label="Line"
            onNext={this.onNextStep}
            onPrevious={this.onPrevStep}
            scrollViewProps={this.defaultScrollViewProps}
            nextBtnTextStyle={nextbtntextstyle}
           
            previousBtnTextStyle ={prevbtntextstyle}
            nextBtnStyle={buttonstyle}
          >
            <View style={styles.bodycontainer}>
            <Text style={styles.sceneHeading}>Select Line</Text>

            {this.state.lineData?.map((data, key) => {
                return (
                <View key={key}  >
                {this.state.linechecked == key ?
                <TouchableOpacity style={styles.btn}>
                <Image style={styles.img} source={require('~/assets/radio_selected.png')}/>
                <Text>{data.name}</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>{this.setState({linechecked: key, errorflag:'false',linecheckedid:data.id })}} 
                style={styles.btn}>
                <Image style={styles.img} source={require('~/assets/radio_unselect.png')}/>
                <Text>{data.name}</Text>
                </TouchableOpacity>
                }
                </View>
                )
                })}




            </View>
          </ProgressStep>
          <ProgressStep
            label="Style"
            onNext={this.onNextStep}
            onPrevious={this.onPrevStep}
            scrollViewProps={this.defaultScrollViewProps}
            nextBtnTextStyle={nextbtntextstyle}
            nextBtnStyle={buttonstyle}
            previousBtnTextStyle ={prevbtntextstyle}
          >
           <View style={styles.bodycontainer}>
           <Text style={styles.sceneHeading}>Choose style</Text>

           {this.state.styleData?.map((data, key) => {
                return (
                <View key={key}   >
                {this.state.stylechecked == key ?
                <TouchableOpacity style={styles.btn}>
                <Image style={styles.img} source={require('~/assets/radio_selected.png')}/>
                <Text style={{borderRightWidth:1, borderRightColor:'grey', padding:10,}}>Style : {data.name}</Text>
                <View style={{flexDirection:'column', justifyContent:'space-around',padding:5, marginLeft:5,}}>
                <Text style={styles.subtext}>Color: {data.color}</Text>
                <Text style={styles.subtext}>Type: {data.type}</Text>
                <Text style={styles.subtext}>Buyer: {data.buyer}</Text>
                </View>

                
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>{this.setState({stylechecked: key, errorflag:'false' , stylecheckedid:data.styleid})}} 
                style={styles.btn}>
                <Image style={styles.img} source={require('~/assets/radio_unselect.png')}/>                
                <Text  style={{borderRightWidth:1, borderRightColor:'grey', padding:10,}}>Style: {data.name}</Text>
                <View style={{flexDirection:'column', justifyContent:'space-evenly',padding:5, marginLeft:5, }}>
                <Text style={styles.subtext}>Color: {data.color}</Text>
                <Text style={styles.subtext}>Type: {data.type}</Text>
                <Text style={styles.subtext}>Buyer: {data.buyer}</Text>
                </View>
               
                </TouchableOpacity>
                }
                </View>
                )
                })}




            </View>
          </ProgressStep>
          <ProgressStep
            label="Size"
            onNext={this.onNextStep}
            onPrevious={this.onPrevStep}
            scrollViewProps={this.defaultScrollViewProps}
            nextBtnTextStyle={nextbtntextstyle}
            nextBtnStyle={buttonstyle}
            previousBtnTextStyle ={prevbtntextstyle}
          >
           <View style={styles.bodycontainer}>
           <Text style={styles.sceneHeading}>Choose Size </Text>


           {this.state.sizeData?.map((data, key) => {
                return (
                <View key={key}   >
                {this.state.sizechecked == key ?
                <TouchableOpacity style={styles.btn}>
                <Image style={styles.img} source={require('~/assets/radio_selected.png')}/>
                <Text  style={{borderRightWidth:1, borderRightColor:'grey', padding:10,}}> {data.code}</Text>
                <View style={{flexDirection:'column', justifyContent:'space-around',padding:5, marginLeft:5,}}>
                <Text style={styles.subtext}> {data.name}</Text>
                
                </View>

                
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>{this.setState({sizechecked: key, errorflag:'false' })}} 
                style={styles.btn}>
                <Image style={styles.img} source={require('~/assets/radio_unselect.png')}/>                
                <Text  style={{borderRightWidth:1, borderRightColor:'grey', padding:10,}}> {data.code}</Text>
                <View style={{flexDirection:'column', justifyContent:'space-evenly',padding:5, marginLeft:5, }}>
                <Text style={styles.subtext}> {data.name}</Text>
                
                </View>
               
                </TouchableOpacity>
                }
                </View>
                )
                })}




            </View>
          </ProgressStep>

          <ProgressStep
            label="Quantity"
            onPrevious={this.onPrevStep}
            onSubmit={this.onSubmitSteps}
            scrollViewProps={this.defaultScrollViewProps}
            nextBtnTextStyle={nextbtntextstyle}
            nextBtnStyle={buttonstyle}
            previousBtnTextStyle ={prevbtntextstyle}
          >
           <View style={styles.bodycontainer}>
           <Text style={styles.sceneHeading}>Input Quantity</Text>

           <View style={styles.quntitycontainer}>
              <View style={styles.qntyItem}> 
              <Text style={{textAlign:'center', fontSize:9, color:appColors.green,}}>Good</Text>
              <TextInput style={styles.inputtext}
               keyboardType='numeric'
                placeholder="Good"
                placeholderTextColor={appColors.green}
                onChangeText={(value) => this.setState({goodQnty: value, totalQnty:Number(value || '0')+Number(this.state?.rejectQnty || '0')+Number(this.state?.altrQnty || '0') })}
                value={this.state.goodQnty}
              />
              </View>
              <View style={styles.qntyItem}>
              <Text style={{textAlign:'center', fontSize:9, color:appColors.lightBlue,}}>Alter</Text>
              <TextInput style={styles.inputtext}
               keyboardType='numeric'
                placeholder="Alter"
                placeholderTextColor={appColors.lightBlue}
                onChangeText={(value) => this.setState({altrQnty: value, totalQnty:Number(value || '0' )+Number(this.state?.rejectQnty || '0')+Number(this.state?.goodQnty || '0')})}
                value={this.state.altrQnty}

              />
                </View>
              <View style={styles.qntyItem}>
                <Text style={{textAlign:'center', fontSize:9, color:appColors.red,}}>Rejected</Text>
              <TextInput style={styles.inputtext}
               keyboardType='numeric'
              placeholder="Rejected"
              placeholderTextColor={appColors.red}
              onChangeText={(value) => this.setState({rejectQnty: value, totalQnty:Number(value)+Number(this.state?.altrQnty || '0')+Number(this.state?.goodQnty || '0') })}
              value={this.state.rejectQnty}
              
              />
                </View>


                <View style={styles.qntyItem}>
                <Text style={{textAlign:'center', fontSize:9, color:appColors.grey1,}}>Total</Text>
              <Text style={styles.inputtext}>{this.state.totalQnty}</Text>
                </View>

           </View>





            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
      </>
    );
  }
}

//const cardWidth = width / 2 - 150;
const styles = StyleSheet.create({ 
bodycontainer:{
    flex:2, 
    padding:5,   
    justifyContent:'space-evenly',  
    alignContent:'flex-start',
    marginTop:7, 
    marginBottom:7, 
    backgroundColor:'#FFF', 
    borderRadius:13,
},
inputtext:{
  padding:3,
  textAlign:'center',
  color:appColors.grey1,
},
sceneHeading:{
  textAlign:'center',
  alignContent:'stretch',
  fontSize:16,
  fontWeight: 'bold',
  color:appColors.grey2,
},

featurecontainer:{
  flexWrap: 'wrap',
  margin:5,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems:'center',
  
  backgroundColor:'#f2f2f2',
  minHeight:Dimensions.get('window').width*2.0,
  alignContent:'center',
  padding:10,

},

img:{
  height:20,
  width: 20,
  padding:5,
  marginRight:5,
},
btn:{
  flexDirection: 'row',
  alignItems:'center',
  marginLeft:'18%',
  marginBottom:8,
  padding:10,
  elevation:5,
  width:Dimensions.get('window').width/2+50,
  borderRadius:9,
  backgroundColor:'#F2F2F2',
  borderWidth:1,
  borderColor:appColors.lightBlue,
},
subtext:{
  fontSize:9,
  color:appColors.grey2,
  fontWeight:'100'
},

quntitycontainer:{

  flexDirection: 'row',
  alignItems:'center',
margin:10,
  padding:20,
  elevation:5,
 // width:Dimensions.get('window').width/,
  borderRadius:9,
  backgroundColor:'#F2F2F2',
  borderWidth:1,
  borderColor:appColors.lightBlue,

},
qntyItem:{
  width:'25%',
  justifyContent:'center',
  alignItems:'center',
  borderEndColor:appColors.grey3,
  borderEndWidth:1,
  borderStartColor:appColors.grey3,
  borderStartWidth:1,

}

});

export default PRODUCTION;