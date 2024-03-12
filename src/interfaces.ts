interface MainContentProps {
    isLockHovered: boolean;
    setIsLockHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FeaturesProps {
    isLockHovered: boolean;
}

interface Feature {
    key: number;
    title: string;
    description: string;
}


interface Site {
    id: number;
    name: string;
    url: string;
    icon: string;
}

interface CredentialColumn {
    key: string;
    label: string;
    sortable: boolean;
}

interface CredentialEntry {
    id: number;
    site: Site;
    nickname: string;
    username: string;
    email: string;
    created_at: string;
    modified_at: string;
    password: string;
    category: string;
    favorite: boolean;
    notes: string;
}

interface CredentialTableProps {
    dataColumns: CredentialColumn[];
    data: CredentialEntry[];
    selectedCredential: CredentialEntry | null;
    onCredentialSelect: (credential: CredentialEntry) => void;
}

interface CredentialTableHeaderProps {
    onSearch:(searchTerm: string) => void;
}

interface CredentialTableItemProps {
    credential: CredentialEntry;
    isSelected: boolean;
    onSelect: (selectedCredential: CredentialEntry) => void;
}

interface CredentialDetailsProps {
    credential: CredentialEntry | null;
}

interface NavbarProps {
    currentSearchValue: string;
    onSearchChange:(searchTerm: string) => void;
    onClear: () => void;
}

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface HttpRequestConfig {
    method?: string;
    url: string;
    headers?: any;
    body?: string;
}