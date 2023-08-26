import {
  login,
  register,
  failRegister,
  failLogin,
  github,
  githubCallback,
  reset,
  logout,
} from "../controllers/user.controller.js";
import { Router } from "express";
import passport from "passport";

const router = Router();

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "fail-login" }),
  login
);

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "fail-register" }),
  register
);

router.get("/fail-register", failRegister);

router.get("fail-login", failLogin);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  github
);

router.get(
  "/github-callback",
  passport.authenticate("github", { scope: ["user:email"] }),
  githubCallback
);

router.get("/reset", reset);

router.get("logout", logout);

export default router;
