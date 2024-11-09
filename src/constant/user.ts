import { BSON } from "realm-web"
import { UserType } from "../types/user"

enum Status {
  ACITVE,
  DELETE,
  FROZEN
}

enum Favorite {
  STARRED,
  COLLECTED
}

export let USER_INFO: UserType = {
  username: null,
  email: null,
  password: null,
  role_id: new BSON.ObjectId(0), // primary role
  avatar_url: 'https://cn.bing.com/images/search?view=detailV2&ccid=Un06yHA8&id=B74D432BE081C7B02D23F34D77BD4BBD95ACA207&thid=OIP.Un06yHA8g5ykk8JLb1bFmgHaHK&mediaurl=https%3a%2f%2fts1.cn.mm.bing.net%2fth%2fid%2fR-C.527d3ac8703c839ca493c24b6f56c59a%3frik%3dB6Kslb1LvXdN8w%26riu%3dhttp%253a%252f%252fwww.haopet123.com%252fS_Pic%252fB%252f2013713205071528402281403.jpg%26ehk%3di3F5fvQVnfIVC0dTD6rRXMieKuSmQZoK25xgy3JoRJA%253d%26risl%3d%26pid%3dImgRaw%26r%3d0&exph=532&expw=550&q=%e5%93%88%e5%a3%ab%e5%a5%87&simid=608008623753949039&FORM=IRPRST&ck=FA49B563B928197B2819D74DFE495FF5&selectedIndex=7&itb=0',  // URL to avatar image
  description: 'Nothing Leave',
  location: {
    ip_addr: null,
    city: null
  },
  status: Status.ACITVE,
  following: [],
  followers: [],
  favorites: []
}
