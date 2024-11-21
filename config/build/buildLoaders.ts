import { ModuleOptions, runtime } from "webpack";
import { BuildOptions } from "./types/type";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypescript from 'react-refresh-typescript';
import { buildBabelLoader } from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development';
    // Лоадер для css и поддержки модулей
    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
                // Формирование имени класса
            }
        }
    }

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    };
    // Лоадер изображений

    const svgrLoader = {
        test: /\.svg$/i,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true
                                    // чтобы svg красилось
                                }
                            }
                        ]
                    }
                }
            }],
    };
    // Для свг(из свг создаются компоненты) опции надо чекать шо там

    const scssLoader = {
        // Лоадер стилей, css и scss, ПОРЯДОК ИМЕЕТ ЗНАЧЕНИЕ
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            cssLoaderWithModules
            ,
            // Compiles Sass to CSS
            "sass-loader",
        ],
    };




    const tsLoader = {
        // ts-loader умеет работать с JSX(производит компиляцию)
        // Если бы не использовали typescript: нужен был бы babel-loader
        exclude: /node_modules/,
        // Что мы не обрабатываем
        test: /\.tsx?$/,
        // Название(расширение) файлов, которые нужно обработать(тут ts и tsx)
        use: [
            {
                loader: 'ts-loader',
                // Название лоадера
                options: {
                    transpileOnly: true,
                    // Опция, чтобы проверка типов в ts проходила отдельно и не задерживала сборку(время сборки)
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypescript()].filter(Boolean)
                    })
                    // Нужен для работы изменений без перезагрузки страницы
                }
            }
        ]
    };

    // Компилятор babel
    const babelLoader = buildBabelLoader(options);


    return [
        assetLoader,
        scssLoader,
        // tsLoader,
        babelLoader,
        svgrLoader
    ]
}