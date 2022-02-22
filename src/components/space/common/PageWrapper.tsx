import { BaseProps } from "@/helpers/types";

type PageWrapperProps = {
    paddingX?: boolean
};

const PageWrapper = ({ children, className, paddingX = true }: PageWrapperProps & BaseProps) => {
    const pageClass = `${(paddingX ? 'px-6 md:px-10' : '')} pb-6 md:pb-10 pt-[8.5rem] bg-no-repeat bg-cover ${className}`;

    return (
        <body className={pageClass}>
            {children}
        </body>
    );
};

export default PageWrapper;