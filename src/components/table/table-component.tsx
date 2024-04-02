import { ComponentProps } from "react";

interface TableComponentProps extends ComponentProps<'table'> {}

export function TableComponent(props: TableComponentProps) {
    return(
        <>
        <div className="mx-3 border border-white/10 rounded-lg">
            <table className="w-full" {...props}></table>
        </div>
        </>
    );
}
