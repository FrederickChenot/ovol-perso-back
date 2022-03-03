-- Deploy template-api:2-seeding to pg

BEGIN;


INSERT INTO "user"("login","role","email","password") VALUES
('admin','admin','ovolclock@gmail.com','pass');

INSERT INTO "liftOff"("name","typeOfTerrain","description","danger","fflvLink","latitude","longitude","favorableWind","unfavorableWind","altitude")
VALUES
    ('Déco Semnoz',
    'Herbe',
    'Facile par vent d\''Ouest. Gestion FFP',
    null,
    'https://intranet.ffvl.fr/sites_pratique/voir/980',
    45.7981,
    6.1006,
    ARRAY ['O'],
    null,
    1616),

    ('Déco SEPTMONCEL',
    'Herbe',
    'Approche de l''atterrissage de l''Essard (contre-pente) en PT8 pour le delta. L''atterrissage du haut est délicat en parapente en pleine journée. Toujours vérifier que la biroute du décollage parapente est bien orientée pour éviter de décoller dans le rouleau en cas de vent Est ou Nord. Les parapentes décollent à 1050 m. Les deltas décollent à 1020 m.',
    'Ligne à haute tension au milieu du cirque.',
    'https://intranet.ffvl.fr/sites_pratique/voir/54',
    46.371,
    5.8985,
    ARRAY ['O'],
    null,
    1026),

    ('Déco Notre Dame D''Hermon',
    'Herbe',
    'Conditions idéales : Vent de Nord Ouest à Ouest.',
    null,
    'https://intranet.ffvl.fr/sites_pratique/voir/1192',
    46.3073,
    6.518,
    ARRAY ['N','NO'],
    ARRAY ['NE', 'E', 'SE', 'S', 'SO'],
    1290),

    ('Déco MONT-LACHAT',
    'Herbe',
    'Vue sur le Mont Blanc. Infos en direct sur http://twitter.com/AravisParapente',
    null,
    'https://intranet.ffvl.fr/sites_pratique/voir/118',
    45.9587,
    6.4765,
    ARRAY ['SO'],
    null,
    2020);


