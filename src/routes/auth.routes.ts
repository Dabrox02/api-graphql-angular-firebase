import { Router } from "express";
import { crearUsuario, loginUsuario, obtenerUsuarios } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", loginUsuario);
router.get("/usuarios", obtenerUsuarios);
router.post("/crearUsuario", crearUsuario);

export default router;