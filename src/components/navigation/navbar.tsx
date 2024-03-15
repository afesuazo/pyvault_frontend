"use client";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
    Button
} from "@nextui-org/react";
import {PlusIcon, LockClosedIcon} from "@heroicons/react/16/solid";
import {useSession} from "next-auth/react";
import {NavbarProps} from "@/interfaces";

export default function TopNavbar( {onCreateNewCredential}: NavbarProps ) {

    const {data: session} = useSession();

    if (!session || !session.user) {
        return;
    }

    return (
        <Navbar maxWidth="full" className="px-2 bg-neutral-200">
            <NavbarContent as="div" className="justify-between hidden sm:flex gap-4" justify="center">
                <NavbarBrand>
                    <p className="font-bold text-inherit">PYVAULT</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                <NavbarItem>
                    <Button
                        className={"bg-primary-500 px-6 text-center"}
                        disableRipple={true}
                        onClick={onCreateNewCredential}
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
