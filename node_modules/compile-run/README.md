compile-run
===================

- This library works as a wrapper over the compilers installed in your system.
- It provides APIs to execute programs by spawning child processes.
- It has built in supports for types.
- It can work with `async/await` and `promises`.

## Supported Languages 

- C
- Cpp
- Java
- JavaScript(Node.js env)
- Python


## Prerequisites

The following should be installed on your machine and be added to the path. 

| Language | Software |
|---------|:-------:|
|C | gcc |
|C++ | gcc |
|Java | jdk |
|Python | python |
|JavaScript(in node.js environment) | node.js |

The library stores the source files for programs in the home directory in a folder named `.compile-run2`. Make sure you have permissions for this folder.

## Installation

You can install it by using `npm` like below.

```shell
npm install compile-run --save
```

## Usage

It have 5 modules each for a language containing namely.

```javascript
const {c, cpp, node, python, java} = require('compile-run');
```
Each module have 2 functions :-

## 1. `runFile` 

This enables you to run a file and takes filepath as an argument with options and callback as optional arguments.

## 2. `runSource`
This enables 
you to directly execute a source code in a stored in a string. It takes source code as an argument with options and callback as optional arguments.

## Examples:-

### - Running a cpp source code file.

```javascript
let resultPromise = cpp.runFile('E:\\abcd.cpp', { stdin:'3\n2 '});
resultPromise
    .then(result => {
        console.log(result);//result object
    })
    .catch(err => {
        console.log(err);
    });
```

### - Running a python source code string.
```javascript
const sourcecode = `print("Hell0 W0rld!")`;
let resultPromise = python.runSource(sourcecode);
resultPromise
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    });
```

### - Working with callback.

You can also use callback by passing it like -

- with options
```javascript
cpp.runFile('E:\\abcd.cpp', { stdin:'3\n2 '}, (err, result) => {
    if(err){
        console.log(err);
    }
    else{
        console.log(result);
    }
});
```
- without options
```javascript
cpp.runFile('E:\\abcd.cpp', (err, result) => {
    if(err){
        console.log(err);
    }
    else{
        console.log(result);
    }
});
```

### - Providing path

```javascript
// Providing custom path in java
java.runFile('E:\\Main.java',{
    compilationPath: '<path to javac>',
    executionPath: '<path to java>'
},(err,result)=>console.log(err ? err : result));
```

```javascript
//I have 2 versions of python installed 2.7 and 3.6. I can use 3.6 using python3
//to run python3 using compile-run I can do something like
python.runFile('/home/projects/scripts/abc.py',{
    executionPath: 'python3'
},(err,result)=>console.log(err ? err : result));
```

```javascript
//If I want to provide custom path of gcc in cpp
cpp.runFile('E:\\abc.cpp',{
    compilationPath: '<path to gcc>' // something like C:\\Program Files\\gcc\\bin
},(err,result)=>console.log(err ? err : result));
```

## Result

Result is an object with the following keys:-

1. `stdout` \<string> - stdout of the program execution. For empty stdout an empty string is returned.
2. `stderr` \<string> - stderr of the program execution, compilation or if public class name is not found in provided source string(In java). For empty stderr empty string is returned.
3. `exitCode` \<number> - exit code of the program.
4. `errorType` \<string|undefined> - It is set to the below values if there is some stderr or in case of a non-zero exitCode.
    1. `'pre-compile-time'` - Only in case of `java`. Can be arised due to invalid public class name if using `runSource` for `java`.
    2. `'compile-time'` - If some error has occured at the compile time.
    3. `'run-time'` - If the error has occured at the run time.
5. `cpuUsage` \<number> - CPU Time as calculated in microseconds.
6. `memoryUsage` \<number> - Memory Consumed in Bytes.
6. `signal` \<string|null> - Signal resulting, if any, resulting from the code execution.

#### Disclaimer :- We don't gaurantee accuracy of `cpuUsage` and `memoryUsage`.

## Options

API's offer an optional options object which has following keys:-

1. `stdin` \<string> - Input/stdin you want to pass to the program.
2. `timeout` \<number> - timeout for program execution in milliseconds. Default is 3000 milliseconds. 
3. `compileTimeout` - timeout during compilation for c, cpp, java in milliseconds. Default is 3000 milliseconds. Would be ignored if passed for node or python
4. `compilationPath` - path for the compiler for c, cpp and java i.e for gcc and javac respectively. These paths defined by you if provided else defaults would be used.
5. `executionPath` - path for the command to execute the program used in java, python, nodejs i.e for `java`, `python` and `node` respectively. These paths defined by you if provided else defaults would be used.

## Compile-run 1.x.x

The versions < 2.x.x have been deprecated due to inconsistencies so its recommended to use version > 2.0.0.

You can find compile run version 1.x.x at https://github.com/vibhor1997a/compile-run-1.