INSERT INTO "hiking"("name","img_card","mountain","resume","key_stage","starting_point","hiking_plan","positive_elevation","negative_elevation","overall_length","land_type","ign_card_reference","hight_point","low_point","difficulty","user_id","liftOff_id")
VALUES
    ('Semnoz Grotte des fours',
    'https://upload.wikimedia.org/wikipedia/commons/4/40/Annecy-Semnoz_%282013%29.JPG',
    'Bauges',
    'Montée soutenue en forêt avec en bonus des grottes à visiter. Attention falaise à surmonter au niveau de la grotte des four. Le sentier est balisé sur toute la longueur',
    'D/A : km 0 - alt. 595m - Cimetière de Viuz-la-Chiésaz
    1 : km 0.24 - alt. 594m - Croisement CD5/Route des Pierres
    2 : km 1.61 - alt. 738m - Les Granges
    3 : km 3.25 - alt. 1016m - Croisement de Combe Noire
    4 : km 4.22 - alt. 1326m - Croisement de la Grotte des Fours
    5 : km 5.47 - alt. 1640m - Parking près du bâtiment du Courant d''Ere
    6 : km 6.13 - alt. 1694m - Crêt de Châtillon - Le Semnoz',
    'https://goo.gl/maps/WQPNLEjkxyw5KAbv7',
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
    1),

    ('Septmoncel - Montbrillant',
    'https://upload.wikimedia.org/wikipedia/commons/c/c6/Septmoncel-Jura-Saut-du-chien.JPG',
    'Jura',
    'Au départ de Montbrillant, montée soutenue sur Septmoncel par le Chemin des Moines. Les chemins sont très praticables, pas de difficultés techniques.',
    'D : km 0 - alt. 556m - Parking de Montbrillant, après la fromagerie
    1 : km 0.5 - alt. 656m - Suite de la montée
    2 : km 2.82 - alt. 1023m - Les Curtillets. Carrefour de la boucle',
    'https://goo.gl/maps/QumnS33fvqxVPbfA6',
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
    2),

    ('La Chapelle d''Hermone à partir du Col du Feu',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Chapelle_des_Hermones.jpg/1920px-Chapelle_des_Hermones.jpg',
    'Chablais',
    'Cette courte randonnée, qui constitue une voie usuelle pour monter à la Chapelle d''Hermone, met à l''honneur le petit patrimoine religieux, très présent tout le long du parcours, et offre au sommet de superbes points de vue sur le Léman',
    'D/A : km 0 - alt. 1117m - Col du Feu
    1 : km 0.71 - alt. 1149m - Le Feu
    2 : km 1.04 - alt. 1188m - Virage en épingle
    3 : km 1.49 - alt. 1267m - Chemin de croix
    4 : km 1.85 - alt. 1306m - Chapelle d''Hermone - Vue sur le - Lac Léman
    D/A : km 3.69 - alt. 1117m - Col du Feu',
    'https://goo.gl/maps/L1dXdvQPq8CvwGGb9',
    '<iframe src="https://www.google.com/maps/d/u/1/embed?mid=1IZBjGPlFWG2KH6Xs7PYNaAtJVT9kc2zO&ehbc=2E312F" width="640" height="480"></iframe>',
    199,
    3,
    3.69,
    'Forestier',
    'Ref. 3428ET',
    1316,
    1117,
    'Extrêment Facile',
    1,
    3),

    ('MONT-LACHAT',
    'https://upload.wikimedia.org/wikipedia/commons/a/ab/Th%C3%B4nes_mont_lachat.jpg',
    'Bornes',
    'Au départ d''une auberge de montagne pleine de charme, voici une boucle qui vous offrira une vue somptueuse sur la chaîne des Aravis et une exposition plein Sud. Au col, vous aurez la vue sur la chaîne du Bargy et le Jalouvre. Le circuit peut se faire tant en été qu''en hiver avec des raquettes.',
    'D/A : km 0 - alt. 1348m - Parking du Croix
    1 : km 1.16 - alt. 1454m - Les Touillettes, croisement de la boucle
    2 : km 3.06 - alt. 1599m - La Grand-Montagne
    3 : km 4.24 - alt. 1680m - Embranchement de la descente
    4 : km 4.37 - alt. 1683m - Col du Châtillon - Mont Lachat de Châtillon',
    'https://goo.gl/maps/zY81oEAgeQ6CZRot6',
    '<iframe src="https://www.google.com/maps/d/u/4/embed?mid=1cYuZ9HBVGJAs3BTWQh6-zdU79EOkObIQ&ehbc=2E312F" width="640" height="480"></iframe>',
    335,
    158,
    4.58,
    'Caillouteux',
    'Ref. 3430ET, 3430ETR',
    1683,
    1346,
    'Extrêment Facile',
    1,
    4);


INSERT INTO "landing"("name","typeOfTerrain","description","danger","fflvLink","latitude","longitude","favorableWind","unfavorableWind","altitude")
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
    null,
    576),

    ('Atéro Les Grands Champs',
    'Herbe',
    'Grand champs allongé terrain facile',
    null,
    'https://intranet.ffvl.fr/sites_pratique/voir/1192',
    46.3192,
    6.4844,
    ARRAY ['N','NE','E','SE','SO','O','NO'],
    ARRAY ['S'],
    620),

    ('Atéro Le Grand Bornand',
    'Herbe',
    'Atterrissage très turbulent par vent de Nord (carrefour de vallées). Sinon prévisible.',
    null,
    'https://intranet.ffvl.fr/sites_pratique/voir/118',
    45.9407,
    6.43168,
    ARRAY ['O'],
    null,
    926);

