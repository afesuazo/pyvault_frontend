
const CredentialDetails = ( {credential} : CredentialDetailsProps ) => {

    // Nothing to render when no credential is selected
    if (!credential) {
        return null;
    }

    return (
        <div className="flex flex-col justify-between h-full space-y-4 text-white overflow-hidden">
            {/* User Actions */}
            <div className="flex justify-between items-center border-b space-x-2 p-4">
                <div className="text-2xl font-semibold text-white">{credential.nickname}</div>
                <div className="space-x-2">
                    <button className="text-sm bg-gray-300 hover:bg-gray-200 text-white px-3 py-1 rounded">Edit</button>
                    <button className="text-sm bg-gray-300 hover:bg-gray-200 text-white px-3 py-1 rounded">Delete</button>
                </div>
            </div>

            <div className="flex flex-col flex-grow p-2 space-y-4 border-b pb-4">

                {/* Site Details */}
                <div className="border rounded-xl p-2">
                    <h1 className="text-2xl font-bold text-white">Site</h1>
                    <p className="text-white">{credential.username}</p>
                </div>

                {/* Credential Details */}
                <div className="flex-grow border rounded-xl p-2 ">
                    <h2 className="text-xl font-bold text-white mb-4">Login Details</h2>

                    <div className="grid grid-cols-3 gap-x-2 my-1">
                        <label className="">Username</label>
                        <p className="col-span-2">{credential.username}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-x-2 my-1">
                        <label className="">Email</label>
                        <p className="col-span-2">{credential.email}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-x-2 my-1 mb-6">
                        <label className="">Password</label>
                        <p className="col-span-2">{credential.password}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-x-2 my-1">
                        <label className="">Created</label>
                        <p className="col-span-2">{credential.created_at}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-x-2 mb-6">
                        <label className="">Modified</label>
                        <p className="col-span-2">{credential.modified_at}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-x-2">
                        <label className="">Notes</label>
                        <p className="col-span-2">{credential.notes}</p>
                    </div>
                </div>

            </div>

            {/* Sharing Details */}
            <div className="border rounded-xl p-2 flex flex-col text-white  space-y-1">
                <span>Shared with users: </span>
                <span>Shared with groups: </span>
            </div>


        </div>
    );
}

export default CredentialDetails;