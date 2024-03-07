import CredentialTableItem from "@/components/dashboard/CredentialTableItem";
import CredentialTableHeader from "@/components/dashboard/CredentialTableHeader";


const CredentialTable = ({ data } : CredentialTableProps) => {
    return (
        <div className="overflow-x-auto">
            <CredentialTableHeader />
            {data.map((credential) => (
                <CredentialTableItem key={credential.id} credential={credential} />
            ))}
        </div>
    );
};

export default CredentialTable;