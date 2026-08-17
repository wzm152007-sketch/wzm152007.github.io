/* ==========================================================================
   PANCAK'UP — moteur du site + système de réservation
   - Vérification d'adresse via la Base Adresse Nationale (api-adresse.data.gouv.fr)
   - Zone de livraison : rayon autour d'Épinal (10 km par défaut)
   - Créneaux de nuit 22h → 3h, fuseau Europe/Paris
   ========================================================================== */
(function () {
  'use strict';

  /* ======================================================================
     1. CONFIGURATION — tout ce qui se modifie sans toucher au reste du code
     ====================================================================== */
  var CONFIG = {

    /* --- Commerce --- */
    brand: "PANCAK'UP",
    city: 'Épinal',
    snapchat: 'pancakup',                 // https://snapchat.com/add/<snapchat>
    tiktok: 'pancakup88',

    /* Laisser vide si non utilisé. Si renseigné, un bouton "Envoyer par SMS"
       apparaît sur la confirmation, pré-rempli avec le récapitulatif.
       Format international conseillé : '+336XXXXXXXX'                       */
    phone: '',

    /* Envoi automatique de la réservation (optionnel).
       Colle ici l'URL d'un formulaire Formspree, d'un Google Apps Script,
       d'un webhook Make/Zapier… La réservation y est envoyée en POST (JSON).
       Exemple : 'https://formspree.io/f/xxxxxxx'
       Si vide, la réservation reste locale + envoi manuel Snapchat/SMS.      */
    orderEndpoint: '',

    /* --- Tarifs --- */
    boxPrice: 15,
    maxBoxes: 6,

    /* --- Zone de livraison --- */
    center: { lat: 48.1744, lon: 6.4519 },   // Épinal centre
    radiusKm: 10,

    /* --- Google Maps ---------------------------------------------------
       Colle ici ta clé Google Maps pour activer l'autocomplétion Google
       et la carte de la zone de livraison.
       Console Google Cloud → activer « Maps JavaScript API » ET
       « Places API (New) », puis restreindre la clé au domaine du site
       (Restrictions → Sites web → https://wzm152007-sketch.github.io/*).
       Sans clé, le site bascule tout seul sur la Base Adresse Nationale
       (gratuite, sans compte) et affiche le schéma de zone.             */
    googleApiKey: '',
    geocoder: 'auto',    // 'auto' (Google si clé, sinon BAN) | 'google' | 'ban'
    showMap: true,       // carte Google dans la section « zone de livraison »
    mapZoom: 11,

    /* --- Horaires de service (heure de Paris) --- */
    openHour: 22,        // ouverture 22h00
    closeHour: 3,        // fermeture 3h00 (le lendemain)
    slotStepMin: 15,     // créneaux de 15 min
    leadTimeMin: 30,     // délai minimum entre la réservation et le créneau
    nightsAhead: 5,      // nombre de nuits proposées à la réservation
    /* Jours d'ouverture (0 = dimanche … 6 = samedi). Le service annoncé sur
       le flyer démarre le mercredi ; adapte cette liste si tu ne livres pas
       toutes les nuits. Ex. jeudi→dimanche : [4,5,6,0]                       */
    openDays: [0, 1, 2, 3, 4, 5, 6],
    /* Date de démarrage du service (aucun créneau proposé avant). */
    serviceStart: '2026-08-19',   // mercredi

    /* --- Options de la box (issues du flyer) --- */
    flavours: [
      { id: 'oreo',   label: 'Oreo',         dot: '#0B57B8' },
      { id: 'bueno',  label: 'Kinder Bueno', dot: '#7A3E12' },
      { id: 'kinder', label: 'Kinder',       dot: '#D6001C' }
    ],
    toppings: [
      { id: 'nutella', label: 'Coulis Nutella', dot: '#5B3A1E' },
      { id: 'caramel', label: 'Coulis Caramel', dot: '#E0A94F' }
    ],
    drinks: [
      { id: 'oasis', label: 'Oasis Pomme Cassis Framboise', dot: '#6E1220' },
      { id: 'coca',  label: 'Coca-Cola',                    dot: '#D01D2A' }
    ],

    /* --- Communes affichées dans la section « zone » ---
       Filtrées automatiquement par le rayon ci-dessus. */
    communes: [
      { name: 'Épinal',            lat: 48.1744, lon: 6.4519 },
      { name: 'Golbey',            lat: 48.2000, lon: 6.4333 },
      { name: 'Chantraine',        lat: 48.1833, lon: 6.4167 },
      { name: 'Dinozé',            lat: 48.1500, lon: 6.4667 },
      { name: 'Dogneville',        lat: 48.2167, lon: 6.4500 },
      { name: 'Jeuxey',            lat: 48.2000, lon: 6.4833 },
      { name: 'Deyvillers',        lat: 48.2000, lon: 6.5167 },
      { name: 'Longchamp',         lat: 48.2167, lon: 6.5333 },
      { name: 'Dompierre',         lat: 48.2333, lon: 6.5000 },
      { name: 'Sanchey',           lat: 48.1833, lon: 6.3667 },
      { name: 'Chaumousey',        lat: 48.1833, lon: 6.3500 },
      { name: 'Uxegney',           lat: 48.1833, lon: 6.3833 },
      { name: 'Les Forges',        lat: 48.1667, lon: 6.3667 },
      { name: 'Darnieulles',       lat: 48.1667, lon: 6.3833 },
      { name: 'Chavelot',          lat: 48.2333, lon: 6.4500 },
      { name: 'Thaon-les-Vosges',  lat: 48.2500, lon: 6.4167 },
      { name: 'Igney',             lat: 48.2500, lon: 6.4500 },
      { name: 'Girmont',           lat: 48.2500, lon: 6.4667 },
      { name: 'Bellefontaine',     lat: 48.2333, lon: 6.3833 },
      { name: 'Arches',            lat: 48.1333, lon: 6.5167 },
      { name: 'Archettes',         lat: 48.1167, lon: 6.5167 },
      { name: 'Hadol',             lat: 48.1167, lon: 6.4000 },
      { name: 'La Baffe',          lat: 48.1667, lon: 6.5667 },
      { name: 'Aydoilles',         lat: 48.1833, lon: 6.5833 },
      { name: 'Fontenay',          lat: 48.2167, lon: 6.5667 },
      { name: 'Pouxeux',           lat: 48.1000, lon: 6.5333 },
      { name: 'Dommartin-aux-Bois',lat: 48.1500, lon: 6.3167 },
      { name: 'Girancourt',        lat: 48.1500, lon: 6.3333 },
      { name: 'Vaudéville',        lat: 48.1500, lon: 6.5500 },
      { name: 'Raon-aux-Bois',     lat: 48.0833, lon: 6.5000 }
    ],

    geocodeUrl: 'https://api-adresse.data.gouv.fr/search/',
    storageKey: 'pancakup.orders.v1'
  };

  /* ======================================================================
     2. Utilitaires
     ====================================================================== */
  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function euro(n) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(n);
  }

  function debounce(fn, wait) {
    var t;
    return function () {
      var ctx = this, args = arguments;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(ctx, args); }, wait);
    };
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /** Distance orthodromique en km (formule de haversine). */
  function distanceKm(a, b) {
    var R = 6371, toRad = Math.PI / 180;
    var dLat = (b.lat - a.lat) * toRad;
    var dLon = (b.lon - a.lon) * toRad;
    var la1 = a.lat * toRad, la2 = b.lat * toRad;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
  }

  /* --- Temps, en heure de Paris, indépendamment du fuseau du visiteur --- */
  function parisParts(date) {
    var fmt = new Intl.DateTimeFormat('fr-FR', {
      timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: false
    });
    var out = {};
    fmt.formatToParts(date || new Date()).forEach(function (p) {
      if (p.type !== 'literal') out[p.type] = p.value;
    });
    return {
      y: +out.year, m: +out.month, d: +out.day,
      h: +(out.hour === '24' ? '0' : out.hour), min: +out.minute,
      iso: out.year + '-' + out.month + '-' + out.day,
      minutes: +(out.hour === '24' ? '0' : out.hour) * 60 + +out.minute
    };
  }

  /** Ajoute n jours à une date ISO 'YYYY-MM-DD' (sans dérive de fuseau). */
  function addDaysISO(iso, n) {
    var p = iso.split('-');
    var d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
    d.setUTCDate(d.getUTCDate() + n);
    return d.toISOString().slice(0, 10);
  }

  function isoWeekday(iso) {
    var p = iso.split('-');
    return new Date(Date.UTC(+p[0], +p[1] - 1, +p[2])).getUTCDay();
  }

  var DAYS   = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  var MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet',
                'août', 'septembre', 'octobre', 'novembre', 'décembre'];

  function prettyDate(iso) {
    var p = iso.split('-');
    return DAYS[isoWeekday(iso)] + ' ' + (+p[2]) + ' ' + MONTHS[+p[1] - 1];
  }

  /* ======================================================================
     3. Horaires de service
     ====================================================================== */
  var Service = {
    /** Nombre de minutes que dure le service (22h → 3h = 300 min). */
    durationMin: function () {
      return ((CONFIG.closeHour - CONFIG.openHour + 24) % 24) * 60;
    },

    /** La nuit du <iso> est-elle ouverte ? */
    isNightOpen: function (iso) {
      if (iso < CONFIG.serviceStart) return false;
      return CONFIG.openDays.indexOf(isoWeekday(iso)) !== -1;
    },

    /** Date ISO de la « nuit » en cours (une nuit appartient au jour où elle commence). */
    currentNightISO: function () {
      var now = parisParts();
      // Entre minuit et l'heure de fermeture, on est encore sur la nuit de la veille.
      if (now.h < CONFIG.closeHour) return addDaysISO(now.iso, -1);
      return now.iso;
    },

    /** Ouvert maintenant ? */
    isOpenNow: function () {
      var now = parisParts();
      var inHours = (now.h >= CONFIG.openHour) || (now.h < CONFIG.closeHour);
      return inHours && this.isNightOpen(this.currentNightISO());
    },

    /** Prochaine nuit ouverte (ISO) à partir d'aujourd'hui. */
    nextOpenNight: function () {
      var now = parisParts();
      var start = (now.h < CONFIG.closeHour) ? addDaysISO(now.iso, -1) : now.iso;
      for (var i = 0; i < 400; i++) {
        var iso = addDaysISO(start, i);
        if (!this.isNightOpen(iso)) continue;
        // La nuit doit encore avoir au moins un créneau disponible.
        if (this.slotsFor(iso).some(function (s) { return !s.past; })) return iso;
      }
      return null;
    },

    /** Liste des nuits proposables. */
    nights: function () {
      var list = [], first = this.nextOpenNight();
      if (!first) return list;
      for (var i = 0; i < 400 && list.length < CONFIG.nightsAhead; i++) {
        var candidate = addDaysISO(first, i);
        if (this.isNightOpen(candidate)) list.push(candidate);
      }
      return list;
    },

    /**
     * Créneaux d'une nuit.
     * @returns [{ value:'22:15', label:'22:15', dayShift:0|1, past:bool }]
     */
    slotsFor: function (iso) {
      var slots = [];
      var total = this.durationMin();
      var now = parisParts();
      var nowNight = this.currentNightISO();

      for (var offset = 0; offset <= total - CONFIG.slotStepMin; offset += CONFIG.slotStepMin) {
        var abs  = CONFIG.openHour * 60 + offset;      // minutes depuis minuit du jour <iso>
        var h    = Math.floor(abs / 60) % 24;
        var mi   = abs % 60;
        var shift = abs >= 24 * 60 ? 1 : 0;            // créneau après minuit
        var past  = false;

        if (iso < nowNight) {
          past = true;
        } else if (iso === nowNight) {
          // On ne « brûle » des créneaux que si le service a déjà commencé ;
          // en pleine journée, toute la nuit à venir reste disponible.
          var started = (now.h >= CONFIG.openHour) || (now.h < CONFIG.closeHour);
          if (started) {
            var elapsed = now.minutes - CONFIG.openHour * 60;   // minutes depuis 22h
            if (elapsed < 0) elapsed += 24 * 60;                // on est après minuit
            past = offset < elapsed + CONFIG.leadTimeMin;
          }
        }

        slots.push({
          value: pad(h) + ':' + pad(mi),
          label: pad(h) + ':' + pad(mi),
          dayShift: shift,
          past: past
        });
      }
      return slots;
    },

    /** Texte d'état affiché dans le header. */
    statusText: function () {
      if (this.isOpenNow()) return 'Ouvert · on livre jusqu\'à ' + CONFIG.closeHour + 'h';
      var next = this.nextOpenNight();
      if (!next) return 'Fermé';
      var now = parisParts();
      var todayNight = (now.h < CONFIG.closeHour) ? addDaysISO(now.iso, -1) : now.iso;
      if (next === todayNight) return 'Ouverture à ' + CONFIG.openHour + 'h';
      return 'Fermé · retour ' + prettyDate(next).toLowerCase() + ' ' + CONFIG.openHour + 'h';
    }
  };

  /* ======================================================================
     4. Vérification d'adresse
        Fournisseur principal : Google Maps (Places API New + Maps JavaScript).
        Repli automatique : Base Adresse Nationale (gratuite, sans clé).
     ====================================================================== */

  /** Chargement à la demande du script Google Maps. */
  var GoogleMaps = {
    _loading: null,

    /** Une clé est-elle configurée (ou le script déjà chargé à la main) ? */
    available: function () {
      return !!CONFIG.googleApiKey || !!(window.google && window.google.maps);
    },

    load: function () {
      if (this._loading) return this._loading;

      if (window.google && window.google.maps) {
        this._loading = Promise.resolve(window.google);
      } else if (!CONFIG.googleApiKey) {
        this._loading = Promise.reject(new Error('Clé Google Maps non configurée'));
      } else {
        this._loading = new Promise(function (resolve, reject) {
          var cbName = '__pancakupMapsReady';
          window[cbName] = function () { resolve(window.google); };
          var s = document.createElement('script');
          s.async = true;
          s.src = 'https://maps.googleapis.com/maps/api/js' +
                  '?key=' + encodeURIComponent(CONFIG.googleApiKey) +
                  '&libraries=places,geometry&language=fr&region=FR' +
                  '&loading=async&callback=' + cbName;
          s.onerror = function () { reject(new Error('Google Maps injoignable')); };
          document.head.appendChild(s);
        });
      }
      return this._loading;
    },

    /** Bibliothèque « places » (API récente). */
    places: function () {
      return this.load().then(function (g) {
        return g.maps.importLibrary ? g.maps.importLibrary('places') : g.maps.places;
      });
    }
  };

  /** Texte d'un champ Places (FormattableText ou chaîne). */
  function placesText(v) {
    if (v == null) return '';
    if (typeof v === 'string') return v;
    if (v.text != null) return v.text;
    return String(v);
  }

  /* Les deux fournisseurs exposent la même interface :
       search(query)  → Promise<[ suggestion ]>
       resolve(item)  → Promise<{ label, lat, lon, precise }>
     La recherche ne renvoie pas toujours les coordonnées (Google les facture
     séparément) : elles sont récupérées seulement quand le client choisit. */
  var Providers = {

    /* ---------------------- Google Maps / Places ---------------------- */
    google: {
      id: 'google',
      _token: null,

      search: function (query) {
        var self = this;
        return GoogleMaps.places().then(function (places) {
          if (!places.AutocompleteSuggestion) {
            throw new Error('Places API (New) indisponible pour cette clé');
          }
          if (!self._token) self._token = new places.AutocompleteSessionToken();
          return places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
            input: query,
            language: 'fr',
            includedRegionCodes: ['fr'],
            sessionToken: self._token,
            /* On oriente les résultats autour d'Épinal, sans les y enfermer :
               une adresse hors zone doit rester trouvable pour être refusée
               explicitement. */
            locationBias: {
              center: { lat: CONFIG.center.lat, lng: CONFIG.center.lon },
              radius: Math.max(CONFIG.radiusKm * 2000, 20000)
            }
          });
        }).then(function (res) {
          return (res.suggestions || []).map(function (s) {
            var p = s.placePrediction;
            return {
              provider: self,
              label: placesText(p.text),
              primary: placesText(p.mainText) || placesText(p.text),
              secondary: placesText(p.secondaryText),
              _prediction: p
            };
          });
        });
      },

      resolve: function (item) {
        var self = this;
        var place = item._prediction.toPlace();
        return place.fetchFields({
          fields: ['location', 'formattedAddress', 'types']
        }).then(function (res) {
          var pl = (res && res.place) || place;
          var loc = pl.location;
          self._token = null;             // la session de facturation se termine ici
          var types = pl.types || [];
          return {
            label: pl.formattedAddress || item.label,
            lat: typeof loc.lat === 'function' ? loc.lat() : loc.lat,
            lon: typeof loc.lng === 'function' ? loc.lng() : loc.lng,
            precise: types.indexOf('street_address') !== -1 ||
                     types.indexOf('premise') !== -1 ||
                     types.indexOf('subpremise') !== -1
          };
        });
      }
    },

    /* -------------------- Base Adresse Nationale ---------------------- */
    ban: {
      id: 'ban',

      search: function (query) {
        var self = this;
        var url = CONFIG.geocodeUrl + '?q=' + encodeURIComponent(query) +
                  '&limit=6&autocomplete=1' +
                  '&lat=' + CONFIG.center.lat + '&lon=' + CONFIG.center.lon;
        return fetch(url, { headers: { Accept: 'application/json' } })
          .then(function (r) {
            if (!r.ok) throw new Error('http ' + r.status);
            return r.json();
          })
          .then(function (data) {
            return (data.features || []).map(function (f) {
              var c = f.geometry.coordinates;   // [lon, lat]
              var p = f.properties;
              return {
                provider: self,
                label: p.label,
                primary: p.name || p.label,
                secondary: ((p.postcode || '') + ' ' + (p.city || '')).trim(),
                lat: c[1],
                lon: c[0],
                precise: p.type === 'housenumber'
              };
            });
          });
      },

      resolve: function (item) {
        return Promise.resolve({
          label: item.label, lat: item.lat, lon: item.lon, precise: item.precise
        });
      }
    }
  };

  var Geo = {
    /** Fournisseur actif selon CONFIG.geocoder ('auto' | 'google' | 'ban'). */
    provider: function () {
      if (CONFIG.geocoder === 'ban') return Providers.ban;
      if (CONFIG.geocoder === 'google') return Providers.google;
      return GoogleMaps.available() ? Providers.google : Providers.ban;
    },

    search: function (query) {
      var p = this.provider();
      return p.search(query).catch(function (err) {
        /* Google indisponible (clé invalide, quota, hors ligne) : en mode
           'auto' on bascule sur la BAN pour ne jamais bloquer une commande. */
        if (p.id === 'google' && CONFIG.geocoder !== 'google') {
          if (window.console) console.warn('Google Maps indisponible, repli sur la BAN :', err.message);
          return Providers.ban.search(query);
        }
        throw err;
      });
    },

    /** Récupère les coordonnées de la suggestion choisie. */
    resolve: function (item) {
      return (item.provider || this.provider()).resolve(item);
    },

    /** Verdict de zone pour une adresse résolue. */
    verdict: function (place) {
      var d = distanceKm(CONFIG.center, { lat: place.lat, lon: place.lon });
      return {
        distanceKm: d,
        rounded: Math.round(d * 10) / 10,
        inZone: d <= CONFIG.radiusKm,
        precise: !!place.precise
      };
    }
  };

  /* ======================================================================
     4 bis. Carte Google de la zone de livraison
     ====================================================================== */

  /* Style sombre, aligné sur la charte (noir / or). */
  var MAP_STYLE = [
    { elementType: 'geometry', stylers: [{ color: '#17110B' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#9A886F' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#0B0806' }] },
    { featureType: 'poi', stylers: [{ visibility: 'off' }] },
    { featureType: 'transit', stylers: [{ visibility: 'off' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#241A11' }] },
    { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#3A2A18' }] },
    { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#8A7B63' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0B0F14' }] },
    { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: '#1A130D' }] },
    { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#3A2A18' }] },
    { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#C6B49C' }] }
  ];

  var Map = {
    map: null, zone: null, pin: null,

    /** Affiche la carte si une clé Google est disponible, sinon garde le schéma CSS. */
    init: function () {
      var host = $('#zoneMap');
      if (!host || !CONFIG.showMap || !GoogleMaps.available()) return;
      var self = this;

      GoogleMaps.load().then(function (g) {
        var center = { lat: CONFIG.center.lat, lng: CONFIG.center.lon };

        host.hidden = false;
        var radar = $('#zoneRadar');
        if (radar) radar.hidden = true;

        self.map = new g.maps.Map(host, {
          center: center,
          zoom: CONFIG.mapZoom,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: 'cooperative',
          backgroundColor: '#0B0806',
          styles: MAP_STYLE
        });

        /* Le rayon de livraison */
        self.zone = new g.maps.Circle({
          map: self.map, center: center, radius: CONFIG.radiusKm * 1000,
          strokeColor: '#E0A94F', strokeOpacity: .95, strokeWeight: 2,
          fillColor: '#E0A94F', fillOpacity: .12, clickable: false
        });

        /* Le point « Épinal » */
        new g.maps.Circle({
          map: self.map, center: center, radius: 260,
          strokeColor: '#FFFFFF', strokeWeight: 2,
          fillColor: '#E0A94F', fillOpacity: 1, clickable: false
        });

        if (self.zone.getBounds()) self.map.fitBounds(self.zone.getBounds());
      }).catch(function (err) {
        if (window.console) console.warn('Carte non affichée :', err.message);
      });
    },

    /** Place l'adresse du client sur la carte (vert dans la zone, rouge hors zone). */
    showAddress: function (place, inZone) {
      if (!this.map || !window.google) return;
      var g = window.google;
      var pos = { lat: place.lat, lng: place.lon };

      if (this.pin) this.pin.setMap(null);
      this.pin = new g.maps.Circle({
        map: this.map, center: pos, radius: 200,
        strokeColor: '#FFFFFF', strokeWeight: 2,
        fillColor: inZone ? '#57C97E' : '#F0655C', fillOpacity: 1, clickable: false
      });

      /* On cadre sur la zone + l'adresse : hors zone, le client voit
         d'un coup d'œil à quelle distance il se trouve. */
      var bounds = this.zone && this.zone.getBounds()
        ? new g.maps.LatLngBounds(this.zone.getBounds().getSouthWest(), this.zone.getBounds().getNorthEast())
        : new g.maps.LatLngBounds();
      bounds.extend(pos);
      this.map.fitBounds(bounds, 24);
    }
  };

  /* ======================================================================
     5. Champ d'adresse avec autocomplétion
     ====================================================================== */
  /**
   * @param handlers {clear, pending, done, error}
   *   clear()        l'utilisateur retape / efface
   *   pending()      suggestion choisie, coordonnées en cours de récupération
   *   done(place)    adresse résolue { label, lat, lon, precise }
   *   error()        impossible de récupérer les coordonnées
   */
  function AddressField(input, list, handlers) {
    this.input = input;
    this.list = list;
    this.on = handlers;
    this.items = [];
    this.active = -1;
    this.picked = null;
    this.bind();
  }

  AddressField.prototype.bind = function () {
    var self = this;

    var run = debounce(function () {
      var q = self.input.value.trim();
      if (q.length < 3) { self.close(); return; }
      self.render([{ loading: true }]);
      Geo.search(q).then(function (results) {
        if (self.input.value.trim() !== q) return;   // réponse obsolète
        self.items = results;
        self.render(results);
      }).catch(function () {
        self.items = [];
        self.render([{ error: true }]);
      });
    }, 280);

    this.input.addEventListener('input', function () {
      if (self.picked) { self.picked = null; self.on.clear(); }
      run();
    });

    this.input.addEventListener('keydown', function (e) {
      if (self.list.hidden) return;
      var max = self.items.length - 1;
      if (e.key === 'ArrowDown')      { e.preventDefault(); self.move(Math.min(self.active + 1, max)); }
      else if (e.key === 'ArrowUp')   { e.preventDefault(); self.move(Math.max(self.active - 1, 0)); }
      else if (e.key === 'Enter' && self.active > -1) { e.preventDefault(); self.pick(self.items[self.active]); }
      else if (e.key === 'Escape')    { self.close(); }
    });

    document.addEventListener('click', function (e) {
      if (!self.list.contains(e.target) && e.target !== self.input) self.close();
    });
  };

  AddressField.prototype.render = function (rows) {
    var self = this;
    this.list.innerHTML = '';
    this.active = -1;

    if (!rows.length) {
      this.list.innerHTML = '<li class="is-empty">Aucune adresse trouvée. Vérifie l\'orthographe ou ajoute le code postal.</li>';
    } else if (rows[0] && rows[0].loading) {
      this.list.innerHTML = '<li class="is-empty">Recherche en cours…</li>';
    } else if (rows[0] && rows[0].error) {
      this.list.innerHTML = '<li class="is-empty">Vérification indisponible pour le moment. Réessaie dans un instant ou contacte-nous sur Snapchat.</li>';
    } else {
      rows.forEach(function (r, i) {
        var li = document.createElement('li');
        li.setAttribute('role', 'option');
        li.id = self.list.id + '-opt-' + i;
        li.innerHTML = '<span>' + escapeHtml(r.primary) + '</span>' +
                       '<small>' + escapeHtml(r.secondary) + '</small>';
        li.addEventListener('click', function () { self.pick(r); });
        self.list.appendChild(li);
      });
    }
    this.list.hidden = false;
    this.input.setAttribute('aria-expanded', 'true');
  };

  AddressField.prototype.move = function (idx) {
    var opts = $$('li', this.list);
    opts.forEach(function (o) { o.removeAttribute('aria-selected'); });
    this.active = idx;
    if (opts[idx]) {
      opts[idx].setAttribute('aria-selected', 'true');
      opts[idx].scrollIntoView({ block: 'nearest' });
      this.input.setAttribute('aria-activedescendant', opts[idx].id);
    }
  };

  /** Choix d'une suggestion : on résout les coordonnées puis on rend le verdict. */
  AddressField.prototype.pick = function (item) {
    if (!item) return;
    var self = this;
    this.picked = item;
    this.input.value = item.label;
    this.close();
    this.on.pending();

    Geo.resolve(item).then(function (place) {
      if (self.picked !== item) return;          // le client a retapé entre-temps
      self.input.value = place.label;
      self.resolved = place;
      self.on.done(place);
    }).catch(function () {
      if (self.picked !== item) return;
      self.picked = null;
      self.on.error();
    });
  };

  /** Réinjecte une adresse déjà résolue (depuis le vérificateur de zone). */
  AddressField.prototype.setResolved = function (place) {
    this.picked = place;
    this.resolved = place;
    this.input.value = place.label;
    this.close();
    this.on.done(place);
  };

  AddressField.prototype.close = function () {
    this.list.hidden = true;
    this.list.innerHTML = '';
    this.active = -1;
    this.input.setAttribute('aria-expanded', 'false');
    this.input.removeAttribute('aria-activedescendant');
  };

  /* ======================================================================
     6. État de la réservation
     ====================================================================== */
  var order = {
    qty: 1,
    boxes: [newBox()],
    name: '', phone: '',
    address: null,           // objet Geo résolu
    building: '', floor: '', intercom: '', notes: '',
    night: null, slot: null
  };

  function newBox() {
    return {
      flavour: CONFIG.flavours[0].id,
      topping: CONFIG.toppings[0].id,
      drink: CONFIG.drinks[0].id
    };
  }

  function labelOf(collection, id) {
    for (var i = 0; i < collection.length; i++) if (collection[i].id === id) return collection[i].label;
    return id;
  }

  function total() { return order.qty * CONFIG.boxPrice; }

  /* ======================================================================
     7. Interface — header, navigation, animations
     ====================================================================== */
  function initChrome() {
    var y = $('#year');
    if (y) y.textContent = new Date().getFullYear();

    var snap = $('#footSnap');
    if (snap) snap.href = 'https://www.snapchat.com/add/' + CONFIG.snapchat;

    var maxQty = $('#maxQty');
    if (maxQty) maxQty.textContent = CONFIG.maxBoxes;

    /* Menu mobile */
    var burger = $('#burger'), nav = $('#nav');
    if (burger && nav) {
      burger.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        burger.setAttribute('aria-expanded', String(open));
        burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      });
      $$('a', nav).forEach(function (a) {
        a.addEventListener('click', function () {
          nav.classList.remove('is-open');
          burger.setAttribute('aria-expanded', 'false');
        });
      });
    }

    /* Pastille d'état ouvert/fermé */
    function refreshStatus() {
      var pill = $('#statusPill');
      if (!pill) return;
      var open = Service.isOpenNow();
      pill.classList.toggle('is-open', open);
      pill.classList.toggle('is-closed', !open);
      $('.status-text', pill).textContent = Service.statusText();
      $('.status-short', pill).textContent = open ? 'Ouvert' : 'Fermé';
    }
    refreshStatus();
    setInterval(refreshStatus, 60000);

    /* Apparition au défilement */
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      $$('.reveal').forEach(function (el) { io.observe(el); });
    } else {
      $$('.reveal').forEach(function (el) { el.classList.add('is-in'); });
    }
  }

  /* ======================================================================
     8. Section « zone » — liste des communes + vérificateur d'adresse
     ====================================================================== */
  function initZone() {
    var list = $('#communeList');
    if (list) {
      CONFIG.communes
        .map(function (c) { return { c: c, d: distanceKm(CONFIG.center, c) }; })
        .filter(function (x) { return x.d <= CONFIG.radiusKm; })
        .sort(function (a, b) { return a.d - b.d; })
        .forEach(function (x) {
          var li = document.createElement('li');
          li.textContent = x.c.name + (x.d >= 0.5 ? ' · ' + x.d.toFixed(1) + ' km' : '');
          if (x.d < 0.5) li.classList.add('is-city');
          list.appendChild(li);
        });
    }

    var input = $('#zoneAddr'), sug = $('#zoneAddrList'),
        out = $('#zoneResult'), go = $('#zoneGo');
    if (!input) return;

    var checked = null;   // dernière adresse validée dans le vérificateur
    go.addEventListener('click', function () {
      if (checked && window.__mainAddressField) window.__mainAddressField.setResolved(checked);
    });

    function reset() {
      checked = null;
      out.textContent = '';
      out.className = 'checker-result';
      go.hidden = true;
    }

    new AddressField(input, sug, {
      clear: reset,
      pending: function () {
        checked = null;
        go.hidden = true;
        out.className = 'checker-result pending';
        out.textContent = 'Vérification de l\'adresse…';
      },
      error: function () {
        reset();
        out.className = 'checker-result ko';
        out.textContent = 'Vérification impossible pour le moment. Réessaie ou contacte-nous sur Snapchat.';
      },
      done: function (place) {
        var v = Geo.verdict(place);
        Map.showAddress(place, v.inZone);
        if (v.inZone) {
          checked = place;
          out.className = 'checker-result ok';
          out.textContent = '✓ Tu es dans la zone — environ ' + v.rounded.toFixed(1) +
                            ' km du centre d\'Épinal. On te livre !';
          go.hidden = false;
        } else {
          checked = null;
          out.className = 'checker-result ko';
          out.textContent = '✕ Hors zone — environ ' + v.rounded.toFixed(1) + ' km du centre d\'Épinal (limite : ' +
                            CONFIG.radiusKm + ' km). On ne peut pas livrer cette adresse.';
          go.hidden = true;
        }
      }
    });
  }

  /* ======================================================================
     9. Étape 1 — composition des box
     ====================================================================== */
  function optionRow(groupName, boxIndex, legend, options, selected) {
    var html = '<div class="opt-group"><span class="opt-legend">' + escapeHtml(legend) + '</span><div class="opt-list" role="radiogroup" aria-label="' + escapeHtml(legend) + ' — box ' + (boxIndex + 1) + '">';
    options.forEach(function (o) {
      var id = groupName + '-' + boxIndex + '-' + o.id;
      html += '<label class="opt">' +
                '<input type="radio" name="' + groupName + '-' + boxIndex + '" id="' + id + '" value="' + o.id + '"' +
                  (o.id === selected ? ' checked' : '') + ' data-box="' + boxIndex + '" data-group="' + groupName + '">' +
                '<span style="--dot:' + o.dot + '">' + escapeHtml(o.label) + '</span>' +
              '</label>';
    });
    return html + '</div></div>';
  }

  function renderBoxes() {
    var host = $('#boxesConfig');
    if (!host) return;
    host.innerHTML = '';

    order.boxes.forEach(function (box, i) {
      var el = document.createElement('div');
      el.className = 'box-config';
      el.innerHTML =
        '<div class="box-config-head">' +
          '<span class="box-config-badge">' + (i + 1) + '</span>' +
          '<h4 class="box-config-title">Box ' + (i + 1) + '</h4>' +
          (i > 0
            ? '<button type="button" class="copy-first" data-copy="' + i + '">Comme la box 1</button>'
            : '<span class="box-config-price">' + euro(CONFIG.boxPrice) + '</span>') +
        '</div>' +
        optionRow('flavour', i, 'Parfum des 10 mini pancakes', CONFIG.flavours, box.flavour) +
        optionRow('topping', i, 'Coulis', CONFIG.toppings, box.topping) +
        optionRow('drink',   i, 'Boisson', CONFIG.drinks,  box.drink) +
        '<p class="field-hint">Inclus dans chaque box : 1 cookie maison Kinder Maxi + 1 tiramisu Kinder Bueno White.</p>';
      host.appendChild(el);
    });

    $$('input[type="radio"][data-group]', host).forEach(function (r) {
      r.addEventListener('change', function () {
        order.boxes[+r.dataset.box][r.dataset.group] = r.value;
        renderSummary();
      });
    });

    $$('[data-copy]', host).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var i = +btn.dataset.copy;
        order.boxes[i] = {
          flavour: order.boxes[0].flavour,
          topping: order.boxes[0].topping,
          drink: order.boxes[0].drink
        };
        renderBoxes();
        renderSummary();
      });
    });
  }

  function syncQuantity() {
    var minus = $('#qtyMinus'), plus = $('#qtyPlus'), val = $('#qtyVal');
    if (!minus) return;
    val.textContent = order.qty;
    minus.disabled = order.qty <= 1;
    plus.disabled = order.qty >= CONFIG.maxBoxes;
    while (order.boxes.length < order.qty) order.boxes.push(newBox());
    order.boxes.length = order.qty;
    renderBoxes();
    renderSummary();
  }

  function initQuantity() {
    var minus = $('#qtyMinus'), plus = $('#qtyPlus');
    if (!minus) return;
    minus.addEventListener('click', function () { if (order.qty > 1) { order.qty--; syncQuantity(); } });
    plus.addEventListener('click', function () { if (order.qty < CONFIG.maxBoxes) { order.qty++; syncQuantity(); } });
    syncQuantity();
  }

  /* ======================================================================
     10. Étape 2 — coordonnées + adresse
     ====================================================================== */
  function setError(id, message) {
    var field = document.querySelector('[data-error-for="' + id + '"]');
    if (field) field.textContent = message || '';
    var input = document.getElementById(id);
    if (input) input.classList.toggle('is-invalid', !!message);
  }

  function validPhone(v) {
    var digits = v.replace(/[^\d+]/g, '');
    return /^(?:\+33|0)[1-9]\d{8}$/.test(digits);
  }

  function initContact() {
    var name = $('#fName'), phone = $('#fPhone'), notes = $('#fNotes'), count = $('#notesCount');
    if (!name || !phone || !notes) return;

    name.addEventListener('input', function () { order.name = name.value.trim(); setError('fName', ''); renderSummary(); });
    phone.addEventListener('input', function () { order.phone = phone.value.trim(); setError('fPhone', ''); renderSummary(); });

    ['fBuilding', 'fFloor', 'fIntercom'].forEach(function (id) {
      var el = document.getElementById(id);
      el.addEventListener('input', function () {
        order[id.replace('f', '').toLowerCase()] = el.value.trim();
        renderSummary();
      });
    });

    notes.addEventListener('input', function () {
      order.notes = notes.value.trim();
      count.textContent = notes.value.length;
    });

    var verdictBox = $('#addrVerdict');

    window.__mainAddressField = new AddressField($('#fAddr'), $('#fAddrList'), {
      clear: function () {
        order.address = null;
        verdictBox.hidden = true;
        renderSummary();
      },

      pending: function () {
        order.address = null;
        verdictBox.hidden = false;
        verdictBox.className = 'zone-verdict pending';
        verdictBox.innerHTML = '<span aria-hidden="true">⏳</span><span><strong>Vérification de l\'adresse…</strong></span>';
        renderSummary();
      },

      error: function () {
        order.address = null;
        verdictBox.hidden = false;
        verdictBox.className = 'zone-verdict ko';
        verdictBox.innerHTML = '<span aria-hidden="true">✕</span><span><strong>Vérification impossible</strong>' +
          '<span class="zv-sub">Réessaie dans un instant, ou envoie-nous ton adresse sur Snapchat.</span></span>';
        renderSummary();
      },

      done: function (place) {
        var v = Geo.verdict(place);
        verdictBox.hidden = false;
        verdictBox.className = 'zone-verdict ' + (v.inZone ? 'ok' : 'ko');
        Map.showAddress(place, v.inZone);

        if (v.inZone) {
          order.address = { place: place, distanceKm: v.distanceKm };
          setError('fAddr', '');
          verdictBox.innerHTML = '<span aria-hidden="true">✓</span><span><strong>Adresse dans la zone de livraison</strong>' +
            '<span class="zv-sub">' + escapeHtml(place.label) + ' — à environ ' + v.rounded.toFixed(1) +
            ' km du centre d\'Épinal.' + (v.precise ? '' : ' Pense à préciser le numéro de rue dans les précisions.') + '</span></span>';
        } else {
          order.address = null;
          verdictBox.innerHTML = '<span aria-hidden="true">✕</span><span><strong>Hors zone de livraison</strong>' +
            '<span class="zv-sub">' + escapeHtml(place.label) + ' est à environ ' + v.rounded.toFixed(1) +
            ' km du centre d\'Épinal. On livre uniquement dans un rayon de ' + CONFIG.radiusKm + ' km.</span></span>';
        }
        renderSummary();
      }
    });
  }

  /* ======================================================================
     11. Étape 3 — nuit + créneau
     ====================================================================== */
  function renderNights() {
    var host = $('#nightPicker');
    if (!host) return;
    host.innerHTML = '';

    var nights = Service.nights();
    if (!nights.length) {
      host.innerHTML = '<p class="slots-empty">Aucune nuit disponible à la réservation pour le moment. ' +
                       'Contacte-nous sur Snapchat.</p>';
      return;
    }
    if (!order.night || nights.indexOf(order.night) === -1) order.night = nights[0];

    var tonight = Service.currentNightISO();
    nights.forEach(function (iso) {
      var p = iso.split('-');
      var label = document.createElement('label');
      label.className = 'night';
      label.innerHTML =
        '<input type="radio" name="night" value="' + iso + '"' + (iso === order.night ? ' checked' : '') + '>' +
        '<span><span class="night-day">' + DAYS[isoWeekday(iso)].slice(0, 3) + (iso === tonight ? ' · ce soir' : '') + '</span>' +
        '<span class="night-date">' + (+p[2]) + ' ' + MONTHS[+p[1] - 1].slice(0, 4) + '.</span></span>';
      host.appendChild(label);
    });

    $$('input[name="night"]', host).forEach(function (r) {
      r.addEventListener('change', function () {
        order.night = r.value;
        order.slot = null;
        renderSlots();
        renderSummary();
      });
    });

    renderSlots();
  }

  function renderSlots() {
    var host = $('#slotPicker');
    if (!host) return;
    host.innerHTML = '';
    if (!order.night) { host.innerHTML = '<p class="slots-empty">Choisis d\'abord une nuit.</p>'; return; }

    var slots = Service.slotsFor(order.night);
    var available = slots.filter(function (s) { return !s.past; });

    if (!available.length) {
      host.innerHTML = '<p class="slots-empty">Plus de créneau disponible pour cette nuit. Choisis la nuit suivante.</p>';
      return;
    }

    slots.forEach(function (s) {
      var label = document.createElement('label');
      label.className = 'slot';
      label.innerHTML =
        '<input type="radio" name="slot" value="' + s.value + '"' + (s.past ? ' disabled' : '') +
        (order.slot === s.value ? ' checked' : '') + '>' +
        '<span>' + s.label + (s.dayShift ? '<small>+1 jour</small>' : '<small>&nbsp;</small>') + '</span>';
      host.appendChild(label);
    });

    $$('input[name="slot"]', host).forEach(function (r) {
      r.addEventListener('change', function () {
        order.slot = r.value;
        setError('slot', '');
        renderSummary();
      });
    });
  }

  /* ======================================================================
     12. Récapitulatifs
     ====================================================================== */
  function boxLine(box) {
    return '10 mini pancakes ' + labelOf(CONFIG.flavours, box.flavour) +
           ' · ' + labelOf(CONFIG.toppings, box.topping) +
           ' · ' + labelOf(CONFIG.drinks, box.drink);
  }

  function slotText() {
    if (!order.night || !order.slot) return null;
    var shift = +order.slot.slice(0, 2) < CONFIG.closeHour ? 1 : 0;
    var day = shift ? addDaysISO(order.night, 1) : order.night;
    return prettyDate(day) + ' à ' + order.slot;
  }

  function renderSummary() {
    var body = $('#spBody');
    if (!body) return;

    var html = '';
    order.boxes.forEach(function (box, i) {
      html += '<div class="sp-box"><p class="sp-box-title">Box ' + (i + 1) + ' — ' + euro(CONFIG.boxPrice) + '</p><ul>' +
              '<li>10 mini pancakes ' + escapeHtml(labelOf(CONFIG.flavours, box.flavour)) + '</li>' +
              '<li>' + escapeHtml(labelOf(CONFIG.toppings, box.topping)) + '</li>' +
              '<li>1 cookie maison Kinder Maxi</li>' +
              '<li>1 tiramisu Kinder Bueno White</li>' +
              '<li>' + escapeHtml(labelOf(CONFIG.drinks, box.drink)) + '</li>' +
              '</ul></div>';
    });

    var meta = '';
    if (order.name)    meta += '<strong>' + escapeHtml(order.name) + (order.phone ? ' — ' + escapeHtml(order.phone) : '') + '</strong>';
    if (order.address) meta += '<strong>' + escapeHtml(order.address.place.label) + '</strong>';
    var st = slotText();
    if (st) meta += '<strong>' + escapeHtml(st) + '</strong>';
    if (meta) html += '<div class="sp-meta">' + meta + '</div>';

    body.innerHTML = html;
    $('#spTotal').textContent = euro(total());

    /* Récapitulatif de l'étape 3 */
    var recap = $('#recap');
    if (recap) {
      var lines = '';
      function line(k, v) { lines += '<div class="recap-line"><span>' + k + '</span><span>' + escapeHtml(v) + '</span></div>'; }
      line('Box', order.qty + ' × box PANCAK\'UP à ' + euro(CONFIG.boxPrice));
      order.boxes.forEach(function (b, i) { line('Box ' + (i + 1), boxLine(b)); });
      line('Nom', order.name || '—');
      line('Téléphone', order.phone || '—');
      line('Adresse', order.address ? order.address.place.label : '—');
      var extra = [order.building, order.floor, order.intercom].filter(Boolean).join(' · ');
      if (extra) line('Accès', extra);
      line('Créneau', st || '—');
      if (order.notes) line('Précisions', order.notes);
      recap.innerHTML = lines +
        '<div class="recap-total"><span>Total à régler à la livraison</span><strong>' + euro(total()) + '</strong></div>';
    }
  }

  /** Récapitulatif texte, pour le presse-papier / Snapchat / SMS. */
  function orderText(ref) {
    var L = [];
    L.push('RÉSERVATION ' + CONFIG.brand + ' — ' + ref);
    L.push('');
    L.push('Client : ' + order.name);
    L.push('Téléphone : ' + order.phone);
    L.push('Adresse : ' + order.address.place.label);
    var extra = [order.building, order.floor, order.intercom].filter(Boolean).join(' · ');
    if (extra) L.push('Accès : ' + extra);
    L.push('Distance : ~' + order.address.distanceKm.toFixed(1) + ' km du centre d\'Épinal');
    L.push('Créneau : ' + slotText());
    L.push('');
    L.push('Commande : ' + order.qty + ' box × ' + euro(CONFIG.boxPrice));
    order.boxes.forEach(function (b, i) {
      L.push('  Box ' + (i + 1) + ' : ' + boxLine(b));
      L.push('           + 1 cookie maison Kinder Maxi + 1 tiramisu Kinder Bueno White');
    });
    if (order.notes) { L.push(''); L.push('Précisions : ' + order.notes); }
    L.push('');
    L.push('TOTAL : ' + euro(total()) + ' (à régler à la livraison)');
    return L.join('\n');
  }

  /* ======================================================================
     13. Navigation entre les étapes + validation
     ====================================================================== */
  function goToStep(n) {
    $$('.step').forEach(function (s) {
      var isTarget = +s.dataset.step === n;
      s.hidden = !isTarget;
      s.classList.toggle('is-active', isTarget);
    });
    $$('.pg').forEach(function (p) {
      var step = +p.dataset.step;
      p.classList.toggle('is-current', step === n);
      p.classList.toggle('is-done', step < n);
    });
    var panel = $('#summaryPanel');
    if (panel) panel.hidden = n === 4;

    var top = $('#booking');
    if (top) {
      var y = top.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  function validateStep(n) {
    var ok = true;

    if (n === 2) {
      if (!order.name || order.name.length < 2) { setError('fName', 'Indique ton prénom et ton nom.'); ok = false; }
      if (!order.phone) { setError('fPhone', 'Un numéro est nécessaire pour la livraison.'); ok = false; }
      else if (!validPhone(order.phone)) { setError('fPhone', 'Numéro invalide. Format attendu : 06 12 34 56 78.'); ok = false; }

      if (!order.address) {
        var typed = $('#fAddr').value.trim();
        setError('fAddr', typed
          ? 'Choisis ton adresse dans la liste de suggestions — elle doit être dans la zone des ' + CONFIG.radiusKm + ' km.'
          : 'Ton adresse exacte est obligatoire.');
        ok = false;
      }
    }

    if (n === 3) {
      if (!order.night) { setError('night', 'Choisis une nuit de livraison.'); ok = false; }
      if (!order.slot)  { setError('slot',  'Choisis un créneau entre 22h et 3h.'); ok = false; }
      if (!$('#fConsent').checked) { setError('fConsent', 'Merci de cocher cette case pour valider.'); ok = false; }
    }

    if (!ok) {
      var firstErr = $$('.field-error').filter(function (e) { return e.textContent; })[0];
      if (firstErr) firstErr.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
    return ok;
  }

  function makeRef() {
    var p = parisParts();
    var rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
    return 'PU-' + String(p.y).slice(2) + pad(p.m) + pad(p.d) + '-' + rnd;
  }

  function saveLocally(record) {
    try {
      var all = JSON.parse(localStorage.getItem(CONFIG.storageKey) || '[]');
      all.unshift(record);
      localStorage.setItem(CONFIG.storageKey, JSON.stringify(all.slice(0, 20)));
    } catch (e) { /* stockage indisponible : sans conséquence */ }
  }

  function renderMyOrders() {
    var box = $('#myOrders'), list = $('#moList');
    if (!box) return;
    var all = [];
    try { all = JSON.parse(localStorage.getItem(CONFIG.storageKey) || '[]'); } catch (e) { all = []; }
    if (!all.length) { box.hidden = true; return; }

    list.innerHTML = '';
    all.slice(0, 5).forEach(function (o) {
      var li = document.createElement('li');
      li.innerHTML = '<span class="mo-ref">' + escapeHtml(o.ref) + '</span>' +
                     '<span>' + escapeHtml(o.slotText || '') + '</span>' +
                     '<span>' + o.qty + ' box · ' + euro(o.total) + '</span>' +
                     '<span>' + escapeHtml((o.address || '').slice(0, 46)) + '</span>';
      list.appendChild(li);
    });
    box.hidden = false;
  }

  function submitOrder() {
    var ref = makeRef();
    var text = orderText(ref);

    var record = {
      ref: ref,
      createdAt: new Date().toISOString(),
      qty: order.qty,
      total: total(),
      boxes: order.boxes.map(function (b) {
        return {
          pancakes: labelOf(CONFIG.flavours, b.flavour),
          coulis: labelOf(CONFIG.toppings, b.topping),
          boisson: labelOf(CONFIG.drinks, b.drink),
          inclus: ['1 cookie maison Kinder Maxi', '1 tiramisu Kinder Bueno White']
        };
      }),
      name: order.name,
      phone: order.phone,
      address: order.address.place.label,
      lat: order.address.place.lat,
      lon: order.address.place.lon,
      distanceKm: +order.address.distanceKm.toFixed(2),
      building: order.building, floor: order.floor, intercom: order.intercom,
      notes: order.notes,
      night: order.night,
      slot: order.slot,
      slotText: slotText(),
      summary: text
    };

    saveLocally(record);

    /* Envoi automatique si un endpoint est configuré. */
    var sent = Promise.resolve(false);
    if (CONFIG.orderEndpoint) {
      sent = fetch(CONFIG.orderEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(record)
      }).then(function (r) { return r.ok; }).catch(function () { return false; });
    }

    /* Écran de confirmation */
    $('#doneRef').textContent = ref;
    $('#doneSummary').textContent = text;

    var snapBtn = $('#snapBtn');
    snapBtn.href = 'https://www.snapchat.com/add/' + CONFIG.snapchat;

    var smsBtn = $('#smsBtn');
    if (CONFIG.phone) {
      smsBtn.hidden = false;
      smsBtn.href = 'sms:' + CONFIG.phone + '?&body=' + encodeURIComponent(text);
    }

    sent.then(function (ok) {
      $('#doneText').textContent = ok
        ? 'Ta réservation nous a bien été transmise. On te confirme le créneau par téléphone ou sur Snapchat. Garde ta référence sous la main.'
        : 'Ta réservation est enregistrée. Pour la finaliser, envoie-nous le récapitulatif ci-dessous sur Snapchat (' +
          CONFIG.brand + ') — on te confirme le créneau en retour.';
    });

    goToStep(4);
    renderMyOrders();
  }

  function initSteps() {
    var form = $('#bookingForm');
    if (!form) return;

    $$('[data-next]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var current = +btn.closest('.step').dataset.step;
        if (!validateStep(current)) return;
        if (current === 2) renderNights();
        goToStep(+btn.dataset.next);
      });
    });

    $$('[data-prev]').forEach(function (btn) {
      btn.addEventListener('click', function () { goToStep(+btn.dataset.prev); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateStep(3)) return;
      if (!order.address) { goToStep(2); validateStep(2); return; }
      submitOrder();
    });

    $('#fConsent').addEventListener('change', function () { setError('fConsent', ''); });

    /* Copier le récapitulatif */
    $('#copyBtn').addEventListener('click', function () {
      var text = $('#doneSummary').textContent;
      var done = function () { $('#copyFeedback').textContent = 'Récapitulatif copié ✓ — colle-le dans Snapchat.'; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(fallback);
      } else { fallback(); }

      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); }
        catch (err) { $('#copyFeedback').textContent = 'Copie impossible — sélectionne le texte à la main.'; }
        document.body.removeChild(ta);
      }
    });

    /* Nouvelle réservation */
    $('#newBtn').addEventListener('click', function () {
      order.qty = 1;
      order.boxes = [newBox()];
      order.address = null;
      order.slot = null;
      order.notes = '';
      order.building = order.floor = order.intercom = '';
      order.name = order.phone = '';
      form.reset();
      if (window.__mainAddressField) window.__mainAddressField.picked = null;
      $('#addrVerdict').hidden = true;
      $('#copyFeedback').textContent = '';
      $('#notesCount').textContent = '0';
      $$('.field-error').forEach(function (e) { e.textContent = ''; });
      $$('.input.is-invalid').forEach(function (e) { e.classList.remove('is-invalid'); });
      syncQuantity();
      renderNights();
      renderSummary();
      goToStep(1);
    });
  }

  /* ======================================================================
     14. Démarrage
     ====================================================================== */
  function init() {
    initChrome();
    initZone();
    Map.init();
    initQuantity();
    initContact();
    initSteps();
    renderNights();
    renderSummary();
    renderMyOrders();
  }

  /* Exposé pour le réglage / le débogage depuis la console du navigateur. */
  window.PANCAKUP = {
    CONFIG: CONFIG, Service: Service, Geo: Geo, Map: Map,
    Providers: Providers, GoogleMaps: GoogleMaps, distanceKm: distanceKm
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
