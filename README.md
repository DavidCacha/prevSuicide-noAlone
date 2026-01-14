

# prevSuicide-noAlone 🤍

**prevSuicide-noAlone** es una aplicación móvil desarrollada con **React Native** enfocada en la **prevención del suicidio y el acompañamiento emocional**, utilizando **inteligencia artificial** como apoyo para que las personas no se sientan solas en momentos difíciles.

⚠️ **Disclaimer:**  
Esta aplicación **NO sustituye atención psicológica o psiquiátrica profesional**. Su propósito es servir únicamente como **apoyo emocional y acompañamiento preventivo**.

---

## 🧠 Descripción

prevSuicide-noAlone funciona como un **asistente virtual con inteligencia artificial**, diseñado para conversar con el usuario, escuchar, orientar y ofrecer apoyo emocional. La aplicación integra herramientas de prevención, recordatorios y contactos de emergencia para situaciones críticas.

Está pensada para personas que:
- Se sienten solas
- Presentan ansiedad o pensamientos negativos
- Necesitan desahogarse
- Buscan apoyo emocional inmediato
- Requieren una herramienta preventiva accesible

---

## ✨ Funcionalidades

- 💬 Chat con inteligencia artificial  
- 🗂️ Historial de conversaciones  
- 🔐 Autenticación de usuarios (JWT)  
- 👤 Gestión de perfil  
- 🆘 Contactos de emergencia  
- ⏰ Recordatorios personalizados  
- 🎵 Recordatorios musicales  
- 🗺️ Integración con mapas  
- ☁️ Comunicación con backend mediante API REST  

---

## 🏗️ Arquitectura
React Native App
       ↓
Node.js + Express API
       ↓
MongoDB (Mongoose)
       ↓
OpenAI API


## 🛠️ Tecnologías utilizadas

### Frontend
- React Native  
- JavaScript / TypeScript  
- React Navigation  
- Axios  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT (JSON Web Tokens)  

### Servicios externos
- OpenAI API  

---

## 📱 Instalación y ejecución
npm install
yarn install
npx react-native run-android
cd ios
pod install
cd ..
npx react-native run-ios


### 1. Clonar el repositorio
bash
git clone https://github.com/DavidCacha/prevSuicide-noAlone.git
cd prevSuicide-noAlone

### 🔐 Variables de entorno

Crear un archivo .env en la raíz del proyecto:
# Backend
PORT=3000
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/prevSuicideNoAlone
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key

# Frontend
API_BASE_URL=http://localhost:3000/api

# Principales funcionalidades


