export const APP_CONFIG = {
    DEFAULT_PORT: 3000,
    API_PREFIX: '',
    CORS: {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    },
    VALIDATION: {
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    },
} as const;
