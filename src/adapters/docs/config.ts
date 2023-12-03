import { Application,Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../../package.json";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fele fashions api docs",
      version,
    },   
  },
  apis: ["./src/adapters/docs/*.yaml"],   
};     
    
const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Application, port: string) {

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
 
  console.log(`Docs are available at http://localhost:${port}/docs`.bgYellow.bold)
}

export default swaggerDocs;