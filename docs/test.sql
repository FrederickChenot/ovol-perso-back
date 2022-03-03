SELECT * FROM hiking
JOIN img_hiking ON img_hiking."idHiking" = hiking."id"
WHERE hiking."id" = 1

-- cette requete fonctionne
SELECT * FROM "hiking"
JOIN "img_hiking" ON img_hiking."idHiking" = "hiking"."id"
JOIN "liftOff" ON "hiking"."liftOff_id" = "liftOff"."id"
JOIN "img_liftOff" ON "liftOff"."id" = "img_liftOff"."idLiftOff"
JOIN "liftOff_has_landing" ON "liftOff_has_landing"."liftOff_id" = "liftOff"."id"
JOIN "landing" ON "liftOff_has_landing"."landing_id" = "landing"."id"
WHERE hiking."id" = 1



SELECT DISTINCT *,array_agg("landing") AS landings FROM "liftOff"
JOIN "liftOff_has_landing" ON "liftOff_has_landing"."liftOff_id" = "liftOff"."id"
JOIN "landing" ON "liftOff_has_landing"."landing_id" = "landing"."id"
group by "liftOff"."id","liftOff_has_landing"."id","landing"."id"

SELECT * FROM "hiking"
JOIN "img_hiking" ON img_hiking."idHiking" = "hiking"."id"
JOIN "liftOff" ON "hiking"."liftOff_id" = "liftOff"."id"
JOIN "img_liftOff" ON "liftOff"."id" = "img_liftOff"."idLiftOff"
WHERE hiking."id" = 1

SELECT json_agg(row_to_json("landing")) FROM landing


--Avoir les rando plus un tableau de photo join
SELECT "hiking"."id", "hiking"."name", array_agg(row_to_json("img_hiking")) AS photo_hiking FROM "hiking"
JOIN "img_hiking"
	ON "img_hiking"."idHiking" = "hiking"."id"
WHERE hiking."id" = 1
GROUP BY "hiking"."id", "hiking"."name"
