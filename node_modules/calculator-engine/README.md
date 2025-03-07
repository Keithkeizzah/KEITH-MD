# Mexejs
Run Math Expression Easily , can create custom function , default support Math functions

## Usage 

You can use this awesome lib in any env nodejs or browser, calculator-engine.js in build dir

- nodejs  
```
    let cal = require("calculator-engine");
    // by default added to global object
    cal.execute("set here your exp")
```
- Browser  
``` 
  <script src="PATH/calculator-engine.js">
    // by default added to window object
  </script>
```



## Hints

- You can add your custom functions before/after build  
``` 
   cal.setFucs({  sumTwo : function(x , y ) { return x + y } }) ;  
   cal.execute(" sumTwo(5 , 3 ) ") ;
```

## Licences
### MIT