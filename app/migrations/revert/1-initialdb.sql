-- Revert template-api:1-initialdb from pg

BEGIN;

DROP TABLE 
    "lift-off_has_landing",
    "img_landing",
    "landing",
    "img_hiking",
    "hiking",
    "img_lift-off",
    "lift-off",
    "user";

COMMIT;
