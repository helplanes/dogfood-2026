ALTER TABLE "events" ADD COLUMN "custom_questions" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "tagline" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "thumbnail_url" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "image_gallery" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "demo_video_url" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "live_url" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "tech_tags" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "custom_answers" jsonb DEFAULT '{}'::jsonb NOT NULL;