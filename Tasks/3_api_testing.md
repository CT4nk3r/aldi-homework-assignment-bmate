# Task 3: API Testing

**Scenario**: You are tasked with testing a RESTful API that provides task management services.

**API Testing Framework**: Using REST-assured, create a test suite for the following endpoints:
- POST /tasks - Create a new task.
- GET /tasks/{id} - Retrieve a task by ID.
- PUT /tasks/{id} - Update a task by ID.
- DELETE /tasks/{id} - Delete a task by ID.

Provide sample code for each endpoint testing, and outline the expected status codes and
responses.


### 1. POST /tasks — Create a New Task

#### Purpose: Create a new task and verify the response.

```js
test('Create a new task', async ({ request }) => {
    const res = await request.post('/tasks', {
        data: {
            title: 'Sample Task',
            description: 'Test task',
            status: 'pending'
        }
    });

    expect(res.status()).toBe(201);
    const responseBody = await res.json();
    expect(res.id).toBeTruthy();
    expect(res.title).toBe('Sample Task');
    expect(res.status).toBe('pending');
});
```

### 2. GET /tasks/{id} — Retrieve a Task by ID

#### Purpose: Fetch task details by ID and verify the response.

```js
test('Retrieve a task by ID', async ({ request }) => {
    const taskId = '123'; // should be a valid taskId in actual code, preferably imported from fixtures.

    const res = await request.get(`/tasks/${taskId}`);

    expect(res.ok()).toBeTruthy();
    const task = await res.json();
    expect(task.id).toBe(taskId);
    expect(task.title).toBeTruthy();
});
```

### 3. PUT /tasks/{id} — Update a Task by ID

#### Purpose: Update an existing task and verify the response.

```js
test('Update a task by ID', async ({ request }) => {
    const taskId = '123';

    title_updated = 'Updated Title'
    status_updated = 'completed'

    const res = await request.put(`/tasks/${taskId}`, {
        data: {
            title: title_updated,
            status: status_updated
        }
    });

    expect(res.ok()).toBeTruthy();
    const updatedTask = await res.json();
    expect(updatedTask.title).toBe(title_updated);
    expect(updatedTask.status).toBe(status_updated);
});
```

### 4. DELETE /tasks/{id} — Delete a Task by ID

#### Purpose: Delete a task and verify the response status.

```js
test('Delete a task by ID', async ({ request }) => {
    const taskId = '123';

    const response = await request.delete(`/tasks/${taskId}`);

    expect(res.status()).toBe(204);
    expect(response.body()).toBeFalsy();
});
```

## Notes: 

1. This was written with playwright in mind.
2. I have done similar tests on my [github](https://github.com/CT4nk3r/playwright-api-testing/blob/main/tests/jsonplaceholder-api.test.ts) that is public.
   1. In this case I used a Shared API Context, which was good for my usecase, but wouldn't actually be useful in a real life scenario, as parallelism would mess it up easier. I only used GET requests, so this was not a concern.
   2. Could use thread-safe or just per-test isolation if needed.