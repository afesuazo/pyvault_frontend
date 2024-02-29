import {useEffect, useState} from "react";

const features: Feature[] = [
    {key: 0, title: "Feature 1", description: "Description of feature 1"},
    {key: 1, title: "Feature 2", description: "Description of feature 2"},
    {key: 2, title: "Feature 3", description: "Description of feature 3"},
    {key: 3, title: "Feature 4", description: "Description of feature 4"},
];

const Features = ({isLockHovered}: FeaturesProps) => {

    const [isEnabledColorActive, setIsEnabledColorActive] = useState(false);
    const [titleTexts, setTitleTexts] = useState<string[]>(features.map(feature => feature.title));
    const [descriptionTexts, setDescriptionTexts] = useState<string[]>(features.map(feature => feature.description));

    const scrambleText = (text: string) => {
        return text.split('').map((char) => {
            if (Math.random() > 0.5) {
                return String.fromCharCode(33 + Math.floor(Math.random() * (126 - 33)));
            }
            return char;
        }).join('');
    };

    useEffect(() => {
        // Wait for the lock to be hovered for 1 second before hiding the text
        if (isLockHovered) {
            const intervalId = setInterval(() => {
                setTitleTexts(titleTexts.map(text => scrambleText(text)));
                setDescriptionTexts(descriptionTexts.map(text => scrambleText(text)));
            }, 50);

            const timeoutId = setTimeout(() => {
                clearInterval(intervalId); // stop scrambling
                setIsEnabledColorActive(true);
            }, 800);

            return () => {
                clearInterval(intervalId);
                clearTimeout(timeoutId);
            };
        } else {
            setTitleTexts(features.map(feature => feature.title));
            setDescriptionTexts(features.map(feature => feature.description));
            setIsEnabledColorActive(false);
        }
    }, [isLockHovered]);

    return (

        <div
            className={`drop-shadow-2xl relative grid px-6 mr-24 py-12 mb-12 rounded-r-full content-center bg-gray-200 w-full gap-2 lg:mb-0 lg:grid-cols-4 lg:text-left`}>
            <div
                className={`absolute -z-5 h-full rounded-r-full transition-width duration-700 ease-in-out ${isLockHovered ? 'w-full' : 'w-0'} ${isEnabledColorActive ? 'bg-green-500' : 'bg-white'}`}/>
            {features.map((feature, index) => (
                <div key={feature.key}
                     className="rounded-2xl z-10 h-max border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                    <h2 className="text-center mb-3 text-2xl font-semibold">
                        {titleTexts[index]}
                    </h2>
                    <p className="text-center m-0 overflow-auto text-sm opacity-50">
                        {descriptionTexts[index]}
                    </p>
                </div>
            ))}
        </div>

    )
}

export default Features;