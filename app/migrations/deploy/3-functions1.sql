-- Deploy ovol:3-functions1 to pg

BEGIN;

CREATE OR REPLACE FUNCTION getLanding(int) RETURNS TABLE (
	"id" int,
	"name" text,
	"typeOfTerrain" text,
	"description" text,
	"danger" text,
	"fflvLink" text,
	"latitude" float,
	"longitude" float,
	"favorableWind" text[],
	"unfavorableWind" text[],
	"altitude" int,
	"photo_landing" json[]) AS $$
SELECT "landing"."id",
	"landing"."name",
	"landing"."typeOfTerrain",
	"landing"."description",
	"landing"."danger",
	"landing"."fflvLink",
	"landing"."latitude",
	"landing"."longitude",
	"landing"."favorableWind",
	"landing"."unfavorableWind",
	"landing"."altitude",
array_agg(row_to_json("img_landing")) AS "photo_landing" FROM "landing"
JOIN "img_landing" 
	ON "img_landing"."idLanding" = "landing"."id"
WHERE "landing"."id" = $1
GROUP BY "landing"."id"
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION getLiftOff(int) RETURNS TABLE (
	"id" int,
	"name" text,
	"typeOfTerrain" text,
	"description" text,
	"danger" text,
	"fflvLink" text,
	"latitude" float,
	"longitude" float,
	"favorableWind" text[],
	"unfavorableWind" text[],
	"altitude" int,
	"idLandings" int[],
	"photo_liftOff" json[]
) AS $$
SELECT "liftOff"."id",
	"liftOff"."name",
	"liftOff"."typeOfTerrain",
	"liftOff"."description",
	"liftOff"."danger",
	"liftOff"."fflvLink",
	"liftOff"."latitude",
	"liftOff"."longitude",
	"liftOff"."favorableWind",
	"liftOff"."unfavorableWind",
	"liftOff"."altitude",
	array_agg(DISTINCT "landing"."id") AS "idLandings",
    array_agg(row_to_json("img_liftOff")) AS "photo_liftOff" FROM "liftOff"
JOIN "img_liftOff" 
	ON "img_liftOff"."idLiftOff" = "liftOff"."id"
JOIN "liftOff_has_landing"
	ON "liftOff_has_landing"."liftOff_id" = "liftOff"."id"
JOIN "landing"
	ON "landing"."id" = "liftOff_has_landing"."landing_id"
WHERE "liftOff"."id" = $1
GROUP BY "liftOff"."id"
$$ LANGUAGE sql;

COMMIT;
