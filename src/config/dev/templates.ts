export const templates = [
    {
        type: "vibeprofile.created",                // oder `templateKey` → aber es muss zum Schema passen!
        name: "Vibe-Profil erstellt",
        subject: "Dein Vibe-Profil ist da 🎉",
        body: "<p>Hallo {{vorname}},</p><p>Dein Vibe-Profil ist fertig! <a href='{{profilLink}}'>Jetzt ansehen</a></p>",
        placeholders: ["vorname", "profilLink"],
        isHtml: true,
    },
    {
        type: 'USER_DELETED_FULLY',
        name: 'Benutzer gelöscht',
        subject: 'Dein GentleCorp-Konto wurde gelöscht – Wir verabschieden uns',
        body: `
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Hallo {{lastName}} {{firstName}},</h2>
                <p>wir bestätigen hiermit, dass dein Konto bei <strong>GentleCorp</strong> am {{deletionDate}} vollständig gelöscht wurde.</p>

                <p>Folgende Informationen wurden entfernt:</p>
                <ul>
                    <li>Dein Benutzerkonto</li>
                    <li>Dein Warenkorb ({{cartItemCount}} Artikel)</li>
                    <li>Dein verknüpftes Bankkonto</li>
                </ul>

                <p>Es tut uns leid, dich zu verlieren. Wenn du es dir anders überlegst, bist du jederzeit herzlich willkommen zurückzukehren.</p>

                <p>Mit freundlichen Grüßen,<br>Dein GentleCorp-Team</p>
            </body>
        </html>
        `,
        placeholders: ['firstName', 'lastName', 'deletionDate', 'cartItemCount'],
        isHtml: true,
    }
];
