https://github.com/axios/axios/issues/736

If you want to make a axios.delete, that's exactly what you have to do.

You don't use axios.delete(URL, {
data: { foo: 'bar' } //Only applicable for request methods 'PUT', 'POST', and 'PATCH'
})
for a delete request, you will use axios.delete(URL, {
params: { foo: 'bar' }
})

You will send data as the request body ONLY WHEN you are using 'PUT', 'POST', and 'PATCH'.

I'm afraid you're using axios.delete just like a axios.post or (axios.put or axios.patch). When using axios.delete, you'll send an id to a server, and the server itself will find a resource that matches that given id, only then it will be removed (or trigger some action, but the request is mapped as a http delete).

By using axios.delete(URL, {
data: { foo: 'bar' }
}) you're sending a resource, which makes no sense at all.

Take a look at the links below, you will have a better understanding:

