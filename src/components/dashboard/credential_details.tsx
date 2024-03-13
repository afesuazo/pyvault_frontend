import {StarIcon} from "@heroicons/react/16/solid";
import {useEffect, useState} from "react";
import {CredentialDetailsProps, CredentialEntry, DetailPanelMode} from "@/interfaces";
import {Link, Input} from "@nextui-org/react";
import {Textarea} from "@nextui-org/input";


const CredentialDetails = ({mode, credential} : CredentialDetailsProps ) => {

    const [formData, setFormData] = useState<CredentialEntry>({
        id: 0,
        site: {
            id: 0,
            name: '',
            url: '',
            icon: '',
        },
        nickname: '',
        username: '',
        email: '',
        created_at: '',
        modified_at: '',
        password: '',
        category: '',
        favorite: false,
        notes: '',
    });

    useEffect(() => {
        if (mode !== DetailPanelMode.Create && credential) {
            setFormData(credential);
        }
    }, [mode, credential]);

    const handleChange = (event: any) => {
        const { name, value, checked, type } = event.target;
        console.log(name, value, checked, type)
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
        base: "my-1",
        label: "min-w-[100px] mr-4",
        input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
        ],
    }

    return (
        <div className="bg-neutral-100 border-4 border-neutral-500 rounded-2xl flex flex-col h-full space-y-4 overflow-hidden whitespace-nowrap">

            {/* User Actions */}
            <div className="flex justify-between items-center border-b p-4">
                <div className="text-2xl font-semibold flex align-middle space-x-2">
                    <span>
                        <StarIcon className={`h-8 w-8 hover:text-opacity-100 ${credential?.favorite ? "hover:text-opacity-60 text-amber-400" : "text-opacity-60 text-gray-300"}`}/>
                    </span>
                    <Input
                        classNames={{mainWrapper: "mx-2", input: "text-2xl"}}
                        name="nickname"
                        placeholder={"Nickname..."}
                        value={formData.nickname}
                        onChange={handleChange}
                        readOnly={mode === 'view'}
                    />
                </div>
                <div className="flex space-x-2">
                    <button className="bg-primary-500 hover:bg-gray-200 px-3 py-1 rounded">Edit</button>
                    <button className="bg-primary-500 hover:bg-gray-200 px-3 py-1 rounded">Delete</button>
                </div>
            </div>

            {/* Credential Details */}
            <div className="flex flex-col grow p-2 pb-4 space-y-6">

                {/* Site Details */}
                <div className="flex items-center space-x-4 p-2">
                    <img src={credential?.site.icon} alt="Site Icon" className="w-16 h-16 rounded-full border"/>
                    <div>
                        <h2 className="text-xl font-bold">{credential?.site.name}</h2>
                        <Link href={credential?.site.url || "#"} target="_blank">{credential?.site.url}</Link>
                    </div>
                </div>

                {/* Credential Details */}
                <div className="flex flex-col grow rounded-xl p-4 pt-1">

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
                        type={"password"}
                        labelPlacement={"outside-left"}
                        name="password"
                        value={formData.password}
                        fullWidth={true}
                        onChange={handleChange}
                        readOnly={mode === 'view'}
                    />

                    {mode === DetailPanelMode.View &&
                        <Input
                            classNames={classNames}
                            className="mt-10"
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
                        classNames={classNames}
                        className="mt-10"
                        labelPlacement={"outside"}
                        placeholder="Additional comments..."
                        value={formData.notes}
                        onChange={handleChange}
                        readOnly={mode === 'view'}
                    />

                </div>

            </div>

        </div>
    );
}

export default CredentialDetails;