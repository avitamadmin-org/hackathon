"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  MoreVertical,
  Upload,
  Download,
  Columns3,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  ArrowUpDown,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  FileText,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  LayoutGrid,
  List,
  Zap,
  TrendingUp,
  BarChart3,
} from "lucide-react";

export type Column = {
  key: string;
  label: string;
  visible?: boolean;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
};

export type Action = {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: any) => void;
  variant?: "primary" | "secondary" | "danger" | "success" | "warning";
};

export type DataTableProps = {
  title: string;
  description?: string;
  data: any[];
  columns: Column[];
  actions?: Action[];
  searchable?: boolean;
  searchFields?: string[];
  enableImport?: boolean;
  enableExport?: boolean;
  enableColumnToggle?: boolean;
  enableFilters?: boolean;
  enablePagination?: boolean;
  itemsPerPage?: number;
  onImport?: (data: any[]) => void;
  onExport?: (data: any[]) => void;
  onRefresh?: () => void;
  loading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
  statusColors?: {
    [key: string]: {
      bg: string;
      text: string;
      border: string;
      dot?: string;
    };
  };
  rowActions?: Action[];
  onRowClick?: (row: any) => void;
  showStats?: boolean;
  showViewToggle?: boolean;
  showBulkActions?: boolean;
  onBulkAction?: (action: string, selected: any[]) => void;
  badge?: {
    label: string;
    color?: string;
  };
  totalCount?: number;
};

