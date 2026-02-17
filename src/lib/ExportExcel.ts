import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { type Resource } from '@/types/Resource';

export const exportResourcesToExcel = (resources: Resource[], fileName = "данные.xlsx") => {
  if (!resources || resources.length === 0) return;

  const exportData = resources.map(r => ({
    Название: r.name,
    Подписчики: r.sub_count,
    Подписки: r.joins,
    Отписки: r.unsubscribes,
    "Чистый трафик": r.netTraffic,
    Конверсия: r.conversion + '%',
  }));

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Лист1");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, fileName);
};
