
# BUS-DIRECT 🚌

Application web de gestion des trajets en bus et de réservation des sièges.

BUS-DIRECT permet aux utilisateurs de consulter les trajets disponibles, rechercher une destination, choisir un trajet et gérer les réservations des sièges.

## 📌 Fonctionnalités

### 1. Gestion des trajets
- Affichage des trajets disponibles.
- Recherche par ville de départ ou d'arrivée.
- Filtrage des trajets selon leur disponibilité.
- Pagination des trajets.
- Affichage du prix et des horaires.
- Accès à la page cabine selon l'identifiant du trajet.

### 2. Gestion des sièges
- Affichage de 20 sièges par bus.
- Sièges VIP : de 1 à 4.
- Sièges normaux : de 5 à 20.
- Identification des sièges libres et occupés.
- Affichage du nom et du téléphone du passager.
- Mise à jour des statistiques des sièges.

### 3. Réservation
- Saisie du nom et du numéro de téléphone.
- Sélection d'un siège.
- Vérification de la disponibilité.
- Affichage d'un aperçu du ticket.
- Calcul du montant total des réservations.

### 4. Modification et annulation
- Modification du nom du passager.
- Changement du siège réservé.
- Annulation d'une réservation.
- Libération du siège après annulation.

### 5. Waiting List
- Ajout d'un passager à la liste d'attente.
- Affichage des passagers en attente.
- Suppression d'un passager de la liste.
- Attribution du siège libéré au premier passager en attente.

## 🛠️ Technologies utilisées

- HTML5 : structure des pages.
- CSS3 : mise en forme et design.
- JavaScript : interactions et logique de réservation.
- JSON : stockage des données initiales des trajets.
- Tailwind CSS : classes utilitaires CSS.
- Font Awesome : icônes.
- LocalStorage : conservation des données dans le navigateur.

## 📁 Organisation du projet

```text
BUS-DIRECT/
│
├── index.html
├── cabine.html
│
├── store.js
├── main-cabine.js
├── script.js
│
├── style.css
├── cabine.css
│
├── data/
│   └── trips.json
│
└── img/
```

## 🚀 Installation et lancement

### 1. Cloner le projet

```bash
git clone <URL_DU_DEPOT>
```

### 2. Ouvrir le projet

Ouvrir le dossier BUS-DIRECT dans Visual Studio Code.

### 3. Vérifier les données

Vérifier que le fichier `trips.json` se trouve dans le dossier `data`.

### 4. Lancer l'application

Utiliser l'extension Live Server dans Visual Studio Code.

Ouvrir `index.html` avec Live Server.

## 📊 Structure des données JSON

Exemple d'un trajet :

```json
{
  "id": 1,
  "departure": "Safi",
  "destination": "Youssoufia",
  "departureTime": "07:30",
  "arrivalTime": "08:30",
  "price": 25,
  "capacity": 20,
  "reservations": [
    {
      "seat": 4,
      "name": "Adil Tazi",
      "phone": "0699869879"
    }
  ],
  "waitingList": []
}
```

### Explication des propriétés

- `id` : identifiant du trajet.
- `departure` : ville de départ.
- `destination` : ville d'arrivée.
- `departureTime` : heure de départ.
- `arrivalTime` : heure d'arrivée.
- `price` : prix du siège.
- `capacity` : capacité totale du bus.
- `reservations` : liste des réservations.
- `waitingList` : liste des passagers en attente.

## 💾 Stockage des données

Le projet utilise JSON pour les données initiales des trajets et LocalStorage pour conserver certaines modifications dans le navigateur.

Les données LocalStorage sont séparées selon l'identifiant du trajet.

**Remarque :** LocalStorage conserve les données sur le navigateur et l'appareil utilisés. Il ne remplace pas une base de données centralisée.

## 🎯 Objectif du projet

L'objectif de BUS-DIRECT est de faciliter la gestion des trajets, des sièges et des réservations grâce à une interface web simple et interactive.

## 👨‍💻 Formation

Projet réalisé dans le cadre de la formation Web Development à **YouCode**.

---

**BUS-DIRECT — Smart Bus Reservation System**
