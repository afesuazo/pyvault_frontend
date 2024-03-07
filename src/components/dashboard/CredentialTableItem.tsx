const CredentialTableItem = ( {credential, onSelect} : CredentialTableItemProps ) => {
    return (
        <div
            className="grid grid-cols-3 items-center px-2 py-0.5 hover:bg-gray-100 border-b cursor-pointer transition duration-300 ease-in-out"
            onClick={() => onSelect(credential)}
        >

            {/* Icon for the site or site Initials */}
            {/* Site Name */}

            <div className="flex items-center space-x-2">
                <div className="mr-2 border-2 rounded-2xl p-1 shadow-md">
                    <img
                        src={`/${credential.site.icon}`}
                        alt={credential.site.name}
                        className="w-6 h-6 rounded-full"
                    >
                    </img>
                </div>
                <span className="hidden md:block">{credential.site.name}</span>
            </div>

            {/* Password Nickname  */}
            {/* Username and if none then email  */}

            <div className="text-center">
                <div className="font-semibold">{credential.nickname}</div>
                <div className="border-b w-1/4 m-auto"></div>
                <div className="text-sm text-gray-600">{credential.username}</div>
            </div>

            {/* Favorite Icon */}

            <div className="hidden lg:block text-right">
                {credential.favorite ? "⭐️" : "--"}
            </div>

        </div>
    )
}

export default CredentialTableItem