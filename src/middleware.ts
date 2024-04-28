import { LogService } from './log';

const GENERIC_ERRROR = 1;

export class CustomError {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

export const errorMiddleware = <T>(callback: () => void): T => {
  try {
    return callback() as T;
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      LogService.error(error.message);
      process.exit(GENERIC_ERRROR);
    }

    throw error;
  }
};
