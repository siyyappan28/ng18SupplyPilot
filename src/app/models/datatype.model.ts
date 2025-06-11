export interface OracleDataType {
  name: string;
  category: 'Numeric' | 'Character' | 'DateTime' | 'LOB' | 'Other';
  hasLength?: boolean;   // For VARCHAR2, CHAR, etc.
  hasPrecision?: boolean; // For NUMBER, FLOAT
  hasScale?: boolean;     // For NUMBER
  isDeprecated?: boolean;
}

export const ORACLE_DATA_TYPE_OPTIONS: OracleDataType[] = [
  { name: 'NUMBER', category: 'Numeric', hasPrecision: true, hasScale: true },
  { name: 'FLOAT', category: 'Numeric', hasPrecision: true },
  { name: 'BINARY_FLOAT', category: 'Numeric' },
  { name: 'BINARY_DOUBLE', category: 'Numeric' },
  
  { name: 'CHAR', category: 'Character', hasLength: true },
  { name: 'VARCHAR2', category: 'Character', hasLength: true },
  { name: 'NCHAR', category: 'Character', hasLength: true },
  { name: 'NVARCHAR2', category: 'Character', hasLength: true },
  { name: 'CLOB', category: 'LOB' },
  { name: 'NCLOB', category: 'LOB' },

  { name: 'DATE', category: 'DateTime' },
  { name: 'TIMESTAMP', category: 'DateTime' },
  { name: 'TIMESTAMP WITH TIME ZONE', category: 'DateTime' },
  { name: 'TIMESTAMP WITH LOCAL TIME ZONE', category: 'DateTime' },
  { name: 'INTERVAL YEAR TO MONTH', category: 'DateTime' },
  { name: 'INTERVAL DAY TO SECOND', category: 'DateTime' },

  { name: 'BLOB', category: 'LOB' },
  { name: 'RAW', category: 'LOB', hasLength: true },

  { name: 'ROWID', category: 'Other' },
  { name: 'UROWID', category: 'Other' },
  { name: 'JSON', category: 'Other' }
];
