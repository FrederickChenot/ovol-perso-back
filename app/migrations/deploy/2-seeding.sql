-- Deploy template-api:2-seeding to pg

BEGIN;


INSERT INTO "user"("login","role","email","password") VALUES
('admin','admin','ovolclock@gmail.com','pass');

INSERT INTO "hiking"("name","img_card","mountain","resume","key_stage","starting_point","hiking_plan","positive_elevation","negative_elevation","overall_lenth","land_type","ign_card_reference","hight_point","low_point","difficulty","user_id","lift-off_id")
VALUES
    ('Semnoz Grotte des fours',
    'https://upload.wikimedia.org/wikipedia/commons/4/40/Annecy-Semnoz_%282013%29.JPG',
    'Bauges',
    'Montée soutenue en forêt avec en bonus des grottes à visiter. Attention falaise à surmonter au niveau de la grotte des four. Le sentier est balisé sur toute la longueur',
    "D/A : km 0 - alt. 595m - Cimetière de Viuz-la-Chiésaz
    1 : km 0.24 - alt. 594m - Croisement CD5/Route des Pierres
    2 : km 1.61 - alt. 738m - Les Granges
    3 : km 3.25 - alt. 1016m - Croisement de Combe Noire
    4 : km 4.22 - alt. 1326m - Croisement de la Grotte des Fours
    5 : km 5.47 - alt. 1640m - Parking près du bâtiment du Courant d'Ere
    6 : km 6.13 - alt. 1694m - Crêt de Châtillon - Le Semnoz'",
    'A coté du cimetière prendre le sentier tracer',
    '<iframe src="https://www.google.com/maps/d/u/2/embed?mid=1JZCA93VmwEXRcKn9GnlKawxOtpHfI20W&ehbc=2E312F" width="640" height="480"></iframe>',
    1028,
    2,
    6.9,
    'Forestier',
    'Ref. 3431OT 3431OTR',
    1694,
    587,
    'difficile',
    1,
    1)
    ('Septmoncel - Montbrillant',
    'https://upload.wikimedia.org/wikipedia/commons/c/c6/Septmoncel-Jura-Saut-du-chien.JPG',
    'Jura',
    'Au départ de Montbrillant, montée soutenue sur Septmoncel par le Chemin des Moines. Les chemins sont très praticables, pas de difficultés techniques.',
    "D : km 0 - alt. 556m - Parking de Montbrillant, après la fromagerie
    1 : km 0.5 - alt. 656m - Suite de la montée
    2 : km 2.82 - alt. 1023m - Les Curtillets. Carrefour de la boucle",
    '',
    '<iframe ‘src="https://www.google.com/maps/d/embed?mid=1xD4Ypl3aj1YlMS2tHSHkquLROQbSuKOM&ehbc=2E312F" width="640" height="480"></iframe>',
    746,
    5,
    3.41,
    'Forestier',
    'Ref. 3327ET, 3327OT, 3328OT',
    1125,
    543,
    'moyenne',
    1,
    2);

INSERT INTO "lift-off"("name","type-of-terrain","description","danger","fflv-link","latitude","longitude","favorable-wind","unfavorable-wind","altitude")
VALUES
    ('Déco Semnoz','Herbe','Facile par vent d\''Ouest. Gestion FFP',
    null,
    'https://intranet.ffvl.fr/sites_pratique/voir/980',
    45.7981,
    6.1006,
    ARRAY ['O'],
    ARRAY ['O'],
    1616),
    ('Déco SEPTMONCEL',
    'Herbe',
    "Approche de l'atterrissage de l'Essard (contre-pente) en PT8 pour le delta. L\'atterrissage du haut est délicat en parapente en pleine journée. Toujours vérifier que la biroute du décollage parapente est bien orientée pour éviter de décoller dans le rouleau en cas de vent Est ou Nord. Les parapentes décollent à 1050 m. Les deltas décollent à 1020 m.",
    "Ligne à haute tension au milieu du cirque.",
    'https://intranet.ffvl.fr/sites_pratique/voir/54',
    46.371,
    5.8985,
    ARRAY ['O'],
    null,
    1026);

INSERT INTO "landing"("name","type-of-terrain","description","danger","fflv-link","latitude","longitude","favorable-wind","unfavorable-wind","altitude")
VALUES
    ('Atéro Viuz-la-Chiésaz',
    'Herbe',
    'Grand champs allongé terrain facile',
    'Attention au gradient lorsque vent NO',
    'https://intranet.ffvl.fr/sites_pratique/voir/980',
    45.8106,
    6.05917,
    ARRAY ['O','E'],
    null,
    576),
    ('Atéro Villard',
    'Herbe',
    'Turbulent par vent fort, surtout de Nord.',
    null,
    'https://intranet.ffvl.fr/sites_pratique/voir/54',
    46.3723,
    5.87678,
    ARRAY ['O'],
    ARRAY ['O'],
    576);

INSERT INTO "lift-off_has_landing"("lift-off_id","landing_id")
VALUES
    (1,1),
    (2,2);

INSERT INTO "img_hiking"("title", "url", "idHiking")
VALUES
    ('Photo Semnoz', 'https://live.staticflickr.com/65535/50932308243_a19f408059_b.jpg', 1),
    ('Photo Semnoz 2', 'https://cdn.pixabay.com/photo/2019/12/13/13/17/landscape-4692947_1280.jpg', 1),
    ('Photo Jura 1', 'https://upload.wikimedia.org/wikipedia/commons/4/4e/La_Petite_Montagne_vue_du_Molard_de_la_Justice%2C_Jura%2C_France.jpg', 2),
    ('Photo Jura 2', 'https://get.pxhere.com/photo/landscape-nature-rock-waterfall-mountain-valley-mountain-range-cliff-jungle-tourism-terrain-national-park-ridge-rocks-vegetation-poland-plateau-water-feature-ecosystem-jura-krakowsko-czestochowa-mountainous-landforms-608661.jpg', 2);

INSERT INTO "img_landing"("title", "url", "idLanding")
VALUES
    ('Photo atero Semnoz', 'https://www.lofficiel.net/img/guide/2917-atterissage-bois-du-bouchet-karine-payot-fiche.jpg', 1),
    ('Photo atero Jura', 'https://c.pxhere.com/photos/f6/60/paratrooper_jump_double_baptism_landing-1104626.jpg!d', 2);

INSERT INTO "img_lift-off"("title", "url", "idLiftOff")
VALUES
    ('Photo deco Semnoz', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Parapente_-_162.jpg/800px-Parapente_-_162.jpg?2015110313514', 1);
    ('Photo deco Jura', 'https://upload.wikimedia.org/wikipedia/commons/8/87/Parapente_-_146.jpg', 2);

COMMIT;
