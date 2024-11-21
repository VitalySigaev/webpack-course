declare module '*.module.scss' {
    interface IClassNames {
        [classname: string]: string;
    }
    const classNames: IClassNames
    export = classNames
}

// Для того чтобы работали модули

declare module '*png'
declare module '*jpeg'
declare module '*jpg'
declare module "*.svg" {
    import React from "react";
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}
//  Для typescript, чтобы подсказска для пропсов была
// Для изображений


declare const __PLATFORM__: 'desktop' | 'mobile';
declare const __ENV__: 'production' | 'development';