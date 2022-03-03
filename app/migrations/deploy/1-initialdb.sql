-- Deploy template-api:1-initialdb to pg

BEGIN;

CREATE TABLE "user"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "login" TEXT NOT NULL UNIQUE,
  "avatar" TEXT,
  "role" TEXT,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL
);

CREATE TABLE "liftOff"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "typeOfTerrain" TEXT,
  "description" TEXT,
  "danger" TEXT,
  "fflvLink" TEXT,
  "latitude" FLOAT,
  "longitude" FLOAT,
  "favorableWind" TEXT [],
  "unfavorableWind" TEXT [],
  "altitude" INT
 );

CREATE TABLE "img_liftOff"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "idLiftOff" INT REFERENCES "liftOff"("id")
);

CREATE TABLE "hiking" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "img_card" TEXT,
  "mountain" TEXT,
  "resume" TEXT,
  "key_stage" TEXT,
  "starting_point" TEXT,
  "hiking_plan" TEXT,
  "positive_elevation" INT,
  "negative_elevation" INT,
  "overall_length" FLOAT,
  "land_type" TEXT,
  "ign_card_reference" TEXT,
  "hight_point" INT,
  "low_point" INT,
  "difficulty" TEXT,
  "user_id" INT NOT NULL REFERENCES "user"("id"),
  "liftOff_id" INT NOT NULL REFERENCES "liftOff"("id")
);

CREATE TABLE "img_hiking"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "idHiking" INT REFERENCES "hiking"("id")
);

CREATE TABLE "landing"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "typeOfTerrain" TEXT,
  "description" TEXT,
  "danger" TEXT,
  "fflvLink" TEXT,
  "latitude" FLOAT,
  "longitude" FLOAT,
  "favorableWind" TEXT [],
  "unfavorableWind" TEXT [],
  "altitude" INT
);

CREATE TABLE "img_landing"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "idLanding" INT REFERENCES "landing"("id")
);

CREATE TABLE "liftOff_has_landing"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "liftOff_id" INT REFERENCES "liftOff"("id"),
  "landing_id" INT REFERENCES "landing"("id")
);

COMMIT;
