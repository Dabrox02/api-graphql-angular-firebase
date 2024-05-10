export const apiEnviroment = {
    protocol: "https",
    host: "api-graphql-backend-deploy-shhtmlbz7q-ue.a.run.app",
    url: function () {
        return `${this.protocol}://${this.host}`;
    }
}

export const apiEnviromentDev = {
    protocol: "http",
    port: "4000",
    host: "localhost",
    url: function () {
        return `${this.protocol}://${this.host}:${this.port}`;
    }
}