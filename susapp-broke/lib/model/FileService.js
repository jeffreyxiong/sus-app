"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _reactNativeFs=_interopRequireDefault(require("react-native-fs"));var _reactNativeFetchBlob=_interopRequireDefault(require("react-native-fetch-blob"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var FileService=function FileService(){var _this=this;_classCallCheck(this,FileService);_defineProperty(this,"_log",function(text){console.log('FileService: '+text);});_defineProperty(this,"_documentPath",function(path){return _reactNativeFs.default.DocumentDirectoryPath+'/'+_this._filename(path);});_defineProperty(this,"_filename",function(name){return name+'.txt';});_defineProperty(this,"deleteFile",function(product){var path=_this._documentPath(product);_reactNativeFs.default.exists(path).then(function(success){if(success){_reactNativeFs.default.unlink(path).then(function(success){_this._log(path+' deleted');}).catch(function(error){_this._log(error.message);});}else{_this._log(path+' does not exist');}}).catch(function(error){_this._log(error.message);});});_defineProperty(this,"writeFile",function(product,data){var path=_this._documentPath(product);_reactNativeFs.default.writeFile(path,data,'utf8').then(function(success){_this._log(path+' written');return path;}).catch(function(error){_this._log(error.message);return null;});});_defineProperty(this,"emailFile",function(product,email){return new Promise(function(resolve,reject){_reactNativeFetchBlob.default.fetch('POST',"https://sus-app-server.herokuapp.com/email/",{'Content-Type':'multipart/form-data'},[{name:'email',data:email},{name:'product',data:product},{name:'file',filename:_this._filename(product),data:_reactNativeFetchBlob.default.wrap(_this._documentPath(product)),type:'text/plain'}]).then(function(res){_this._log(res.text());resolve();}).catch(function(error){_this._log(error);reject();});});});};var fs=new FileService();Object.freeze(fs);var _default=fs;exports.default=_default;