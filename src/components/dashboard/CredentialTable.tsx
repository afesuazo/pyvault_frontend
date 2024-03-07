import CredentialTableItem from "@/components/dashboard/CredentialTableItem";
import CredentialTableHeader from "@/components/dashboard/CredentialTableHeader";


const CredentialTable = ({ data, onCredentialSelect } : CredentialTableProps) => {
    return (
        <div className="overflow-x-auto">
            <CredentialTableHeader />
            {data.map((credential) => (
                <CredentialTableItem
                    key={credential.id}
                    credential={credential}
                    onSelect={onCredentialSelect}
                />
            ))}
        </div>
    );
};

export default CredentialTable;