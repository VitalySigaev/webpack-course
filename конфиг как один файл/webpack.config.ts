// const path = require("path");
// // Для работы с путями
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// // Для того, чтобы в html файл подключался js файл после сборки динамически(путь до js)
// const webpack = require('webpack');
// на js расширении

import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
// что компилятор ts не ругался на dev server
import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

type Mode = 'production' | 'development';

interface EnvVariables {
    mode: Mode;
    port: number;
}

export default (env: EnvVariables) => {

    const isDev = env.mode === 'development';

    const config: webpack.Configuration = {
        mode: env.mode ?? 'development',
        // в каком формате сборка через переменные окружения через package
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        // Путь к точке входа в приложение
        // Cклеиваем путь, dirname - текущая папка
        // Можно несколько в объекте, название файлов будет соответствовать ключу

        // конфиг того, куда и как будет происходить сборка
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            // Для динамического названия, будет брать хеш от содержимого файла и добавлять в название(меняться будет только при изменение в файлах)
            // Нужно чтобы избежать проблем с кэширование браузера
            clean: true,
            // Очистка папки перед каждой сборкой
        },

        // Плагины
        plugins: [
            // экземпляры класса
            new HtmlWebpackPlugin(
                { template: path.resolve(__dirname, 'public', 'index.html') }
                // ссылка до html
            ),
            // Для того, чтобы в html файл подключался js файл после сборки динамически(путь до js)
            isDev && new webpack.ProgressPlugin(),
            // Прогресс сборки в терминале показывает

            !isDev && new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css'
            })
            // Для того, чтобы стили обрабатывались как css, а не как js строки(в папки build после сборки появится файлик css с стилями)
        ].filter(Boolean),

        // Лоадеры
        module: {
            rules: [
                // Лоадер стилей, css и scss, ПОРЯДОК ИМЕЕТ ЗНАЧЕНИЕ
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
                {
                    // ts-loader умеет работать с JSX
                    // Если бы не использовали typescript: нужен был бы babel-loader
                    test: /\.tsx?$/,
                    // Название(расширение) файлов, которые нужно обработать(тут ts и tsx)
                    use: 'ts-loader',
                    // Название лоадера
                    exclude: /node_modules/,
                    // Что мы не обрабатываем
                },
                // Лоадер
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            // Расширения, которые нужно обработать(при импорте можно не указывать расширения из-за этого)
        },

        devtool: isDev && 'inline-source-map',
        // Для отслеживания ошибок в бандле

        // локальный сервер
        devServer: isDev ? {
            port: env.port ?? 3000,
            open: true
        } : undefined

    };
    return config;
}