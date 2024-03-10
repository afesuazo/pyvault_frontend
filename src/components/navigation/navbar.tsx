"use client";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
    Input, Button, Skeleton
} from "@nextui-org/react";
import {PlusIcon, LockClosedIcon} from "@heroicons/react/16/solid";
import {useSession} from "next-auth/react";

export default function TopNavbar( {currentSearchValue, onSearchChange, onClear} : NavbarProps) {

    const {data: session} = useSession();

    if (!session || !session.user) {
        return;
    }

    return (
        <Navbar isBordered maxWidth="full" className="px-2">
            <NavbarContent as="div" className="justify-between hidden sm:flex gap-4" justify="center">
                <NavbarBrand>
                    <p className="font-bold text-inherit">PYVAULT</p>
                </NavbarBrand>
                <NavbarItem>
                    <Input
                        isClearable
                        className="w-full mr-20"
                        placeholder="Search by nickname..."
                        value={currentSearchValue}
                        onClear={onClear}
                        onValueChange={onSearchChange}
                    />
                </NavbarItem>
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                <NavbarItem>
                    <Button
                        className={"bg-gray-400 px-6 text-center"}
                        disableRipple={true}
                        onClick={() => {
                            console.log("Add New Credential")
                        }}
                        endContent={<PlusIcon className={"w-[24px] h-[24px] text-black"}/>}>
                        Add New
                    </Button>
                </NavbarItem>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            name={session?.user?.name ? session.user.name : "0"}
                            size="md"
                            src=""
                        />
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Profile Actions"
                        variant="flat">
                        <DropdownItem
                            key="logout"
                            startContent={<LockClosedIcon className={"w-4 h-4"} />}
                        >
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}
