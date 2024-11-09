type AddressType = {
  cid: string
  cip: string
  cname: string
}

async function getAddress(): Promise<AddressType> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    try {
      xhr.open('get', '/apiSohu/cityjson?ie=utf-8')
  
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          const response = xhr.responseText
          let res = response.slice(response.indexOf('{'), response.length - 1)
          resolve(JSON.parse(res))
        }
      }
      xhr.send()
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}

export {
  getAddress
}
