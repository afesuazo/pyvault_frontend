import {useCallback, useState} from "react";

const credentials = [
    {
        "id": 1,
        "site": {
            "id": 1,
            "name": "Google",
            "url": "https://www.google.com",
            "icon": "google_icon.png"
        },
        "nickname": "Gugu",
        "username": "anasgomezd",
        "email": "anasgomezd@gmail.com",
        "password": "cualquiera",
        "category": "Social",
        "favorite": false,
        "modified_at": "2021-10-10T12:00:00Z",
        "created_at": "2021-10-10T12:00:00Z",
        "notes": "Esta te la puse yo miamor. Estas son como notitas que pdoes gruardar y tambine estan encryptadas asi que son super seguras"
    },
    {
        "id": 2,
        "site": {
            "id": 2,
            "name": "Facebook",
            "url": "https://www.facebook.com",
            "icon": "facebook_icon.png"
        },
        "nickname": "Face",
        "username": "anapoopis",
        "email": "anasgomezd@gmail.com",
        "password": "facepass",
        "category": "Social",
        "modified_at": "2021-10-10T12:00:00Z",
        "created_at": "2021-10-10T12:00:00Z",
        "favorite": true,
        "notes": ""
    },
    {
        "id": 3,
        "site": {
            "id": 3,
            "name": "Twitter",
            "url": "https://www.twitter.com",
            "icon": "twitter_icon.png"
        },
        "nickname": "Ay X",
        "username": "anita_la_huerfanita",
        "email": "anasgomezd@gmail.com",
        "password": "twitter_pass_!",
        "category": "Social",
        "modified_at": "2021-10-10T12:00:00Z",
        "created_at": "2021-10-10T12:00:00Z",
        "favorite": false,
        "notes": "Test Notes"
    }
];

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const httpRequest = useCallback(async (requestConfig: HttpRequestConfig, applyData: (data: any) => void) => {
        setIsLoading(true);
        setError(null);

        if (requestConfig.url.endsWith("mock")) {
            setTimeout(() => {
                applyData(credentials);
                setIsLoading(false);
            }, 500); // Delay in milliseconds
            return;
        }

        try {
            const response = await fetch(
                requestConfig.url, {
                    // Default to GET
                    method: requestConfig.method || "GET",
                    headers: requestConfig.headers || {},
                    body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
                }
            )

            if (!response.ok) {
                console.log(response.status)
                throw new Error("HTTP Request Failed")
            }

            const data = await response.json();
            applyData(data);

        } catch (error) {
            setError(error instanceof Error ? error.message : "An unknown error occurred");
        }
        setIsLoading(false)
    }, [])

    return { httpRequest, isLoading, error };
}

export default useHttp