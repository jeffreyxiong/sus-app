"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=exports.realm=void 0;var _realm=_interopRequireDefault(require("realm"));var _FileService=_interopRequireDefault(require("./FileService"));var _schema=require("./schema");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}var realm=new _realm.default({schema:[_schema.ProductSchema,_schema.ParticipantSchema,_schema.ScoreSchema,_schema.EmailSchema]});exports.realm=realm;var AppService=function(){function AppService(){_classCallCheck(this,AppService);}_createClass(AppService,[{key:"getEmail",value:function getEmail(){return realm.objectForPrimaryKey('Email',0);}},{key:"addEmail",value:function addEmail(email){var e=this.getEmail();if(typeof e!='undefined'){this.removeEmail();}realm.write(function(){realm.create('Email',{id:0,email:email});});}},{key:"removeEmail",value:function removeEmail(){var _this=this;var e=this.getEmail();if(typeof e!='undefined'){realm.write(function(){realm.delete(_this.getEmail());});}}},{key:"getProduct",value:function getProduct(name){return realm.objectForPrimaryKey('Product',name);}},{key:"getProducts",value:function getProducts(){return realm.objects('Product');}},{key:"addProduct",value:function addProduct(name,desc,system){var product=this.getProduct(name);if(typeof product!='undefined')return-1;if(name==='')return-2;realm.write(function(){realm.create('Product',{name:name,description:desc,system:system,date:new Date(),participants:[]});});return 0;}},{key:"removeProduct",value:function removeProduct(name){var product=this.getProduct(name);if(typeof product!='undefined'){var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=product.participants[typeof Symbol==="function"?Symbol.iterator:"@@iterator"](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var participant=_step.value;realm.write(function(){realm.delete(participant.survey);});}}catch(err){_didIteratorError=true;_iteratorError=err;}finally{try{if(!_iteratorNormalCompletion&&_iterator.return!=null){_iterator.return();}}finally{if(_didIteratorError){throw _iteratorError;}}}realm.write(function(){realm.delete(product.participants);realm.delete(product);});}_FileService.default.deleteFile(name);}},{key:"checkParticipant",value:function checkParticipant(productName,id){var p=realm.objectForPrimaryKey('Participant',this.append(productName,id));if(typeof p!='undefined')return-1;if(id==='')return-2;return 0;}},{key:"addParticipant",value:function addParticipant(productName,id,notes){id=this.append(productName,id);var p=realm.objectForPrimaryKey('Participant',id);if(typeof p!='undefined')return-1;if(id==='')return-2;var product=this.getProduct(productName);realm.write(function(){var participant=realm.create('Participant',{id:id,date:new Date(),notes:notes,survey:[]});product.participants.push(participant);});return 0;}},{key:"calcScore",value:function calcScore(values){var s=0;for(var j=0;j<values.length;j++){if((j+1)%2==0){s+=5-values[j];}else{s+=values[j]-1;}}return s*2.5;}},{key:"getScore",value:function getScore(id){var p=realm.objectForPrimaryKey('Participant',id);return this.calcScore(p.survey.map(function(x){return x.value;}));}},{key:"addScore",value:function addScore(product,id,qid,value){var _this2=this;id=this.append(product,id);var p=realm.objectForPrimaryKey('Participant',id);if(typeof p==='undefined')return-1;realm.write(function(){var score=realm.create('Score',{id:_this2.append(id,qid),value:value},true);p.survey.push(score);});}},{key:"getStat",value:function getStat(product){var _this3=this;var p=this.getProduct(product);if(typeof p!='undefined'){var stat={size:p.participants.length,mean:0,min:0,max:0,std:0};if(stat.size==0)return stat;var scores=p.participants.map(function(x){return _this3.getScore(x.id);});stat.mean=scores.reduce(function(x,y){return(x+y)/stat.size;});if(stat.size==1)stat.std=0;else{stat.std=Math.sqrt(scores.map(function(x){return Math.pow(x-stat.mean,2);}).reduce(function(x,y){return x+y;})/(stat.size-1));}stat.min=scores.reduce(function(x,y){return Math.min(x,y);});stat.max=scores.reduce(function(x,y){return Math.max(x,y);});return this.truncate(stat);}}},{key:"exportProduct",value:function exportProduct(product,emailAddr){var p=this.getProduct(product);if(typeof p!='undefined'){var data='Product Name\t \
					Participant ID\t \
					Notes\t \
					SUS 1\t \
					SUS 2\t \
					SUS 3\t \
					SUS 4\t \
					SUS 5\t \
					SUS 6\t \
					SUS 7\t \
					SUS 8\t \
					SUS 9\t \
					SUS 10\t \
					SUS Score\n';var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=p.participants[typeof Symbol==="function"?Symbol.iterator:"@@iterator"](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var participant=_step2.value;data+=this.tabulate([p.name,this.parse(participant.id),participant.notes]);data+=this.tabulate(participant.survey.map(function(x){return x.value;}));data+=this.getScore(participant.id)+'\n';}}catch(err){_didIteratorError2=true;_iteratorError2=err;}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return!=null){_iterator2.return();}}finally{if(_didIteratorError2){throw _iteratorError2;}}}_FileService.default.writeFile(product,data);return _FileService.default.emailFile(product,emailAddr);}}},{key:"append",value:function append(head,tail){return head+'.'+tail;}},{key:"parse",value:function parse(id){return id.substring(id.indexOf('.')+1,id.length);}},{key:"tabulate",value:function tabulate(words){return words.join('\t')+'\t';}},{key:"truncate",value:function truncate(floats){for(f in floats){floats[f]=+floats[f].toFixed(3);}return floats;}}]);return AppService;}();var App=new AppService();Object.freeze(App);var _default=App;exports.default=_default;