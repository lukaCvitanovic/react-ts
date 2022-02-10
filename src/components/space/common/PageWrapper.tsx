import { BaseProps } from "@/helpers/types";

const PageWrapper = ({ children, className }: BaseProps) => {
    const pageClass = `p-10 pt-[8.5rem] bg-no-repeat bg-cover ${className}`;

    return (
        <body className={pageClass}>
            {children}
        </body>
    );
};

export default PageWrapper;