import type { Database } from './supabase';

type TExistingTables = keyof Database['public']['Tables'];

type TEntityBase<T extends TExistingTables> = Database['public']['Tables'][T];

export type TRowType<T extends TExistingTables> = TEntityBase<T>['Row'];
export type TInsertType<T extends TExistingTables> = TEntityBase<T>['Insert'];
export type TUpdateType<T extends TExistingTables> = TEntityBase<T>['Update'];
