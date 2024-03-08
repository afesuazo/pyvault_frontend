const CredentialTableHeader = ({onSearch} :CredentialTableHeaderProps) => {
    return (
        <div className="bg-gray-300 flex flex-col p-2 pb-3 rounded-t-lg border-b-2">
            {/*  Table Name  */}
            <span className="text-2xl font-bold mb-2">Credentials</span>

            {/*  User Actions  */}
            <div className="flex justify-between">

                {/*  Search and Filter */}
                <div className="space-x-2">
                    {/*  Search Bar  */}
                    <input
                        type="text"
                        placeholder="Credential nickname"
                        onChange={(e) => onSearch(e.target.value)}
                        className="p-1 border focus:outline-gray-300 rounded-lg"
                    />

                    {/*  Filtering  */}
                    <button
                        onClick={() => {
                            console.log("Add Filters")
                        }}
                        className="p-1 px-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 disabled:opacity-25 disabled:hover:bg-gray-400"
                        disabled
                    >
                        + Filter
                    </button>
                </div>

                {/*  New Credential Button  */}
                <button
                    className="p-1 px-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                    onClick={() => {
                        console.log("Add New Credential")
                    }}
                >
                   Create New
                </button>
            </div>


        </div>
    )
}

export default CredentialTableHeader;