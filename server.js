const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Product  = require("./models/productModel");
const Employee = require("./models/employeeModel");
const Project  = require("./models/projectModel");
const Order    = require("./models/orderModel");
const Payment  = require("./models/paymentModel");

const app = express();
app.use(cors());
app.use(express.json());

// ── DB ──────────────────────────────────────────────────────────────────────
mongoose.connect("mongodb://127.0.0.1:27017/stockflow")
  .then(() => console.log("✅  MongoDB connected"))
  .catch(err => console.error("❌  MongoDB error:", err));

// ── PRODUCTS ────────────────────────────────────────────────────────────────
app.get   ("/products",     async (_, res) => res.json(await Product.find()));
app.post  ("/products",     async (req, res) => { const d = await new Product(req.body).save(); res.json(d); });
app.put   ("/products/:id", async (req, res) => res.json(await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete("/products/:id", async (req, res) => { await Product.findByIdAndDelete(req.params.id); res.json({ ok: true }); });

// ── EMPLOYEES ───────────────────────────────────────────────────────────────
app.get   ("/employees",     async (_, res) => res.json(await Employee.find()));
app.post  ("/employees",     async (req, res) => { const d = await new Employee(req.body).save(); res.json(d); });
app.put   ("/employees/:id", async (req, res) => res.json(await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete("/employees/:id", async (req, res) => { await Employee.findByIdAndDelete(req.params.id); res.json({ ok: true }); });

// ── PROJECTS ─────────────────────────────────────────────────────────────────
app.get   ("/projects",     async (_, res) => res.json(await Project.find()));
app.post  ("/projects",     async (req, res) => { const d = await new Project(req.body).save(); res.json(d); });
app.put   ("/projects/:id", async (req, res) => res.json(await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete("/projects/:id", async (req, res) => { await Project.findByIdAndDelete(req.params.id); res.json({ ok: true }); });

// ── ORDERS ───────────────────────────────────────────────────────────────────
app.get   ("/orders",     async (_, res) => res.json(await Order.find().sort({ createdAt: -1 })));
app.post  ("/orders",     async (req, res) => { const d = await new Order(req.body).save(); res.json(d); });
app.put   ("/orders/:id", async (req, res) => res.json(await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete("/orders/:id", async (req, res) => { await Order.findByIdAndDelete(req.params.id); res.json({ ok: true }); });

// ── PAYMENTS ──────────────────────────────────────────────────────────────────
app.get   ("/payments",     async (_, res) => res.json(await Payment.find().sort({ createdAt: -1 })));
app.post  ("/payments",     async (req, res) => { const d = await new Payment(req.body).save(); res.json(d); });
app.put   ("/payments/:id", async (req, res) => res.json(await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete("/payments/:id", async (req, res) => { await Payment.findByIdAndDelete(req.params.id); res.json({ ok: true }); });

// ── DASHBOARD STATS ──────────────────────────────────────────────────────────
app.get("/stats", async (_, res) => {
  const [products, employees, projects, orders, payments] = await Promise.all([
    Product.countDocuments(),
    Employee.countDocuments(),
    Project.countDocuments(),
    Order.countDocuments(),
    Payment.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }])
  ]);
  res.json({
    products,
    employees,
    projects,
    orders,
    totalPayments: payments[0]?.total || 0
  });
});

app.listen(3000, () => console.log("🚀  StockFlow server → http://localhost:3000"));
