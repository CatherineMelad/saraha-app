export const mainException = (message = "Internal server error", cause = 500) => {
  throw new Error(message, { cause });
};

export const notFoundException = (message = "Not found") => {
  mainException(message,  404 );
};

export const badRequestException = (message = "Bad request") => {
  mainException(message, 400);
};

export const conflictException = (message = "Conflict") => {
  mainException(message, 409);
};

export const unauthorizedException = (message = "Unauthorized") => {
  mainException(message, 401);
};

export const forbiddenException = (message = "Forbidden") => {
  mainException(message, 403);
};