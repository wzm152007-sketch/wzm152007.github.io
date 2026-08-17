# PANCAK'UP — site de réservation

Site vitrine + système de réservation en ligne pour **PANCAK'UP**, box sucrées livrées
de nuit à Épinal. Site 100 % statique (HTML/CSS/JS, aucune dépendance, aucun build),
publiable tel quel sur GitHub Pages.

**Adresse une fois publié :** `https://wzm152007-sketch.github.io/pancakup/`

```
pancakup/
├── index.html              le site complet
├── assets/css/style.css    la charte graphique (noir / or / caramel du flyer)
├── assets/js/app.js        réservation, vérification d'adresse, créneaux
└── assets/img/             (vide) → à remplir avec tes photos
```

---

## Ce que fait le site

- **Vitrine** reprenant le flyer : box à 15 € (10 mini pancakes au choix Oreo /
  Kinder Bueno / Kinder, coulis Nutella ou Caramel, 1 cookie maison Kinder Maxi,
  1 tiramisu Kinder Bueno White, 1 boisson Oasis ou Coca-Cola), livraison de nuit,
  commandes de 22h à 3h, à partir du mercredi 22h, Snapchat et TikTok.
- **Pastille « ouvert / fermé »** en haut de page, calculée en direct sur l'heure de Paris.
- **Réservation en 4 étapes** : composition box par box → coordonnées + adresse →
  créneau → confirmation avec référence (`PU-260817-A4K9`).
- **Vérification automatique de l'adresse** : autocomplétion sur la Base Adresse
  Nationale, calcul de la distance réelle au centre d'Épinal, **blocage de la
  réservation au-delà de 10 km**.
- **Créneaux de 15 minutes entre 22h et 3h**, les créneaux déjà passés (+ 30 min de
  délai de préparation) sont grisés automatiquement.
- Récapitulatif prêt à copier/coller, bouton Snapchat, historique local des réservations.

---

## Réglages — tout est en haut de `assets/js/app.js`

Ouvre `assets/js/app.js`, l'objet `CONFIG` (première section) contient tout :

| Réglage | Rôle |
|---|---|
| `snapchat`, `tiktok` | tes comptes (le bouton Snapchat pointe dessus) |
| `phone` | ton numéro. **Si tu le renseignes** (`'+336XXXXXXXX'`), un bouton « Envoyer par SMS » avec la commande pré-remplie apparaît sur la confirmation |
| `orderEndpoint` | **réception automatique des commandes** — voir plus bas |
| `boxPrice`, `maxBoxes` | 15 € et 6 box maximum par réservation |
| `center`, `radiusKm` | centre d'Épinal et rayon de livraison (10 km) |
| `openHour`, `closeHour` | 22 → 3 |
| `slotStepMin`, `leadTimeMin` | créneaux de 15 min, 30 min de délai minimum |
| `openDays`, `serviceStart` | jours de service et date de démarrage |
| `flavours`, `toppings`, `drinks` | les parfums proposés |
| `communes` | liste affichée dans « zone de livraison » (filtrée par le rayon) |

### Recevoir les commandes automatiquement

Par défaut le client valide sa réservation, obtient une référence, et t'envoie le
récapitulatif sur Snapchat (bouton « Copier le récapitulatif » + bouton Snapchat).

Pour que **la commande t'arrive toute seule**, crée un formulaire gratuit sur
[Formspree](https://formspree.io) (ou un Google Apps Script / un webhook Make) et colle
son URL dans `CONFIG.orderEndpoint` :

```js
orderEndpoint: 'https://formspree.io/f/xxxxxxxx',
```

La réservation complète (client, téléphone, adresse, coordonnées GPS, distance, créneau,
détail de chaque box, total) est alors envoyée en POST JSON à chaque validation, et le
message de confirmation change automatiquement.

### Changer les jours de service

Le flyer annonce « à partir de mercredi 22h ». Le site est donc réglé sur un
**démarrage le mercredi 19 août, puis toutes les nuits**. Si tu ne livres pas
toutes les nuits, restreins la liste (0 = dimanche … 6 = samedi) :

```js
openDays: [3, 4, 5, 6],   // mercredi, jeudi, vendredi, samedi
```

### Changer le rayon

```js
radiusKm: 15,   // au lieu de 10
```

Le rayon est appliqué partout d'un coup : textes, liste des communes, et blocage
de la réservation.

---

## Mettre tes vraies photos

L'illustration de la box en page d'accueil et les 4 icônes produit sont dessinées en
CSS/SVG (aucune image externe, chargement instantané). Pour passer aux vraies photos :

1. dépose tes fichiers dans `assets/img/` (ex. `box.jpg`, `cookie.jpg`) ;
2. dans `index.html`, remplace le bloc `<div class="box-art">…</div>` par
   `<img src="assets/img/box.jpg" alt="Box PANCAK'UP" class="box-photo">` ;
3. ajoute dans le CSS : `.box-photo{ width:min(100%,440px); border-radius:16px; }`.

Vise des photos de moins de 300 Ko (format `.jpg` ou `.webp`).

---

## Publier

Le site est déjà dans ce dépôt GitHub Pages. Une fois la branche fusionnée dans `main` :

- il est en ligne sur `https://wzm152007-sketch.github.io/pancakup/` ;
- pour en faire **la page d'accueil du domaine**, copie `pancakup/index.html` à la
  racine du dépôt et corrige les deux chemins `assets/…` en `pancakup/assets/…`.

---

## Points à valider de ton côté

Ces éléments ne figuraient pas sur le flyer, ils ont été choisis par défaut et se
modifient en une ligne :

- **Paiement à la livraison** (mentionné dans la FAQ, le récapitulatif et le panneau
  latéral) — à changer si tu encaisses autrement ;
- **Frais de livraison à 0 €** — le total affiché est `15 € × nombre de box` ;
- **Maximum 6 box** par réservation ;
- **Service toutes les nuits** à partir du mercredi (voir `openDays`) ;
- **Allergènes** : la FAQ mentionne gluten, lait, œufs, fruits à coque et soja —
  vérifie que la liste correspond à tes recettes, c'est une obligation légale.

---

## Détails techniques

- **Aucun serveur, aucune base de données.** Les réservations sont stockées dans le
  navigateur du client (`localStorage`, 20 dernières) et envoyées soit via
  `orderEndpoint`, soit manuellement par Snapchat/SMS.
- **Géocodage** : [`api-adresse.data.gouv.fr`](https://adresse.data.gouv.fr) — API
  publique et gratuite de l'État, sans clé ni quota. Si elle est injoignable,
  l'autocomplétion affiche un message et invite à passer par Snapchat.
- **Distance** : formule de haversine à vol d'oiseau depuis le centre d'Épinal
  (48.1744, 6.4519). Ce n'est pas une distance routière : une adresse à 9,8 km à vol
  d'oiseau peut être à 13 km par la route.
- **Fuseau horaire** : tous les calculs d'horaires utilisent `Europe/Paris`, donc un
  client en voyage voit les bons créneaux.
- Accessibilité : navigation clavier complète (y compris l'autocomplétion), rôles ARIA,
  contrastes conformes, `prefers-reduced-motion` respecté.
- Testé sur Chromium en 1280 px et 390 px : parcours de réservation complet, cas
  « hors zone », aucune erreur console, aucun débordement horizontal.
