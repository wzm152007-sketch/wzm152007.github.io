# PANCAK'UP — site de réservation

Site vitrine + système de réservation en ligne pour **PANCAK'UP**, box sucrées livrées
de nuit à Épinal. Site 100 % statique (HTML/CSS/JS, aucune dépendance, aucun build),
publiable tel quel sur GitHub Pages.

**Adresse une fois publié :** `https://wzm152007-sketch.github.io/pancakup/`

```
pancakup/
├── index.html                  le site complet
├── assets/css/style.css        la charte graphique (noir / or / caramel du flyer)
├── assets/js/app.js            réservation, vérification d'adresse, créneaux
├── assets/img/                 (vide) → à remplir avec tes photos
├── pancakup-standalone.html    LE MÊME SITE EN UN SEUL FICHIER (voir ci-dessous)
└── build-standalone.js         régénère le fichier unique
```

## Le site en un seul fichier

`pancakup-standalone.html` contient **tout** (HTML + CSS + JavaScript). Tu peux
l'ouvrir d'un double-clic, l'envoyer par mail, ou le déposer sur n'importe quel
hébergeur — il fonctionne sans rien d'autre.

Si tu modifies `index.html` ou `assets/`, régénère-le :

```bash
node build-standalone.js
```

Pour la mise en ligne sur GitHub Pages, c'est la version en plusieurs fichiers
(`index.html` + `assets/`) qui est utilisée : elle se met en cache plus finement.

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
| `googleApiKey` | **ta clé Google Maps** — voir la section ci-dessous |
| `geocoder` | `'auto'` (Google si clé, sinon repli), `'google'`, ou `'ban'` |
| `showMap`, `mapZoom` | carte Google dans la section « zone de livraison » |
| `openHour`, `closeHour` | 22 → 3 |
| `slotStepMin`, `leadTimeMin` | créneaux de 15 min, 30 min de délai minimum |
| `openDays`, `serviceStart` | jours de service et date de démarrage |
| `flavours`, `toppings`, `drinks` | les parfums proposés |
| `communes` | liste affichée dans « zone de livraison » (filtrée par le rayon) |

### Activer Google Maps (obligatoire pour l'autocomplétion Google)

Le site est prêt pour Google Maps, il ne manque que **ta clé** :

1. Va sur [console.cloud.google.com](https://console.cloud.google.com), crée un
   projet (ex. « Pancakup ») et **active la facturation** — Google l'exige même
   pour le palier gratuit.
2. Dans *API et services → Bibliothèque*, active **les deux** :
   - **Maps JavaScript API** (la carte)
   - **Places API (New)** (l'autocomplétion d'adresses)
3. Dans *Identifiants*, crée une **clé API**, puis **restreins-la** :
   - *Restrictions relatives aux applications* → **Sites web**, et ajoute
     `https://wzm152007-sketch.github.io/*`
   - *Restrictions relatives aux API* → coche uniquement les deux API ci-dessus
4. Colle la clé dans `assets/js/app.js` :

```js
googleApiKey: 'AIzaSy...ta-clé...',
```

La clé est visible dans le code source du site : c'est normal et inévitable pour
un site statique. **La restriction par domaine de l'étape 3 est ce qui la protège**
— sans elle, n'importe qui peut l'utiliser et te la facturer. Ne la saute pas.

Une fois la clé en place : l'autocomplétion passe sur Google, et une **vraie carte
sombre avec le cercle de 10 km** remplace le schéma dans la section « zone de
livraison ». L'adresse du client s'y affiche en vert (dans la zone) ou en rouge
(hors zone).

**Coût.** Chaque recherche d'adresse et chaque affichage de carte est facturé
au-delà du crédit mensuel offert par Google. Le site limite la casse : les
coordonnées ne sont demandées qu'au moment où le client **choisit** une adresse
(et non à chaque lettre tapée), avec un jeton de session, ce qui est la
facturation la plus basse. Si Google devient injoignable (clé invalide, quota
dépassé, coupure), **le site bascule tout seul sur la Base Adresse Nationale** :
une commande n'est jamais bloquée.

Pour rester sur la solution gratuite de l'État, laisse `googleApiKey` vide, ou
force `geocoder: 'ban'`.

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
- **Géocodage** : **Google Places API (New)** dès qu'une clé est configurée
  (`AutocompleteSuggestion` + `fetchFields`, avec jeton de session), avec repli
  automatique sur [`api-adresse.data.gouv.fr`](https://adresse.data.gouv.fr) —
  API publique et gratuite de l'État, sans clé ni quota. Si les deux sont
  injoignables, l'autocomplétion affiche un message et invite à passer par Snapchat.
- **Carte** : Maps JavaScript API, style sombre aligné sur la charte, cercle de
  rayon `radiusKm`. Sans clé, un schéma en CSS prend sa place.
- **Distance** : formule de haversine à vol d'oiseau depuis le centre d'Épinal
  (48.1744, 6.4519). Ce n'est pas une distance routière : une adresse à 9,8 km à vol
  d'oiseau peut être à 13 km par la route.
- **Fuseau horaire** : tous les calculs d'horaires utilisent `Europe/Paris`, donc un
  client en voyage voit les bons créneaux.
- Accessibilité : navigation clavier complète (y compris l'autocomplétion), rôles ARIA,
  contrastes conformes, `prefers-reduced-motion` respecté.
- Testé sur Chromium en 1280 px et 390 px, sur les deux fournisseurs d'adresses :
  parcours de réservation complet, cas « hors zone », repli automatique, fichier
  unique ouvert en `file://` — aucune erreur console, aucun débordement horizontal.
