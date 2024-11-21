import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { Configuration, DefinePlugin } from "webpack";
import webpack from "webpack";
import { BuildOptions } from "./types/type";
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin'

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
    const isDev = options.mode === 'development';
    const plugins: Configuration['plugins'] = [
        // экземпляры класса
        new HtmlWebpackPlugin(
            { template: options.paths.html, favicon: path.resolve(options.paths.public, 'favicon.ico') }
            // ссылка до html и настройка для favicon
        ),
        // Для того, чтобы в html файл подключался js файл после сборки динамически(путь до js)

        new DefinePlugin({
            __PLATFORM__: JSON.stringify(options.platfom),
            __ENV__: JSON.stringify(options.mode)
        }),
        // Подменяет глобальные переменные, которые используем в коде на те значения, которые задаем на этапе сборки


    ];
    if (isDev) {
        plugins.push(new webpack.ProgressPlugin())
        // Прогресс сборки в терминале показывает
        new ForkTsCheckerWebpackPlugin()
        // Выносит проверку типов отдельным процессом(не нагружает сборку)
        plugins.push(new ReactRefreshWebpackPlugin())
        // Нужен для работы изменений без перезагрузки страницы
    }

    if (!isDev) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }));
        // Для того, чтобы стили обрабатывались как css, а не как js строки(в папки build после сборки появится файлик css с стилями)

        plugins.push(new CopyPlugin({
            patterns: [
                { from: path.resolve(options.paths.public, 'locales'), to: path.resolve(options.paths.output, 'locales') }
            ]
        }))
        // Копирование файлов в бандл

    }

    if (options.analyzer) {
        plugins.push(new BundleAnalyzerPlugin())
        // Анализ бандла(размеры чанков и тд)
    }
    return plugins;
}