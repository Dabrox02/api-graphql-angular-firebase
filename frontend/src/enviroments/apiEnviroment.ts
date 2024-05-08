export const apiEnviroment = {
    protocol: "http",
    port: "4000",
    host: "localhost",
    url: function () {
        return `${this.protocol}://${this.host}:${this.port}`;
    }
}