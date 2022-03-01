-- Revert template-api:4-fonction2 from pg

BEGIN;

-- XXX Add DDLs here.
DROP FUNCTION getOneHiking;

COMMIT;
