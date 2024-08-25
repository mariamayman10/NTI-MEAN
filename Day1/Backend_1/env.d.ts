declare namespace NodeJS{
    interface ProcessEnv{
        PORT: any;
        readonly DB: string;
    }
}