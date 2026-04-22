# Kiến Trúc Ứng Dụng - Coffee Shop Order Management

## 1. Tổng Quan Kiến Trúc

```
┌─────────────────────────────────────────────────────────────┐
│                      REACT FRONTEND                          │
│  (Component-based, State Management with Context API)        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  ORDER CONTEXT (State)                       │
│  - orders (array)                                            │
│  - loading (boolean)                                         │
│  - error (string)                                            │
│  - Functions: fetch, create, update, delete, filter         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              ORDER SERVICE LAYER                             │
│  - getOrders()           (GET /api/orders)                  │
│  - createOrder()         (POST /api/orders)                 │
│  - updateOrder()         (PUT /api/orders/:id)              │
│  - cancelOrder()         (DELETE /api/orders/:id)           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│          STORAGE LAYER (Backend or localStorage)             │
│  - API Server (Node.js, Django, Flask, etc.)                │
│  - OR localStorage (Development)                            │
└─────────────────────────────────────────────────────────────┘
```

## 2. Luồng Dữ Liệu (Data Flow)

### Tạo Đơn Hàng
```
User Input (Form)
       │
       ▼
  Validation (formatters.js)
       │
       ▼
  OrderForm Component
       │
       ▼
  OrderContext.addOrder()
       │
       ▼
  orderService.createOrder()
       │
       ▼
  Backend API / localStorage
       │
       ▼
  Response with Order ID
       │
       ▼
  Update OrderContext.orders
       │
       ▼
  Re-render OrderList
```

### Cập Nhật Đơn Hàng
```
OrderDetail (Select Order)
       │
       ▼
  OrderForm (existingOrder prop)
       │
       ▼
  User Updates Fields
       │
       ▼
  Validation
       │
       ▼
  OrderContext.editOrder()
       │
       ▼
  orderService.updateOrder()
       │
       ▼
  Backend API / localStorage
       │
       ▼
  Update OrderContext.orders (find & replace)
       │
       ▼
  Re-render Components
```

### Hủy Đơn Hàng
```
OrderDetail (Click Cancel)
       │
       ▼
  Confirmation Dialog
       │
       ▼
  OrderContext.removeOrder()
       │
       ▼
  orderService.cancelOrder()
       │
       ▼
  Backend API (Mark as cancelled) / localStorage
       │
       ▼
  Update order.status = 'cancelled'
       │
       ▼
  Disable Edit/Cancel buttons
```

## 3. Cấu Trúc Component

```
App.js (Main Component)
├── Header
│   ├── Logo & Title
│   └── Navigation Buttons
│
├── Main Content (Conditional Rendering)
│   ├── OrderList
│   │   ├── FilterControls
│   │   ├── OrderCard (x multiple)
│   │   │   ├── OrderInfo
│   │   │   └── ActionButtons
│   │   └── EmptyState
│   │
│   ├── OrderForm (Create/Edit)
│   │   ├── CustomerInfo Section
│   │   │   ├── Name Input
│   │   │   └── Phone Input
│   │   ├── ProductSelection Section
│   │   │   ├── QuickAddButtons
│   │   │   └── ItemsTable
│   │   ├── OrderDetails Section
│   │   │   ├── OrderSummary
│   │   │   └── StatusSelect
│   │   └── Form Actions
│   │
│   ├── OrderDetail (Modal)
│   │   ├── OrderHeader
│   │   ├── CustomerInfo
│   │   ├── ItemsTable
│   │   ├── Timeline
│   │   ├── Notes
│   │   └── ActionButtons
│   │
│   └── OrderStatusTracker (Dashboard)
│       ├── SummaryCards
│       ├── StatusDistribution
│       ├── StatusFlow
│       └── RecentOrders
│
└── Footer
```

## 4. State Management (Context API)

### OrderContext Structure
```javascript
{
  // Data
  orders: [
    {
      id: string,
      customerName: string,
      customerPhone: string,
      items: [
        { productName: string, quantity: number, price: number }
      ],
      totalPrice: number,
      status: 'pending' | 'processing' | 'completed' | 'cancelled',
      notes: string,
      createdAt: ISO 8601,
      updatedAt: ISO 8601
    }
  ],
  
  // State
  loading: boolean,
  error: string | null,
  
  // Methods
  fetchOrders: () => Promise,
  addOrder: (orderData) => Promise<Order>,
  editOrder: (orderId, updatedData) => Promise<Order>,
  removeOrder: (orderId) => Promise,
  getOrderById: (orderId) => Order | undefined,
  getOrdersByStatus: (status) => Order[]
}
```

## 5. Service Layer

### orderService.js
- Abstraction layer cho API calls
- Có thể dễ dàng thay đổi từ mock → real API
- Error handling & logging
- Request/Response transformation

### mockDataService.js
- Sử dụng localStorage cho development
- Simulate API delay
- CRUD operations trên mock data

## 6. Utility Functions (formatters.js)

```javascript
- formatCurrency(amount)          // Định dạng tiền tệ VND
- formatDateTime(date)             // Định dạng ngày giờ
- formatDate(date)                 // Định dạng ngày
- formatTime(date)                 // Định dạng giờ
- calculateTotalPrice(items)       // Tính tổng tiền
- getStatusColor(status)           // Lấy màu trạng thái
- getStatusLabel(status)           // Lấy nhãn trạng thái
- validateOrderData(orderData)     // Validate form
- generateId()                     // Tạo ID duy nhất
```

