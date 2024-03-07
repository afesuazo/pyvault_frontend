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


interface SiteInfo {
    id: number;
    name: string;
    url: string;
    icon: string;
}

interface CredentialEntry {
    id: number;
    site: SiteInfo;
    nickname: string;
    username: string;
    password: string;
    category: string;
    favorite: boolean;
    notes: string;
}

interface CredentialTableProps {
    data: CredentialEntry[];
}

interface CredentialTableItemProps {
    credential: CredentialEntry;
}
