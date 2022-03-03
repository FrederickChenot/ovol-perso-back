-- Revert template-api:1-initialdb from pg

BEGIN;

DROP TABLE 
    "liftOff_has_landing",
    "img_landing",
    "landing",
    "img_hiking",
    "hiking",
    "img_liftOff",
    "liftOff",
    "user";

COMMIT;
