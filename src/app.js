import express from "express";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import { Server } from 'socket.io';
import { __dirname } from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/users.router.js";
import routerP from './routes/products.router.js';
import routerC from './routes/carts.router.js';
import session from "express-session";
import Filestore from "session-file-store";
import mongoStore from "connect-mongo";
import databaseConnection from "./config/db.js"

//socketservers
import socketProducts from "./listeners/socketProducts.js"
import socketChat from './listeners/socketChat.js';


const app = express();
const PORT = 3000;

app.use(express.static(__dirname+"/public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session file
// const fileStore = FileStore(session);
// app.use(
//   session({
//     secret: "SESSIONSECRETKEY",
//     cookie: {
//       maxAge: 60 * 60 * 1000,
//     },
//     store: new fileStore({
//       path: __dirname + "/sessions",
//     }),
//   })
// );

// session mongo
const URI =
"mongodb+srv://joaquin:lajori848@codercluster.hkzyxhs.mongodb.net/ecommerce?retryWrites=true&w=majority";
app.use(
  session({
    secret: "SESSIONSECRETKEY",
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    store: new mongoStore({
      mongoUrl: URI,
    }),
  })
);

// handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// routes
app.use("/api/users", usersRouter);
app.use('/api/products', routerP)
app.use('/api/carts', routerC)
app.use("/", viewsRouter);

databaseConnection()

const httpServer = app.listen(PORT, () => {
    try {
        console.log(`Listening to the port ${PORT}\nAcceder a:`);
        console.log(`\t1). http://localhost:${PORT}/api/products`)
        console.log(`\t2). http://localhost:${PORT}/api/carts`);
    }
    catch (err) {
        console.log(err);
    }
});

const socketServer = new Server(httpServer)

socketProducts(socketServer)
socketChat(socketServer)
//  socketServer.on('connection',socket=>{
//     socketChat(socketServer,socket);
//  })

//app.listen(3000, () => {
//  console.log("Server is running on port 3000");
//});