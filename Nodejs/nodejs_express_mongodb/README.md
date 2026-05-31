# Aplicacion red de bicicletas Nodejs Express MongoDB

![Status](https://img.shields.io/badge/status-active-success)
![Nodejs](https://img.shields.io/badge/Nodejs-24.15.0-orange)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-blue)

## 🚀 Description

> Aplicación movil multiplataforma de catalogo y carrito de compras con persistencia local en el equipo.

## 📁 Repository Layout

```
red-bicicletas/
├── bin/
│   └── www
├── controllers/
│   └── bicicleta.js
├── models/
│   └── bicicleta.js
├── public/
│   ├── images/
│   │   ├── bg-masthead.jpg
│   │   ├── bg-signup.jpg
│   │   ├── demo-image-01.jpg
│   │   ├── demo-image-02.jpg
│   │   ├── favicon.ico
│   │   └── ipad.png
│   ├── javascripts/
│   ├── js/
│   │   └── scripts.js
│   ├── stylesheets/
│   │   ├── style.css
│   └── └── styles.css
├── routes/
│   ├── bicicletas.js
│   ├── index.js
│   └── users.js
├── views/
│   ├── bicicletas/
│   │   ├── create.pug
│   │   ├── index.pug
│   │   └── update.pug
│   ├── error.pug
│   ├── index.pug
│   └── layout.pug
├── app.js
└── package.json

```

## 🔧 Quick Start (Development)


Instalar Express

```
npm install express-generator -g
```

crear el proyecto

```
express red-bicicletas --view=pug
```

ejecutar la instalacion de los paquetes en package.json

```
npm install
```

ejecutar el servidor

```
npm start
```

npm install nodemon --save-dev
