import CredentialTableItem from "@/components/dashboard/CredentialTableItem";


const CredentialTable = ({ data, selectedCredential, onCredentialSelect } : CredentialTableProps) => {
    return (
        <div className="overflow-x-auto">
            {data.map((credential) => (
                <CredentialTableItem
                    key={credential.id}
                    credential={credential}
                    isSelected={credential.id === selectedCredential?.id}
                    onSelect={onCredentialSelect}
                />
            ))}
        </div>
    );
};

export default CredentialTable;