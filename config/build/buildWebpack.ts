import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/type';

export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const { mode, paths } = options;
    const isDev = mode === 'development';
    return {
        mode: mode ?? 'development',
        // в каком формате сборка через переменные окружения через package
        entry: paths.entry,
        // Путь к точке входа в приложение
        // Cклеиваем путь, dirname - текущая папка
        // Можно несколько в объекте, название файлов будет соответствовать ключу

        // конфиг того, куда и как будет происходить сборка
        output: {
            path: paths.output,
            filename: '[name].[contenthash].js',
            // Для динамического названия, будет брать хеш от содержимого файла и добавлять в название(меняться будет только при изменение в файлах)
            // Нужно чтобы избежать проблем с кэширование браузера
            clean: true,
            // Очистка папки перед каждой сборкой
        },

        // Плагины
        plugins: buildPlugins(options),

        // Лоадеры
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),

        devtool: isDev ? 'inline-source-map' :'source-map',
        // Для отслеживания ошибок в бандле

        // локальный сервер
        devServer: isDev ? buildDevServer(options) : undefined

    }
}