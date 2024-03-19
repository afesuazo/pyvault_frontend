import {StarIcon, XCircleIcon, TrashIcon, DocumentCheckIcon, ChevronUpDownIcon, PencilIcon} from "@heroicons/react/16/solid";
import {Fragment, useEffect, useState} from "react";
import {CredentialDetailsProps, CredentialEntry, DetailPanelMode} from "@/interfaces";
import {Link, Input, Button, Avatar, Tooltip, Card, CardBody, Image} from "@nextui-org/react";
import {Textarea} from "@nextui-org/input";


const CredentialDetails = ({mode, credential, onSave, onCancel, onDelete} : CredentialDetailsProps ) => {

    const emptyFormData: CredentialEntry = {
        id: 0,
        site: null,
        nickname: '',
        username: '',
        email: '',
        created_at: '',
        modified_at: '',
        encrypted_password: '',
        category: '',
        favorite: false,
        notes: '',
    };

    const [formData, setFormData] = useState<CredentialEntry>(emptyFormData);

    useEffect(() => {
        if (mode === DetailPanelMode.Create) {
            setFormData(emptyFormData);
        } else if (mode === DetailPanelMode.Edit && credential) {
            setFormData(credential);
        }
    }, [mode, credential]);

    useEffect(() => {
        if (mode !== DetailPanelMode.Create && credential) {
            setFormData(credential);
        }
    }, [mode, credential]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        onSave(formData);
    }

    const onCanceled = () => {
        onCancel();
    }

    const onDeleted = () => {
        onDelete(formData);
    }

    const handleChange = (event: any) => {
        const { name, value, checked, type } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Nothing to render when no credential is selected
    if (!credential && mode !== DetailPanelMode.Create) {
        return null;
    }

    const classNames = {
        mainWrapper: "w-full",
        label: "min-w-[100px] mr-4 text-right",
        input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
        ],
        inputWrapper: "bg-neutral-200 my-1 group-data-[focus=true]:bg-neutral-200 data-[hover=true]:bg-neutral-200",
    }

    return (
        <form onSubmit={handleSubmit} className={`bg-neutral-100 justify-between  ${credential || mode === DetailPanelMode.Create ? "border-2" : ""}  drop-shadow-md border-primary-500 rounded-2xl flex flex-col h-full overflow-hidden whitespace-nowrap`}>

            {/* Header */}
            <div className="flex justify-between items-center border-b p-4 my-2">
                <div className="text-2xl font-semibold flex space-x-2 mr-6">
                    <span>
                        <StarIcon
                            className={`h-8 w-8 hover:text-opacity-100 ${credential?.favorite ? "hover:text-opacity-60 text-amber-400" : "text-opacity-60 text-gray-300"}`}/>
                    </span>
                    <Input
                        classNames={{input: "text-2xl"}}
                        name="nickname"
                        placeholder={"Nickname..."}
                        value={formData.nickname}
                        onChange={handleChange}
                        readOnly={mode === 'view'}
                    />
                </div>
                <div className="flex justify-center">
                    {mode === DetailPanelMode.View ? (
                        <Fragment>
                            <Tooltip content="Edit">
                                <Button size={"sm"} isIconOnly className="text-primary-500 hover:text-gray-200 rounded">
                                    <PencilIcon/>
                                </Button>
                            </Tooltip>
                            <Tooltip content="Delete">
                                <Button size={"sm"} onPress={onDeleted} isIconOnly className="text-primary-500 hover:text-gray-200 rounded">
                                    <TrashIcon/>
                                </Button>
                            </Tooltip>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Tooltip content="Save">
                                <Button isIconOnly size={"sm"} type="submit"
                                        className="text-primary-500 hover:text-gray-200 rounded">
                                    <DocumentCheckIcon/>
                                </Button>
                            </Tooltip>
                            <Tooltip content="Cancel">
                                <Button isIconOnly size={"sm"} type="button" onPress={onCanceled}
                                        className="text-primary-500 hover:text-gray-200 rounded">
                                    <XCircleIcon/>
                                </Button>
                            </Tooltip>
                        </Fragment>
                    )}
                </div>
            </div>

            {/* Credential Details */}
            <div className="flex flex-col p-2 grow">

                {/* Credential Details */}
                <div className="flex flex-col pb-10 border-b m-4 mb-0">

                    <Input
                        classNames={classNames}
                        label="Username"
                        labelPlacement={"outside-left"}
                        name="username"
                        value={formData.username}
                        fullWidth={true}
                        onChange={handleChange}
                        readOnly={mode === 'view'}
                    />

                    <Input
                        classNames={classNames}
                        label="Email"
                        labelPlacement={"outside-left"}
                        name="email"
                        value={formData.email}
                        fullWidth={true}
                        onChange={handleChange}
                        readOnly={mode === 'view'}
                    />

                    <Input
                        classNames={classNames}
                        label="Password"
                        // type={isVisible ? "text" : "password"}
                        type={"text"}
                        labelPlacement={"outside-left"}
                        name="encrypted_password"
                        className={"mb-6"}
                        value={formData.encrypted_password}
                        fullWidth={true}
                        onChange={handleChange}
                        readOnly={mode === 'view'}
                    />

                    {mode === DetailPanelMode.View &&
                        <Input
                            classNames={classNames}
                            label="Last Modified"
                            labelPlacement={"outside-left"}
                            name="modified_at"
                            value={formData.modified_at}
                            fullWidth={true}
                            onChange={handleChange}
                            readOnly={true}
                        />
                    }

                    <Textarea
                        label="Notes"
                        name="notes"
                        minRows={2}
                        maxRows={3}
                        classNames={{
                            base: "items-start",
                            label: "min-w-[100px] mr-4 text-right",
                            inputWrapper: "bg-neutral-200 my-1 group-data-[focus=true]:bg-neutral-200 data-[hover=true]:bg-neutral-200",

                        }}
                        cacheMeasurements={true}
                        labelPlacement={"outside-left"}
                        placeholder="Additional comments..."
                        value={formData.notes}
                        onChange={handleChange}
                        readOnly={mode === 'view'}
                    />

                </div>

                {/* Site Details */}
                <Card
                    isBlurred
                    className="flex mt-6 border-none bg-background/60 dark:bg-default-100/50"
                    shadow="sm"
                >
                    <CardBody>
                        <div className="flex gap-4">

                            {/* Site Logo */}
                            <Avatar
                                showFallback
                                radius="lg"
                                classNames={{
                                    base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B] w-20 h-20",
                                }}
                                name={credential?.site?.name || "N/A"}
                            />

                            <div className="flex flex-col flex-grow space-y-0">

                                {/* Action Buttons + Name */}
                                <div className="flex justify-between">
                                    <h2 className="mt-4 text-xl font-bold">{credential?.site?.name || ""}</h2>
                                    <Button
                                        isIconOnly
                                        className="w-6 h-6 text-amber-500 data-[hover]:text-neutral-500 -translate-y-1 translate-x-2"
                                        radius="full"
                                        variant="light"
                                        onPress={() => {
                                        }}
                                    >
                                        <ChevronUpDownIcon
                                            className={`w-6 h-6 ${true ? "[&>path]:stroke-transparent" : ""}`}
                                            fill={true ? "currentColor" : "none"}
                                        />
                                    </Button>
                                </div>

                                {/* Site Details */}
                                { credential?.site ? (
                                    <Link
                                        isBlock
                                        color="primary"
                                        isExternal
                                        showAnchorIcon
                                        className={`pt-0`}
                                        href={credential?.site?.url || "#"}
                                        target="_blank"
                                    >
                                        {credential?.site?.url || "Temp URL"}
                                    </Link>
                                ) : (
                                    <p
                                        className={`text-lg font-bold text-center pr-5 text-gray-500 dark:text-white/60`}
                                    >
                                        No Linked Site
                                    </p>
                                )}

                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

        </form>
    );
}

export default CredentialDetails;