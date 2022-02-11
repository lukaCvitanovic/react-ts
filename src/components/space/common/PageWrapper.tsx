import { BaseProps } from "@/helpers/types";

const PageWrapper = ({ children, className }: BaseProps) => {
    const pageClass = `px-6 pb-6 md:px-10 md:pb-10 pt-[8.5rem] bg-no-repeat bg-cover ${className}`;

    return (
        <body className={pageClass}>
            {children}
        </body>
    );
};

export default PageWrapper;