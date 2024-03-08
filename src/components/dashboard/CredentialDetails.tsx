import Link from "next/link";

const CredentialDetails = ( {credential} : CredentialDetailsProps ) => {

    // Nothing to render when no credential is selected
    if (!credential) {
        return null;
    }

    return (
        <div className="flex flex-col justify-between h-full space-y-4 text-white overflow-hidden">

            {/* User Actions */}
            <div className="flex justify-between items-center border-b space-x-2 p-4">
                <div className="text-2xl font-semibold text-white">
                    <span> {credential.favorite ? "⭐️" : "--"} </span>
                    <span> {credential.nickname} </span>
                </div>
                <div className="space-x-2">
                    <button className="text-sm bg-gray-300 hover:bg-gray-200 text-white px-3 py-1 rounded">Edit</button>
                    <button className="text-sm bg-gray-300 hover:bg-gray-200 text-white px-3 py-1 rounded">Delete</button>
                </div>
            </div>

            <div className="flex flex-col flex-grow p-2 space-y-6 pb-4">

                {/* Site Details */}
                <div className="flex space-x-4 rounded-xl p-2">
                    <img src={credential.site.icon} alt="Site Icon" className="w-16 h-16 rounded-full border"/>
                    <div className="flex flex-col justify-center">
                        <h2 className="text-xl font-bold text-white">{credential.site.name}</h2>
                        <Link href={credential.site.url} target="_blank" className="text-white">{credential.site.url}</Link>
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