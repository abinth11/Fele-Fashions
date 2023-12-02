import { Server } from "http";
import ENV_CONFIG from "../../config";

const serverConfig = (server:Server) => {
    const startServer = () => { 
        server.listen(ENV_CONFIG.PORT, () => {
            console.log(`Server listening on Port ${ENV_CONFIG.PORT}`.bgBlue.bold);
        })
    }
    return {
        startServer
    }
}

export default serverConfig