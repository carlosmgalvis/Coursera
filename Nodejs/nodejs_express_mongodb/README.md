# Aplicacion red de bicicletas Nodejs Express MongoDB

![Status](https://img.shields.io/badge/status-active-success)
![Nodejs](https://img.shields.io/badge/Nodejs-24.15.0-orange)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-blue)

## 🚀 Description

> Sitio Web y APIs red de bicicletas con persistencia en base de datos MongoDB en Docker

## 📁 Repository Layout

```
MyServer/
├── data/
│   └── db/
├── models/
│   ├── bicicleta.js
│   ├── reserva.js
│   ├── token.js
│   └── usuario.js
├── Dockerfile
├── K8s-mongo.yaml
├── mongodb-storage.yaml
├── mongodb.yaml
├── node-app.yaml
├── package.json
└── server.js

```

inicializar minikube

```
minikube delete
minikube start --driver=docker
```

instalar librerias

```
npm install moment
npm install bcrypt
npm install mongoose-unique-validator
```

crear imagen

```
docker build -t node-mongo-k8s-bicicletas .
```

run docker

```
docker run -p 3000:3000 -e MONGO_URI="mongodb://host.docker.internal:27017/bicicletasdb" node-mongo-k8s-bicicletas
```

aplicar YAML

```
kubectl apply -f mongodb-storage.yaml
kubectl apply -f node-app.yaml
```
