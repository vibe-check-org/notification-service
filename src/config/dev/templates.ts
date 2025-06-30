export const templates = [
    {
        type: "vibeprofile.created",
        name: "Vibe-Profil erstellt",
        subject: "Dein Vibe-Profil ist da 🎉",
        body: `<!DOCTYPE html>
  <html lang="de">
  <head>
    <meta charset="UTF-8" />
    <title>E-Mail bestätigen</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f7f9fc;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 8px;
        padding: 30px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }
      .header {
        font-size: 22px;
        margin-bottom: 20px;
        color: #333333;
      }
      .message {
        font-size: 16px;
        color: #444444;
      }
      .button {
        display: inline-block;
        margin-top: 25px;
        padding: 12px 24px;
        background-color: #1976d2;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
      }
      .footer {
        margin-top: 40px;
        font-size: 12px;
        color: #999999;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <p class="header">Hallo {{ username }},</p>
  
      <p class="message">
        Willkommen bei VibeCheck! Bitte bestätige deine E-Mail-Adresse, um dein Profil zu aktivieren.
      </p>
  
      <p class="message">
        Klicke auf den folgenden Button, um deine E-Mail zu verifizieren:
      </p>
  
      <a href="{{ verifyLink }}" class="button">E-Mail bestätigen</a>
  
      <p class="message">
        Wenn du dich nicht registriert hast, kannst du diese Nachricht ignorieren.
      </p>
  
      <div class="footer">
        © {{ year }} Omnixys · VibeCheck<br />
        Diese E-Mail wurde automatisch versendet. Bitte nicht antworten.
      </div>
    </div>
  </body>
  </html>`,
        placeholders: ["username", "verifyLink", "year"],
        isHtml: true,
    },

    {
        type: "USER_DELETED_FULLY",
        name: "Benutzer gelöscht",
        subject: "Dein GentleCorp-Konto wurde gelöscht – Wir verabschieden uns",
        body: `
  <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Hallo {{ lastName }} {{ firstName }},</h2>
      <p>wir bestätigen hiermit, dass dein Konto bei <strong>GentleCorp</strong> am {{ deletionDate }} vollständig gelöscht wurde.</p>
  
      <p>Folgende Informationen wurden entfernt:</p>
      <ul>
        <li>Dein Benutzerkonto</li>
        <li>Dein Warenkorb ({{ cartItemCount }} Artikel)</li>
        <li>Dein verknüpftes Bankkonto</li>
      </ul>
  
      <p>Es tut uns leid, dich zu verlieren. Wenn du es dir anders überlegst, bist du jederzeit herzlich willkommen zurückzukehren.</p>
  
      <p>Mit freundlichen Grüßen,<br>Dein GentleCorp-Team</p>
    </body>
  </html>
  `,
        placeholders: ["firstName", "lastName", "deletionDate", "cartItemCount"],
        isHtml: true,
    },
];
  