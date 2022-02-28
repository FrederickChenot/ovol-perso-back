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

CREATE TABLE "lift-off"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "type-of-terrain" TEXT,
  "description" TEXT,
  "danger" TEXT,
  "fflv-link" TEXT,
  "latitude" FLOAT,
  "longitude" FLOAT,
  "favorable-wind" TEXT [],
  "unfavorable-wind" TEXT [],
  "altitude" INT
 );

CREATE TABLE "img_lift-off"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL UNIQUE,
  "url" TEXT NOT NULL UNIQUE,
  "idLiftOff" INT REFERENCES "lift-off"("id")
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
  "lift-off_id" INT NOT NULL REFERENCES "lift-off"("id")
);

CREATE TABLE "img_hiking"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL UNIQUE,
  "url" TEXT NOT NULL UNIQUE,
  "idHiking" INT REFERENCES "hiking"("id")
);

CREATE TABLE "landing"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "type-of-terrain" TEXT,
  "description" TEXT,
  "danger" TEXT,
  "fflv-link" TEXT,
  "latitude" FLOAT,
  "longitude" FLOAT,
  "favorable-wind" TEXT [],
  "unfavorable-wind" TEXT [],
  "altitude" INT
);

CREATE TABLE "img_landing"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL UNIQUE,
  "url" TEXT NOT NULL UNIQUE,
  "idLanding" INT REFERENCES "landing"("id")
);

CREATE TABLE "lift-off_has_landing"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "lift-off_id" INT REFERENCES "lift-off"("id"),
  "landing_id" INT REFERENCES "landing"("id")
);

COMMIT;
