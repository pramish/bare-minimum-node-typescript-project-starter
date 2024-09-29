import { HttpServerService } from "./services/http/HttpServer.Service";

async function startExpressServer() {
  const httpServer = new HttpServerService();
  await httpServer.init();
}

startExpressServer();
