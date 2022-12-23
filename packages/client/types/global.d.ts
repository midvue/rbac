declare global {
  type Nullable<T> = T | null;

  type NonNullable<T> = T extends null | undefined ? never : T;
  type Recordable<T = any> = Record<string, T>;
  type Writable<T> = {
    -readonly [P in keyof T]: T[P];
  };

  type RowScoped<T> = { row: T; $index: number };
}

export {};
