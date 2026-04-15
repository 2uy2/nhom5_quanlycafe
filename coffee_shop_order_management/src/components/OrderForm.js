import React, { useState, useContext, useEffect } from 'react';
import { OrderContext } from '../context/OrderContext';
import { calculateTotalPrice, validateOrderData } from '../utils/formatters';
import '../styles/OrderForm.css';

const SAMPLE_PRODUCTS = [
  { id: 1, name: 'Cà Phê Đen', price: 25000 },
  { id: 2, name: 'Cà Phê Sữa', price: 30000 },
  { id: 3, name: 'Cappuccino', price: 45000 },
  { id: 4, name: 'Latte', price: 50000 },
  { id: 5, name: 'Espresso', price: 35000 },
  { id: 6, name: 'Americano', price: 40000 },
  { id: 7, name: 'Macchiato', price: 45000 },
  { id: 8, name: 'Mocha', price: 50000 },
  { id: 9, name: 'Iced Coffee', price: 35000 },
  { id: 10, name: 'Trà Sữa', price: 40000 },
];

const OrderForm = ({ existingOrder = null, onSubmit, onCancel }) => {
  const { addOrder, editOrder } = useContext(OrderContext);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    items: [{ productName: '', quantity: 1, price: 0 }],
    totalPrice: 0,
    status: 'pending',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Load existing order data if editing
  useEffect(() => {
    if (existingOrder) {
      setFormData({
        customerName: existingOrder.customerName,
        customerPhone: existingOrder.customerPhone || '',
        items: existingOrder.items,
        totalPrice: existingOrder.totalPrice,
        status: existingOrder.status,
        notes: existingOrder.notes || '',
      });
    }
  }, [existingOrder]);

  // Calculate total price whenever items change
  useEffect(() => {
    const total = calculateTotalPrice(formData.items);
    setFormData((prev) => ({ ...prev, totalPrice: total }));
  }, [formData.items]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = field === 'quantity' || field === 'price' ? Number(value) : value;
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const handleAddProduct = (productId) => {
    const product = SAMPLE_PRODUCTS.find((p) => p.id === productId);
    if (product) {
      const newItems = [...formData.items];
      const existingItemIndex = newItems.findIndex((item) => item.productName === product.name);
      if (existingItemIndex > -1) {
        newItems[existingItemIndex].quantity += 1;
      } else {
        newItems.push({
          productName: product.name,
          quantity: 1,
          price: product.price,
        });
      }
      setFormData((prev) => ({ ...prev, items: newItems }));
    }
  };

  const handleRemoveItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    if (newItems.length === 0) {
      newItems.push({ productName: '', quantity: 1, price: 0 });
    }
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const handleAddEmptyItem = () => {
    const newItems = [...formData.items, { productName: '', quantity: 1, price: 0 }];
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const { isValid, errors: validationErrors } = validateOrderData(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      if (existingOrder) {
        await editOrder(existingOrder.id, formData);
      } else {
        await addOrder(formData);
      }
      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="order-form-container">
      <div className="order-form-header">
        <h2>{existingOrder ? 'Cập Nhật Đơn Hàng' : 'Tạo Đơn Hàng Mới'}</h2>
      </div>

      {errors.submit && <div className="error-message">{errors.submit}</div>}

      <form onSubmit={handleSubmit} className="order-form">
        {/* Customer Information */}
        <fieldset className="form-section">
          <legend>Thông Tin Khách Hàng</legend>

          <div className="form-group">
            <label htmlFor="customerName">Tên Khách Hàng *</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              placeholder="Nhập tên khách hàng"
              className={errors.customerName ? 'input-error' : ''}
            />
            {errors.customerName && <span className="error-text">{errors.customerName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="customerPhone">Số Điện Thoại</label>
            <input
              type="tel"
              id="customerPhone"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleInputChange}
              placeholder="Nhập số điện thoại (tùy chọn)"
            />
          </div>
        </fieldset>

        {/* Products */}
        <fieldset className="form-section">
          <legend>Chi Tiết Sản Phẩm</legend>

          <div className="quick-add-products">
            <p className="section-label">Thêm nhanh:</p>
            <div className="product-buttons">
              {SAMPLE_PRODUCTS.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  className="btn-product"
                  onClick={() => handleAddProduct(product.id)}
                  title={`${product.name} - ${product.price.toLocaleString()}đ`}
                >
                  {product.name}
                </button>
              ))}
            </div>
          </div>

          <div className="items-table">
            <div className="table-header">
              <div className="col-name">Tên Sản Phẩm</div>
              <div className="col-quantity">Số Lượng</div>
              <div className="col-price">Đơn Giá</div>
              <div className="col-total">Thành Tiền</div>
              <div className="col-action">Xóa</div>
            </div>

            {formData.items.map((item, index) => (
              <div key={index} className="table-row">
                <div className="col-name">
                  <input
                    type="text"
                    value={item.productName}
                    onChange={(e) => handleItemChange(index, 'productName', e.target.value)}
                    placeholder="Tên sản phẩm"
                    className={errors[`item_${index}_name`] ? 'input-error' : ''}
                  />
                  {errors[`item_${index}_name`] && (
                    <span className="error-text">{errors[`item_${index}_name`]}</span>
                  )}
                </div>

                <div className="col-quantity">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    className={errors[`item_${index}_quantity`] ? 'input-error' : ''}
                  />
                  {errors[`item_${index}_quantity`] && (
                    <span className="error-text">{errors[`item_${index}_quantity`]}</span>
                  )}
                </div>

                <div className="col-price">
                  <input
                    type="number"
                    min="0"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                    className={errors[`item_${index}_price`] ? 'input-error' : ''}
                  />
                  {errors[`item_${index}_price`] && (
                    <span className="error-text">{errors[`item_${index}_price`]}</span>
                  )}
                </div>

                <div className="col-total">
                  {(item.quantity * item.price).toLocaleString()}đ
                </div>

                <div className="col-action">
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => handleRemoveItem(index)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}

            {errors.items && <div className="error-message">{errors.items}</div>}
          </div>

          <button
            type="button"
            className="btn-add-item"
            onClick={handleAddEmptyItem}
          >
            + Thêm Sản Phẩm
          </button>
        </fieldset>

        {/* Order Details */}
        <fieldset className="form-section">
          <legend>Chi Tiết Đơn Hàng</legend>

          <div className="order-summary">
            <div className="summary-item">
              <span>Tổng số sản phẩm:</span>
              <strong>{formData.items.reduce((sum, item) => sum + item.quantity, 0)}</strong>
            </div>
            <div className="summary-item">
              <span>Tổng tiền:</span>
              <strong className="total">{formData.totalPrice.toLocaleString()}đ</strong>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Ghi Chú</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Nhập ghi chú thêm (tùy chọn)"
              rows="3"
            />
          </div>

          {existingOrder && (
            <div className="form-group">
              <label htmlFor="status">Trạng Thái Đơn Hàng</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="pending">Đang chờ xử lý</option>
                <option value="processing">Đang chế biến</option>
                <option value="completed">Đã hoàn thành</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
          )}
        </fieldset>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn-submit"
            disabled={submitting}
          >
            {submitting ? 'Đang xử lý...' : existingOrder ? 'Cập Nhật Đơn Hàng' : 'Tạo Đơn Hàng'}
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={onCancel}
            disabled={submitting}
          >
            Hủy Bỏ
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
