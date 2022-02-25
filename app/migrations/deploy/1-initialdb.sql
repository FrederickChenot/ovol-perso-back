-- Deploy template-api:1-initialdb to pg

BEGIN;

CREATE TABLE "user" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "Pseudo" text NOT NULL,
    "email" text NOT NULL,
    "password" text NOT NULL
);

CREATE TABLE "item" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" text
);

COMMIT;