## 7. Styling Architecture

### CSS Approach
- **Per-Component CSS** - Mỗi component có file CSS riêng
- **Global CSS** - index.css cho styles chung
- **BEM-like naming** - `.component-name`, `.component-section__item`
- **Responsive** - Mobile-first approach

### Color Scheme
```
Primary:   #3498db (Blue)
Success:   #27ae60 (Green)
Danger:    #e74c3c (Red)
Warning:   #f39c12 (Orange)
Secondary: #2c3e50 (Dark)
Neutral:   #bdc3c7 (Gray)
```

### Breakpoints
```
Mobile:    < 480px
Small:     480px - 768px
Medium:    768px - 1024px
Large:     > 1024px
```

## 8. State Management Flow

```
┌─────────────────────────────────────────────────┐
│          OrderContext Provider (App)            │
│                                                  │
│  ┌───────────────────────────────────────────┐  │
│  │  OrderList (Consume Context)              │  │
│  │  - Display orders                         │  │
│  │  - Filter & Sort                          │  │
│  │  - Trigger onOrderSelect                  │  │
│  └───────────────────────────────────────────┘  │
│                                                  │
│  ┌───────────────────────────────────────────┐  │
│  │  OrderForm (Consume Context)              │  │
│  │  - Call context.addOrder()                │  │
│  │  - Call context.editOrder()               │  │
│  │  - Update local state for form            │  │
│  └───────────────────────────────────────────┘  │
│                                                  │
│  ┌───────────────────────────────────────────┐  │
│  │  OrderDetail (Consume Context)            │  │
│  │  - Display order details                  │  │
│  │  - Call context.removeOrder()             │  │
│  │  - Trigger onEdit callback                │  │
│  └───────────────────────────────────────────┘  │
│                                                  │
│  ┌───────────────────────────────────────────┐  │
│  │  OrderStatusTracker (Consume Context)     │  │
│  │  - Display statistics                     │  │
│  │  - Calculate status distribution          │  │
│  │  - Show recent orders                     │  │
│  └───────────────────────────────────────────┘  │
│                                                  │
└─────────────────────────────────────────────────┘
```

## 9. Rendering Logic

### OrderList Rendering
```javascript
if (loading) → Show Loading Message
if (error) → Show Error Message
if (no orders) → Show Empty State
else → Display Orders Grid
  → Apply Filters
  → Apply Sorting
  → Map to OrderCard Components
```

### OrderForm Rendering
```javascript
existingOrder ?
  → Load existingOrder data into form
  → Show "Cập Nhật Đơn Hàng" title
  → Show Status Select (for edit)
else
  → Empty form
  → Show "Tạo Đơn Hàng Mới" title
  → Hide Status Select
```

### OrderDetail Rendering
```javascript
→ Modal Overlay
→ Order Header with Status Badge
→ Customer Information
→ Items Table
→ Timeline
→ Notes (if exists)
→ Action Buttons
  → Show Edit button if status !== 'completed' && !== 'cancelled'
  → Show Cancel button if status !== 'completed' && !== 'cancelled'
```

## 10. Error Handling Strategy

```
API Error → Service catches error
         → Error message logged
         → Error stored in OrderContext
         → UI shows error notification
         → User can retry

Validation Error → Validator returns errors
                → Errors displayed inline
                → User corrects and resubmits

Network Error → Fetch fails
              → Error caught in service
              → Retry option offered
```

## 11. Performance Optimizations

### Current
- Context API for state (good for small-medium apps)
- Efficient re-rendering via contextual updates
- CSS Grid/Flexbox (no layout shifts)

### Future Improvements
- React.memo() for expensive components
- useMemo() for calculated values
- useCallback() for function props
- Code splitting with React.lazy()
- Service Worker for offline support
- Redux/Recoil if state becomes too complex

## 12. Extensibility Points

### Easy to Add
1. **New Status Types** - Add to status colors/labels
2. **New Filter Options** - Extend OrderList filters
3. **New Product Types** - Expand SAMPLE_PRODUCTS
4. **Additional Fields** - Extend order object
5. **More Utils** - Add to formatters.js

### Moderate Complexity
1. **Authentication** - Add auth service & context
2. **Export/Import** - Add export utilities
3. **Undo/Redo** - Implement via history stack
4. **Notifications** - Add toast/snackbar component

### High Complexity
1. **Real-time Updates** - WebSocket integration
2. **Database Sync** - Backend integration
3. **Analytics** - Tracking & reporting
4. **Advanced Search** - Full-text search

---

## Development Workflow

```
1. Feature Planning
   ├─ Design UI
   └─ Plan data structure
   
2. Implementation
   ├─ Create Component
   ├─ Add to Context (if needed)
   ├─ Create Service (if needed)
   └─ Add Styles
   
3. Testing
   ├─ Manual testing
   ├─ Check responsive design
   └─ Verify data flow
   
4. Integration
   ├─ Connect to Context
   ├─ Update navigation
   └─ Test full flow
   
5. Deployment
   ├─ npm run build
   ├─ Test production build
   └─ Deploy to server
```

---

**Document Version**: 1.0  
**Last Updated**: April 2024
