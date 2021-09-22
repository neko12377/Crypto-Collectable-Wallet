// GET https://www.dcard.tw/v2/posts?popular=true

import { useEffect, useState } from "react";

export interface PostContentInterface {
    token_id: string;
    id: number;
    asset_contract: {address: string};
    image_preview_url?: string;
    name: string;
}

interface usePostsGettingReturnInterface {
    assets: PostContentInterface[];
    hasMore: boolean;
    error: boolean;
    isLoading: boolean;
}

export const useDataGetting = (
    urlPath: string
): usePostsGettingReturnInterface => {
    const [assets, setAssets] = useState<PostContentInterface[]>([]);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        urlPath &&
            fetch(urlPath, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                mode: "cors",
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    data &&
                        setAssets(data.assets);
                    setIsLoading(false);
                    setHasMore(data.assets.length > 0);
                })
                .catch((err) => {
                    console.info(`%c${err}`, "color: red");
                    setError(true);
                    setIsLoading(false);
                });
    }, [urlPath]);

    return { assets, hasMore, error, isLoading };
};
