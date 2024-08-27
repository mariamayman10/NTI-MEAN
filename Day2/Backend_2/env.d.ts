declare namespace NodeJS{
    interface ProcessEnv{
        PORT:number,
        readonly DB:string;
        NODE_ENV: string
    }
}