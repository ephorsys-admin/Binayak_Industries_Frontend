import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  ProductHeader,
  ProductFilterBar,
  ProductTable,
  ProductDeleteModal,
} from '../components/products';

import {
  fetchAdminProducts,
  deleteProduct,
} from '../../Redux/features/product/productThunk';
import {
  selectAdminProducts,
  selectProductLoading,
  selectProductActionLoading,
  selectProductPagination,
} from '../../Redux/features/product/productSlice';
import { fetchAdminCategories } from '../../Redux/features/category/categoryThunk';
import { selectAdminCategories } from '../../Redux/features/category/categorySlice';

const AdminProducts = () => {
  const dispatch = useDispatch();

  // Redux state
  const adminProducts = useSelector(selectAdminProducts);
  const loading = useSelector(selectProductLoading);
  const actionLoading = useSelector(selectProductActionLoading);
  const pagination = useSelector(selectProductPagination);
  const adminCategories = useSelector(selectAdminCategories);

  // Local filter & search state
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Delete modal state
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // 1. Initial Categories Fetch
  useEffect(() => {
    dispatch(fetchAdminCategories({ limit: 100 }));
  }, [dispatch]);

  // 2. Fetch Products with Filters & Pagination
  useEffect(() => {
    const params = {
      page: currentPage,
      limit: 10,
    };
    if (activeCategory !== 'all') {
      params.category = activeCategory;
    }
    if (searchQuery.trim()) {
      params.search = searchQuery.trim();
    }

    dispatch(fetchAdminProducts(params));
  }, [dispatch, currentPage, activeCategory, searchQuery]);

  // Handle Delete
  const handleDeleteProduct = async (id) => {
    const res = await dispatch(deleteProduct(id));
    if (res.success) {
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* 1. Header Banner (with Link to /admin/products/add page) */}
      <ProductHeader />

      {/* 2. Filter Tabs & Search */}
      <ProductFilterBar
        categories={adminCategories}
        activeCategory={activeCategory}
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          setCurrentPage(1);
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
      />

      {/* 3. Products Table (Direct Links to /admin/products/add and /admin/products/edit/:id) */}
      <ProductTable
        products={adminProducts}
        loading={loading}
        pagination={pagination}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onDelete={setDeleteConfirmId}
      />

      {/* 4. Delete Confirmation Modal */}
      <ProductDeleteModal
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => handleDeleteProduct(deleteConfirmId)}
        loading={actionLoading}
      />
    </div>
  );
};

export default AdminProducts;
