import { BuildOptions } from "../types/type";
import { removeDataTestIdBabelPlugin } from "./removeDataTestIdBabelPlugin";

export function buildBabelLoader(options: BuildOptions) {
    const isDev = options.mode === 'development';
    const isProd = options.mode === 'production';
    const plugins = [];
    if (isProd) {
        plugins.push([
            removeDataTestIdBabelPlugin, {
                props: ['data-testid']
            }
        ])
    }
    return {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-typescript',
                    // Для работы typescript
                    [
                        '@babel/preset-react', {
                            runtime: isDev ? 'automatic' : 'classic'
                        }
                    ]
                    //  Для работы jsx,tsx + в объекте решение ошибки(react not defined)
                ],
                plugins: plugins.length ? plugins : undefined
                // Плагин, чтобы в сборке в проде не было data-testid
            },
        }
    }
}