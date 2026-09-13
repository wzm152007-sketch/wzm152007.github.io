# Photos Instagram — Glow Coffee

Déposez ici les images exportées depuis Instagram, puis renseignez le chemin
dans l'objet `PHOTOS` en haut du `<script>` de `index.html`.

```js
const PHOTOS = {
  story:  'assets/photos/comptoir.jpg',
  room1:  'assets/photos/salle.jpg',
  ...
};
```

Un emplacement laissé vide affiche un cadre « photo à venir » — la page reste
valide, rien ne casse.

## Emplacements

| clé      | où ça apparaît                  | format conseillé |
|----------|---------------------------------|------------------|
| `story`  | section 01 — Notre histoire     | portrait 4:5     |
| `esp`    | section 02 — onglet Espresso    | paysage 16:11    |
| `filter` | section 02 — onglet Filtre      | paysage 16:11    |
| `brunch` | section 02 — onglet Brunch      | paysage 16:11    |
| `sweet`  | section 02 — onglet Douceurs    | paysage 16:11    |
| `room1`  | section 04 — grande tuile gauche| portrait         |
| `room2`  | section 04 — tuile haut droite  | paysage          |
| `room3`  | section 04 — tuile centre       | portrait         |
| `room4`  | section 04 — tuile étroite      | portrait         |
| `room5`  | section 04 — grande tuile bas   | portrait         |
| `room6`  | section 04 — tuile bas droite   | paysage          |

## Avant d'ajouter une image

Redimensionner à ~1600 px sur le plus grand côté et exporter en JPEG qualité
~80. Une photo Instagram brute fait souvent plusieurs Mo, ce qui ralentit
inutilement la page.
