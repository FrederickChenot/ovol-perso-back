-- Deploy template-api:1-initialdb to pg

BEGIN;

DROP TABLE IF EXISTS "user", "lift-off", "img_lift-off", "hiking", "img_hiking", "landing", "img_landing", "lift-off_has_landing";

CREATE TABLE "user" (
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
  "latitude" REAL,
  "longitude" REAL,
  "favorable-wind" TEXT,
  "unfavorable-wind" TEXT,
  "altitude" INT
 );

CREATE TABLE "img_lift-off"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL UNIQUE,
  "url" TEXT NOT NULL UNIQUE
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
  "overall_lenth" TEXT,
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
  "url" TEXT NOT NULL UNIQUE
);

CREATE TABLE "landing"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "type-of-terrain" TEXT,
  "description" TEXT,
  "danger" TEXT,
  "fflv-link" TEXT,
  "latitude" INT,
  "longitude" INT,
  "favorable-wind" TEXT,
  "unfavorable-wind" TEXT,
  "altitude" INT
);

CREATE TABLE "img_landing"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL UNIQUE,
  "url" TEXT NOT NULL UNIQUE
);

CREATE TABLE "lift-off_has_landing"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "lift-off_id" INT REFERENCES "lift-off"("id"),
  "landing_id" INT REFERENCES "landing"("id")
);

COMMIT;
