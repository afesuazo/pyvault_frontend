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