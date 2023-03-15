export interface PaginationParams {
    page: number;
    per_page: number;
    sort_by?: string;
    sort_direction?: string;
    search?: string;
    search_by?: string;
}