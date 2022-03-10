-- Deploy template-api:2-seeding to pg

BEGIN;

INSERT INTO "user"("login","role","email","password") VALUES
('admin','admin','ovolclock@gmail.com','pass');

INSERT INTO "liftOff"("name","typeOfTerrain","description","danger","fflvLink","latitude","longitude","favorableWind","unfavorableWind","balise","altitude")
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
    67,
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
      67,
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
      67,
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
      67,
    2020);


INSERT INTO "hiking"("name","img_card","mountain","resume","key_stage","starting_point","hiking_plan","positive_elevation","negative_elevation","overall_length","land_type","ign_card_reference","hight_point","low_point","difficulty","user_id","liftOff_id")
VALUES
    ('Semnoz Grotte des fours',
    'https://res.cloudinary.com/ovol/image/upload/q_50/v1646905878/img-seeding/Annecy-Semnoz__2013_hyn3lu.jpg',
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
    'https://res.cloudinary.com/ovol/image/upload/q_50/v1646906135/img-seeding/Septmoncel-Jura-Saut-du-chien_bpoztr.jpg',
    'Jura',
    'Au départ de Montbrillant, montée soutenue sur Septmoncel par le Chemin des Moines. Les chemins sont très praticables, pas de difficultés techniques.',
    'D : km 0 - alt. 556m - Parking de Montbrillant, après la fromagerie
    1 : km 0.5 - alt. 656m - Suite de la montée
    2 : km 2.82 - alt. 1023m - Les Curtillets. Carrefour de la boucle',
    'https://goo.gl/maps/QumnS33fvqxVPbfA6',
    '<iframe src="https://www.google.com/maps/d/embed?mid=1xD4Ypl3aj1YlMS2tHSHkquLROQbSuKOM&ehbc=2E312F" width="640" height="480"></iframe>',
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
    'https://res.cloudinary.com/ovol/image/upload/q_50/v1646906179/img-seeding/1920px-Chapelle_des_Hermones_s7pcr3.jpg',
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
    'https://res.cloudinary.com/ovol/image/upload/q_50/v1646906218/img-seeding/Tho%CC%82nes_mont_lachat_m4maym.jpg',
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
    926),

     ('Atéro Gruffy',
    'Herbe',
    'Attention des arbres et des vaches partout l''enfer.',
    null,
    'atéro non officiel',
    45.792968,
    6.058227,
    ARRAY ['O', 'OE'],
    null,
    580)    ;

INSERT INTO "liftOff_has_landing"("liftOff_id","landing_id")
VALUES
    (1,1),
    (2,2),
    (3,3),
    (4,4),
    (1,5);

INSERT INTO "img_hiking"("title", "url", "idHiking")
VALUES
    ('Photo Semnoz', 'https://res.cloudinary.com/ovol/image/upload/v1646906366/img-seeding/semnoz1_nhq40f.jpg', 1),
    ('Photo Semnoz 2', 'https://res.cloudinary.com/ovol/image/upload/v1646906470/img-seeding/semnoz2_clvdfp.webp', 1),
    ('Photo Jura 1', 'https://res.cloudinary.com/ovol/image/upload/q_50/v1646906551/img-seeding/La_Petite_Montagne_vue_du_Molard_de_la_Justice__Jura__France_jnp5i2.jpg', 2),
    ('Photo Jura 2', 'https://res.cloudinary.com/ovol/image/upload/v1646906608/img-seeding/landscape-nature-rock-waterfall-mountain-valley-mountain-range-cliff-jungle-tourism-terrain-national-park-ridge-rocks-vegetation-poland-plateau-water-feature-ecosystem-jura-krakowsko-czestochowa-mountainous-landforms-608661_izin4n.jpg', 2),
    ('Photo Vailly 1', 'https://res.cloudinary.com/ovol/image/upload/v1646906718/img-seeding/Town_hall_of_Vailly_02_zodqxx.jpg', 3),
    ('Photo Vailly 2', 'https://res.cloudinary.com/ovol/image/upload/v1646906970/img-seeding/Landscape_in_commune_of_of_Vailly_vi0mmg.jpg', 3),
    ('Photo Vailly 3', 'https://res.cloudinary.com/ovol/image/upload/v1646907090/img-seeding/Vailly-sur-Aisne_g0hjdo.jpg', 3),
    ('Photo grand Bornand', 'https://res.cloudinary.com/ovol/image/upload/q_50/v1646907339/img-seeding/Mont_Lachat_-_panoramio_idtjm8.jpg', 4);
 
INSERT INTO "img_landing"("title", "url", "idLanding")
VALUES
    ('Photo atero Semnoz', 'https://res.cloudinary.com/ovol/image/upload/v1646907429/img-seeding/bois-du-bouchet_hown3q.jpg', 1),
    ('Photo atero Jura', 'https://res.cloudinary.com/ovol/image/upload/v1646907429/img-seeding/bois-du-bouchet_hown3q.jpg', 2),
    ('Photo atero Jura2', 'https://res.cloudinary.com/ovol/image/upload/v1646907790/img-seeding/paratrooper_bzpj1c.jpg', 2),
    ('Photo atero Vailly2', 'https://res.cloudinary.com/ovol/image/upload/v1646907690/img-seeding/2021-06-13_nmeuya.jpg', 3),
    ('Photo atero Vailly', 'https://res.cloudinary.com/ovol/image/upload/v1646907790/img-seeding/paratrooper_bzpj1c.jpg', 3),
    ('Photo atero grand Bornand', 'https://res.cloudinary.com/ovol/image/upload/v1646907860/img-seeding/sport_lx2l5r.jpg', 4),
    ('Photo atero Guffy', 'https://res.cloudinary.com/ovol/image/upload/v1646907429/img-seeding/bois-du-bouchet_hown3q.jpg', 5);

INSERT INTO "img_liftOff"("title", "url", "idLiftOff")
VALUES
    ('Photo deco Semnoz', 'https://res.cloudinary.com/ovol/image/upload/v1646908077/img-seeding/Parapente_-_162_o9i5i1.jpg', 1),
    ('Photo deco Jura', 'https://res.cloudinary.com/ovol/image/upload/q_50/v1646908152/img-seeding/Parapent_qfbd6d.jpg', 2),
    ('Photo deco Vailly', 'https://res.cloudinary.com/ovol/image/upload/v1646908190/img-seeding/2020-08-02_w5j8uy.jpg', 3),
    ('Photo deco Vailly2', 'https://res.cloudinary.com/ovol/image/upload/v1646908190/img-seeding/2020-08-02_w5j8uy.jpg', 4);

COMMIT;
