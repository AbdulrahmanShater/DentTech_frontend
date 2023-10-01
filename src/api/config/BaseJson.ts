/**
 * Base Response Json.
 * @param T data type.
 */
interface BaseJsonResponse<T, E> {
    message: string;
    state: number;
    errors?: E;
    data: T;
    success: boolean;
}
export type { BaseJsonResponse }