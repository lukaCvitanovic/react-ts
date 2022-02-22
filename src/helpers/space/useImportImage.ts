import { useEffect } from "react";
import last from 'lodash/last';
import first from 'lodash/first';

const useImportImage = (src: string, relativePath: string, imageSetter: Function) => {
    useEffect(() => {
        import('@/assets/images/space/' + relativePath + last(src.split('/'))).then((module) => {
            const path = first(Object.values(module));
            if (typeof path === 'string') imageSetter(path);
        });
    }, [src]);
};

export default useImportImage;