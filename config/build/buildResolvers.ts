import { BuildOptions } from './types/type';
import { Configuration } from "webpack";

export function buildResolvers(options: BuildOptions): Configuration['resolve'] {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        // Расширения, которые нужно обработать(при импорте можно не указывать расширения из-за этого)
        alias: {
            '@': options.paths.src
        },
        // Элиасы(абсолютный путь)
    }
}