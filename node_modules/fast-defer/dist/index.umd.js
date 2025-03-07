!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e||self).fastDefer={})}(this,function(e){var n=Symbol();e.deferred=function(){var e,f,o=new Promise(function(n,o){e=n,f=o});return o.resolve=e,o.reject=f,o[n]=1,o},e.isDeferred=function(e){return!!e&&!!e[n]}});
//# sourceMappingURL=index.umd.js.map
