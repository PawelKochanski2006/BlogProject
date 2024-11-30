const API_URL = "http://localhost:8080";

export const fetchPosts = async () => {
    const response = await fetch(`${API_URL}/posts`);
    return response.json();
};

export const fetchPostDetails = async (id) => {
    const response = await fetch(`${API_URL}/posts/${id}`);
    return response.json();
};

export const addPost = async (post) => {
    const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });
    return response.json();
};

export const deletePost = async (id) => {
    const response = await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE",
    });
    return response.json();
};

export const updatePost = async (post) => {
    const response = await fetch(`${API_URL}/posts/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });
    return response.json();
};

export const fetchComments = async (postId) => {
    const response = await fetch(`${API_URL}/comments?postId=${postId}`);
    return response.json();
}

export const addComment = async (comment) => {
    const response = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
    });
    return response.json();
};

export const deleteComment = async (id) => {
    const response = await fetch(`${API_URL}/comments/${id}`, {
        method: "DELETE",
    });
    return response.json();
};

export const updateComment = async (comment) => {
    const response = await fetch(`${API_URL}/comments/${comment.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
    });
    return response.json();
};
