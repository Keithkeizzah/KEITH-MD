var e=Symbol();exports.deferred=function(){var r,n,o=new Promise(function(e,o){r=e,n=o});return o.resolve=r,o.reject=n,o[e]=1,o},exports.isDeferred=function(r){return!!r&&!!r[e]};
//# sourceMappingURL=index.js.map
