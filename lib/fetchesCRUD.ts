export async function createFetch(url, {arg}) {
    console.log(arg)
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(arg)
    })
}
export async function updateFetch(url, {arg}) {
    await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(arg)
    })
}
export async function deleteFetch(url, {arg}) {
    await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(arg)
    })
}
