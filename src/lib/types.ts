import { ChatInputCommandInteraction, CacheType, AutocompleteInteraction, GuildMember, Attachment, Collection } from 'discord.js';

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T];
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
export type Interaction = ChatInputCommandInteraction<CacheType>
export type Autocomplete = AutocompleteInteraction<CacheType>

export type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift'
export type FixedLengthArray<T, L extends number, TObj = [T, ...Array<T>]> =
  Pick<TObj, Exclude<keyof TObj, ArrayLengthMutationKeys>>
  & {
    readonly length: L
    [I: number]: T
    [Symbol.iterator]: () => IterableIterator<T>
  }

export interface SnipeEntry {
  content: string | null;
  author: string | undefined;
  member: GuildMember | null
  attachments: Collection<string, Attachment> | null
}