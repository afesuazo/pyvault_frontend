import {useCallback, useMemo, useState} from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    SortDescriptor, Button,
} from "@nextui-org/react";
import {StarIcon} from "@heroicons/react/16/solid";

const CredentialTable = ({ dataColumns, data, selectedCredential, onCredentialSelect } : CredentialTableProps) => {

    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [page, setPage] = useState(1);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "site",
        direction: "ascending",
    });

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return data.slice(start, end);
    }, [page, data, rowsPerPage]);

    const sortedItems = useMemo(() => {
        return [...items].sort((a: CredentialEntry, b: CredentialEntry) => {
            // @ts-ignore
            let first = sortDescriptor.column === 'site' ? a.site.name.toLowerCase() : a[sortDescriptor.column];
            // @ts-ignore
            let second = sortDescriptor.column === 'site' ? b.site.name.toLowerCase() : b[sortDescriptor.column];

            const cmp = first < second ? -1 : first > second ? 1 : 0;
            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const classNames = {
            wrapper: ["h-full rounded-none bg-gray-300 overflow-x-hidden"],
            th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
            tr: ["hover:bg-gray-400 border-b-1 cursor-pointer"],
            td: [
                "first:rounded-l-xl",
                // first
                "group-data-[first=true]:first:before:rounded-none",
                "group-data-[first=true]:last:before:rounded-none",
                // middle
                "group-data-[middle=true]:before:rounded-none",
                // last
                "group-data-[last=true]:first:before:rounded-none",
                "group-data-[last=true]:last:before:rounded-none",
            ],
    }

    const renderCell = useCallback((credential: CredentialEntry, columnKey: any) => {
        const cellValue = credential[columnKey as keyof CredentialEntry];

        switch (columnKey) {
            case "site":
                return (
                    <div className="flex items-center space-x-2">
                        <div className="mr-2 border-2 rounded-2xl p-1 shadow-md">
                            <img
                                src={`/${credential.site?.icon}`}
                                alt={credential.site?.name}
                                className="w-6 h-6 rounded-full"
                            >
                            </img>
                        </div>
                        <span className="hidden md:block">{credential.site?.name}</span>
                    </div>
                );
            case "nickname":
                return (
                    <div className="text-center">
                        <div className="font-semibold">{credential.nickname}</div>
                        <div className="border-b w-1/4 m-auto"></div>
                        <div className="text-sm text-gray-600">{credential.username}</div>
                    </div>
                );
            case "favorite":
                return (
                    <div className="hidden lg:block text-right">
                        <Button isIconOnly size="sm" className="bg-transparent">
                            <StarIcon className={`hover:text-opacity-100 ${credential.favorite ? "hover:text-opacity-60 text-amber-400" : "text-opacity-60 text-gray-400"}`}/>
                        </Button>
                    </div>

                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div className="overflow-x-hidden">
            <Table
                aria-label="Example table with custom cells, pagination and sorting"
                isHeaderSticky
                // bottomContent={bottomContent}
                bottomContentPlacement="outside"
                classNames={classNames}
                selectionMode="none"
                sortDescriptor={sortDescriptor}
                // topContent={topContent}
                topContentPlacement="outside"
                onSortChange={setSortDescriptor}
            >
                <TableHeader columns={dataColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.key}
                            align={"center"}
                            allowsSorting={column.sortable}
                        >
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No records found"} items={sortedItems}>
                    {(item) => (
                        <TableRow onClick={() => onCredentialSelect(item)} key={item.id} className={`transition-all duration-1000 ease-in-out transform ${selectedCredential?.id === item.id ? 'translate-x-4 bg-gray-400' : 'translate-x-0'}`}>
                            {(columnKey) => <TableCell
                                className={`${selectedCredential?.id === item.id ? '' : 'last:rounded-r-xl'}`}
                            >
                                {/* @ts-ignore*/ }
                                {renderCell(item, columnKey)}
                            </TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default CredentialTable;