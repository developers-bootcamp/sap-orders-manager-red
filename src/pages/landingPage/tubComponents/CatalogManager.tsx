import React from 'react';
import ProductCategoryTable from '../../tables/ProductCategoryTable';
import ProductTable from '../../tables/ProductsTable';

const CatalogManager: React.FC = () => {
  return (
    <>
      <ProductCategoryTable></ProductCategoryTable>
      <br />
      <ProductTable></ProductTable>
    </>
  )
};

export default CatalogManager;

