export interface FilterItem {
  fieldName: string;
  value?:any; // Since "date", "customer", and "product" don't have the "value" property
}

export const DataToFilter: FilterItem[] = [
  {
    fieldName: "orderStatus",
    value: [
      "NEW",
      "PAYMENT FAILD",
      "CANCELED",
      "DONE",
      "CHATGING",
      "DELIVERED",
    ],
  },
  { fieldName: "priority", value: [1, 2, 3, 4, 5] },
  {
    fieldName: "price",
    value: ["0-200", "201-400", "401-600", "601-800", "801-1000", "1000+"],
  },
  { fieldName: "date" },
  { fieldName: "customer" },
  { fieldName: "product" },
];


// [
//   {
//     "fieldName": "status",
//     "value": [
//       "new",
//       "Payment failed",
//       "Process failed",
//       "done",
//       "processing",
//       "created"
//     ]
//   },
//   { "fieldName": "priority", "value": [1, 2, 3, 4, 5] },
//   {
//     "fieldName": "price",
//     "value": ["0-200", "201-400", "401-600", "601-800", "801-1000", "1000+"]
//   },
//   { "fieldName": "date" },
//   { "fieldName": "customer" },
//   { "fieldName": "product" }
// ]