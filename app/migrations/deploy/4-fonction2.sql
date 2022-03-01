-- Deploy template-api:4-fonction2 to pg

BEGIN;

-- Get one hiking with hid id it integret his photos in json table

CREATE OR REPLACE FUNCTION getOneHiking(int) RETURNS TABLE (
  id int,
  name text,
  img_card text,
  mountain text,
  resume text,
  key_stage text,
  starting_point text,
  hiking_plan text,
  positive_elevation int,
  negative_elevation int,
  overall_length float,
  land_type text,
  ign_card_reference text,
  hight_point int,
  low_point int,
  difficulty text,
  user_id int,
  "lift-off_id" int,
  photo_hiking JSON[])
    AS $$
SELECT
  "hiking"."id",
  "hiking"."name",
  "hiking"."img_card",
  "hiking"."mountain",
  "hiking"."resume",
  "hiking"."key_stage",
  "hiking"."starting_point",
  "hiking"."hiking_plan",
  "hiking"."positive_elevation",
  "hiking"."negative_elevation",
  "hiking"."overall_length",
  "hiking"."land_type",
  "hiking"."ign_card_reference",
  "hiking"."hight_point",
  "hiking"."low_point",
  "hiking"."difficulty",
  "hiking"."user_id",
  "hiking"."lift-off_id",
  array_agg(row_to_json("img_hiking"))
  AS photo_hiking FROM "hiking"
    JOIN "img_hiking"
	    ON "img_hiking"."idHiking" = "hiking"."id"
WHERE hiking."id" = $1
GROUP BY
  "hiking"."id",
  "hiking"."name",
  "hiking"."img_card",
  "hiking"."mountain",
  "hiking"."resume",
  "hiking"."key_stage",
  "hiking"."starting_point",
  "hiking"."hiking_plan",
  "hiking"."positive_elevation",
  "hiking"."negative_elevation",
  "hiking"."positive_elevation",
  "hiking"."overall_length",
  "hiking"."land_type",
  "hiking"."ign_card_reference",
  "hiking"."hight_point",
  "hiking"."low_point",
  "hiking"."difficulty",
  "hiking"."user_id",
  "hiking"."lift-off_id"

$$ LANGUAGE sql;

COMMIT;
