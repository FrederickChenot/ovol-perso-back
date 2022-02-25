-- Revert template-api:1-initialdb from pg

BEGIN;

DROP TABLE "item","user";

COMMIT;
