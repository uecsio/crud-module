import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch()
export class TestExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    // Mock implementation
  }
}