INSERT INTO "liftOff_has_landing"("liftOff_id","landing_id")
VALUES
    (1,1),
    (2,2),
    (3,3);

INSERT INTO "img_hiking"("title", "url", "idHiking")
VALUES
    ('Photo Semnoz', 'https://live.staticflickr.com/65535/50932308243_a19f408059_b.jpg', 1),
    ('Photo Semnoz 2', 'https://cdn.pixabay.com/photo/2019/12/13/13/17/landscape-4692947_1280.jpg', 1),
    ('Photo Jura 1', 'https://upload.wikimedia.org/wikipedia/commons/4/4e/La_Petite_Montagne_vue_du_Molard_de_la_Justice%2C_Jura%2C_France.jpg', 2),
    ('Photo Jura 2', 'https://get.pxhere.com/photo/landscape-nature-rock-waterfall-mountain-valley-mountain-range-cliff-jungle-tourism-terrain-national-park-ridge-rocks-vegetation-poland-plateau-water-feature-ecosystem-jura-krakowsko-czestochowa-mountainous-landforms-608661.jpg', 2),
    ('Photo Vailly 1', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Town_hall_of_Vailly_02.jpg/1200px-Town_hall_of_Vailly_02.jpg?20200825173820', 3),
    ('Photo Vailly 2', 'https://upload.wikimedia.org/wikipedia/commons/4/41/Landscape_in_commune_of_of_Vailly.jpg', 3),
    ('Photo Vailly 3', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Vailly-sur-Aisne_%28Aisne%29_Cimeti%C3%A8re_brittannique_%28CWGC%29.JPG/1200px-Vailly-sur-Aisne_%28Aisne%29_Cimeti%C3%A8re_brittannique_%28CWGC%29.JPG?20120712174044', 3),
    ('Photo grand Bornand', 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Mont_Lachat_-_panoramio.jpg', 4);

INSERT INTO "img_landing"("title", "url", "idLanding")
VALUES
    ('Photo atero Semnoz', 'https://www.lofficiel.net/img/guide/2917-atterissage-bois-du-bouchet-karine-payot-fiche.jpg', 1),
    ('Photo atero Jura', 'https://c.pxhere.com/photos/f6/60/paratrooper_jump_double_baptism_landing-1104626.jpg!d', 2),
    ('Photo atero Jura2', 'https://c.pxhere.com/photos/f6/60/paratrooper_jump_double_baptism_landing-1104626.jpg!d', 2),
    ('Photo atero Vailly2', 'https://lh5.googleusercontent.com/p/AF1QipNPpNs4005pLpzwVf9k0R6HlQB-ngAWU5bCqGFr=w426-h240-k-no', 3),
    ('Photo atero Vailly', 'https://lh5.googleusercontent.com/p/AF1QipNPpNs4005pLpzwVf9k0R6HlQB-ngAWU5bCqGFr=w426-h240-k-no', 3),
    ('Photo atero grand Bornand', 'https://c.pxhere.com/photos/65/b3/skydiving_parachute_parachutist_sport_sunset_landing-1392169.jpg!d', 4);

INSERT INTO "img_liftOff"("title", "url", "idLiftOff")
VALUES
    ('Photo deco Semnoz', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Parapente_-_162.jpg/800px-Parapente_-_162.jpg?2015110313514', 1),
    ('Photo deco Jura', 'https://upload.wikimedia.org/wikipedia/commons/8/87/Parapente_-_146.jpg', 2),
    ('Photo deco Vailly', 'https://lh5.googleusercontent.com/p/AF1QipN5YstKeNw4w_V24PgOYCRZNr9-M9h-nSs8nh3A=w408-h306-k-no', 3),
    ('Photo deco Vailly2', 'https://lh5.googleusercontent.com/p/AF1QipN5YstKeNw4w_V24PgOYCRZNr9-M9h-nSs8nh3A=w408-h306-k-no', 3);

COMMIT;
