export const ItemTypes = ['item' as const];
export type ItemType = (typeof ItemTypes)[number];
export const GroupTypes = ['mission', 'values', 'premise'] as const;
export type GroupType = (typeof GroupTypes)[number];
export interface ListItem {
    ID: number;
    todo: string;
    emergency: number;
    CreatedAt?: any;
    UpdatedAt?: any;
    DeletedAt?: any;
    group: GroupType;
}
export interface ListItemProps {
    id: number;
    item: string;
    emergency: number;
}
export type ItemWithIndex = ListItemProps & {
    index: number;
};
export type MoveHandler = (dragIndex: number, targetIndex: number, groupType: GroupType) => void;
export const TitleMap = {
    mission: 'Mission',
    values: 'Values',
    premise: 'Premise',
} as const;

