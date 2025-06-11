import { Component } from '@angular/core';
import { ColumnValidationService, RESERVED_WORDS, ORACLE_DATA_TYPES } from './column-validation.service'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-column-form',
  standalone: true,
    imports: [CommonModule, FormsModule],
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.scss']
})
export class ColumnFormComponent {
  column = {
    columnName: '',
    displayName: '',
    columnDataType: '',
    description: '',
    size: '',
    isPrimary: false,
    isMandatory: false,
    isForeign: false,
    isUnique: false
  };

  tables = [
    { name: 'Users', columns: ['id', 'username', 'email'] },
    { name: 'Orders', columns: ['order_id', 'user_id', 'amount'] },
    { name: 'Products', columns: ['product_id', 'name', 'price'] }
  ];
  selectedTable: any = null;
  selectedForeignColumn: string = '';

  oracleTypes = ORACLE_DATA_TYPES;
  sizes: any[] = [];

  errors: any = {};

  constructor(private validator: ColumnValidationService) {}

  onTypeChange(type: string) {
    this.column.columnDataType = type;
    this.sizes = this.oracleTypes.find((t:any) => t.type === type)?.sizes || [];
    this.column.size = '';
  }

  onTableChange(tableName: string) {
    this.selectedTable = this.tables.find(t => t.name === tableName);
    this.selectedForeignColumn = '';
  }

  validate() {
    this.errors = this.validator.validateColumn(this.column);
    if (this.column.isForeign && !this.selectedTable) {
      this.errors.foreign = 'Please select a table for the foreign key.';
    }
    if (this.column.isForeign && !this.selectedForeignColumn) {
      this.errors.foreignColumn = 'Please select a column for the foreign key.';
    }
    return Object.keys(this.errors).length === 0;
  }

  submit() {
    if (this.validate()) {
      alert('Column created successfully!');
      // ...submit logic...
    }
  }
}
