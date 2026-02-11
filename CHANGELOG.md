# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-11

### Added
- Initial release of NestJS CRUD Module
- Dynamic module registration with `CrudModule.register()`
- Bulk registration with `CrudModule.registerMany()`
- TypeORM entity support
- DTO support for create, update, and replace operations
- Guards, filters, and interceptors support
- Custom service support
- Route enable/disable configuration
- Full @dataui/crud integration
- Comprehensive documentation and examples
- TypeScript support with full type definitions

### Features
- Automatic CRUD endpoint generation
- Advanced query support (filtering, sorting, pagination, joins)
- Validation with class-validator
- Transformation with class-transformer
- Extensible service layer
- Configurable controller decorators

[1.0.0]: https://github.com/your-org/nestjs-crud-module/releases/tag/v1.0.0
