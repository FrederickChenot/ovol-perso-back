SELECT * FROM hiking
JOIN img_hiking ON img_hiking."idHiking" = hiking."id"
WHERE hiking."id" = 1

-- cette requete fonctionne
SELECT * FROM "hiking"
JOIN "img_hiking" ON img_hiking."idHiking" = "hiking"."id"
JOIN "lift-off" ON "hiking"."lift-off_id" = "lift-off"."id"
JOIN "img_lift-off" ON "lift-off"."id" = "img_lift-off"."idLiftOff"
JOIN "lift-off_has_landing" ON "lift-off_has_landing"."lift-off_id" = "lift-off"."id"
JOIN "landing" ON "lift-off_has_landing"."landing_id" = "landing"."id"
WHERE hiking."id" = 1



SELECT DISTINCT *,array_agg("landing") AS landings FROM "lift-off"
JOIN "lift-off_has_landing" ON "lift-off_has_landing"."lift-off_id" = "lift-off"."id"
JOIN "landing" ON "lift-off_has_landing"."landing_id" = "landing"."id"
group by "lift-off"."id","lift-off_has_landing"."id","landing"."id"

SELECT * FROM "hiking"
JOIN "img_hiking" ON img_hiking."idHiking" = "hiking"."id"
JOIN "lift-off" ON "hiking"."lift-off_id" = "lift-off"."id"
JOIN "img_lift-off" ON "lift-off"."id" = "img_lift-off"."idLiftOff"
WHERE hiking."id" = 1

SELECT json_agg(row_to_json("landing")) FROM landing


--Avoir les rando plus un tableau de photo join
SELECT "hiking"."id", "hiking"."name", array_agg(row_to_json("img_hiking")) AS photo_hiking FROM "hiking"
JOIN "img_hiking"
	ON "img_hiking"."idHiking" = "hiking"."id"
WHERE hiking."id" = 1
GROUP BY "hiking"."id", "hiking"."name"
