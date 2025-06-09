# GentleCorp-Order-Service

Der **GentleCorp-Order-Service** ist ein zentraler Bestandteil des **GentleCorp-Ecosystems**. Er ermöglicht das Erstellen, Aktualisieren und Verwalten von Bestellungen und ist darauf ausgelegt, mit hoher Performance und Skalierbarkeit zu arbeiten.

## Übersicht

- **Framework**: [NestJS](https://nestjs.com/)
- **Sprache**: TypeScript
- **Protokoll**: REST
- **Funktionalität**:
  - Erstellen von Bestellungen
  - Aktualisierung bestehender Bestellungen
  - Statusverfolgung von Bestellungen
  - Integration mit anderen Services wie Payment, Inventory und Customer

---

## Anforderungen

### Systemanforderungen
- Node.js Version 18 oder höher
- NPM Version 9 oder höher

### Installation

1. Repository klonen:
   ```bash
   git clone https://github.com/GentleCorp/gentlecorp-order-service.git
   cd gentlecorp-order-service
   ```

2. Abhängigkeiten installieren:
   ```bash
   npm install
   ```

3. Umgebungsvariablen konfigurieren:
   Erstelle eine `.env`-Datei basierend auf `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Beispiel-Variablen:
   ```
   PORT=3000
   DATABASE_URL=mongodb://localhost:27017/orders
   ```

4. Anwendung starten:
   ```bash
   npm run start
   ```

---

## API-Endpunkte

### Basis-URL
```
http://localhost:3000/api/orders
```

### Verfügbare Endpunkte

1. **GET** `/orders`
   - Beschreibung: Liste aller Bestellungen abrufen.
   - Query-Parameter: `status` (optional) - Filter nach Status.

2. **POST** `/orders`
   - Beschreibung: Neue Bestellung erstellen.
   - Body:
     ```json
     {
       "username": "string",
       "items": [
         { "productId": "string", "quantity": 1 }
       ]
     }
     ```

3. **PATCH** `/orders/:id`
   - Beschreibung: Eine bestehende Bestellung aktualisieren.
   - Body:
     ```json
     {
       "status": "shipped"
     }
     ```

4. **DELETE** `/orders/:id`
   - Beschreibung: Eine Bestellung löschen.

---

## Entwicklung

### Skripte
- **Starten der Anwendung**:
  ```bash
  npm run start
  ```
- **Entwicklung**:
  ```bash
  npm run start:dev
  ```
- **Tests ausführen**:
  ```bash
  npm run test
  ```

### Architektur
- **Controller**: Handhabt HTTP-Anfragen und leitet sie an die entsprechenden Services weiter.
- **Service**: Enthält die Business-Logik.
- **Repository**: Schnittstelle zur Datenbank.

---

## Tests

Das Projekt enthält Unit- und Integrationstests. Stelle sicher, dass vor dem Deployment alle Tests erfolgreich ausgeführt werden:

```bash
npm run test
```

---

## Docker

### Docker-Setup
1. Baue das Docker-Image:
   ```bash
   docker build -t gentlecorp-order-service .
   ```

2. Starte den Container:
   ```bash
   docker run -d -p 3000:3000 gentlecorp-order-service
   ```

### Docker Compose
Alternativ kannst du Docker Compose nutzen:
```bash
docker-compose up
```

---

## Beitrag leisten

Wir freuen uns über Beiträge zu diesem Projekt! Weitere Details findest du in der Datei [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Siehe [LICENSE](LICENSE) für weitere Details.



# 📬 Omnixys Notification Service

Der **Omnixys Notification Service** ist ein zentraler Microservice innerhalb von **OmnixysSphere**, der für den Versand von E-Mails und Benachrichtigungen zuständig ist. Er verarbeitet Kafka-Events wie `notification.user.updated`, `notification.account.deleted` etc., nutzt ein flexibles Template-System und ist vollständig mit Keycloak, Observability-Tools und MongoDB integriert.

> 🔒 Gesichert mit Keycloak · 🔎 Vollständig observierbar · ⚙️ Ereignisgesteuert via Kafka

---

## 📦 Features

* ✉️ E-Mail-Versand mit Mailjet
* 🧹 Vorlagen mit Platzhaltern aus MongoDB
* 🔐 Rollenbasierter Zugriff via Keycloak
* 📊 OpenTelemetry Tracing (Tempo)
* 📈 Prometheus Metriken (`/metrics`)
* 📋 JSON-Logging mit Kafka-Weiterleitung (`logs.notification`)
* 📡 Kafka-Consumer für CRUD-Events (User, Account, etc.)
* 🔌 Port: `7402` (gemäß [Port-Konvention](../port-konvention.md))

---

## 🚀 Quickstart

```bash
git clone https://github.com/omnixys/omnixys-notification-service.git
cd omnixys-notification-service
pip install -r requirements.txt
uvicorn src.fastapi_app:app --host 0.0.0.0 --port 7402
```

> Alternativ: `docker-compose up` (empfohlen für vollständiges Ökosystem)

---

## ⚙️ Tech Stack

* **Framework:** FastAPI
* **Datenbank:** MongoDB
* **Auth:** Keycloak
* **Messaging:** Kafka
* **Monitoring:** Prometheus, Tempo (OpenTelemetry), Grafana
* **Mail Provider:** Mailjet
* **Logging:** LoggerPlus mit Kafka-Anbindung

---

## 🔁 Kafka Topics (Beispiele)

| Topic                          | Beschreibung                              |
| ------------------------------ | ----------------------------------------- |
| `notification.user.updated`    | Versendet E-Mail bei Profilaktualisierung |
| `notification.account.deleted` | E-Mail bei Account-Löschung               |
| `notification.*`               | Erweiterbar für alle relevanten Events    |

---

## 🧪 Test & Qualität

```bash
pytest --cov=src
```

> Ziel: ≥ 80 % Testabdeckung. Codequalität via `ruff`, `mypy`, `coverage`.

---

## 🤝 Contributing

Siehe [CONTRIBUTING.md](../CONTRIBUTING.md) für Konventionen, Branch-Strategien und Pull-Request-Regeln.

---

## 🔐 Sicherheit

Sicherheitslücken bitte an [security@omnixys.com](mailto:security@omnixys.com) melden – **nicht öffentlich posten.**

---

## 📄 Lizenz

[GNU General Public License v3.0](./LICENSE)
© 2025 [Omnixys – The Fabric of Modular Innovation](https://omnixys.com)

---
