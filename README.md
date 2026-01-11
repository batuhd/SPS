# 🌊 Sinop Private Share

> **Secure, Fast, and Personal Data Transfer Station**

![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-Deploy-green?style=flat&logo=github-actions)
![Security](https://img.shields.io/badge/Security-Firebase_Auth-blue?style=flat&logo=firebase)
![Status](https://img.shields.io/badge/Status-Live-success)

**Sinop Private Share** is a secure **Single Page Application (SPA)** designed to synchronize links, notes, and text between your computer and mobile devices in real-time. It is hosted on GitHub Pages and powered by Google Firebase.

## 🚀 Features

* **Real-Time Sync:** Notes written on PC appear instantly on mobile (Firestore Realtime Updates).
* **High Privacy:** Only whitelisted users can sign in. Registration is disabled.
* **Smart Links:** Automatically detects and converts URLs into clickable links.
* **Security First:** XSS protection and strict database rules.
* **Responsive:** Mobile-friendly design with Tailwind CSS.

## 🛠️ Tech Stack

* **Frontend:** HTML5, Vanilla JavaScript (ES Modules), Tailwind CSS
* **Backend:** Google Firebase (Authentication & Firestore)
* **Hosting:** GitHub Pages
* **CI/CD:** GitHub Actions (Automated Deploy & Secret Injection)

## 🔐 Security Architecture

This project is built with a strict security-first approach:

1.  **Domain Restriction:** API keys are restricted via Google Cloud Console to only accept requests from `github.io`
2.  **NoSQL Injection Immunity:** Data is separated from commands using Firebase SDK.
3.  **Strict Rules:** Database access is blocked for unauthenticated users.
   ```javascript
   allow read, write: if request.auth != null;
