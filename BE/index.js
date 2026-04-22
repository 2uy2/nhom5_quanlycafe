require('dotenv').config();
const express      = require('express');
const cors         = require('cors');
const paymentRoutes = require('./src/routes/paymentRoutes');
const errorHandler  = require('./src/middlewares/errorHandler');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────
app.use(cors());
app.use(express.json());

// ── Routes ──────────────────────────────────
app.use('/api/payments', paymentRoutes);

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// ── Error handler ───────────────────────────
app.use(errorHandler);

// ── Start ───────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  Server đang chạy tại http://localhost:${PORT}`);
});
