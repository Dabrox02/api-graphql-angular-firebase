import { Router } from "express";
import { crearUsuario, loginUsuario, obtenerUsuarios } from "../controllers/auth.controller.js";
import cors from "cors";

const router = Router();

router.options("/login", cors());
router.post("/login", loginUsuario);
router.options("/signup", cors());
router.post("/signup", crearUsuario);
router.options("/usuarios", cors());
router.get("/usuarios", obtenerUsuarios);

export default router;