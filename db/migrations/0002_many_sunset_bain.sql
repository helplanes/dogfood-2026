CREATE TABLE "audit_log" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "audit_log_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"actor_id" text,
	"action" text NOT NULL,
	"entity" text NOT NULL,
	"detail" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rubric_weights" (
	"criterion" text PRIMARY KEY NOT NULL,
	"weight" integer NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "prizes" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;