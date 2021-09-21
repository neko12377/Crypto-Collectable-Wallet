// GET https://www.dcard.tw/v2/posts?popular=true

import { useEffect, useState } from "react";

export interface PostContentInterface {
    title: string;
    excerpt: string;
    id?: number;
    gender?: "F" | "M";
    forumName?: string;
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
        console.info(urlPath, "path")
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
                    console.info(data, "hook")
                    data &&
                        setAssets(data.assets);
                    setIsLoading(false);
                    // setHasMore(data.length > 0);
                })
                .catch((err) => {
                    console.info(`%c${err}`, "color: red");
                    setError(true);
                    setIsLoading(false);
                });
    }, [urlPath]);

    return { assets, hasMore, error, isLoading };
};
