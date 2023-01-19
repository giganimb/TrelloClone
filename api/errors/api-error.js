module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static Unauthorized(message) {
        return new ApiError(401, message || "Not authorized");
    };

    static Forbidden(message) {
        return new ApiError(403, message || "You don't have enough permissions");
    }

    static NotFound(message) {
        return new ApiError(404, message || "Not Found");
    }

    static UnprocessableEntity(message) {
        return new ApiError(422, message);
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    };
}