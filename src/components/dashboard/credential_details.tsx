import Link from "next/link";
import {StarIcon} from "@heroicons/react/16/solid";
import {useEffect, useState} from "react";
import {CredentialDetailsProps, CredentialEntry, DetailPanelMode} from "@/interfaces";

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
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Nothing to render when no credential is selected
    if (!credential && mode !== DetailPanelMode.Create) {
        return null;
    }

    return (
        <div className="bg-neutral-100 border-4 border-neutral-500 rounded-2xl flex flex-col h-full space-y-4 overflow-hidden whitespace-nowrap">

            {/* User Actions */}
            <div className="flex justify-between items-center border-b p-4">
                <div className="text-2xl font-semibold flex align-middle space-x-2">
                    <span>
                        <StarIcon className={`h-8 w-8 hover:text-opacity-100 ${credential?.favorite ? "hover:text-opacity-60 text-amber-400" : "text-opacity-60 text-gray-300"}`}/>
                    </span>
                    <span> {credential?.nickname} </span>
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
                        <Link href={credential?.site.url || "#"} target="_blank" className="text-white underline">{credential?.site.url}</Link>
                    </div>
                </div>

                {/* Credential Details */}
                <div className="flex flex-col grow rounded-xl p-4 pt-1">

                    <div className="grid grid-cols-3 gap-x-2 my-2">
                        <label className="">Username</label>
                        <p className="col-span-2 border-b">{credential?.username}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-x-2 my-2">
                        <label className="">Email</label>
                        <p className="col-span-2 border-b">{credential?.email}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-x-2 my-2">
                        <label className="">Password</label>
                        <p className="col-span-2 border-b">{credential?.password}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-x-2 my-8">
                        <label className="">Last Modified</label>
                        <p className="col-span-2 border-b">{credential?.modified_at}</p>
                    </div>

                    <div className="flex flex-col grow overflow-y-auto">
                        <label className="">Note</label>
                        <p className="grow whitespace-pre-wrap">{credential?.notes}</p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default CredentialDetails;