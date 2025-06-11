import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service'; // Your reusable utility
import {
  TableMetadata,
  ColumnDefinition,
  ColumnMetadataUpdate,
  InsertRecord,
  RecordFilter,
  UpdateRecordPayload,
  TableMetadataUpdate
} from '../../models/metadata.model';

@Injectable({
  providedIn: 'root'
})
export class TableMetadataService {

  private readonly baseUrl = '/api/metadata/tables';
  private readonly dynamicUrl = '/api/dynamic';

  constructor(private apiService: ApiService) {}

  // -------- Metadata APIs --------

  createTableMetadata(payload: TableMetadata): Observable<any> {
    return this.apiService.post(`${this.baseUrl}`, payload);
  }

  getAllTableMetadata(): Observable<any> {
    return this.apiService.get(`${this.baseUrl}`);
  }

  updateTableMetadata(tableId: string, payload: TableMetadata): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/${tableId}`, payload);
  }

  deleteTableMetadata(tableId: string): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${tableId}`);
  }

  addColumnToTable(tableId: string, column: ColumnDefinition): Observable<any> {
    return this.apiService.post(`${this.baseUrl}/${tableId}/columns`, column);
  }

  getAllColumnMetadata(tableId: string): Observable<any> {
    return this.apiService.get(`${this.baseUrl}/${tableId}/columns`);
  }

  updateColumnMetadata(tableId: string, columnId: string, column: ColumnMetadataUpdate): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/${tableId}/columns/${columnId}`, column);
  }

  deleteColumnMetadata(tableId: string, columnId: string): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${tableId}/columns/${columnId}`);
  }

  getAuditLogs(tableId: string): Observable<any> {
    return this.apiService.get(`${this.baseUrl}/${tableId}/logs`);
  }

  // -------- Dynamic Table Operations --------

  insertRecord(tableId: string, record: InsertRecord): Observable<any> {
    return this.apiService.post(`${this.dynamicUrl}/${tableId}`, record);
  }

  getAllRecords(tableId: string, queryParams: any = {}): Observable<any> {
    return this.apiService.get(`${this.dynamicUrl}/${tableId}/filter`, queryParams);
  }

  getRecordById(tableId: string, recordId: string): Observable<any> {
    return this.apiService.get(`${this.dynamicUrl}/${tableId}/${recordId}`);
  }

  updateRecordById(tableId: string, recordId: string, payload: UpdateRecordPayload): Observable<any> {
    return this.apiService.put(`${this.dynamicUrl}/${tableId}/${recordId}`, payload);
  }
}
