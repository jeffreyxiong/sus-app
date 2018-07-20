"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.RootStack=void 0;var _reactNavigation=require("react-navigation");var _Home=_interopRequireDefault(require("./screens/Home"));var _Info=_interopRequireDefault(require("./screens/Info"));var _Email=_interopRequireDefault(require("./screens/Email"));var _NewProduct=_interopRequireDefault(require("./screens/NewProduct"));var _NewParticipant=_interopRequireDefault(require("./screens/NewParticipant"));var _Product=_interopRequireDefault(require("./screens/Product"));var _Instructions=_interopRequireDefault(require("./screens/survey/Instructions"));var _Questions=_interopRequireDefault(require("./screens/survey/Questions"));var _Finish=_interopRequireDefault(require("./screens/survey/Finish"));var _Handoff=_interopRequireDefault(require("./screens/survey/Handoff"));var _Review=_interopRequireDefault(require("./screens/survey/Review"));var _global=require("./global");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var HomeStack=(0,_reactNavigation.createStackNavigator)({Home:{screen:_Home.default},Product:{screen:_Product.default},Email:{screen:_Email.default},NewProduct:{screen:_NewProduct.default},NewParticipant:{screen:_NewParticipant.default},SurveyInstructions:{screen:_Instructions.default},SurveyQuestions:{screen:_Questions.default},SurveyFinish:{screen:_Finish.default},SurveyHandoff:{screen:_Handoff.default},SurveyReview:{screen:_Review.default}},{initialRouteName:'Home',navigationOptions:{headerStyle:{backgroundColor:'white',shadowColor:'transparent',borderBottomWidth:0,elevation:0},headerTintColor:_global.colors.darkBlue,headerTitleStyle:{color:'black',fontSize:18},headerBackTitle:null},cardStyle:{backgroundColor:'white'},transitionConfig:function transitionConfig(){return{containerStyle:{}};}});var RootStack=(0,_reactNavigation.createStackNavigator)({Main:{screen:HomeStack},Info:{screen:_Info.default}},{mode:'modal',headerMode:'none'});exports.RootStack=RootStack;