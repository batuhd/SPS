
# 🌊 Sinop Private Share (SPS)

**A minimalist, secure (i guess), personal note-taking and link-sharing feed.**

SPS is designed as a private micro-blogging tool for a single user. It allows you to quickly drop notes, save links, and view them in a real-time feed from any device. Its primary focus is simplicity and robust security, ensuring your personal data remains completely private.

---

## <div align="center"> <img src="https://github.com/user-attachments/assets/0f54c21a-6f4d-4c70-bc58-3fa53d043be5" alt="Login Screen" width="45%" /> &nbsp;&nbsp;&nbsp;&nbsp; <img src="https://github.com/user-attachments/assets/257e3a54-cf23-4101-981f-7d48f6460c2b" alt="App Dashboard" width="45%" /> </div>



## ✨ Key Features

* **🔒 Secure Single-User Access:** Designed for one admin only. No registration forms, no public access.
* **⚡ Real-time Updates:** Powered by Firebase Firestore, your feed updates instantly across all devices without refreshing.
* **🔗 Smart Link Detection:** URLs pasted into notes are automatically converted into clickable links.
* **🗑️ Easy Management:** Delete unwanted notes instantly with a single click.
* **📱 Responsive Design:** Built with Tailwind CSS, it looks great on desktops, tablets, and mobile phones.
* **🚀 Automated Deployment:** Uses GitHub Actions for seamless deployment and secure credential management.

---

## 🛡️ Security Architecture
Here is how we secured it:

### 1. Firebase Authentication

New user registration (Sign-up) has been **completely disabled** at the Firebase console level. Even if someone attempts to trigger the registration API programmatically, the request will be rejected by the server (`auth/operation-not-allowed`). Only the pre-configured administrator email can log in.

### 2. Firestore Security Rules (Whitelist)

The database rules check the user's specific email address against a whitelist.

* **Rule:** `allow read, write: if request.auth.token.email == "b@b.com";`
* *Result:* Even if someone manages to obtain valid credentials, they will see an empty feed unless their email matches the owner's email exactly.

### 3. API Key Domain Locking

The Google Cloud API keys used by the application are restricted to function only on the specific GitHub Pages domain of this project (e.g., `https://batuhd.github.io/*`). They are useless elsewhere.

---

## 🛠️ Technologies Used

* **Frontend:** HTML5, JavaScript (ES Modules)
* **Styling:** Tailwind CSS (via CDN)
* **Backend-as-a-Service:** Firebase Auth, Cloud Firestore
* **Hosting & CI/CD:** GitHub Pages, GitHub Actions
