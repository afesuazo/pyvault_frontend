import Link from "next/link";
import {StarIcon} from "@heroicons/react/16/solid";

const CredentialDetails = ({credential} : CredentialDetailsProps ) => {

    // Nothing to render when no credential is selected
    if (!credential) {
        return null;
    }

    return (
        <div className="flex flex-col h-full space-y-4 text-white overflow-hidden whitespace-nowrap ">

            {/* User Actions */}
            <div className="flex justify-between items-center border-b p-4">
                <div className="text-2xl font-semibold flex align-middle space-x-2">
                    <span>
                        <StarIcon className={`h-8 w-8 hover:text-opacity-100 ${credential.favorite ? "hover:text-opacity-60 text-amber-400" : "text-opacity-60 text-gray-300"}`}/>
                    </span>
                    <span> {credential.nickname} </span>
                </div>
                <div className="flex space-x-2">
                    <button className="bg-gray-300 hover:bg-gray-200 text-white px-3 py-1 rounded">Edit</button>
                    <button className="bg-gray-300 hover:bg-gray-200 text-white px-3 py-1 rounded">Delete</button>
                </div>
            </div>

            {/* Credential Details */}
            <div className="flex-grow p-2 pb-4 space-y-6">

                {/* Site Details */}
                <div className="flex items-center space-x-4 p-2">
                    <img src={credential.site.icon} alt="Site Icon" className="w-16 h-16 rounded-full border"/>
                    <div>
                        <h2 className="text-xl font-bold">{credential.site.name}</h2>
                        <Link href={credential.site.url} target="_blank" className="text-white underline">{credential.site.url}</Link>
                    </div>
                </div>

                {/* Credential Details */}
                <div className="flex-grow rounded-xl p-4 pt-1">

                    <div className="grid grid-cols-3 gap-x-2 my-2">
                        <label className="">Username</label>
                        <p className="col-span-2 border-b">{credential.username}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-x-2 my-2">
                        <label className="">Email</label>
                        <p className="col-span-2 border-b">{credential.email}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-x-2 my-2">
                        <label className="">Password</label>
                        <p className="col-span-2 border-b">{credential.password}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-x-2 my-8">
                        <label className="">Last Modified</label>
                        <p className="col-span-2 border-b">{credential.modified_at}</p>
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label className="">Note</label>
                        <p className="">{credential.notes}</p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default CredentialDetails;