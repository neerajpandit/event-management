class ApiResponse {
    // constructor(
    //     statusCode,
    //     data = null,
    //     modelName = "data",
    //     message = "Success",
    //     accessToken = null,
    //     refreshToken = null
    // ) {
    //     this.status = statusCode < 400;
    //     this.statusCode = statusCode;
    //     this.message = message;
    //     if (
    //         data !== null &&
    //         data !== undefined &&
    //         (typeof data === "object" ? Object.keys(data).length > 0 : true)
    //     ) {
    //         this[modelName] = data;
    //     }
    //     if (accessToken) {
    //         this.accessToken = accessToken;
    //     }
    //     if (refreshToken) {
    //         this.refreshToken = refreshToken;
    //     }
    // }
    constructor(statusCode, data, message = 'Success') {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
      }
}

export { ApiResponse };

