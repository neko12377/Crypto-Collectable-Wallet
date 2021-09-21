import React from "react";

const PostsWall = React.lazy(
    () => import(/* webpackChunkName: "PostsWall"*/ "./PostsWall/view")
);

export { PostsWall };
