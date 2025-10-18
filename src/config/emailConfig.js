// Configuration EmailJS
// 🔧 CONFIGURATION REQUISE :
// 1. Créez un compte sur https://www.emailjs.com/
// 2. Remplacez les valeurs ci-dessous par vos vraies clés

export const emailConfig = {
  // Votre Service ID (ex: 'service_xxxxxxx')
  serviceID: 'YOUR_SERVICE_ID',
  
  // Votre Template ID (ex: 'template_xxxxxxx')  
  templateID: 'YOUR_TEMPLATE_ID',
  
  // Votre Public Key (ex: 'xxxxxxxxxxxxxxx')
  publicKey: 'YOUR_PUBLIC_KEY',
};

// 📧 ÉTAPES POUR CONFIGURER EMAILJS :
// 1. Allez sur https://www.emailjs.com/ et créez un compte gratuit
// 2. Créez un service email (Gmail, Yahoo, etc.)
// 3. Créez un template d'email avec ces variables :
//    - {{from_name}} : nom de l'expéditeur
//    - {{from_email}} : email de l'expéditeur  
//    - {{message}} : message
//    - {{to_name}} : destinataire (Clitolympique)
// 4. Copiez vos clés dans ce fichier
// 5. Le formulaire fonctionnera automatiquement !