import {ChangeEvent, useCallback, useMemo, useState} from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    SortDescriptor, Button, Dropdown, DropdownTrigger, DropdownMenu, Pagination, Input, Avatar,
} from "@nextui-org/react";
import {StarIcon} from "@heroicons/react/16/solid";
import {CredentialEntry, CredentialTableProps} from "@/interfaces";
import {Key} from "@react-types/shared";

const CredentialTable = ({dataColumns, data, selectedCredential, onCredentialSelect}: CredentialTableProps) => {

    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState("");
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "nickname",
        direction: "ascending",
    });

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return data.slice(start, end);
    }, [page, data, rowsPerPage]);

    const filteredItems = useMemo(() => items.filter(credential =>
        credential.nickname.toLowerCase().includes(searchInput.toLowerCase())
    ), [items, searchInput]);

    const sortedItems = useMemo(() => {
        return [...filteredItems].sort((a: CredentialEntry, b: CredentialEntry) => {
            // @ts-ignore
            let first = sortDescriptor.column === 'site' ? a.site?.name.toLowerCase() : a[sortDescriptor.column];
            // @ts-ignore
            let second = sortDescriptor.column === 'site' ? b.site?.name.toLowerCase() : b[sortDescriptor.column];

            const cmp = first < second ? -1 : first > second ? 1 : 0;
            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, filteredItems]);

    const renderCell = useCallback((credential: CredentialEntry, columnKey: any) => {
        const cellValue = credential[columnKey as keyof CredentialEntry];

        switch (columnKey) {
            case "site":
                return (
                    <div className="flex items-center space-x-2 bg-purpl">
                        <Avatar
                            showFallback
                            radius="lg"
                            classNames={{
                                base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                            }}
                            name={credential.site?.name || "N/A"}
                            size="md"
                        />
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
                            <StarIcon
                                className={`hover:text-opacity-100 ${credential.favorite ? "hover:text-opacity-60 text-amber-400" : "text-opacity-60 text-gray-400"}`}/>
                        </Button>
                    </div>

                );
            default:
                return cellValue;
        }
    }, []);

    const onRowsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = useCallback((value?: string) => {
        if (value) {
            setSearchInput(value);
        } else {
            setSearchInput('');
        }
    }, []);

    const onClear = useCallback(() => {
        setSearchInput("")
    }, [])

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4 pt-2">
                <div className="flex justify-between items-center">
                    <Input
                        isClearable
                        className="w-1/3"
                        placeholder="Search by nickname..."
                        value={searchInput}
                        onClear={onClear}
                        onValueChange={onSearchChange}
                    />
                    <span className="text-default-400 text-small">Total {filteredItems.length} users</span>
                </div>
            </div>
        );
    }, [
        searchInput,
        onRowsPerPageChange,
        filteredItems.length,
    ]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const onNextPage = useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const bottomContent = useMemo(() => {
        return (
            <div className="text-secondary-500 py-2 px-4 flex justify-between items-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button className="bg-neutral-500" isDisabled={pages === 1} size="sm" variant="flat"
                            onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button className="bg-neutral-500" isDisabled={pages === 1} size="sm" variant="flat"
                            onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [items.length, page, pages]);

    const classNames = {
        wrapper: ["bg-neutral-100 h-full rounded-md overflow-x-hidden shadow-none p-0"],
        th: ["bg-neutral-500", "text-secondary-500", "last:text-end", "[&:nth-child(2)]:text-center"],
        tr: ["hover:bg-neutral-500", "border-b-1", "cursor-pointer", "data-[hover=true]:border-b-0", "data-[selected=true]:bg-primary-500", "data-[selected=true]:transition-color", "data-[selected=true]:duration-5000", "data-[selected=true]:ease-in-out"],
        td: ["first:rounded-l-md", "last:rounded-r-md",],
    }

    const onSelectCredential = useCallback( (selected: 'all' | Set<Key>) => {
        console.log(selected);
        if (selected === 'all') { return }

        // If set is empty, call onCredentialSelect with current selectedCredential
        if (selected.size === 0 && selectedCredential) {
            console.log("No new selection");
            onCredentialSelect(selectedCredential);
            return;
        }

        const newSelectedCredential = data.find(credential => credential.id === Array.from(selected)[0]);
        if (newSelectedCredential) {
            console.log("New selection", newSelectedCredential);
            onCredentialSelect(newSelectedCredential);
        }
    },[selectedCredential, data, onCredentialSelect])

    return (
        <div className="mx-4 py-2 overflow-hidden h-full flex">
            <Table
                aria-label={"Credential Table"}
                layout={"fixed"}
                isHeaderSticky
                allowDuplicateSelectionEvents={true}
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                classNames={classNames}
                selectionBehavior={"replace"}
                selectionMode="single"
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="outside"
                onSortChange={setSortDescriptor}
                onSelectionChange={onSelectCredential}
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
                        <TableRow>
                            {(columnKey) => <TableCell>
                                {/* @ts-ignore*/}
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