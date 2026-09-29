CREATE EXTENSION IF NOT EXISTS pgcrypto;
--> statement-breakpoint
ALTER TABLE audit_log ADD COLUMN prev_hash text;
--> statement-breakpoint
ALTER TABLE audit_log ADD COLUMN hash text;
--> statement-breakpoint
DO $$
DECLARE
  entry record;
  previous_hash text := repeat('0', 64);
  entry_hash text;
BEGIN
  FOR entry IN SELECT id, actor_id, action, entity, detail, created_at FROM audit_log ORDER BY id LOOP
    entry_hash := encode(digest(jsonb_build_object(
      'id', entry.id,
      'actor_id', entry.actor_id,
      'action', entry.action,
      'entity', entry.entity,
      'detail', entry.detail,
      'created_at', entry.created_at,
      'prev_hash', previous_hash
    )::text, 'sha256'), 'hex');
    UPDATE audit_log SET prev_hash = previous_hash, hash = entry_hash WHERE id = entry.id;
    previous_hash := entry_hash;
  END LOOP;
END $$;
--> statement-breakpoint
ALTER TABLE audit_log ALTER COLUMN prev_hash SET NOT NULL;
--> statement-breakpoint
ALTER TABLE audit_log ALTER COLUMN hash SET NOT NULL;
--> statement-breakpoint
CREATE FUNCTION audit_log_set_hash() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  previous_hash text;
BEGIN
  PERFORM pg_advisory_xact_lock(20260929, 1);
  SELECT hash INTO previous_hash FROM audit_log ORDER BY id DESC LIMIT 1;
  NEW.prev_hash := COALESCE(previous_hash, repeat('0', 64));
  NEW.hash := encode(digest((to_jsonb(NEW) - 'hash')::text, 'sha256'), 'hex');
  RETURN NEW;
END;
$$;
--> statement-breakpoint
CREATE FUNCTION audit_log_reject_mutation() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  RAISE EXCEPTION 'audit_log is append-only';
END;
$$;
--> statement-breakpoint
CREATE TRIGGER audit_log_hash_before_insert BEFORE INSERT ON audit_log
FOR EACH ROW EXECUTE FUNCTION audit_log_set_hash();
--> statement-breakpoint
CREATE TRIGGER audit_log_reject_update_delete BEFORE UPDATE OR DELETE ON audit_log
FOR EACH ROW EXECUTE FUNCTION audit_log_reject_mutation();
--> statement-breakpoint
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'dogfood_app') THEN
    EXECUTE 'CREATE ROLE dogfood_app LOGIN PASSWORD ''dogfood_app'' NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT';
  END IF;
END $$;
--> statement-breakpoint
GRANT CONNECT ON DATABASE dogfood TO dogfood_app;
--> statement-breakpoint
GRANT USAGE ON SCHEMA public TO dogfood_app;
--> statement-breakpoint
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO dogfood_app;
--> statement-breakpoint
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO dogfood_app;
--> statement-breakpoint
REVOKE UPDATE, DELETE, TRUNCATE ON audit_log FROM dogfood_app;
--> statement-breakpoint
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO dogfood_app;
--> statement-breakpoint
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO dogfood_app;
