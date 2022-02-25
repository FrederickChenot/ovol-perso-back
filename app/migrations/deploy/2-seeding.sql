-- Deploy template-api:2-seeding to pg

BEGIN;

INSERT INTO "item"(label) VALUES 
('item1');

COMMIT;
