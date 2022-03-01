-- Deploy ovol:3-functions1 to pg

BEGIN;

CREATE OR REPLACE FUNCTION getLanding(int) RETURNS TABLE (
	"id" int,
	"name" text,
	"type-of-terrain" text,
	"description" text,
	"danger" text,
	"fflv-link" text,
	"latitude" float,
	"longitude" float,
	"favorable-wind" text[],
	"unfavorable-wind" text[],
	"altitude" int,
	"photo_landing" json[]) AS $$
SELECT "landing"."id",
	"landing"."name",
	"landing"."type-of-terrain",
	"landing"."description",
	"landing"."danger",
	"landing"."fflv-link",
	"landing"."latitude",
	"landing"."longitude",
	"landing"."favorable-wind",
	"landing"."unfavorable-wind",
	"landing"."altitude",
array_agg(row_to_json("img_landing")) AS photo_landing FROM "landing"
JOIN "img_landing" 
	ON "img_landing"."idLanding" = "landing"."id"
WHERE "landing"."id" = $1
GROUP BY "landing"."id"
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION getLiftOff(int) RETURNS TABLE (
	"id" int,
	"name" text,
	"type-of-terrain" text,
	"description" text,
	"danger" text,
	"fflv-link" text,
	"latitude" float,
	"longitude" float,
	"favorable-wind" text[],
	"unfavorable-wind" text[],
	"altitude" int,
	"landings" json[],
	"photo_lift-off" json[]
) AS $$
SELECT "lift-off"."id",
	"lift-off"."name",
	"lift-off"."type-of-terrain",
	"lift-off"."description",
	"lift-off"."danger",
	"lift-off"."fflv-link",
	"lift-off"."latitude",
	"lift-off"."longitude",
	"lift-off"."favorable-wind",
	"lift-off"."unfavorable-wind",
	"lift-off"."altitude",
	array_agg(row_to_json("landing")) AS "landings",
	array_agg(row_to_json("img_lift-off")) AS "photo_lift-off" FROM "lift-off"
JOIN "img_lift-off" 
	ON "img_lift-off"."idLiftOff" = "lift-off"."id"
JOIN "lift-off_has_landing"
	ON "lift-off_has_landing"."lift-off_id" = "lift-off"."id"
JOIN "landing"
	ON "landing"."id" = "lift-off_has_landing"."landing_id"
WHERE "lift-off"."id" = $1
GROUP BY "lift-off"."id"
$$ LANGUAGE sql;

COMMIT;
