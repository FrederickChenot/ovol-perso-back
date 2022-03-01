-- Revert ovol:3-functions1 from pg

BEGIN;

    DROP FUNCTION getLanding,getLiftOff;

COMMIT;
