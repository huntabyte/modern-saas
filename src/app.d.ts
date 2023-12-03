
import type { Session, SupabaseClient } from "@supabase/supabase-js";

declare global {
	/// <reference types="stripe-event-types" />
	namespace App {
		// interface Error {}
		interface Locals {
		
			supabase: SupabaseClient;
			getSession(): Promise<Session | null>;
			user: Session.user;
		}
		interface PageData {
			session: Session | null;
			user: Session.user;
		}
		// interface Platform {}
	}
}

export {};
