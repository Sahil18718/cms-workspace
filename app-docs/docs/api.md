# API Documentation

## Endpoints
### Posts
- `GET /api/posts` – Retrieve all posts.
- `POST /api/posts` – Create a new post.
- `PUT /api/posts/${id}` –  Update post.
- `DELETE /api/posts/${id}` –  Delete post.

### Pages
- `GET /api/pages` – Retrieve all pages.
- `POST /api/pages` – Create a new page.
- `PUT /api/pages/${id}` – Updated page.
- `DELETE /api/pages/${id}` – Delete page.

### Example Request
```bash
curl -X POST http://localhost:4200/api/posts \
-H "Content-Type: application/json" \
-d '{
  "title": "Sample Post",
  "slug": "sample-post",
  "contentBlocks": [{"type": "text-block", "props": {"content": "Hello, world!"}}]
}'
```