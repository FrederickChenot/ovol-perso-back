-- Deploy template-api:2-seeding to pg

BEGIN;


INSERT INTO "user"("login","role","email","password") VALUES
('admin','admin','ovolclock@gmail.com','pass');

INSERT INTO "lift-off"("name","type-of-terrain","description","danger","fflv-link","latitude","longitude","favorable-wind","unfavorable-wind","altitude")
VALUES
    ('Déco Semnoz','Herbe','Facile par vent d\''Ouest. Gestion FFP',null,'https://intranet.ffvl.fr/sites_pratique/voir/980',45.7981,6.1006,'O','O',1616);

INSERT INTO "hiking"("name","img_card","mountain","resume","key_stage","starting_point","hiking_plan","positive_elevation","negative_elevation","overall_lenth","land_type","ign_card_reference","hight_point","low_point","difficulty","user_id","lift-off_id")
VALUES
    ('Semnoz Grotte des fours',
    'https://upload.wikimedia.org/wikipedia/commons/4/40/Annecy-Semnoz_%282013%29.JPG',
    'Bauges',
    'Montée soutenue en forêt avec en bonus des grottes à visiter. Attention falaise à surmonter au niveau de la grotte des four. Le sentier est balisé sur toute la longueur',
    '',
    '',
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
    1);

INSERT INTO "landing"("name","type-of-terrain","description","danger","fflv-link","latitude","longitude","favorable-wind","unfavorable-wind","altitude")
VALUES
    ('Atéro Viuz-la-Chiésaz','Herbe','Grand champs allongé terrain facile','Attention au gradient lorsque vent NO','https://intranet.ffvl.fr/sites_pratique/voir/980',45.8106,6.05917,'O','O',576);

INSERT INTO "lift-off_has_landing"("lift-off_id","landing_id")
VALUES
    (1,1);

INSERT INTO "img_hiking"("title", "url", "idHiking")
VALUES
    ('Photo Semnoz', 'url”: “https://live.staticflickr.com/65535/50932308243_a19f408059_b.jpg', 1);

INSERT INTO "img_landing"("title", "url", "idLanding")
VALUES
    ('Photo atero Semnoz', 'https://www.lofficiel.net/img/guide/2917-atterissage-bois-du-bouchet-karine-payot-fiche.jpg', 1);

INSERT INTO "img_lift-off"("title", "url", "idLiftOff")
VALUES
    ('Photo deco Semnoz', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Parapente_-_162.jpg/800px-Parapente_-_162.jpg?2015110313514', 1);

COMMIT;
