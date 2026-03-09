export type Nullable<T> = {
  [K in keyof T]: T[K] extends object
    ? Nullable<T[K]>
    : T[K] extends Array<infer U>
      ? Array<Nullable<U>>
      : T[K] | null;
};
