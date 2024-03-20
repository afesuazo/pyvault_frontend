import {
    StarIcon,
    XCircleIcon,
    TrashIcon,
    DocumentCheckIcon,
    PencilIcon,
} from "@heroicons/react/16/solid";
import {Fragment, useEffect, useState} from "react";
import {CredentialDetailsProps, CredentialEntry, DetailPanelMode, Site, SiteFieldProps} from "@/interfaces";
import {
    Link,
    Input,
    Button,
    Avatar,
    Tooltip,
    Card,
    CardBody,
    Autocomplete,
    AutocompleteItem
} from "@nextui-org/react";
import {Textarea} from "@nextui-org/input";
import {useFilter} from "@react-aria/i18n";


const CredentialDetails = ({availableSites, mode, credential, onSave, onCancel, onDelete}: CredentialDetailsProps) => {

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
    const [value, setValue] = useState(credential?.site?.id || "");

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
        const {name, value, checked, type} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSiteChange = (value: any) => {
        setValue(value);
        let site = availableSites.find((site) => site.id == value);
        setFormData((prevData) => ({
            ...prevData,
            site: site || null,
        }));
    }

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
        <form onSubmit={handleSubmit}
              className={`bg-neutral-100 justify-between  ${credential || mode === DetailPanelMode.Create ? "border-2" : ""}  drop-shadow-md border-primary-500 rounded-2xl flex flex-col h-full overflow-hidden whitespace-nowrap`}>

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
                                <Button size={"sm"} onPress={onDeleted} isIconOnly
                                        className="text-primary-500 hover:text-gray-200 rounded">
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
                        <div className="flex gap-6">

                            { mode === DetailPanelMode.View ? (
                                <Avatar
                                    showFallback
                                    radius="lg"
                                    classNames={{
                                        base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B] w-20 h-20"
                                    }}
                                    name={credential?.site?.name || "N/A"}
                                    src={credential?.site?.icon}
                                />
                                ) : (
                                    <Avatar
                                        showFallback
                                        radius="lg"
                                        classNames={{
                                            base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B] w-20 h-20",
                                        }}
                                        name={formData.site?.name || "N/A"}
                                        src={formData.site?.icon}
                                    />
                            )}

                            <div className="flex flex-col flex-grow justify-center space-y-0">

                                {/* Action Buttons + Name */}
                                {mode === DetailPanelMode.View ? (
                                        credential?.site ? (
                                            <Fragment>
                                                <h2 className="text-xl font-bold">{credential.site.name}</h2>
                                                <Link
                                                    isBlock
                                                    color="primary"
                                                    isExternal
                                                    showAnchorIcon
                                                    className={`text-secondary-400 pt-0 pl-0 text-sm`}
                                                    href={credential?.site?.url}
                                                    target="_blank"
                                                >
                                                    {credential?.site?.url}
                                                </Link>
                                            </Fragment>
                                        ) : (
                                            <p className={`text-lg font-bold text-center pr-5 text-gray-500 dark:text-white/60`}>
                                                No Linked Site
                                            </p>
                                        )
                                    )
                                    : (
                                        <div>
                                            <div className="flex justify-between">
                                                <Autocomplete
                                                    fullWidth={true}
                                                    items={availableSites}
                                                    selectedKey={value}
                                                    placeholder="Select a site"
                                                    labelPlacement="inside"
                                                    classNames={{
                                                        base: "font-bold border-2 rounded-lg",
                                                    }}
                                                    onSelectionChange={handleSiteChange}
                                                >
                                                    {(site) => (
                                                        <AutocompleteItem key={site.id} textValue={site.name}>
                                                            <div className="flex gap-2 items-center">
                                                                <Avatar alt={site.name} className="flex-shrink-0"
                                                                        size="sm" src={site.icon}/>
                                                                <div className="flex flex-col">
                                                                    <span className="text-small">{site.name}</span>
                                                                    <span
                                                                        className="text-tiny text-default-400">{site.url}</span>
                                                                </div>
                                                            </div>
                                                        </AutocompleteItem>
                                                    )}
                                                </Autocomplete>
                                            </div>
                                            {formData.site && (
                                                <Link
                                                    isBlock
                                                    isExternal
                                                    className={`text-secondary-400 pt-1 ml-1 text-sm`}
                                                    href={formData.site.url}
                                                    showAnchorIcon={true}
                                                    target="_blank"
                                                >
                                                    {formData.site.url}
                                                </Link>
                                            )}
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

        </form>
    );
}

export default CredentialDetails;