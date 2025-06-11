export interface ColumnDefinition {
  name: string;
  type: string;
  size?: number;
  nullable?: boolean;
  constraints?: string[];
}

export interface TableMetadata {
  tableName: string;
  description?: string;
  columns: ColumnDefinition[];
}

export interface ColumnMetadataUpdate {
  name: string;
  type: string;
  size?: number;
  nullable?: boolean;
  constraints?: string[];
}

export interface InsertRecord {
  [column: string]: any; // example: { col1: value1, col2: value2 }
}

export interface RecordFilter {
  [column: string]: any; // example: { col1: val1, col2: val2 }
}

export interface UpdateRecordPayload {
  [column: string]: any; // example: { col1: newValue }
}
export interface TableMetadataUpdate {
  tableName?: string;
  description?: string;
  columns?: ColumnMetadataUpdate[];
}