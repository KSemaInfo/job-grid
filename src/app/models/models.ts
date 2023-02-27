export interface EntityGetRequest {
  pageNumber?: number;
  pageSize?: number;
  searchFilter?: Array<string>;
  sortColumns?: Array<string>;
}

export interface EntityUpdateRequest {
  fieldValueList?: Array<{
    [key: string]: string | number | Date;
  }>;
}

export class GridModel<T> {
  key!: string;
  columns!: GridColumnModel[];
  rowEdit?: GridRowEditModel;
  allowViewing?: boolean;
  enableColumnChooser!: boolean;
  allowColumnReordering!: boolean;
  allowColumnResizing!: boolean;
  columnAutoWidth!: boolean;
  hoverStateEnabled!: boolean;
  showBorders!: boolean;
  allowRowFilter!: boolean;
  rowSelectionMode!: string;
  columnSortingMode!: string;
  pageSize!: number;
  defaultColumnFilterValue?: boolean = true;
  gridDataViewModel?: GridDataViewModel<T>;
  gridDataModel!: GridDataModel<T>;
  gridDataExport?: GridDataExportModel;
  enableDocuments?: boolean;
  exportingFolder?: boolean;
}

export interface GridRowEditModel {
  mode: string;
  allowRowUpdating: boolean;
  allowRowDeleting: boolean;
  allowInlineAdd: boolean;
  gridPopupModel?: GridPopupModel;
}

export interface GridPopupModel {
  datafield: GridPopupFieldModel[];
}

export interface GridPopupFieldModel {
  name: string;
  dataType: string;
}

export interface GridColumnModel {
  label: string;
  dataField: string;
  datatype: string;
  width?: number;
  isDropDown?: boolean;
  isVisible: boolean;
  allowFiltering: boolean;
  allowEditing: boolean;
  allowColumnFixing: boolean;
  showInColumnChooser: boolean;
  identifier?: string;
  isKey: boolean;
  cssClass?: string;
  isCustomTemplate?: boolean;
  dropDownSource: LookupSourceModel[];
}

export interface LookupSourceModel {
  id?: string;
  name?: string;
  label?: string;
}

export interface GridDataViewModel<T> {
  onView(data: T): void;
  onReadOnlyView?(data: T): void;
}

export interface SuccessResponse {
  data: any;
  totalCount: number;
}

export interface GridDataModel<T> {
  load(entityGetRequest?: EntityGetRequest): Promise<SuccessResponse>;
  update?(entityUpdateRequest: EntityUpdateRequest): Promise<SuccessResponse>;
  remove?(key: any): Promise<void>;
  onEdit?(data: T): any;
  onReadOnlyView?(data: T): any;
  beforeRowIsIntialized?(data: any): void;
  onAdd?(data: any): Promise<SuccessResponse>;
  allowRowUpdate?(data: any): boolean;
  onDropdownDataColumnSelectionChanged?(data: any): any;
  previewDoc?(data: any): void;
  exportFolder?(sheet: Blob): void;
}

export interface GridDataExportModel {
  workSheetName: string;
  fileName: string;
}
