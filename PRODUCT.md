# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Générateur de site statique — Astro ou 11ty, le choix entre les deux restant à trancher au premier vrai build.

Contrainte de déploiement : GitHub Pages sur `wzm152007-sketch/wzm152007.github.io`, qui ne sert que des fichiers statiques. Toute solution retenue doit produire un site entièrement statique.

L'implémentation actuelle est un fichier HTML autonome (`echelon7 (1).html`, CSS et JS en ligne). Il n'est pas servi à la racine : tant qu'il ne s'appelle pas `index.html`, l'adresse publique du site n'affiche rien.

## Users

**Prioritaire — le futur membre.** Acheteur streetwear francophone qui découvre la marque, probablement sur mobile via un lien social. Il ne cherche pas un vêtement précis : il évalue s'il veut entrer dans un système d'abonnement. Sa question est « qu'est-ce que je gagne à m'engager, et qu'est-ce que je rate si je ne le fais pas ». En cas d'arbitrage entre les deux audiences, c'est lui qui gagne.

**Secondaire — partenaires et investisseurs.** La même page sert de vitrine quand le porteur du projet présente le concept (financement, atelier, collab). Eux lisent le modèle économique derrière l'habillage.

## Product Purpose

Échelon 7 est un projet de marque streetwear vendue par abonnement plutôt qu'à la pièce. Le membre paie pour appartenir à un système : un drop en édition limitée chaque mois, sa taille réservée, et une progression par niveaux qui augmente ses avantages au fil du temps.

Le produit n'existe pas encore. Aucun drop n'a eu lieu, aucun membre n'est inscrit, rien n'est vendu. Le seul livrable actuel est une page de présentation.

Le succès, à ce stade, se mesure à une seule chose : la page donne-t-elle envie de laisser son email, et croit-on au modèle en la lisant.

## Positioning

Le pitch tient dans une phrase déjà écrite dans la page : « Pas une marque. Un système. »

Le mécanisme qu'un voisin ne pourrait pas copier sans copier tout le modèle : la fidélité n'est pas un cumul de points décoratif, c'est un rang (niveau 1 à 7) qui change matériellement l'accès au produit — priorité sur le drop, réservation de taille, remises croissantes, puis pièces réservées au sommet. Le streetwear classique fabrique la rareté en laissant les gens rater le drop ; Échelon 7 revend le fait de ne pas le rater.

C'est une intention de concept, pas un avantage démontré.

## Operating Context

- Une page unique, scrollable, découpée en cinq chapitres numérotés (01 Le Drop, 02 Membership, 03 Le Jeu, 04 La Carte, 05 L'Invitation), terminée par une capture d'email.
- Langue française, tutoiement systématique, registre direct et court.
- Découverte majoritairement mobile attendue (lien depuis Instagram).
- Hébergement statique, sans serveur ni base de données.

## Capabilities and Constraints

**Ce qui existe réellement :** une page statique. Apparitions au scroll, carte de fidélité qui s'incline au mouvement de la souris, compteurs animés. Rien d'autre.

**Ce qui est décrit mais non implémenté :** l'inscription, le compte membre, le paiement de l'abonnement, le calcul des niveaux, le classement temps réel, la carte qui évolue, et la capture d'email elle-même (le formulaire ne va nulle part).

**Contrainte structurante :** l'hébergement est statique, donc tout ce qui précède exige un service tiers (formulaire, paiement, back-office). Aucun n'est choisi à ce jour.

**Vocabulaire à conserver :** drop, échelon, niveau, système, membre.

**Explicitement non décidé :** prix de l'abonnement, date du premier drop, cadence réelle, façon dont les points se gagnent, pièces qui existeront, fournisseur ou atelier, statut juridique.

## Brand Commitments

- Nom : Échelon 7 (écrit ÉCHELON SEPT en titre, E7 sur la carte).
- Accroche : « Monte d'un échelon. »
- Français, tutoiement.

Repris de l'implémentation actuelle mais non confirmé comme figé : les sept niveaux et leurs noms (01 Initié, 04 Opérateur, 07 Échelon 7), les trois cartes INITIÉ → GOLD → BLACK. À traiter comme l'existant à préserver tant que le porteur du projet ne l'a pas arrêté formellement.

## Evidence on Hand

**Aucune.** C'est le fait le plus important de ce document.

Tous les chiffres actuellement affichés sont inventés et sont du texte de remplissage, pas des données : 12 K+ membres actifs, 84 % de taux de rétention, « 7e drop ce mois-ci », le classement live et ses pseudos (XVRMN_K, drp.sole, rkstr__, bloc_noir, ymg.exe) avec leurs scores, les 8 420 points et le numéro de carte.

Les remises (-15 % au niveau 4, -30 % permanent au niveau 7) sont des intentions de grille tarifaire, pas des engagements validés.

Il n'existe à ce jour : aucun membre, aucun drop livré, aucune photo de produit, aucun témoignage, aucune retombée presse, aucun logo vectoriel, aucune donnée de rétention.

Les trois fichiers `*_n.jpg` à la racine sont des captures d'écran de portraits type photo corporate, conservées comme référence personnelle. Ce ne sont pas des visuels du projet et ils ne doivent jamais apparaître sur le site.

Conséquence pour tout travail futur : aucune de ces valeurs ne doit être reconduite telle quelle sur une page publiée, et aucune nouvelle preuve chiffrée ne doit être inventée pour combler un vide de mise en page.

## Product Principles

1. **Le rang doit rester concret.** Chaque niveau annoncé correspond à un avantage qu'on pourrait réellement livrer. Un palier décoratif vide le mécanisme de sa substance.
2. **Ne jamais simuler la foule.** Le produit vend l'appartenance ; fabriquer de faux membres pour la prouver est le seul mensonge dont la marque ne se relèverait pas. Tant qu'il n'y a pas de chiffres réels, la page assume le pré-lancement.
3. **Le membre passe avant l'investisseur.** Quand une section peut être écrite pour impressionner un partenaire ou pour convaincre un acheteur, elle est écrite pour l'acheteur.
4. **La garantie est le produit.** Zéro rupture, taille réservée, accès automatique : c'est ce qui sépare l'abonnement d'une newsletter. Ça doit rester lisible avant tout habillage.
5. **Rester publiable seul.** Toute décision technique doit tenir sur un hébergement statique et être maintenable par une seule personne.
