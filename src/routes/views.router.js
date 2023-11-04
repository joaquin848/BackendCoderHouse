import { Router } from "express";
import ProductManager from "../dao/managers/productManagerMongo.js"
const pm = new ProductManager()

const router = Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/home", (req, res) => {
  console.log("req", req);
  const { email, first_name } = req.session;
  res.render("home", { email, first_name });
});

router.get("/error", (req, res) => {
    res.render("error");
  });

router.get("/",async(req,res)=>{
    const listadeproductos=await pm.getProductsView()
    res.render("home",{listadeproductos})
});

router.get("/realtimeproducts",(req,res)=>{
res.render("realtimeproducts");
});

router.get("/chat",(req,res)=>{
res.render("chat")
});

export default router;