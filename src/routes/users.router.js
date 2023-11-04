import { Router } from "express";
import { usersManager } from "../dao/managers/usersManagerMongo.js";
import passport from "passport";

const router = Router();

// files
// router.post("/", (req, res) => {
//   const { email, password } = req.body;
//   req.session["email"] = email;
//   res.send("Usuario loggeado");
// });

// mongo

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const userDB = await usersManager.findByEmail(email);
    if (!userDB) {
      return res.json({ error: "This email does not exist" });
    }
    req.session["email"] = email;
    req.session["first_name"] = userDB.first_name;
    if (email === "adminCoder@coder.com" && password === "Cod3r123") {
      req.session["isAdmin"] = true;
    }
    res.redirect("/home");
  });
  
  router.post("/signup", async (req, res) => {
    const createdUser = await usersManager.createOne(req.body);
    res.status(200).json({ message: "User created", createdUser });
  });

// GITHUB

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github",
  passport.authenticate("github", {
    failureRedirect: "/error",
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/home");
  }
);

router.get("/:idUser", async (req, res) => {
  const { idUser } = req.params;
  try {
    const user = await usersManager.getById(idUser);
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    res.status(500).json({ error });
  }
}); 
  export default router;