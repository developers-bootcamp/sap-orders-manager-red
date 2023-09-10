export interface FilterItem {
  fieldName: string;
  value?:any; 
}

export const DataToFilter: FilterItem[] = [
  {
    fieldName: "orderStatus",
    value: [
      "NEW",
      "CANCELED",
      "DONE",
      "CHARGING",
      "DELIVERED",
      "APPROVED",
    ],
  },
  {
    fieldName: "totalAmount",
    value: [],
  },
  { fieldName: "date" },
  { fieldName: "customer" },
  { fieldName: "product" },
];
