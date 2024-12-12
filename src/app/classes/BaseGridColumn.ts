export interface ColumnDefinition{
    colId: string;
    header: string;
    colType?: colType;
}

export enum colType{
    string = 'string',
    number = 'number',
    boolean = 'boolean',
    date = 'date',
    object = 'object',
    array = 'array'
}