"use strict";function e(e){if(e&&e.__esModule)return e;var t={};return e&&Object.keys(e).forEach((function(r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})})),t.default=e,t}var t,r=require("prop-types"),n=require("react"),o=require("@web3-react/core"),a=(t=require("jsbi"))&&"object"==typeof t&&"default"in t?t.default:t,c=require("@web3-react/walletconnect-connector");function i(e,t,r,n,o,a,c){try{var i=e[a](c),u=i.value}catch(e){return void r(e)}i.done?t(u):Promise.resolve(u).then(n,o)}function u(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var a=e.apply(t,r);function c(e){i(a,n,o,c,u,"next",e)}function u(e){i(a,n,o,c,u,"throw",e)}c(void 0)}))}}function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function l(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,f(e,t)}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function h(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function d(e,t,r){return(d=h()?Reflect.construct:function(e,t,r){var n=[null];n.push.apply(n,t);var o=new(Function.bind.apply(e,n));return r&&f(o,r.prototype),o}).apply(null,arguments)}function m(e){var t="function"==typeof Map?new Map:void 0;return(m=function(e){if(null===e||-1===Function.toString.call(e).indexOf("[native code]"))return e;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return d(e,arguments,p(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),f(r,e)})(e)}var v,y=(function(e){var t=function(e){var t=Object.prototype,r=t.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",a=n.asyncIterator||"@@asyncIterator",c=n.toStringTag||"@@toStringTag";function i(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{i({},"")}catch(e){i=function(e,t,r){return e[t]=r}}function u(e,t,r,n){var o=Object.create((t&&t.prototype instanceof p?t:p).prototype),a=new k(n||[]);return o._invoke=function(e,t,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return{value:void 0,done:!0}}for(r.method=o,r.arg=a;;){var c=r.delegate;if(c){var i=g(c,r);if(i){if(i===l)continue;return i}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=s(e,t,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===l)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}(e,r,a),o}function s(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=u;var l={};function p(){}function f(){}function h(){}var d={};d[o]=function(){return this};var m=Object.getPrototypeOf,v=m&&m(m(N([])));v&&v!==t&&r.call(v,o)&&(d=v);var y=h.prototype=p.prototype=Object.create(d);function w(e){["next","throw","return"].forEach((function(t){i(e,t,(function(e){return this._invoke(t,e)}))}))}function b(e,t){var n;this._invoke=function(o,a){function c(){return new t((function(n,c){!function n(o,a,c,i){var u=s(e[o],e,a);if("throw"!==u.type){var l=u.arg,p=l.value;return p&&"object"==typeof p&&r.call(p,"__await")?t.resolve(p.__await).then((function(e){n("next",e,c,i)}),(function(e){n("throw",e,c,i)})):t.resolve(p).then((function(e){l.value=e,c(l)}),(function(e){return n("throw",e,c,i)}))}i(u.arg)}(o,a,n,c)}))}return n=n?n.then(c,c):c()}}function g(e,t){var r=e.iterator[t.method];if(void 0===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,g(e,t),"throw"===t.method))return l;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var n=s(r,e.iterator,t.arg);if("throw"===n.type)return t.method="throw",t.arg=n.arg,t.delegate=null,l;var o=n.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,l):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,l)}function x(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function C(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function k(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(x,this),this.reset(!0)}function N(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,a=function t(){for(;++n<e.length;)if(r.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=void 0,t.done=!0,t};return a.next=a}}return{next:E}}function E(){return{value:void 0,done:!0}}return f.prototype=y.constructor=h,h.constructor=f,f.displayName=i(h,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===f||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,h):(e.__proto__=h,i(e,c,"GeneratorFunction")),e.prototype=Object.create(y),e},e.awrap=function(e){return{__await:e}},w(b.prototype),b.prototype[a]=function(){return this},e.AsyncIterator=b,e.async=function(t,r,n,o,a){void 0===a&&(a=Promise);var c=new b(u(t,r,n,o),a);return e.isGeneratorFunction(r)?c:c.next().then((function(e){return e.done?e.value:c.next()}))},w(y),i(y,c,"Generator"),y[o]=function(){return this},y.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},e.values=N,k.prototype={constructor:k,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(C),!e)for(var t in this)"t"===t.charAt(0)&&r.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(r,n){return c.type="throw",c.arg=e,t.next=r,n&&(t.method="next",t.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],c=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var i=r.call(a,"catchLoc"),u=r.call(a,"finallyLoc");if(i&&u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(i){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var c=a?a.completion:{};return c.type=e,c.arg=t,a?(this.method="next",this.next=a.finallyLoc,l):this.complete(c)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),l},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),C(r),l}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;C(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:N(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),l}},e}(e.exports);try{regeneratorRuntime=t}catch(e){Function("r","regeneratorRuntime = r")(t)}}(v={exports:{}}),v.exports),w=function(e){function t(t){for(var r,n=arguments.length,o=new Array(n>1?n-1:0),a=1;a<n;a++)o[a-1]=arguments[a];return(r=e.call.apply(e,[this].concat(o))||this).name="ChainUnsupportedError",r.message=t,r}return l(t,e),t}(m(Error)),b=function(e){function t(t){for(var r,n=arguments.length,o=new Array(n>1?n-1:0),a=1;a<n;a++)o[a-1]=arguments[a];return(r=e.call.apply(e,[this].concat(o))||this).name="ChainUnknownError",r.message=t,r}return l(t,e),t}(m(Error)),g=function(e){function t(t){for(var r,n=arguments.length,o=new Array(n>1?n-1:0),a=1;a<n;a++)o[a-1]=arguments[a];return(r=e.call.apply(e,[this].concat(o))||this).name="ConnectorUnsupportedError",r.message="Unsupported connector: "+t+".",r}return l(t,e),t}(m(Error)),x=function(e){function t(){for(var t,r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(t=e.call.apply(e,[this].concat(n))||this).name="ConnectionRejectedError",t.message="The activation has been rejected by the provider.",t}return l(t,e),t}(m(Error)),C=function(e){function t(){for(var t,r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(t=e.call.apply(e,[this].concat(n))||this).name="ConnectorConfigError",t}return l(t,e),t}(m(Error));function k(){return N.apply(this,arguments)}function N(){return(N=u(y.mark((function t(){var r;return y.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,new Promise((function(t){t(e(require("@web3-react/fortmatic-connector")))}));case 2:return r=t.sent.FortmaticConnector,t.abrupt("return",{web3ReactConnector:function(e){var t=e.chainId,n=e.apiKey;if(!n)throw new C("The Fortmatic connector requires apiKey to be set.");return new r({apiKey:n,chainId:t})}});case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function E(){return T.apply(this,arguments)}function T(){return(T=u(y.mark((function t(){var r,n,o;return y.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,new Promise((function(t){t(e(require("@web3-react/frame-connector")))}));case 2:return n=(r=t.sent).FrameConnector,o=r.UserRejectedRequestError,t.abrupt("return",{web3ReactConnector:function(e){return new n({supportedChainIds:[e.chainId]})},handleActivationError:function(e){return e instanceof o?new x:e.message.startsWith("JSON.parse")?new Error("There seems to be an issue when trying to connect to Frame."):null}});case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function A(){return U.apply(this,arguments)}function U(){return(U=u(y.mark((function t(){var r,n,o;return y.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,new Promise((function(t){t(e(require("@web3-react/injected-connector")))}));case 2:return n=(r=t.sent).InjectedConnector,o=r.UserRejectedRequestError,t.abrupt("return",{web3ReactConnector:function(e){return new n({supportedChainIds:e.chainId})},handleActivationError:function(e){return e instanceof o?new x:null}});case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function I(){return L.apply(this,arguments)}function L(){return(L=u(y.mark((function t(){var r;return y.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,new Promise((function(t){t(e(require("@web3-react/portis-connector")))}));case 2:return r=t.sent.PortisConnector,t.abrupt("return",{web3ReactConnector:function(e){var t=e.chainId,n=e.dAppId;if(!n)throw new C("The Portis connector requires dAppId to be set.");return new r({dAppId:n,networks:t})}});case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function j(){return O.apply(this,arguments)}function O(){return(O=u(y.mark((function t(){var r,n,o;return y.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,new Promise((function(t){t(e(require("@aragon/provided-connector")))}));case 2:return n=(r=t.sent).ProvidedConnector,o=r.UserRejectedRequestError,t.abrupt("return",{web3ReactConnector:function(e){return new n({provider:e.provider,supportedChainIds:e.chainId})},handleActivationError:function(e){return e instanceof o?new x:null}});case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function R(){return P.apply(this,arguments)}function P(){return(P=u(y.mark((function t(){var r;return y.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,new Promise((function(t){t(e(require("@web3-react/torus-connector")))}));case 2:return r=t.sent.TorusConnector,t.abrupt("return",{web3ReactConnector:function(e){return new r({chainId:e.chainId,constructorOptions:e.constructorOptions,initOptions:e.initOptions})}});case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function M(){return _.apply(this,arguments)}function _(){return(_=u(y.mark((function t(){var r,n,o;return y.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,new Promise((function(t){t(e(require("@web3-react/walletconnect-connector")))}));case 2:return n=(r=t.sent).UserRejectedRequestError,o=r.WalletConnectConnector,t.abrupt("return",{web3ReactConnector:function(e){var t=e.rpc,r=e.bridge,n=e.pollingInterval;if(!t)throw new C("The WalletConnect connector requires rpcUrl to be set.");return Object.values(t).forEach((function(e){if(!/^https?:\/\//.test(e))throw new C("The WalletConnect connector requires rpcUrl to be an HTTP URL.")})),new o({bridge:r,pollingInterval:n,qrcode:!0,rpc:t})},handleActivationError:function(e){return e instanceof n?new x:null}});case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function S(){return q.apply(this,arguments)}function q(){return(q=u(y.mark((function t(){var r;return y.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,new Promise((function(t){t(e(require("@web3-react/walletlink-connector")))}));case 2:return r=t.sent.WalletLinkConnector,t.abrupt("return",{web3ReactConnector:function(e){var t=e.url,n=e.appName,o=e.appLogoUrl;if(1!==e.chainId)throw new C("The WalletLink connector requires chainId to be 1.");if(!/^https?:\/\//.test(t))throw new C("The WalletLink connector requires url to be an HTTP URL.");return new r({url:t,appName:n,appLogoUrl:o})}});case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function B(){return F.apply(this,arguments)}function F(){return(F=u(y.mark((function t(){var r;return y.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,new Promise((function(t){t(e(require("@web3-react/ledger-connector")))}));case 2:return r=t.sent.LedgerConnector,t.abrupt("return",{web3ReactConnector:function(e){var t=e.chainId,n=e.url;if(!n)throw new C("The Ledger connector requires url to be set.");return new r({url:n,chainId:t,pollingInterval:12e3,baseDerivationPath:"m/44'/60'/0'/0"})}});case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function W(){return D.apply(this,arguments)}function D(){return(D=u(y.mark((function t(){var r;return y.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,new Promise((function(t){t(e(require("@uauth/web3-react")))}));case 2:return r=t.sent.UAuthConnector,t.abrupt("return",{web3ReactConnector:function(e){var t=e.clientID,n=e.redirectUri,o=e.postLogoutRedirectUri,a=e.scope,c=e.injectedConnector,i=e.walletconnectConnector,u=e.shouldLoginWithRedirect,s=e.supportedChainIds;if(!t)throw new C("The UAuth connector requires clientID to be set.");if(u){if(!n)throw new C("The UAuth connector configuration requires redirectUri to be set.");if(!o)throw new C("The UAuth connector configuration requires postLogoutRedirectUri to be set.")}return new r({clientID:t,redirectUri:n,postLogoutRedirectUri:o,scope:a,connectors:{injected:c,walletconnect:i},shouldLoginWithRedirect:u,supportedChainIds:s})}});case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var G={name:"Ether",symbol:"ETH",decimals:18},H={name:"Matic Token",symbol:"MATIC",decimals:18},K={name:"Avax",symbol:"AVAX",decimals:9},V={name:"ONE Token",symbol:"ONE",decimals:18},Y={name:"Binance Token",symbol:"BNB",decimals:18},z={name:"Thunder Token",symbol:"TT",decimals:18},J={name:"Celo",symbol:"CELO",decimals:18},X={name:"METIS",symbol:"METIS",decimals:18},Q=new Map([[1,{id:1,nativeCurrency:G,type:"main",fullName:"Ethereum Mainnet",shortName:"Ethereum",explorerUrl:"https://etherscan.io",testnet:!1}],[3,{id:3,nativeCurrency:G,type:"ropsten",fullName:"Ropsten Testnet",shortName:"Ropsten",explorerUrl:"https://ropsten.etherscan.io",testnet:!0}],[4,{id:4,nativeCurrency:G,type:"rinkeby",fullName:"Rinkeby Testnet",shortName:"Rinkeby",explorerUrl:"https://rinkeby.etherscan.io",testnet:!0}],[5,{id:5,nativeCurrency:G,type:"goerli",fullName:"Goerli Testnet",shortName:"Goerli",explorerUrl:"https://goerli.etherscan.io",testnet:!0}],[42,{id:42,nativeCurrency:G,type:"kovan",fullName:"Kovan Testnet",shortName:"Kovan",explorerUrl:"https://kovan.etherscan.io",testnet:!0}],[43112,{id:43112,nativeCurrency:K,type:"avalocal",shortName:"Avalanche Local",fullName:"Avalanche Local",testnet:!0}],[43113,{id:43113,nativeCurrency:K,type:"fuji",fullName:"Avalanche Fuji",shortName:"Fuji",explorerUrl:"https://testnet.snowtrace.io/",testnet:!0}],[43114,{id:43114,nativeCurrency:K,type:"avalanche",fullName:"Avalanche Mainnet",shortName:"Avalanche",explorerUrl:"https://snowtrace.io/",testnet:!1}],[100,{id:100,nativeCurrency:{name:"xDAI",symbol:"xDAI",decimals:18},type:"xdai",fullName:"xDAI",shortName:"xDAI",explorerUrl:"https://blockscout.com/xdai/mainnet/",testnet:!1}],[137,{id:137,nativeCurrency:H,type:"matic",fullName:"Polygon Mainnet",shortName:"Polygon",explorerUrl:"https://polygonscan.com",testnet:!1}],[80001,{id:80001,nativeCurrency:H,type:"mumbai",fullName:"Mumbai Testnet",shortName:"Mumbai",explorerUrl:"https://mumbai.polygonscan.com",testnet:!0}],[250,{id:250,nativeCurrency:{name:"FTM",symbol:"FTM",decimals:18},type:"fantom",fullName:"Fantom Opera Mainnet",shortName:"FTM",explorerUrl:"https://ftmscan.com/",testnet:!1}],[16666e5,{id:16666e5,nativeCurrency:V,type:"harmony",fullName:"Harmony ONE",shortName:"Harmony",explorerUrl:"https://explorer.harmony.one/",testnet:!1}],[16667e5,{id:16667e5,nativeCurrency:V,type:"harmonyTest",fullName:"Harmony ONE Testnet",shortName:"Harmony Testnet",explorerUrl:"https://explorer.testnet.harmony.one/",testnet:!0}],[56,{id:56,nativeCurrency:Y,type:"bsc",fullName:"Binance Smart Chain",shortName:"BSC",explorerUrl:"https://bscscan.com/",testnet:!1}],[97,{id:97,nativeCurrency:Y,type:"bscTest",fullName:"Binance Smart Chain Testnet",shortName:"BSC Testnet",explorerUrl:"https://testnet.bscscan.com/",testnet:!0}],[108,{id:108,nativeCurrency:z,type:"thundercore",fullName:"ThunderCore Mainnet",shortName:"ThunderCore",explorerUrl:"https://scan.thundercore.com/",testnet:!1}],[18,{id:18,nativeCurrency:z,type:"thundercoreTest",fullName:"ThunderCore Testnet",shortName:"ThunderCore Testnet",explorerUrl:"https://scan-testnet.thundercore.com/",testnet:!0}],[421611,{id:421611,nativeCurrency:G,type:"arbitrumTest",fullName:"Arbitrum Testnet",shortName:"Arbitrum Testnet",explorerUrl:"https://testnet.arbiscan.io/",testnet:!0}],[42161,{id:42161,nativeCurrency:G,type:"arbitrum",fullName:"Arbitrum Mainnet",shortName:"Arbitrum",explorerUrl:"https://arbiscan.io/",testnet:!1}],[42220,{id:42220,nativeCurrency:J,type:"celo",fullName:"Celo (Mainnet)",shortName:"Celo",explorerUrl:"https://explorer.celo.org/",testnet:!1}],[44787,{id:44787,nativeCurrency:J,type:"celoTest",fullName:"Celo (Alfajores Testnet)",shortName:"Alfajores",explorerUrl:"https://alfajores-blockscout.celo-testnet.org/",testnet:!0}],[588,{id:588,nativeCurrency:X,type:"stardust",fullName:"Metis Stardust Testnet",shortName:"Stardust",explorerUrl:"https://stardust-explorer.metis.io/",testnet:!0}],[1088,{id:1088,nativeCurrency:X,type:"andromeda",fullName:"Metis Andromeda",shortName:"Andromeda",explorerUrl:"https://andromeda-explorer.metis.io/",testnet:!1}],[1313161555,{id:1313161555,nativeCurrency:G,type:"aurora",fullName:"Aurora Testnet",shortName:"AuroraTest",explorerUrl:"https://explorer.testnet.aurora.dev/",testnet:!0}],[1313161554,{id:1313161554,nativeCurrency:G,type:"aurora",fullName:"Aurora Mainnet",shortName:"Aurora",explorerUrl:"https://explorer.mainnet.aurora.dev/",testnet:!1}],[1287,{id:1287,nativeCurrency:{name:"DEV",symbol:"DEV",decimals:18},type:"moonbase",fullName:"moonbase",shortName:"Moonbase Alphanet",explorerUrl:"https://moonbase.moonscan.io/",testnet:!0}],[1285,{id:1285,nativeCurrency:{name:"Moonriver",symbol:"MOVR",decimals:18},type:"moonriver",fullName:"Moonriver",shortName:"Moonriver",explorerUrl:"https://moonriver.moonscan.io/",testnet:!1}],[1284,{id:1284,nativeCurrency:{name:"Glimmer",symbol:"GLMR",decimals:18},type:"moonbeam",fullName:"Moonbeam",shortName:"Moonbeam",explorerUrl:"https://moonbeam.moonscan.io/",testnet:!1}],[1337,{id:1337,type:"local",testnet:!0}],[5777,{id:5777,type:"ganache",testnet:!0}],[128,{id:128,nativeCurrency:{name:"HECO",symbol:"HT",decimals:18},type:"main",fullName:"HECO Mainnet",shortName:"HECO",explorerUrl:"https://hecoscan.xyz/",testnet:!1}]]);function Z(e){var t=Q.get(e);if(!t)throw new b("Unknown chain id: "+e);return t}function $(){return Array.from(Q.keys())}var ee={__proto__:null,isKnownChain:function(e){return Q.has(e)},getChainInformation:Z,getKnownChainsIds:$,getKnownChainInformation:function(){return Array.from(Q.values())},getDefaultChainId:function(){return 1}},te=new Map([["block","block"],["transaction","tx"],["address","address"],["token","token"]]);function re(e){if(function(e){return"object"==typeof e&&null!==e&&"jsonrpc"in e}(e)){if(e.error)throw new Error(e.error);return e.result||null}return e||null}function ne(e,t,r){return oe.apply(this,arguments)}function oe(){return(oe=u(y.mark((function e(t,r,n){return y.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.request){e.next=2;break}return e.abrupt("return",t.request({method:r,params:n}).then(re));case 2:if(!t.sendAsync||!t.selectedAddress){e.next=4;break}return e.abrupt("return",new Promise((function(e,o){t.sendAsync({method:r,params:n,from:t.selectedAddress,jsonrpc:"2.0",id:0},(function(t,r){t?o(t):e(r)}))})).then(re));case 4:if(!t.send){e.next=6;break}return e.abrupt("return",t.send(r,n).then(re));case 6:throw new Error("The Ethereum provider doesn’t seem to provide a request method.");case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ae(){return(ae=u(y.mark((function e(t,r){return y.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,ne(t,"eth_getCode",[r]);case 3:return e.abrupt("return","0x"!==e.sent);case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",!1);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}function ce(e,t){return ie.apply(this,arguments)}function ie(){return(ie=u(y.mark((function e(t,r){return y.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ne(t,"eth_getBalance",[r,"latest"]));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ue(){return(ue=u(y.mark((function e(t){return y.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ne(t,"eth_blockNumber",[]));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function se(e,t){var r,n=!1,o=function(){var e=u(y.mark((function e(a,c){var i;return y.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a();case 2:i=e.sent,n||(c(i),r=setTimeout(o.bind(null,a,c),t));case 4:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}();return function(){var t=e.apply(void 0,arguments),a=t.request,c=t.onResult;return n=!1,o(a,c),function(){n=!0,clearTimeout(r)}}}var le=function(e){var t;null==(t=localStorage)||t.setItem("LAST_ACTIVE_ACCOUNT",e)},pe=function(){var e;return null==(e=localStorage)?void 0:e.getItem("LAST_ACTIVE_ACCOUNT")},fe=function(e){var t;null==(t=localStorage)||t.setItem("LAST_WALLET_CONNECTOR",e)},he=new Map([{id:"frame",name:"Frame",type:"Desktop",strings:{"your Ethereum wallet":"Frame"}},{id:"metamask",name:"Metamask",type:"Desktop",strings:{"your Ethereum wallet":"Metamask"}},{id:"status",name:"Status",type:"Mobile",strings:{"your Ethereum wallet":"Status"}},{id:"cipher",name:"Cipher",type:"Mobile",strings:{"your Ethereum wallet":"Cipher"}},{id:"fortmatic",name:"Fortmatic",type:"Any",strings:{"your Ethereum wallet":"Fortmatic"}},{id:"portis",name:"Portis",type:"Any",strings:{"your Ethereum wallet":"Portis"}},{id:"walletconnect",name:"WalletConnect",type:"Any",strings:{"your Ethereum wallet":"WalletConnect"}},{id:"unstoppable",name:"Unstoppable",type:"Any",strings:{"your Ethereum wallet":"Unstoppable"}},{id:"unknown",name:"Unknown",type:"Desktop",strings:{"your Ethereum wallet":"your wallet"}}].map((function(e){return[e.id,e]})));function de(e){return he.get(e)}function me(e){return"injected"===e||"provided"===e?de((t=window.ethereum)&&"object"==typeof navigator&&"string"==typeof navigator.userAgent&&navigator.userAgent.indexOf("Electron")>=0?"frame":t&&t.isMetaMask?"metamask":"unknown")||de("unknown"):de(e)||de("unknown");var t}var ve=n.createContext(null);function ye(e){var t=e.children,r=e.connectors,i=e.autoConnect,l=e.pollBalanceInterval,p=e.pollBlockNumberInterval;if(null!==n.useContext(ve))throw new Error("<UseWalletProvider /> has already been declared.");var f=n.useState(null),h=f[0],d=f[1],m=n.useState(null),v=m[0],b=m[1],x=n.useState(null),C=x[0],N=x[1],T=n.useState("disconnected"),U=T[0],L=T[1],O=o.useWeb3React(),P=n.useRef(0),_=O.account,q=O.chainId,F=O.library,D=O.error,G=function(e){var t=e.account,r=e.ethereum,o=e.pollBalanceInterval,c=n.useState("-1"),i=c[0],s=c[1];return n.useEffect((function(){if(t&&r){var e=!1,n=se((function(t,r,n){var o="-1";return{request:function(){return u(y.mark((function e(){return y.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ce(r,t).then((function(e){return e?a.BigInt(e).toString():"-1"})).catch((function(){return"-1"})));case 1:case"end":return e.stop()}}),e)})))()},onResult:function(t){e||t===o||(o=t,n(t))}}}),o)(t,r,s);return function(){e=!0,n(),s("-1")}}}),[t,r,o]),i}({account:_,ethereum:F,pollBalanceInterval:l}),H=function(e){var t=e.ethereum,r=e.pollBlockNumberInterval,o=n.useRef(null),c=n.useRef(new Set),i=n.useCallback((function(e){c.current.has(e)||(e(o.current),c.current.add(e))}),[]),u=n.useCallback((function(e){c.current.delete(e)}),[]),s=n.useCallback((function(e){o.current!==e&&(o.current=e,c.current.forEach((function(t){return t(e)})))}),[]);return n.useEffect((function(){if(t){var e=!1,n=se((function(){return{request:function(){return function(e){return ue.apply(this,arguments)}(t)},onResult:function(t){e||s(null===t?null:a.BigInt(t).toString())}}}),r)();return function(){e=!0,n()}}s(null)}),[t,r,s]),{addBlockNumberListener:i,removeBlockNumberListener:u}}({ethereum:F,pollBlockNumberInterval:p}),K=H.addBlockNumberListener,V=H.removeBlockNumberListener,Y=n.useMemo((function(){return function(e){void 0===e&&(e={});for(var t={fortmatic:[k,null],frame:[E,null],injected:[A,null],portis:[I,null],provided:[j,null],torus:[R,null],walletconnect:[M,null],walletlink:[S,null],ledger:[B,null],unstoppable:[W,null]},r=0,n=Object.entries(e);r<n.length;r++){var o=n[r],a=o[0],c=o[1];"function"!=typeof c?t[a]&&(t[a][1]=c):t[a]=[c,null]}return t}(r)}),[r]),z=n.useMemo((function(){return q||1}),[q]),J=n.useCallback((function(){var e;O.active&&O.deactivate(),null==(e=localStorage)||e.removeItem("LAST_ACTIVE_ACCOUNT"),d(null),b(null),L("disconnected")}),[O]);n.useMemo((function(){D instanceof o.UnsupportedChainIdError&&(L("error"),b(new w(D.message)))}),[D]);var X=n.useCallback(function(){var e=u(y.mark((function e(t){var r,n,a,i,u,l,p,f,h,m,v,x,C,k,N,E,T,A;return y.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0===t&&(t="injected"),r=++P.current,J(),r===P.current){e.next=5;break}return e.abrupt("return");case 5:if(Y[t]){e.next=9;break}return L("error"),b(new g(t)),e.abrupt("return");case 9:if(L("connecting"),a=(n=Y[t]||[])[0],i=n[1],"unstoppable"!==t){e.next=32;break}return l=(u=Y.injected||[])[0],p=u[1],e.next=15,null==l?void 0:l();case 15:if(h=null==(f=e.sent)||null==f.web3ReactConnector?void 0:f.web3ReactConnector(s({},p||{}))){e.next=21;break}return L("error"),b(new g(t)),e.abrupt("return");case 21:return v=(m=Y.walletconnect||[])[0],x=m[1],e.next=24,null==v?void 0:v();case 24:if(k=null==(C=e.sent)||null==C.web3ReactConnector?void 0:C.web3ReactConnector(s({},x||{}))){e.next=30;break}return L("error"),b(new g(t)),e.abrupt("return");case 30:k instanceof c.WalletConnectConnector&&k.walletConnectProvider&&(k.walletConnectProvider=void 0),i=s({},i,{injectedConnector:h,walletconnectConnector:k,connectors:{injected:h,walletconnect:k}});case 32:return e.next=34,null==a?void 0:a();case 34:if((E=null==(N=e.sent)||null==N.web3ReactConnector?void 0:N.web3ReactConnector(s({},i||{})))instanceof c.WalletConnectConnector&&E.walletConnectProvider&&(E.walletConnectProvider=void 0),E){e.next=41;break}return L("error"),b(new g(t)),e.abrupt("return");case 41:return e.prev=41,d(t),e.next=45,O.activate(E,void 0,!0);case 45:if(fe(t),"injected"!==t){e.next=52;break}return e.next=49,E.getAccount();case 49:(T=e.sent)&&le(T),E.getProvider().then((function(e){e.on("accountsChanged",(function(e){le(e[0])}))}));case 52:L("connected"),e.next=70;break;case 55:if(e.prev=55,e.t0=e.catch(41),r===P.current){e.next=59;break}return e.abrupt("return");case 59:if(d(null),L("error"),!(e.t0 instanceof o.UnsupportedChainIdError)){e.next=64;break}return b(new w(e.t0.message)),e.abrupt("return");case 64:if(!N.handleActivationError){e.next=69;break}if(!(A=N.handleActivationError(e.t0))){e.next=69;break}return b(A),e.abrupt("return");case 69:b(e.t0);case 70:case"end":return e.stop()}}),e,null,[[41,55]])})));return function(t){return e.apply(this,arguments)}}(),[Y,J,O]);n.useEffect((function(){if(i){var e,t=null==(e=localStorage)?void 0:e.getItem("LAST_WALLET_CONNECTOR");pe()&&"injected"===t&&Object.keys(Y).some((function(e){return"injected"===e}))&&X()}}),[]),n.useEffect((function(){if(_&&F){var e=!1;return N(null),function(e,t){return ae.apply(this,arguments)}(F,_).then((function(t){e||(L("connected"),N(t?"contract":"normal"))})),function(){e=!0,L("disconnected"),N(null)}}}),[_,F]);var Q=n.useMemo((function(){return{_web3ReactContext:O,account:_||null,balance:G,chainId:z,connect:X,connector:h,connectors:Y,error:v,ethereum:F,isConnected:function(){return"connected"===U},networkName:Z(z).type,providerInfo:me(h||"unknown"),reset:J,status:U,type:C}}),[_,G,z,X,h,Y,v,F,C,J,U,O]);return n.createElement(ve.Provider,{value:{addBlockNumberListener:K,pollBalanceInterval:l,pollBlockNumberInterval:p,removeBlockNumberListener:V,wallet:Q}},t)}function we(e){return n.createElement(o.Web3ReactProvider,{getLibrary:function(e){return e}},n.createElement(ye,Object.assign({},e)))}ye.propTypes={children:r.node,connectors:r.objectOf(r.object),autoConnect:r.bool,pollBalanceInterval:r.number,pollBlockNumberInterval:r.number},ye.defaultProps={connectors:{},autoConnect:!1,pollBalanceInterval:2e3,pollBlockNumberInterval:5e3},we.propTypes=ye.propTypes,we.defaultProps=ye.defaultProps,exports.ChainUnsupportedError=w,exports.ConnectionRejectedError=x,exports.ConnectorUnsupportedError=g,exports.UseWalletProvider=we,exports.blockExplorerUrl=function(e,t,r){if(!$().includes(r))return"";if(!te.has(e))throw new Error("type not supported.");return Z(r).explorerUrl+"/"+te.get(e)+"/"+t},exports.chains=ee,exports.getLastActiveAccount=pe,exports.getProviderFromUseWalletId=me,exports.getProviderString=function(e,t){void 0===t&&(t="unknown");var r=de(t);return r&&r.strings[e]||e},exports.useWallet=function(){var e=n.useContext(ve);if(null===e)throw new Error("useWallet() can only be used inside of <UseWalletProvider />, please declare it at a higher level.");var t=function(){var e=n.useContext(ve),t=n.useState(null),r=t[0],o=t[1],a=n.useRef(!1),c=n.useCallback((function(){return null===e?null:(a.current=!0,e.addBlockNumberListener(o),r)}),[e,r]);return n.useEffect((function(){if(a.current&&null!==e)return e.addBlockNumberListener(o),function(){e.removeBlockNumberListener(o)}}),[a,e]),c}(),r=e.wallet;return n.useMemo((function(){return s({},r,{getBlockNumber:t})}),[t,r])};
//# sourceMappingURL=index.js.map
