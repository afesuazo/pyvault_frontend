export interface MainContentProps {
    isLockHovered: boolean;
    setIsLockHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FeaturesProps {
    isLockHovered: boolean;
}

export interface Feature {
    key: number;
    title: string;
    description: string;
}


export interface Site {
    id: number;
    name: string;
    url: string;
    icon: string;
}

export interface CredentialColumn {
    key: string;
    label: string;
    sortable: boolean;
}

export interface CredentialEntry {
    id: number;
    site: Site | null;
    nickname: string;
    username: string;
    email: string;
    created_at: string;
    modified_at: string;
    encrypted_password: string;
    category: string;
    favorite: boolean;
    notes: string;
}

export interface CredentialTableProps {
    dataColumns: CredentialColumn[];
    data: CredentialEntry[];
    selectedCredential: CredentialEntry | null;
    onCredentialSelect: (credential: CredentialEntry) => void;
}


export enum DetailPanelMode {
    View = "view",
    Edit = "edit",
    Create = "create",
}

export interface CredentialDetailsProps {
    availableSites: Site[];
    mode: DetailPanelMode;
    credential: CredentialEntry | null,
    onSave: (credential: CredentialEntry) => void;
    onCancel: () => void;
    onDelete: (credential: CredentialEntry) => void;
}

export interface NavbarProps {
    onCreateNewCredential: () => void;
}

export interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface HttpRequestConfig {
    method?: string;
    url: string;
    headers?: any;
    body?: any;
}

export interface SiteFieldProps {
    selectedKey: number | null;
    inputValue: string;
    items: Site[];
}