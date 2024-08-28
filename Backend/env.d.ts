declare namespace NodeJS{
    interface ProcessEnv{
        readonly PORT:number,
        readonly DB:string;
        readonly NODE_ENV: string
        readonly BASE_URL: string,
        readonly JWT_SECRET_KEY: string,
        readonly JWT_EXPIRE_TIME: string,
    }
}