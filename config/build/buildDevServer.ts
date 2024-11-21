
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
// чтобы компилятор ts не ругался на dev server
import { BuildOptions } from "./types/type";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port ?? 3000,
        open: true,
        historyApiFallback: true,
        // Это настройка нужна, чтобы заработал роутинг( работает только для дев сервера)
        hot: true
        // Обновление кода без перезагрузки страницы(но работает только для чистого js или ts, для реакта надо поставить еще  @pmmmwh/react-refresh-webpack-plugin)
    }
}