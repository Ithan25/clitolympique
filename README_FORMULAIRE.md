# 📧 Configuration du Formulaire de Contact - Guide Complet

## 🚀 Instructions pour EmailJS (Solution recommandée - Gratuite)

### Étape 1 : Créer un compte EmailJS

1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Cliquez sur "Sign Up" et créez un compte gratuit
3. Confirmez votre email

### Étape 2 : Ajouter un service email

1. Dans le dashboard, allez dans "Email Services"
2. Cliquez sur "Add New Service"
3. Choisissez votre fournisseur email (Gmail recommandé) :
   - **Gmail** : Connectez votre compte Gmail
   - **Yahoo** : Connectez votre compte Yahoo
   - **Outlook** : Connectez votre compte Outlook
4. Notez le **Service ID** (ex: `service_xxxxxxx`)

### Étape 3 : Créer un template d'email

1. Allez dans "Email Templates"
2. Cliquez sur "Create New Template"
3. Configurez le template comme suit :

**Template Settings :**

- **To Email** : `votre-email@gmail.com` (votre email de réception)
- **From Name** : `{{from_name}}`
- **From Email** : `{{from_email}}`
- **Subject** : `Nouveau message de {{from_name}} - Site Clitolympique`

**Template Content :**

```
Bonjour Clitolympique,

Vous avez reçu un nouveau message depuis le site web :

Nom : {{from_name}}
Email : {{from_email}}

Message :
{{message}}

---
Message envoyé depuis le site clitolympique.fr
```

4. Cliquez sur "Save" et notez le **Template ID** (ex: `template_xxxxxxx`)

### Étape 4 : Obtenir votre Public Key

1. Allez dans "Account" > "General"
2. Copiez votre **Public Key** (ex: `xxxxxxxxxxxxxxx`)

### Étape 5 : Configurer le site

1. Ouvrez le fichier `src/config/emailConfig.js`
2. Remplacez les valeurs par vos vraies clés :

```javascript
export const emailConfig = {
  serviceID: "service_xxxxxxx", // Votre Service ID
  templateID: "template_xxxxxxx", // Votre Template ID
  publicKey: "xxxxxxxxxxxxxxx", // Votre Public Key
};
```

### Étape 6 : Tester le formulaire

1. Lancez le serveur : `npm run dev`
2. Allez sur la section Contact
3. Remplissez le formulaire et envoyez
4. Vérifiez votre boîte email !

## 🎯 Autres Solutions Alternatives

### Option 2 : Netlify Forms (Si hébergé sur Netlify)

1. Ajoutez `netlify` à l'attribut form
2. Ajoutez un champ caché `<input type="hidden" name="form-name" value="contact" />`

### Option 3 : Formspree (Alternative simple)

1. Créez un compte sur [https://formspree.io/](https://formspree.io/)
2. Remplacez l'action du form par l'URL Formspree

### Option 4 : Backend personnalisé

1. Créer une API avec Node.js/Express
2. Utiliser Nodemailer pour l'envoi d'emails
3. Déployer sur Vercel/Railway/Heroku

## 🔧 Dépannage

**Problème : "Configuration EmailJS requise"**
→ Vérifiez que vous avez bien remplacé les clés dans `emailConfig.js`

**Problème : "Erreur lors de l'envoi"**
→ Vérifiez vos clés EmailJS et la connexion internet

**Problème : "Email non reçu"**
→ Vérifiez vos spams et la configuration du template

## 💡 Conseils

- Utilisez Gmail pour une meilleure fiabilité
- Testez avec plusieurs adresses email
- Configurez les filtres anti-spam si nécessaire
