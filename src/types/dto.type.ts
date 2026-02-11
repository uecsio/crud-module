/**
 * Base DTO type - any class with a constructor
 */
export type DtoType = new (...args: unknown[]) => object;