const DataTable: React.FC<DataTableProps> = ({
  title,
  description,
  data = [],
  columns = [],
  actions = [],
  searchable = true,
  searchFields = [],
  enableImport = true,
  enableExport = true,
  enableColumnToggle = true,
  enableFilters = true,
  enablePagination = true,
  itemsPerPage = 10,
  onImport,
  onExport,
  onRefresh,
  loading = false,
  emptyState,
  className = "",
  statusColors = {},
  rowActions = [],
  onRowClick,
  showStats = true,
  showViewToggle = false,
  showBulkActions = false,
  onBulkAction,
  badge,
  totalCount,
}) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [showColumnsMenu, setShowColumnsMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({ key: "", direction: null });
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    columns.reduce((acc, col) => ({ ...acc, [col.key]: col.visible !== false }), {})
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<string | null>(null);


  const searchableFields = searchFields.length > 0 
    ? searchFields 
    : columns.map(col => col.key);


  const filteredData = data.filter((row) => {
    if (!search) return true;
    return searchableFields.some((field) => {
      const value = row[field];
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(search.toLowerCase());
    });
  });


  const sortedData = [...filteredData];
  if (sortConfig.direction) {
    sortedData.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortConfig.direction === "asc" 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
      }
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }


  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);


  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [totalPages, currentPage]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowColumnsMenu(false);
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleSort = (key: string) => {
    if (!columns.find(col => col.key === key)?.sortable) return;
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key
          ? prev.direction === "asc"
            ? "desc"
            : prev.direction === "desc"
            ? null
            : "asc"
          : "asc",
    }));
  };


  const handleSelectAll = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map((row) => row.id || row.key || row));
    }
  };


  const handleRowSelect = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };


  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split("\n").filter(Boolean);
        const headers = lines[0].split(",").map((h) => h.trim());
        
        const importedData = lines.slice(1).map((line) => {
          const values = line.split(",").map((v) => v.trim());
          const row: Record<string, any> = {};
          headers.forEach((header, index) => {
            row[header] = values[index] || "";
          });
          return row;
        });

        if (onImport) onImport(importedData);
      } catch (error) {
        console.error("Error importing CSV:", error);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };


  const handleExport = () => {
    const headers = columns
      .filter((col) => visibleColumns[col.key])
      .map((col) => col.label);
    
    const rows = filteredData.map((row) =>
      columns
        .filter((col) => visibleColumns[col.key])
        .map((col) => row[col.key] || "")
    );

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (onExport) onExport(filteredData);
  };


  const toggleColumn = (key: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };


  const resetFilters = () => {
    setSearch("");
    setSortConfig({ key: "", direction: null });
    setCurrentPage(1);
    setSelectedRows([]);
  };


  const getStatusColor = (status: string) => {
    return statusColors[status] || {
      bg: "bg-gray-50",
      text: "text-gray-700",
      border: "border-gray-200",
      dot: "bg-gray-400",
    };
  };


  const renderEmptyState = () => {
    if (emptyState) return emptyState;
    return (
      <div className="text-center py-20">
        <div className="inline-flex p-6 bg-linear-to-br from-gray-50 to-gray-100 rounded-3xl mb-6">
          <FileText className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No data available</h3>
        <p className="text-sm text-gray-500 max-w-sm mx-auto">
          {search ? "Try adjusting your search or filters" : "Get started by adding your first entry"}
        </p>
        {search && (
          <button
            onClick={resetFilters}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 rounded-lg transition-all"
          >
            <X size={14} />
            Clear search
          </button>
        )}
      </div>
    );
  };

  const visibleColumnsList = columns.filter((col) => visibleColumns[col.key] !== false);


  const getColumnAlign = (col: Column) => {
    return col.align || "left";
  };

  const getTextAlign = (align: string) => {
    switch (align) {
      case "center": return "text-center";
      case "right": return "text-right";
      default: return "text-left";
    }
  };

  return (
    <div className={`min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50/80 ${className}`}>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleImport}
      />


      <div className="p-2 border-b border-gray-100/80">
        <div className="flex flex-col md:flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
                  {title}
                </h1>
                {badge && (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    badge.color || "bg-blue-100 text-blue-700"
                  }`}>
                    {badge.label}
                  </span>
                )}
              </div>
              {loading && (
                <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
              )}
            </div>
            {description && (
              <p className="text-sm text-gray-500 mt-1 max-w-2xl">{description}</p>
            )}
          </div>


          {showStats && totalCount !== undefined && (
            <div className="flex items-center gap-3 px-4 py-2 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100/50">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">
                {totalCount} Total
              </span>
            </div>
          )}

 
          <div className="flex flex-wrap gap-2 items-center">
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
                title="Refresh"
              >
                <RefreshCw size={16} />
              </button>
            )}

            {showViewToggle && (
              <div className="flex items-center bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === "table"
                      ? "bg-white shadow-sm text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  title="Table view"
                >
                  <List size={16} />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  title="Grid view"
                >
                  <LayoutGrid size={16} />
                </button>
              </div>
            )}

            {enableImport && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all hover:shadow-sm"
              >
                <Upload size={16} />
                <span className="hidden sm:inline">Import</span>
              </button>
            )}

            {enableExport && filteredData.length > 0 && (
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all hover:shadow-sm"
              >
                <Download size={16} />
                <span className="hidden sm:inline">Export</span>
              </button>
            )}

            {enableFilters && (
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-sm transition-all ${
                  showFilters
                    ? "border-blue-500 bg-blue-50 text-blue-600 shadow-sm"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                }`}
              >
                <Filter size={16} />
                <span className="hidden sm:inline">Filters</span>
                {Object.keys(statusColors).length > 0 && (
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                )}
              </button>
            )}

            {enableColumnToggle && (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowColumnsMenu(!showColumnsMenu)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all hover:shadow-sm"
                >
                  <Columns3 size={16} />
                  <span className="hidden sm:inline">Columns</span>
                  <ChevronDown size={14} />
                </button>

                {showColumnsMenu && (
                  <div className="absolute right-0 top-12 min-w-50 bg-white border border-gray-200 rounded-2xl shadow-xl p-3 z-50">
                    <div className="flex items-center justify-between mb-3 px-2">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Toggle Columns
                      </span>
                      <button
                        onClick={() => setShowColumnsMenu(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <div className="space-y-1">
                      {columns.map((col) => (
                        <label
                          key={col.key}
                          className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-50 rounded-xl cursor-pointer transition-colors group"
                        >
                          <input
                            type="checkbox"
                            checked={visibleColumns[col.key] !== false}
                            onChange={() => toggleColumn(col.key)}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
                          />
                          <span className="text-gray-700 group-hover:text-gray-900">
                            {col.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {actions.map((action, index) => {
              let variantClasses = "";
              switch (action.variant) {
                case "primary":
                  variantClasses = "bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30";
                  break;
                case "success":
                  variantClasses = "bg-linear-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30";
                  break;
                case "danger":
                  variantClasses = "bg-linear-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30";
                  break;
                case "warning":
                  variantClasses = "bg-linear-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30";
                  break;
                default:
                  variantClasses = "bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30";
              }
              
              return (
                <button
                  key={index}
                  onClick={() => action.onClick?.(filteredData)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105 ${variantClasses}`}
                >
                  {action.icon}
                  {action.label}
                </button>
              );
            })}
          </div>
        </div>

    
        <div className={`mt-4 space-y-3 transition-all duration-300 ${showFilters ? "block" : ""}`}>
          <div className="flex flex-col sm:flex-row gap-3">
            {searchable && (
              <div className="flex-1 relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder={`Search ${title.toLowerCase()}...`}
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            )}

            <div className="flex items-center gap-2">
              {(search || sortConfig.direction || selectedRows.length > 0) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X size={12} />
                  Clear all
                </button>
              )}
            </div>
          </div>

        
          {(search || sortConfig.direction || selectedRows.length > 0) && (
            <div className="flex flex-wrap gap-2">
              {search && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
                  <Search size={12} />
                  "{search}"
                  <button onClick={() => setSearch("")} className="hover:text-blue-900 transition-colors">
                    <X size={12} />
                  </button>
                </span>
              )}
              {sortConfig.direction && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200">
                  <ArrowUpDown size={12} />
                  Sorted: {sortConfig.direction}
                  <button onClick={() => setSortConfig({ key: "", direction: null })}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {selectedRows.length > 0 && showBulkActions && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs rounded-full border border-indigo-200">
                  <Check size={12} />
                  {selectedRows.length} selected
                </span>
              )}
            </div>
          )}
        </div>
      </div>

     
      <div className="px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100/80 bg-linear-to-r from-gray-50/50 to-white">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              {filteredData.length}
            </span>
            <span className="text-sm text-gray-500">
              {filteredData.length === 1 ? "item" : "items"}
            </span>
          </div>
          {selectedRows.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-blue-600 font-medium">
                {selectedRows.length} selected
              </span>
              {showBulkActions && onBulkAction && (
                <div className="flex gap-2">
                  <button
                    onClick={() => onBulkAction("delete", selectedRows)}
                    className="text-xs text-red-600 hover:text-red-700 font-medium hover:bg-red-50 px-2 py-1 rounded-lg transition-all"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => onBulkAction("export", selectedRows)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 px-2 py-1 rounded-lg transition-all"
                  >
                    Export
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {enablePagination && totalPages > 1 && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm text-gray-600 font-medium">
              Page {currentPage} <span className="text-gray-400">of</span> {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

 
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-sm text-gray-500 font-medium">Loading data...</p>
          </div>
        </div>
      ) : filteredData.length === 0 ? (
        renderEmptyState()
      ) : viewMode === "grid" ? (
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6 lg:p-8">
          {paginatedData.map((row, rowIndex) => {
            const rowId = row.id || row.key || `row-${rowIndex}`;
            const isSelected = selectedRows.includes(rowId);
            
            return (
              <div
                key={rowId}
                className={`bg-white border rounded-2xl p-5 transition-all duration-300 ${
                  isSelected 
                    ? "border-blue-400 shadow-lg shadow-blue-500/10 ring-2 ring-blue-500/20" 
                    : "border-gray-200 hover:shadow-lg hover:border-gray-300"
                } ${onRowClick ? "cursor-pointer" : ""}`}
                onClick={() => onRowClick?.(row)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {rowActions.length > 0 && (
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleRowSelect(rowId)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
                      />
                    )}
                    {row.initials && (
                      <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-sm font-semibold text-blue-700">
                        {row.initials}
                      </div>
                    )}
                  </div>
                  {rowActions.length > 0 && (
                    <div className="flex items-center gap-1">
                      {rowActions.slice(0, 2).map((action, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            action.onClick(row);
                          }}
                          className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                          title={action.label}
                        >
                          {action.icon || <MoreVertical size={14} />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  {visibleColumnsList.map((col) => (
                    <div key={col.key} className="flex items-start justify-between">
                      <span className="text-xs text-gray-500 font-medium">{col.label}</span>
                      <span className="text-sm text-gray-900 text-right">
                        {col.render ? col.render(row[col.key], row) : (
                          row[col.key] !== undefined && row[col.key] !== null
                            ? String(row[col.key])
                            : "-"
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200/80 bg-linear-to-r from-gray-50/80 to-white">
                {rowActions.length > 0 && (
                  <th className="w-12 px-4 sm:px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </th>
                )}
                {visibleColumnsList.map((col) => (
                  <th
                    key={col.key}
                    className={`px-4 sm:px-6 py-4 text-${getColumnAlign(col)} text-xs font-semibold text-gray-500 uppercase tracking-wider ${
                      col.sortable ? "cursor-pointer hover:text-gray-700" : ""
                    }`}
                    onClick={() => handleSort(col.key)}
                    style={{ width: col.width }}
                  >
                    <div className={`flex items-center gap-1.5 ${getColumnAlign(col) === "right" ? "justify-end" : getColumnAlign(col) === "center" ? "justify-center" : ""}`}>
                      {col.label}
                      {col.sortable && (
                        <ArrowUpDown
                          size={13}
                          className={`transition-all ${
                            sortConfig.key === col.key
                              ? "text-blue-600"
                              : "text-gray-400"
                          }`}
                        />
                      )}
                    </div>
                  </th>
                ))}
                {rowActions.length > 0 && (
                  <th className="px-4 sm:px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((row, rowIndex) => {
                const rowId = row.id || row.key || `row-${rowIndex}`;
                const isSelected = selectedRows.includes(rowId);
                const isRowHovered = isHovered === rowId;

                return (
                  <tr
                    key={rowId}
                    className={`border-b border-gray-100 transition-all duration-200 ${
                      isSelected 
                        ? "bg-blue-50/60" 
                        : isRowHovered 
                        ? "bg-gray-50/80" 
                        : "hover:bg-gray-50/50"
                    } ${onRowClick ? "cursor-pointer" : ""}`}
                    onMouseEnter={() => setIsHovered(rowId)}
                    onMouseLeave={() => setIsHovered(null)}
                    onClick={() => onRowClick?.(row)}
                  >
                    {rowActions.length > 0 && (
                      <td className="px-4 sm:px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleRowSelect(rowId)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
                        />
                      </td>
                    )}
                    
                    {visibleColumnsList.map((col) => (
                      <td
                        key={col.key}
                        className={`px-4 sm:px-6 py-4 text-sm ${getTextAlign(getColumnAlign(col))}`}
                      >
                        {col.render ? (
                          col.render(row[col.key], row)
                        ) : (
                          <span className="text-gray-700">
                            {row[col.key] !== undefined && row[col.key] !== null
                              ? String(row[col.key])
                              : "-"}
                          </span>
                        )}
                      </td>
                    ))}

                    {rowActions.length > 0 && (
                      <td className="px-4 sm:px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          {rowActions.map((action, idx) => {
                            let variantStyles = "";
                            switch (action.variant) {
                              case "primary":
                                variantStyles = "text-blue-600 hover:bg-blue-50";
                                break;
                              case "danger":
                                variantStyles = "text-red-600 hover:bg-red-50";
                                break;
                              case "success":
                                variantStyles = "text-emerald-600 hover:bg-emerald-50";
                                break;
                              case "warning":
                                variantStyles = "text-amber-600 hover:bg-amber-50";
                                break;
                              default:
                                variantStyles = "text-gray-500 hover:bg-gray-100";
                            }
                            
                            return (
                              <button
                                key={idx}
                                onClick={() => action.onClick(row)}
                                className={`p-2 rounded-xl transition-all ${variantStyles} ${
                                  isRowHovered ? "opacity-100" : "opacity-70"
                                }`}
                                title={action.label}
                              >
                                {action.icon || <MoreVertical size={16} />}
                              </button>
                            );
                          })}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    
      {enablePagination && filteredData.length > 0 && (
  <div className="px-4 sm:px-6 lg:px-8 py-4 border-t border-gray-100/80 flex flex-col sm:flex-row items-center justify-between gap-3 bg-linear-to-r from-white to-gray-50/30">

    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 w-full sm:w-auto">
      <select
        value={itemsPerPage}
        onChange={(e) => {

          setCurrentPage(1);
        }}
        className="px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
        <span className="font-medium text-gray-700">{startIndex + 1}</span>
        <span className="hidden xs:inline"> - </span>
        <span className="font-medium text-gray-700">{Math.min(endIndex, totalItems)}</span>
        <span className="hidden xs:inline"> of </span>
        <span className="font-medium text-gray-700">{totalItems}</span>
      </span>
    </div>


    <div className="flex flex-wrap items-center justify-center gap-1.5 w-full sm:w-auto">
     
      <button
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
        className="hidden xs:inline-flex px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        First
      </button>
      <button
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="inline-flex items-center gap-1 px-2 sm:px-4 py-1 sm:py-1.5 border border-gray-200 rounded-lg text-[10px] sm:text-xs hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={14} className="sm:w-4 sm:h-4" />
        <span className="hidden xs:inline">Previous</span>
      </button>


      <div className="flex items-center gap-0.5 sm:gap-1">
        {(() => {
          const pageNumbers = [];
          const maxVisible = window.innerWidth < 480 ? 3 : 7;
          const totalPagesToShow = Math.min(maxVisible, totalPages);
          
          let startPage;
          if (totalPages <= totalPagesToShow) {
            startPage = 1;
          } else if (currentPage <= Math.ceil(totalPagesToShow / 2)) {
            startPage = 1;
          } else if (currentPage >= totalPages - Math.floor(totalPagesToShow / 2)) {
            startPage = totalPages - totalPagesToShow + 1;
          } else {
            startPage = currentPage - Math.floor(totalPagesToShow / 2);
          }

  
          if (startPage > 1) {
            pageNumbers.push(
              <button
                key={1}
                onClick={() => setCurrentPage(1)}
                className="hidden sm:inline-flex w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all"
              >
                1
              </button>
            );
            if (startPage > 2) {
              pageNumbers.push(
                <span key="ellipsis1" className="text-gray-400 text-xs sm:text-sm px-1">
                  …
                </span>
              );
            }
          }

  
          for (let i = startPage; i < startPage + totalPagesToShow && i <= totalPages; i++) {
            pageNumbers.push(
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  currentPage === i
                    ? "bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {i}
              </button>
            );
          }


          if (startPage + totalPagesToShow - 1 < totalPages) {
            if (startPage + totalPagesToShow < totalPages) {
              pageNumbers.push(
                <span key="ellipsis2" className="text-gray-400 text-xs sm:text-sm px-1">
                  …
                </span>
              );
            }
            if (totalPages > 1) {
              pageNumbers.push(
                <button
                  key={totalPages}
                  onClick={() => setCurrentPage(totalPages)}
                  className="hidden sm:inline-flex w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all"
                >
                  {totalPages}
                </button>
              );
            }
          }

          return pageNumbers;
        })()}
      </div>


      <button
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="inline-flex items-center gap-1 px-2 sm:px-4 py-1 sm:py-1.5 border border-gray-200 rounded-lg text-[10px] sm:text-xs hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="hidden xs:inline">Next</span>
        <ChevronRight size={14} className="sm:w-4 sm:h-4" />
      </button>
      <button
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
        className="hidden xs:inline-flex px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Last
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default DataTable;