const API_URL = "http://localhost:8080";

/**
 * Funkcja fetchPosts asynchronicznie pobiera posty z określonego adresu API i zwraca dane odpowiedzi w formacie JSON.
 * @returns Funkcja `fetchPosts` zwraca Promise, który rozwiązuje się do danych JSON pobranych z endpointu `/posts`.
 */
export const fetchPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/api/posts`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};



/**
 * Funkcja pobiera szczegóły posta o określonym ID z endpointu API i zwraca dane odpowiedzi w formacie JSON.
 * @param id - Parametr `id` w funkcji `fetchPostDetails` reprezentuje unikalny identyfikator posta, którego szczegóły chcesz pobrać. Ten `id` jest używany do skonstruowania URL dla żądania API w celu pobrania szczegółów konkretnego posta.
 * @returns Funkcja `fetchPostDetails` zwraca Promise, który rozwiązuje się do danych JSON szczegółów posta pobranych z endpointu API `/posts/`.
 */
export const fetchPostDetails = async (id) => {
  const response = await fetch(`${API_URL}/api/posts/${id}`);
  return response.json();
};

/**
 * Funkcja `addPost` wysyła żądanie POST do określonego endpointu API z ładunkiem JSON reprezentującym nowy post i zwraca dane odpowiedzi jako JSON.
 * @param post - Parametr `post` w funkcji `addPost` reprezentuje dane nowego posta, który chcesz dodać do serwera. Powinien to być obiekt zawierający niezbędne informacje dla posta, takie jak tytuł, treść, autor itp. Te dane zostaną wysłane do serwera w formacie JSON.
 * @returns Funkcja `addPost` zwraca odpowiedź JSON z API po wykonaniu żądania POST do `/posts` z podanymi danymi `post`.
 */
export const addPost = async (post) => {
  const response = await fetch(`${API_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return response.json();
};

/**
 * Funkcja `deletePost` wysyła żądanie DELETE do określonego endpointu API w celu usunięcia posta o podanym ID.
 * @param id - Parametr `id` w funkcji `deletePost` reprezentuje unikalny identyfikator posta, który chcesz usunąć. Ten identyfikator jest używany do określenia, który post ma zostać usunięty z serwera, gdy żądanie `DELETE` jest wysyłane do endpointu API `/posts/`.
 * @returns Funkcja `deletePost` zwraca odpowiedź JSON z API po usunięciu posta o określonym `id`.
 */
export const deletePost = async (id) => {
  const response = await fetch(`${API_URL}/api/posts/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

/**
 * Funkcja `updatePost` wysyła żądanie PUT w celu zaktualizowania posta na serwerze przy użyciu podanych danych posta.
 * @param post - Funkcja `updatePost` jest funkcją asynchroniczną, która aktualizuje post, wysyłając żądanie PUT do określonego endpointu API. Funkcja przyjmuje obiekt `post` jako parametr, który reprezentuje post do zaktualizowania. Obiekt `post` powinien mieć właściwość `id`, która identyfikuje post do zaktualizowania.
 * @returns Funkcja `updatePost` zwraca odpowiedź JSON z API po zaktualizowaniu posta.
 */
export const updatePost = async (post) => {
  const response = await fetch(`${API_URL}/api/posts/${post.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return response.json();
};

/**
 * Funkcja fetchComments asynchronicznie pobiera komentarze dla określonego ID posta z endpointu API i zwraca odpowiedź JSON.
 * @param postId - Parametr `postId` w funkcji `fetchComments` reprezentuje unikalny identyfikator posta, dla którego chcesz pobrać komentarze. Ten parametr jest używany do określenia, które komentarze posta chcesz pobrać z API.
 * @returns Funkcja `fetchComments` zwraca Promise, który rozwiązuje się do danych JSON komentarzy związanych z określonym `postId`.
 */
export const fetchComments = async (postId) => {
  try {
    const response = await fetch(`${API_URL}/api/comments/${postId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

/**
 * Funkcja `addComment` wysyła żądanie POST do określonego endpointu API w celu dodania nowego komentarza i zwraca dane odpowiedzi jako JSON.
 * @param comment - Funkcja `addComment` jest funkcją asynchroniczną, która wysyła żądanie POST do `/comments` z podanymi danymi `comment`. Parametr `comment` powinien być obiektem zawierającym informacje, które chcesz dodać jako komentarz.
 * @returns Funkcja `addComment` zwraca odpowiedź JSON z API po wykonaniu żądania POST do `/comments` z podanymi danymi komentarza.
 */
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

/**
 * Funkcja `deleteComment` wysyła żądanie DELETE do określonego endpointu API w celu usunięcia komentarza o podanym ID.
 * @param id - Parametr `id` w funkcji `deleteComment` reprezentuje unikalny identyfikator komentarza, który chcesz usunąć. Ten identyfikator jest używany do określenia, który komentarz ma zostać usunięty z serwera, gdy żądanie `DELETE` jest wysyłane do endpointu API `/comments/`.
 * @returns Funkcja `deleteComment` zwraca odpowiedź JSON z API po usunięciu komentarza o określonym `id`.
 */
export const deleteComment = async (id) => {
  const response = await fetch(`${API_URL}/comments/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

/**
 * Funkcja `updateComment` wysyła żądanie PUT w celu zaktualizowania komentarza przy użyciu podanego obiektu komentarza.
 * @param comment - Funkcja `updateComment` jest funkcją asynchroniczną, która wysyła żądanie PUT w celu zaktualizowania komentarza na serwerze przy użyciu podanego obiektu `comment`. Obiekt `comment` powinien mieć właściwość `id`, która określa ID komentarza do zaktualizowania.
 * @returns Funkcja `updateComment` zwraca odpowiedź JSON z API po zaktualizowaniu komentarza przy użyciu podanego obiektu `comment`.
 */
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
