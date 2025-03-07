# Instalación  
unofficial-carbon-now es un módulo que facilita la interacción con https://carbon.now.sh/ que genera imagenes del código facilitado
# 
Instalación del modulo
```
npm install unofficial-carbon-now
```
# 
Ejemplo de uso
```js
const Carbon = require("unofficial-carbon-now")//se requiere el paquete

const carbon = new Carbon.createCarbon()
    .setCode("Imagen de ejemplo")//requerido

await Carbon.generateCarbon(carbon)//devuelve un buffer
```

> Docs: https://shing-xd-0602.gitbook.io/unofficial-carbon-now/