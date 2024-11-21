
import path from "path";
import webpack from "webpack";
import { buildWebpack } from "./config/build/buildWebpack";
import { BuildMode, BuildPath, BuildPlatfom } from "./config/build/types/type";


interface EnvVariables {
    mode?: BuildMode;
    port: number;
    analyzer: boolean;
    platform?: BuildPlatfom;
}

export default (env: EnvVariables) => {
    const paths: BuildPath = {
        output: path.resolve(__dirname, 'build'),
        // конфиг того, куда и как будет происходить сборка
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        // Путь к точке входа в приложение
        // Cклеиваем путь, dirname - текущая папка
        // Можно несколько в объекте, название файлов будет соответствовать ключу
        html: path.resolve(__dirname, 'public', 'index.html'),
        public: path.resolve(__dirname, 'public'),
        src: path.resolve(__dirname, 'src')
    }

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths,
        analyzer: env.analyzer,
        platfom: env.platform ?? 'desktop'
    })
    return config;
}