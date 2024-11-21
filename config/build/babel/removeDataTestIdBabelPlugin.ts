import { PluginItem } from "@babel/core";

export function removeDataTestIdBabelPlugin(): PluginItem {
    return {
        visitor: {
            Program(path, state) {
                const forbiddenProps = state.opts.props || [];
                // Опции, которые будем передавать(запрещенные пропсы)
                path.traverse({
                    JSXIdentifier(current) {
                        const nodeName = current.node.name;
                        if (forbiddenProps.includes(nodeName)) {
                            current.parentPath.remove();
                        }
                    }
                })
                // ищем нужно ноду и ее обрабатываем
            }
        }
    }
}
// Нужен для того, что удалить из дерева(верстки) тест айди
// Тут работаем с нодами из абстрактного дерева