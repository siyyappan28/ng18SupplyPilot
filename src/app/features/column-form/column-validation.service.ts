import { Injectable } from '@angular/core';

export const RESERVED_WORDS = [
  'SELECT', 'FROM', 'WHERE', 'TABLE', 'COLUMN', 'USER', 'ORDER', 'GROUP', 'BY', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'ALTER', 'CREATE', 'INDEX', 'VIEW', 'TRIGGER', 'PRIMARY', 'KEY', 'UNIQUE', 'NOT', 'NULL', 'AND', 'OR', 'IN', 'AS', 'ON', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'OUTER', 'DATABASE', 'SCHEMA', 'GRANT', 'REVOKE', 'COMMIT', 'ROLLBACK', 'SAVEPOINT', 'TRANSACTION', 'EXISTS', 'BETWEEN', 'LIKE', 'IS', 'DISTINCT', 'COUNT', 'SUM', 'MIN', 'MAX', 'AVG', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'CAST', 'CONVERT', 'DEFAULT', 'WITH', 'CHECK', 'CONSTRAINT', 'REFERENCES', 'FOREIGN', 'AUTO_INCREMENT', 'SEQUENCE', 'CURSOR', 'FETCH', 'OPEN', 'CLOSE', 'DECLARE', 'EXCEPTION', 'LOOP', 'EXIT', 'CONTINUE', 'IF', 'ELSIF', 'FOR', 'WHILE', 'DO', 'BEGIN', 'END', 'RETURN', 'RAISE', 'PRINT', 'EXEC', 'EXECUTE', 'PROCEDURE', 'FUNCTION', 'PACKAGE', 'BODY', 'LANGUAGE', 'PLSQL', 'SQL', 'PLS_INTEGER', 'BINARY_INTEGER', 'NUMBER', 'VARCHAR', 'CHAR', 'DATE', 'TIMESTAMP', 'INTERVAL', 'RAW', 'LONG', 'CLOB', 'BLOB', 'NCLOB', 'NVARCHAR', 'NCHAR', 'ROWID', 'UROWID', 'XMLTYPE', 'JSON', 'BOOLEAN', 'TRUE', 'FALSE', 'SYS', 'DUAL', 'ALL', 'ANY', 'SOME', 'UNION', 'INTERSECT', 'MINUS', 'EXCEPT', 'SYNONYM', 'PUBLIC', 'PRIVATE', 'SESSION', 'USERENV', 'V$SESSION', 'V$SQL', 'DBA_', 'ALL_', 'USER_'
];

export const ORACLE_DATA_TYPES = [
  { type: 'VARCHAR2', sizes: ['10', '50', '100', '255', '4000'] },
  { type: 'CHAR', sizes: ['1', '10', '50', '100', '255'] },
  { type: 'NUMBER', sizes: ['1', '5', '10', '18', '38'] },
  { type: 'DATE', sizes: [] },
  { type: 'TIMESTAMP', sizes: [] },
  { type: 'CLOB', sizes: [] },
  { type: 'BLOB', sizes: [] }
];

@Injectable({ providedIn: 'root' })
export class ColumnValidationService {
  specialCharPattern = /[^a-zA-Z0-9_]/;

  validateColumn(column: any): any {
    const errors: any = {};
    // Not null
    if (!column.columnName) {
      errors.columnName = 'Column name is required.';
    } else {
      // Length
      if (column.columnName.length > 30) {
        errors.columnName = 'Column name must be <= 30 characters.';
      }
      // Special chars
      if (this.specialCharPattern.test(column.columnName)) {
        errors.columnName = 'Column name must not contain special characters.';
      }
      // Reserved words
      if (RESERVED_WORDS.includes(column.columnName.toUpperCase())) {
        errors.columnName = 'Column name is a reserved word.';
      }
    }
    if (!column.displayName) {
      errors.displayName = 'Display name is required.';
    }
    if (!column.columnDataType) {
      errors.columnDataType = 'Data type is required.';
    }
    if (column.columnDataType && ORACLE_DATA_TYPES.find(t => t.type === column.columnDataType)?.sizes.length && !column.size) {
      errors.size = 'Size is required for this data type.';
    }
    if (column.size && isNaN(Number(column.size))) {
      errors.size = 'Size must be a number.';
    }
    if (!column.description) {
      errors.description = 'Description is required.';
    }
    return errors;
  }
}
